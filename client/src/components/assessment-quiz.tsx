import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GraduationCap, BookOpen, Award, MapPin, DollarSign, Home, Users, Star } from 'lucide-react';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Enhanced assessment questions with location, income, and other relevant factors
const assessmentQuestions = [
  {
    id: 'location_1',
    question: 'Where are you currently located?',
    category: 'location',
    type: 'single_choice',
    options: [
      { value: 'tamil_nadu', text: 'Tamil Nadu', score: { location: 'tamil_nadu', show_city_question: true } },
      { value: 'other_state', text: 'Other State in India', score: { location: 'other_state' } },
      { value: 'international', text: 'Outside India', score: { location: 'international' } }
    ]
  },
  {
    id: 'tamil_nadu_city',
    question: 'Which city are you in Tamil Nadu?',
    category: 'location',
    type: 'single_choice',
    options: [
      { value: 'chennai', text: 'Chennai', score: { city: 'Chennai', district: 'Chennai' } },
      { value: 'coimbatore', text: 'Coimbatore', score: { city: 'Coimbatore', district: 'Coimbatore' } },
      { value: 'madurai', text: 'Madurai', score: { city: 'Madurai', district: 'Madurai' } },
      { value: 'tiruchirappalli', text: 'Tiruchirappalli (Trichy)', score: { city: 'Tiruchirappalli', district: 'Tiruchirappalli' } },
      { value: 'salem', text: 'Salem', score: { city: 'Salem', district: 'Salem' } },
      { value: 'tirunelveli', text: 'Tirunelveli', score: { city: 'Tirunelveli', district: 'Tirunelveli' } },
      { value: 'erode', text: 'Erode', score: { city: 'Erode', district: 'Erode' } },
      { value: 'vellore', text: 'Vellore', score: { city: 'Vellore', district: 'Vellore' } },
      { value: 'tiruppur', text: 'Tiruppur', score: { city: 'Tiruppur', district: 'Tiruppur' } },
      { value: 'thoothukudi', text: 'Thoothukudi', score: { city: 'Thoothukudi', district: 'Thoothukudi' } },
      { value: 'dindigul', text: 'Dindigul', score: { city: 'Dindigul', district: 'Dindigul' } },
      { value: 'thanjavur', text: 'Thanjavur', score: { city: 'Thanjavur', district: 'Thanjavur' } },
      { value: 'other_city', text: 'Other City', score: { city: 'other', district: 'other' } }
    ],
    conditional: true,
    depends_on: 'location_1',
    depends_value: 'tamil_nadu'
  },
  {
    id: 'family_income',
    question: 'What is your family\'s annual income?',
    category: 'financial',
    type: 'single_choice',
    options: [
      { value: 'below_2l', text: 'Below ₹2 Lakhs', score: { budget: 'low', scholarship_priority: 5 } },
      { value: '2l_5l', text: '₹2-5 Lakhs', score: { budget: 'low_medium', scholarship_priority: 4 } },
      { value: '5l_10l', text: '₹5-10 Lakhs', score: { budget: 'medium', scholarship_priority: 3 } },
      { value: '10l_20l', text: '₹10-20 Lakhs', score: { budget: 'high_medium', scholarship_priority: 2 } },
      { value: 'above_20l', text: 'Above ₹20 Lakhs', score: { budget: 'high', scholarship_priority: 1 } }
    ]
  },
  {
    id: 'academic_1',
    question: 'What is your current academic performance?',
    category: 'academic',
    type: 'single_choice',
    options: [
      { value: 'excellent', text: 'Excellent (90%+)', score: { academic: 5, analytical: 4, cutoff_high: true } },
      { value: 'very_good', text: 'Very Good (80-89%)', score: { academic: 4, analytical: 3, cutoff_medium: true } },
      { value: 'good', text: 'Good (70-79%)', score: { academic: 3, analytical: 2, cutoff_medium: true } },
      { value: 'average', text: 'Average (60-69%)', score: { academic: 2, analytical: 1, cutoff_low: true } },
      { value: 'below_average', text: 'Below Average (<60%)', score: { academic: 1, analytical: 1, cutoff_low: true } }
    ]
  },
  {
    id: 'academic_2',
    question: 'Which subjects do you enjoy the most? (Select all that apply)',
    category: 'academic',
    type: 'multiple_choice',
    options: [
      { value: 'mathematics', text: 'Mathematics', score: { analytical: 5, logical: 5, science: 4, engineering: 4 } },
      { value: 'science', text: 'Science (Physics, Chemistry, Biology)', score: { science: 5, analytical: 4, research: 3, medicine: 4 } },
      { value: 'languages', text: 'Languages (English, Literature)', score: { communication: 5, creative: 4, social: 3, arts: 4 } },
      { value: 'social_studies', text: 'Social Studies (History, Geography, Civics)', score: { social: 5, communication: 4, analytical: 3, arts: 3 } },
      { value: 'commerce', text: 'Commerce (Economics, Business Studies)', score: { business: 5, analytical: 4, communication: 3, commerce: 4 } },
      { value: 'arts', text: 'Arts (Fine Arts, Music, Drama)', score: { creative: 5, artistic: 5, communication: 3, arts: 4 } }
    ]
  },
  {
    id: 'interest_1',
    question: 'What activities do you enjoy in your free time? (Select all that apply)',
    category: 'interest',
    type: 'multiple_choice',
    options: [
      { value: 'reading', text: 'Reading books/articles', score: { analytical: 4, communication: 3, research: 3 } },
      { value: 'problem_solving', text: 'Solving puzzles and problems', score: { analytical: 5, logical: 5, technical: 4, engineering: 4 } },
      { value: 'creative_arts', text: 'Drawing, painting, or creative arts', score: { creative: 5, artistic: 5, communication: 3, arts: 4 } },
      { value: 'sports', text: 'Sports and physical activities', score: { leadership: 4, teamwork: 4, physical: 5 } },
      { value: 'technology', text: 'Working with computers and technology', score: { technical: 5, analytical: 4, innovation: 4, engineering: 4 } },
      { value: 'social_activities', text: 'Social activities and meeting people', score: { social: 5, communication: 5, leadership: 3 } }
    ]
  },
  {
    id: 'career_1',
    question: 'What are your primary career goals? (Select all that apply)',
    category: 'career',
    type: 'multiple_choice',
    options: [
      { value: 'financial_security', text: 'Financial security and stability', score: { business: 4, practical: 4, security: 5, commerce: 4 } },
      { value: 'social_impact', text: 'Making a positive social impact', score: { social: 5, communication: 4, service: 5, medicine: 3 } },
      { value: 'innovation', text: 'Innovation and creating new things', score: { innovation: 5, creative: 4, technical: 4, engineering: 4 } },
      { value: 'leadership', text: 'Leadership and management roles', score: { leadership: 5, communication: 4, business: 4, commerce: 4 } },
      { value: 'research', text: 'Research and academic pursuits', score: { research: 5, analytical: 5, academic: 4, science: 4 } },
      { value: 'entrepreneurship', text: 'Starting my own business', score: { business: 5, leadership: 4, innovation: 4, commerce: 4 } }
    ]
  },
  {
    id: 'future_1',
    question: 'What are your plans after 12th grade?',
    category: 'future',
    type: 'single_choice',
    options: [
      { value: 'engineering', text: 'Engineering', score: { technical: 5, analytical: 4, science: 4, engineering: 5 } },
      { value: 'medicine', text: 'Medicine', score: { service: 5, science: 4, research: 3, medicine: 5 } },
      { value: 'commerce', text: 'Commerce/Business', score: { business: 5, analytical: 3, communication: 3, commerce: 5 } },
      { value: 'arts', text: 'Arts/Humanities', score: { creative: 4, communication: 4, social: 3, arts: 5 } },
      { value: 'law', text: 'Law', score: { communication: 5, analytical: 4, social: 4, arts: 3 } },
      { value: 'design', text: 'Design/Architecture', score: { creative: 5, artistic: 4, technical: 3, arts: 4 } },
      { value: 'not_sure', text: 'Not sure yet', score: { exploration: 5, flexibility: 4, curiosity: 4 } }
    ]
  },
  {
    id: 'preference_1',
    question: 'What type of college environment do you prefer?',
    category: 'preference',
    type: 'single_choice',
    options: [
      { value: 'government', text: 'Government/Public Colleges', score: { type_preference: 'Public', budget_friendly: true } },
      { value: 'private', text: 'Private Colleges', score: { type_preference: 'Private', modern_facilities: true } },
      { value: 'no_preference', text: 'No specific preference', score: { flexible: true } }
    ]
  },
  {
    id: 'preference_2',
    question: 'How important is scholarship availability to you?',
    category: 'preference',
    type: 'single_choice',
    options: [
      { value: 'very_important', text: 'Very Important', score: { scholarship_priority: 5, budget_sensitive: true } },
      { value: 'important', text: 'Important', score: { scholarship_priority: 4, budget_conscious: true } },
      { value: 'somewhat', text: 'Somewhat Important', score: { scholarship_priority: 3 } },
      { value: 'not_important', text: 'Not Important', score: { scholarship_priority: 1 } }
    ]
  }
];

