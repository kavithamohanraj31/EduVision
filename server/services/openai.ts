import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

interface AssessmentResult {
  aptitude_scores: {
    science: number;
    commerce: number;
    arts: number;
    vocational: number;
  };
  personality_traits: string[];
  interests: string[];
  recommended_stream: string;
  confidence: number;
}

interface CourseRecommendation {
  degree: string;
  stream: string;
  reasons: string[];
  career_prospects: string[];
  suitable_colleges: string[];
  confidence: number;
}

interface CareerPathAnalysis {
  career_title: string;
  description: string;
  salary_range: string;
  growth_prospects: string;
  required_skills: string[];
  industry_areas: string[];
  government_jobs: string[];
  private_jobs: string[];
  entrepreneurial_options: string[];
}

export class GeminiService {
  async analyzeAssessmentResults(
    userAnswers: Array<{ question: string; answer: string; category: string; stream?: string }>
  ): Promise<AssessmentResult> {
    try {
      const prompt = `
        You are an expert career counselor and educational psychologist specializing in Indian higher education. Analyze student assessment responses to provide accurate stream recommendations.

        Analyze the following aptitude and interest assessment responses from a student and provide personalized stream recommendations.

        Assessment Responses:
        ${userAnswers.map(a => `Q: ${a.question}\nA: ${a.answer}\nCategory: ${a.category}`).join('\n\n')}

        Please analyze the responses and provide a comprehensive assessment in JSON format with:
        1. Aptitude scores (0-100) for Science, Commerce, Arts, and Vocational streams
        2. Key personality traits identified
        3. Primary areas of interest
        4. Recommended stream with reasoning
        5. Confidence level (0-1)

        Response should be in JSON format with the structure:
        {
          "aptitude_scores": {
            "science": number,
            "commerce": number, 
            "arts": number,
            "vocational": number
          },
          "personality_traits": string[],
          "interests": string[],
          "recommended_stream": string,
          "confidence": number
        }
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Extract JSON from response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("No JSON found in response");
      }
      
      const parsedResult = JSON.parse(jsonMatch[0]);
      return parsedResult as AssessmentResult;
    } catch (error) {
      throw new Error(`Failed to analyze assessment: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async generateCourseRecommendations(
    assessmentResult: AssessmentResult,
    userProfile: { currentClass?: string; location?: string }
  ): Promise<CourseRecommendation[]> {
    try {
      const prompt = `
        You are an expert education counselor with deep knowledge of Indian higher education system, degree programs, and career opportunities.

        Based on the following assessment results and user profile, recommend specific degree courses for Indian higher education.

        Assessment Results:
        - Recommended Stream: ${assessmentResult.recommended_stream}
        - Aptitude Scores: ${JSON.stringify(assessmentResult.aptitude_scores)}
        - Interests: ${assessmentResult.interests.join(', ')}
        - Personality Traits: ${assessmentResult.personality_traits.join(', ')}

        User Profile:
        - Current Class: ${userProfile.currentClass || 'Not specified'}
        - Location: ${userProfile.location || 'Not specified'}

        Provide 3-5 specific degree course recommendations in JSON format. Focus on:
        1. Practical courses available in Indian universities
        2. Career prospects and job opportunities
        3. Alignment with student's aptitude and interests
        4. Government and private sector opportunities

        Response format:
        {
          "recommendations": [
            {
              "degree": "specific degree name (e.g., B.Sc. Computer Science)",
              "stream": "stream category",
              "reasons": ["reason 1", "reason 2", "reason 3"],
              "career_prospects": ["career 1", "career 2", "career 3"],
              "suitable_colleges": ["college type 1", "college type 2"],
              "confidence": number
            }
          ]
        }
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Extract JSON from response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("No JSON found in response");
      }
      
      const parsedResult = JSON.parse(jsonMatch[0]);
      return parsedResult.recommendations || [];
    } catch (error) {
      throw new Error(`Failed to generate course recommendations: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async analyzeCareerPath(degree: string, stream: string): Promise<CareerPathAnalysis> {
    try {
      const prompt = `
        You are a career guidance expert with comprehensive knowledge of the Indian job market, salary trends, and career opportunities across different educational backgrounds.

        Provide a comprehensive career path analysis for students pursuing ${degree} in ${stream} stream in the Indian context.

        Include detailed information about:
        1. Career description and overview
        2. Expected salary ranges in India (in INR)
        3. Growth prospects and advancement opportunities
        4. Essential skills required
        5. Major industry areas and sectors
        6. Government job opportunities
        7. Private sector opportunities
        8. Entrepreneurial and freelancing options

        Focus on realistic, current Indian job market conditions and opportunities.

        Response in JSON format:
        {
          "career_title": "primary career title",
          "description": "detailed career description",
          "salary_range": "salary range in INR",
          "growth_prospects": "growth and advancement opportunities",
          "required_skills": ["skill1", "skill2", "skill3"],
          "industry_areas": ["industry1", "industry2", "industry3"],
          "government_jobs": ["job1", "job2", "job3"],
          "private_jobs": ["job1", "job2", "job3"],
          "entrepreneurial_options": ["option1", "option2", "option3"]
        }
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Extract JSON from response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("No JSON found in response");
      }
      
      const parsedResult = JSON.parse(jsonMatch[0]);
      return parsedResult as CareerPathAnalysis;
    } catch (error) {
      throw new Error(`Failed to analyze career path: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async generatePersonalizedAdvice(
    userId: string,
    context: {
      assessmentCompleted?: boolean;
      interests?: string[];
      currentClass?: string;
      location?: string;
    }
  ): Promise<{ advice: string; next_steps: string[] }> {
    try {
      const prompt = `
        You are a compassionate and knowledgeable education counselor who provides personalized guidance to Indian students navigating their educational journey.

        Provide personalized educational advice for a student with the following profile:

        Student Context:
        - Assessment Completed: ${context.assessmentCompleted ? 'Yes' : 'No'}
        - Interests: ${context.interests?.join(', ') || 'Not specified'}
        - Current Class: ${context.currentClass || 'Not specified'}
        - Location: ${context.location || 'Not specified'}

        Provide:
        1. Personalized advice based on their current situation
        2. Specific next steps they should take
        3. Recommendations tailored to Indian education system

        Response in JSON format:
        {
          "advice": "personalized advice text",
          "next_steps": ["step1", "step2", "step3", "step4"]
        }
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Extract JSON from response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("No JSON found in response");
      }
      
      const parsedResult = JSON.parse(jsonMatch[0]);
      return parsedResult;
    } catch (error) {
      throw new Error(`Failed to generate personalized advice: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}

export const geminiService = new GeminiService();
