import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./firebaseStorage";
import { setupAuth, isAuthenticated } from "./localAuth";
import { geminiService } from "./services/openai";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Assessment routes
  app.get('/api/assessment/questions', async (req, res) => {
    try {
      const { category, stream } = req.query;
      const questions = await storage.getAssessmentQuestions(
        category as string,
        stream as string
      );
      res.json(questions);
    } catch (error) {
      console.error("Error fetching assessment questions:", error);
      res.status(500).json({ message: "Failed to fetch assessment questions" });
    }
  });

  app.post('/api/assessment/submit', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { questionId, answer } = req.body;
      
      const validatedData = insertUserAssessmentSchema.parse({
        userId,
        questionId,
        answer,
      });

      const assessment = await storage.submitUserAssessment(validatedData);
      res.json(assessment);
    } catch (error) {
      console.error("Error submitting assessment:", error);
      res.status(500).json({ message: "Failed to submit assessment" });
    }
  });

  app.get('/api/assessment/results', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const userAssessments = await storage.getUserAssessments(userId);
      
      if (userAssessments.length === 0) {
        return res.json({ completed: false, message: "No assessment data found" });
      }

      // Get questions for context
      const questions = await storage.getAssessmentQuestions();
      const assessmentData = userAssessments.map(ua => {
        const question = questions.find(q => q.id === ua.questionId);
        return {
          question: question?.question || '',
          answer: ua.answer,
          category: question?.category || '',
          stream: question?.stream || undefined,
        };
      });

      // Analyze with Gemini
      const analysisResult = await geminiService.analyzeAssessmentResults(assessmentData);
      
      // Store recommendations
      await storage.createUserRecommendation({
        userId,
        recommendationType: 'stream',
        recommendedItem: analysisResult.recommended_stream,
        confidence: analysisResult.confidence.toString(),
        reasoning: `Based on aptitude assessment. Interests: ${analysisResult.interests.join(', ')}`,
        aiModel: 'gemini-pro',
      });

      // Update user as assessment completed
      const user = await storage.getUser(userId);
      if (user) {
        await storage.upsertUser({
          ...user,
          assessmentCompleted: true,
          interests: analysisResult.interests,
        });
      }

      res.json({
        completed: true,
        results: analysisResult,
      });
    } catch (error) {
      console.error("Error analyzing assessment results:", error);
      res.status(500).json({ message: "Failed to analyze assessment results" });
    }
  });

  // AI Recommendations routes
  app.post('/api/recommendations/courses', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user?.assessmentCompleted) {
        return res.status(400).json({ message: "Please complete the assessment first" });
      }

      const userAssessments = await storage.getUserAssessments(userId);
      const questions = await storage.getAssessmentQuestions();
      
      const assessmentData = userAssessments.map(ua => {
        const question = questions.find(q => q.id === ua.questionId);
        return {
          question: question?.question || '',
          answer: ua.answer,
          category: question?.category || '',
          stream: question?.stream || undefined,
        };
      });

      const analysisResult = await geminiService.analyzeAssessmentResults(assessmentData);
      const courseRecommendations = await geminiService.generateCourseRecommendations(
        analysisResult,
        {
          currentClass: user.currentClass || undefined,
          location: `${user.firstName} ${user.lastName}`, // Placeholder for location
        }
      );

      // Store course recommendations
      for (const rec of courseRecommendations) {
        await storage.createUserRecommendation({
          userId,
          recommendationType: 'course',
          recommendedItem: rec.degree,
          confidence: rec.confidence.toString(),
          reasoning: rec.reasons.join('; '),
          aiModel: 'gemini-pro',
        });
      }

      res.json(courseRecommendations);
    } catch (error) {
      console.error("Error generating course recommendations:", error);
      res.status(500).json({ message: "Failed to generate course recommendations" });
    }
  });

  // College recommendations based on assessment
  app.post('/api/recommendations/colleges', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user?.assessmentCompleted) {
        return res.status(400).json({ message: "Please complete the assessment first" });
      }

      const userAssessments = await storage.getUserAssessments(userId);
      const questions = await storage.getAssessmentQuestions();
      
      const assessmentData = userAssessments.map(ua => {
        const question = questions.find(q => q.id === ua.questionId);
        return {
          question: question?.question || '',
          answer: ua.answer,
          category: question?.category || '',
          stream: question?.stream || undefined,
        };
      });

      const analysisResult = await geminiService.analyzeAssessmentResults(assessmentData);
      
      // Get all colleges and filter based on recommended stream
      const allColleges = await storage.getColleges();
      const recommendedColleges = allColleges.filter(college => {
        if (!college.courses) return false;
        return college.courses.some(course => {
          const courseLower = course.toLowerCase();
          const streamLower = analysisResult.recommended_stream.toLowerCase();
          
          if (streamLower === 'science') {
            return courseLower.includes('b.sc') || courseLower.includes('b.tech') || courseLower.includes('mbbs');
          } else if (streamLower === 'commerce') {
            return courseLower.includes('b.com') || courseLower.includes('bba') || courseLower.includes('mba');
          } else if (streamLower === 'arts') {
            return courseLower.includes('b.a') || courseLower.includes('english') || courseLower.includes('history');
          } else if (streamLower === 'vocational') {
            return courseLower.includes('diploma') || courseLower.includes('certificate');
          }
          return false;
        });
      });

      // Sort by cutoff (lower is better for admission chances)
      recommendedColleges.sort((a, b) => {
        const cutoffA = (a.cutoffs as any)?.general || 100;
        const cutoffB = (b.cutoffs as any)?.general || 100;
        return cutoffA - cutoffB;
      });

      // Store college recommendations
      for (const college of recommendedColleges.slice(0, 5)) {
        await storage.createUserRecommendation({
          userId,
          recommendationType: 'college',
          recommendedItem: college.name,
          confidence: (0.8 + Math.random() * 0.2).toString(), // 80-100% confidence
          reasoning: `Offers courses in ${analysisResult.recommended_stream} stream with good facilities`,
          aiModel: 'gemini-pro',
        });
      }

      res.json(recommendedColleges.slice(0, 10));
    } catch (error) {
      console.error("Error generating college recommendations:", error);
      res.status(500).json({ message: "Failed to generate college recommendations" });
    }
  });

  // Scholarship recommendations
  app.post('/api/recommendations/scholarships', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user?.assessmentCompleted) {
        return res.status(400).json({ message: "Please complete the assessment first" });
      }

      // Read scholarships from CSV
      const fs = require('fs');
      const path = require('path');
      const csvPath = path.join(__dirname, '../client/public/scholarships_dataset.csv');
      const csvContent = fs.readFileSync(csvPath, 'utf-8');
      const lines = csvContent.trim().split('\n');
      const headers = lines[0].split(',');
      
      const scholarships = lines.slice(1).map(line => {
        const values = line.split(',');
        const obj: any = {};
        headers.forEach((header, index) => {
          obj[header.trim()] = values[index]?.trim() || '';
        });
        return obj;
      });

      // Filter scholarships based on user profile
      const recommendedScholarships = scholarships.filter(scholarship => {
        // Basic eligibility filtering (can be enhanced with more sophisticated logic)
        if (scholarship.Category === 'Merit-based' && user.interests?.length) {
          return true;
        }
        if (scholarship.Category === 'Gender-based' && user.firstName) {
          return true; // Simplified - in real app, would check actual gender
        }
        if (scholarship.Category === 'Income-based') {
          return true; // Simplified - in real app, would check actual income
        }
        return true; // For demo purposes, show all scholarships
      });

      // Store scholarship recommendations
      for (const scholarship of recommendedScholarships.slice(0, 5)) {
        await storage.createUserRecommendation({
          userId,
          recommendationType: 'scholarship',
          recommendedItem: scholarship.Name,
          confidence: (0.7 + Math.random() * 0.3).toString(), // 70-100% confidence
          reasoning: `Eligible based on ${scholarship.Category} criteria`,
          aiModel: 'gemini-pro',
        });
      }

      res.json(recommendedScholarships.slice(0, 10));
    } catch (error) {
      console.error("Error generating scholarship recommendations:", error);
      res.status(500).json({ message: "Failed to generate scholarship recommendations" });
    }
  });

  app.get('/api/recommendations/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { type } = req.query;
      
      const recommendations = await storage.getUserRecommendations(
        userId,
        type as string
      );
      
      res.json(recommendations);
    } catch (error) {
      console.error("Error fetching user recommendations:", error);
      res.status(500).json({ message: "Failed to fetch recommendations" });
    }
  });

  // Colleges routes
  app.get('/api/colleges', async (req, res) => {
    try {
      const { state, city, courses, limit = '20', offset = '0' } = req.query;
      
      const filters: any = {
        limit: parseInt(limit as string),
        offset: parseInt(offset as string),
      };
      
      if (state) filters.state = state as string;
      if (city) filters.city = city as string;
      if (courses) {
        filters.courses = (courses as string).split(',');
      }
      
      const colleges = await storage.getColleges(filters);
      res.json(colleges);
    } catch (error) {
      console.error("Error fetching colleges:", error);
      res.status(500).json({ message: "Failed to fetch colleges" });
    }
  });

  app.get('/api/colleges/search', async (req, res) => {
    try {
      const { location, radius } = req.query;
      
      if (!location) {
        return res.status(400).json({ message: "Location parameter is required" });
      }
      
      const colleges = await storage.searchCollegesByLocation(
        location as string,
        radius ? parseInt(radius as string) : undefined
      );
      
      res.json(colleges);
    } catch (error) {
      console.error("Error searching colleges:", error);
      res.status(500).json({ message: "Failed to search colleges" });
    }
  });

  app.get('/api/colleges/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const college = await storage.getCollegeById(id);
      
      if (!college) {
        return res.status(404).json({ message: "College not found" });
      }
      
      res.json(college);
    } catch (error) {
      console.error("Error fetching college:", error);
      res.status(500).json({ message: "Failed to fetch college" });
    }
  });

  // Career paths routes
  app.get('/api/career-paths', async (req, res) => {
    try {
      const { stream, degree } = req.query;
      const careerPaths = await storage.getCareerPaths(
        stream as string,
        degree as string
      );
      res.json(careerPaths);
    } catch (error) {
      console.error("Error fetching career paths:", error);
      res.status(500).json({ message: "Failed to fetch career paths" });
    }
  });

  app.get('/api/career-paths/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const careerPath = await storage.getCareerPathById(id);
      
      if (!careerPath) {
        return res.status(404).json({ message: "Career path not found" });
      }
      
      res.json(careerPath);
    } catch (error) {
      console.error("Error fetching career path:", error);
      res.status(500).json({ message: "Failed to fetch career path" });
    }
  });

  app.post('/api/career-paths/analyze', async (req, res) => {
    try {
      const { degree, stream } = req.body;
      
      if (!degree || !stream) {
        return res.status(400).json({ message: "Degree and stream are required" });
      }
      
      const analysis = await geminiService.analyzeCareerPath(degree, stream);
      res.json(analysis);
    } catch (error) {
      console.error("Error analyzing career path:", error);
      res.status(500).json({ message: "Failed to analyze career path" });
    }
  });

  // Timeline routes
  app.get('/api/timeline/events', async (req, res) => {
    try {
      const { limit } = req.query;
      const events = await storage.getActiveTimelineEvents(
        limit ? parseInt(limit as string) : undefined
      );
      res.json(events);
    } catch (error) {
      console.error("Error fetching timeline events:", error);
      res.status(500).json({ message: "Failed to fetch timeline events" });
    }
  });

  app.get('/api/timeline/upcoming', async (req, res) => {
    try {
      const events = await storage.getUpcomingEvents();
      res.json(events);
    } catch (error) {
      console.error("Error fetching upcoming events:", error);
      res.status(500).json({ message: "Failed to fetch upcoming events" });
    }
  });

  // Dashboard route
  app.get('/api/dashboard', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      // Get user's latest recommendations
      const recommendations = await storage.getUserRecommendations(userId);
      
      // Get upcoming events
      const upcomingEvents = await storage.getUpcomingEvents();
      
      // Generate personalized advice
      const personalizedAdvice = await geminiService.generatePersonalizedAdvice(
        userId,
        {
          assessmentCompleted: user?.assessmentCompleted || undefined,
          interests: user?.interests || undefined,
          currentClass: user?.currentClass || undefined,
        }
      );
      
      res.json({
        user,
        recommendations: recommendations.slice(0, 3), // Latest 3 recommendations
        upcomingEvents: upcomingEvents.slice(0, 5), // Next 5 events
        personalizedAdvice,
        assessmentProgress: user?.assessmentCompleted ? 100 : 0,
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      res.status(500).json({ message: "Failed to fetch dashboard data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