// Define College interface for Firebase data
interface College {
  id: string;
  collegeId?: string;
  name: string;
  district?: string;
  coursesOffered?: string[];
  cutoff?: number;
  fees?: number;
  seats?: number;
  scholarshipAvailable?: boolean;
  state?: string;
  type?: string;
  createdAt?: any;
  updatedAt?: any;
}

export default function AssessmentQuiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [recommendations, setRecommendations] = useState<any>(null);
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(false);

  // Filter questions based on conditional logic
  const getFilteredQuestions = () => {
    const filtered = [];
    for (const question of assessmentQuestions) {
      if (question.conditional) {
        const dependsOnAnswer = answers[question.depends_on!];
        if (dependsOnAnswer === question.depends_value) {
          filtered.push(question);
        }
      } else {
        filtered.push(question);
      }
    }
    return filtered;
  };

  const filteredQuestions = getFilteredQuestions();
  const currentQuestion = filteredQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / filteredQuestions.length) * 100;

  // Fetch colleges from Firebase
  const fetchColleges = async () => {
    try {
      setLoading(true);
      const collegesRef = collection(db, "colleges");
      const q = query(collegesRef, orderBy("name"));
      const querySnapshot = await getDocs(q);
      
      const collegesData: College[] = [];
      querySnapshot.forEach((doc) => {
        collegesData.push({
          id: doc.id,
          ...doc.data()
        } as College);
      });
      
      setColleges(collegesData);
    } catch (error) {
      console.error("Error fetching colleges:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionId: string, value: string | string[]) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = async () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Fetch colleges first, then calculate recommendations
      await fetchColleges();
      calculateRecommendations();
      setIsCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const calculateRecommendations = () => {
    // Calculate scores based on answers
    const scores: Record<string, number> = {};
    const preferences: Record<string, any> = {};
    
    Object.entries(answers).forEach(([questionId, answer]) => {
      const question = assessmentQuestions.find(q => q.id === questionId);
      if (!question) return;

      const selectedOptions = Array.isArray(answer) ? answer : [answer];
      
      selectedOptions.forEach(selectedValue => {
        const option = question.options.find(opt => opt.value === selectedValue);
        if (option && option.score) {
          Object.entries(option.score).forEach(([trait, score]) => {
            if (typeof score === 'number') {
              scores[trait] = (scores[trait] || 0) + score;
            } else {
              preferences[trait] = score;
            }
          });
        }
      });
    });

    // Determine recommended stream based on highest scores
    const streamScores = {
      science: (scores.science || 0) + (scores.analytical || 0) + (scores.technical || 0) + (scores.engineering || 0),
      arts: (scores.creative || 0) + (scores.artistic || 0) + (scores.communication || 0) + (scores.arts || 0),
      commerce: (scores.business || 0) + (scores.analytical || 0) + (scores.leadership || 0) + (scores.commerce || 0),
      medicine: (scores.service || 0) + (scores.science || 0) + (scores.research || 0) + (scores.medicine || 0)
    };

    const recommendedStream = Object.entries(streamScores).reduce((a, b) => 
      streamScores[a[0]] > streamScores[b[0]] ? a : b
    )[0];

    // Filter colleges based on user preferences
    let filteredColleges = colleges;

    // Filter by location preference
    if (preferences.location === 'tamil_nadu') {
      filteredColleges = filteredColleges.filter(college => 
        college.state === 'Tamil Nadu' || college.state === 'tamil_nadu'
      );
      
      // Further filter by city if specified
      if (preferences.city && preferences.city !== 'other') {
        filteredColleges = filteredColleges.filter(college => 
          college.district === preferences.city || 
          college.district === preferences.district ||
          college.name.toLowerCase().includes(preferences.city.toLowerCase())
        );
      }
    }

    // Filter by budget
    const budget = preferences.budget;
    if (budget === 'low' || budget === 'low_medium') {
      filteredColleges = filteredColleges.filter(college => 
        !college.fees || college.fees <= 100000
      );
    } else if (budget === 'medium') {
      filteredColleges = filteredColleges.filter(college => 
        !college.fees || college.fees <= 500000
      );
    }

    // Filter by college type preference
    if (preferences.type_preference) {
      filteredColleges = filteredColleges.filter(college => 
        college.type === preferences.type_preference
      );
    }

    // Filter by scholarship availability if important
    if (preferences.scholarship_priority >= 4) {
      filteredColleges = filteredColleges.filter(college => 
        college.scholarshipAvailable === true
      );
    }

    // Filter by academic performance (cutoff matching)
    const academicLevel = answers.academic_1;
    if (academicLevel === 'excellent' || academicLevel === 'very_good') {
      // Show colleges with higher cutoffs
      filteredColleges = filteredColleges.filter(college => 
        !college.cutoff || college.cutoff >= 80
      );
    } else if (academicLevel === 'good' || academicLevel === 'average') {
      // Show colleges with medium cutoffs
      filteredColleges = filteredColleges.filter(college => 
        !college.cutoff || (college.cutoff >= 60 && college.cutoff < 90)
      );
    } else {
      // Show colleges with lower cutoffs
      filteredColleges = filteredColleges.filter(college => 
        !college.cutoff || college.cutoff < 80
      );
    }

    // Sort by relevance and take top 5
    const recommendedColleges = filteredColleges
      .sort((a, b) => {
        // Prioritize colleges with scholarships if user values them
        if (preferences.scholarship_priority >= 4) {
          if (a.scholarshipAvailable && !b.scholarshipAvailable) return -1;
          if (!a.scholarshipAvailable && b.scholarshipAvailable) return 1;
        }
        // Sort by fees (lower first for budget-conscious users)
        if (budget === 'low' || budget === 'low_medium') {
          return (a.fees || 0) - (b.fees || 0);
        }
        // Sort by cutoff (higher first for high performers)
        if (academicLevel === 'excellent' || academicLevel === 'very_good') {
          return (b.cutoff || 0) - (a.cutoff || 0);
        }
        return 0;
      })
      .slice(0, 5);

    // Get recommended courses based on stream
    const recommendedCourses = getRecommendedCourses(recommendedStream, scores);

    // Get available scholarships
    const availableScholarships = getAvailableScholarships(preferences, recommendedStream);

    setRecommendations({
      stream: recommendedStream,
      scores,
      preferences,
      colleges: recommendedColleges,
      courses: recommendedCourses,
      scholarships: availableScholarships,
      totalCollegesFound: filteredColleges.length
    });
  };

  const getRecommendedCourses = (stream: string, scores: Record<string, number>) => {
    const courseRecommendations = {
      science: [
        { name: "B.Tech Computer Science Engineering", degree: "B.Tech", salary: "8-15 LPA", match: scores.engineering || 0 },
        { name: "B.Sc Physics", degree: "B.Sc", salary: "5-12 LPA", match: scores.science || 0 },
        { name: "B.Sc Chemistry", degree: "B.Sc", salary: "4-10 LPA", match: scores.science || 0 },
        { name: "B.Sc Mathematics", degree: "B.Sc", salary: "6-14 LPA", match: scores.analytical || 0 }
      ],
      arts: [
        { name: "B.A English Literature", degree: "B.A", salary: "3-8 LPA", match: scores.communication || 0 },
        { name: "B.A History", degree: "B.A", salary: "3-6 LPA", match: scores.social || 0 },
        { name: "B.A Economics", degree: "B.A", salary: "4-9 LPA", match: scores.analytical || 0 },
        { name: "B.A Political Science", degree: "B.A", salary: "3-7 LPA", match: scores.social || 0 }
      ],
      commerce: [
        { name: "B.Com", degree: "B.Com", salary: "4-10 LPA", match: scores.business || 0 },
        { name: "BBA (Bachelor of Business Administration)", degree: "BBA", salary: "5-12 LPA", match: scores.leadership || 0 },
        { name: "B.Com (Hons)", degree: "B.Com", salary: "5-15 LPA", match: scores.analytical || 0 },
        { name: "B.A Economics", degree: "B.A", salary: "4-9 LPA", match: scores.business || 0 }
      ],
      medicine: [
        { name: "MBBS", degree: "MBBS", salary: "8-20 LPA", match: scores.service || 0 },
        { name: "BDS (Bachelor of Dental Surgery)", degree: "BDS", salary: "6-15 LPA", match: scores.service || 0 },
        { name: "B.Sc Nursing", degree: "B.Sc", salary: "3-8 LPA", match: scores.service || 0 },
        { name: "B.Pharm", degree: "B.Pharm", salary: "4-10 LPA", match: scores.science || 0 }
      ]
    };

    return courseRecommendations[stream as keyof typeof courseRecommendations] || [];
  };

  const getAvailableScholarships = (preferences: Record<string, any>, stream: string) => {
    const scholarships = [
      { name: "Merit Scholarship for Engineering Students", amount: "₹50,000", provider: "Ministry of Education", stream: "science" },
      { name: "Girl Child Education Scholarship", amount: "₹25,000", provider: "Women and Child Development Ministry", stream: "all" },
      { name: "SC/ST Scholarship", amount: "₹30,000", provider: "Social Justice Ministry", stream: "all" },
      { name: "Tamil Nadu Government Scholarship", amount: "₹20,000", provider: "Tamil Nadu Government", stream: "all" },
      { name: "Arts and Humanities Scholarship", amount: "₹15,000", provider: "Ministry of Culture", stream: "arts" },
      { name: "Commerce Excellence Scholarship", amount: "₹35,000", provider: "Commerce Ministry", stream: "commerce" }
    ];

    return scholarships.filter(scholarship => 
      scholarship.stream === stream || scholarship.stream === 'all'
    ).slice(0, 3);
  };

  const resetAssessment = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setIsCompleted(false);
    setRecommendations(null);
  };

  if (isCompleted && recommendations) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">🎉 Assessment Complete!</CardTitle>
            <CardDescription className="text-center">
              Based on your answers, here are your personalized recommendations
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Recommended Stream */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Recommended Stream
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {recommendations.stream.charAt(0).toUpperCase() + recommendations.stream.slice(1)}
            </Badge>
            <p className="mt-2 text-muted-foreground">
              Based on your interests and strengths, this stream aligns best with your profile.
            </p>
          </CardContent>
        </Card>

        {/* Recommended Colleges */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Recommended Colleges ({recommendations.totalCollegesFound} found)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="mt-2 text-muted-foreground">Loading colleges...</p>
              </div>
            ) : recommendations.colleges.length > 0 ? (
              recommendations.colleges.map((college: College, index: number) => (
                <div key={college.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">{college.name}</h3>
                    <div className="flex gap-2">
                      <Badge variant={college.type === "Public" ? "default" : "secondary"}>
                        {college.type || 'College'}
                      </Badge>
                      {college.scholarshipAvailable && (
                        <Badge variant="outline" className="text-green-600">
                          <Award className="h-3 w-3 mr-1" />
                          Scholarship Available
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-3">
                    <MapPin className="h-4 w-4 inline mr-1" />
                    {college.district || 'Tamil Nadu'}, {college.state || 'Tamil Nadu'}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    {college.cutoff && (
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4 text-muted-foreground" />
                        <span><strong>Cutoff:</strong> {college.cutoff}%</span>
                      </div>
                    )}
                    {college.fees && (
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span><strong>Fees:</strong> ₹{college.fees.toLocaleString()}</span>
                      </div>
                    )}
                    {college.seats && (
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span><strong>Seats:</strong> {college.seats}</span>
                      </div>
                    )}
                  </div>
                  {college.coursesOffered && college.coursesOffered.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm font-medium mb-2">Available Courses:</p>
                      <div className="flex flex-wrap gap-1">
                        {college.coursesOffered.slice(0, 4).map((course, courseIndex) => (
                          <Badge key={courseIndex} variant="outline" className="text-xs">
                            {course}
                          </Badge>
                        ))}
                        {college.coursesOffered.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{college.coursesOffered.length - 4} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold mb-2">No colleges found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your preferences or check back later for more options.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recommended Courses */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Recommended Courses
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recommendations.courses.map((course: any, index: number) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{course.name}</h3>
                  <Badge variant="outline">{course.degree}</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span><strong>Average Salary:</strong> {course.salary}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span><strong>Match Score:</strong> {course.match}/5</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Available Scholarships */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Available Scholarships
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recommendations.scholarships.map((scholarship: any, index: number) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{scholarship.name}</h3>
                  <Badge variant="secondary" className="text-green-600">
                    {scholarship.amount}
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-2">{scholarship.provider}</p>
                <div className="flex items-center gap-2 text-sm">
                  <Award className="h-4 w-4 text-yellow-500" />
                  <span>Eligible for {recommendations.stream} stream</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button onClick={resetAssessment} variant="outline">
            Take Assessment Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Career Assessment Quiz</CardTitle>
          <CardDescription>
            Answer these questions to get personalized college and course recommendations
          </CardDescription>
          <div className="mt-4">
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-muted-foreground mt-2">
              Question {currentQuestionIndex + 1} of {filteredQuestions.length}
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">{currentQuestion.question}</h3>
            
            {currentQuestion.type === 'single_choice' ? (
              <RadioGroup
                value={answers[currentQuestion.id] as string || ''}
                onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
                className="space-y-3"
              >
                {currentQuestion.options.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value} className="text-sm font-normal cursor-pointer">
                      {option.text}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            ) : (
              <div className="space-y-3">
                {currentQuestion.options.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={option.value}
                      checked={(answers[currentQuestion.id] as string[] || []).includes(option.value)}
                      onCheckedChange={(checked) => {
                        const currentAnswers = answers[currentQuestion.id] as string[] || [];
                        if (checked) {
                          handleAnswerChange(currentQuestion.id, [...currentAnswers, option.value]);
                        } else {
                          handleAnswerChange(currentQuestion.id, currentAnswers.filter(a => a !== option.value));
                        }
                      }}
                    />
                    <Label htmlFor={option.value} className="text-sm font-normal cursor-pointer">
                      {option.text}
                    </Label>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={
                currentQuestion.type === 'single_choice' 
                  ? !answers[currentQuestion.id]
                  : !(answers[currentQuestion.id] as string[])?.length
              }
            >
              {currentQuestionIndex === filteredQuestions.length - 1 ? 'Complete' : 'Next'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}