import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, BookOpen, Award, MapPin } from 'lucide-react';

// Assessment questions in JavaScript format
const assessmentQuestions = [
  {
    id: 'academic_1',
    question: 'What is your current academic performance?',
    category: 'academic',
    type: 'single_choice',
    options: [
      { value: 'excellent', text: 'Excellent (90%+)', score: { academic: 5, analytical: 4 } },
      { value: 'very_good', text: 'Very Good (80-89%)', score: { academic: 4, analytical: 3 } },
      { value: 'good', text: 'Good (70-79%)', score: { academic: 3, analytical: 2 } },
      { value: 'average', text: 'Average (60-69%)', score: { academic: 2, analytical: 1 } },
      { value: 'below_average', text: 'Below Average (<60%)', score: { academic: 1, analytical: 1 } }
    ]
  },
  {
    id: 'academic_2',
    question: 'Which subjects do you enjoy the most? (Select all that apply)',
    category: 'academic',
    type: 'multiple_choice',
    options: [
      { value: 'mathematics', text: 'Mathematics', score: { analytical: 5, logical: 5, science: 4 } },
      { value: 'science', text: 'Science (Physics, Chemistry, Biology)', score: { science: 5, analytical: 4, research: 3 } },
      { value: 'languages', text: 'Languages (English, Literature)', score: { communication: 5, creative: 4, social: 3 } },
      { value: 'social_studies', text: 'Social Studies (History, Geography, Civics)', score: { social: 5, communication: 4, analytical: 3 } },
      { value: 'commerce', text: 'Commerce (Economics, Business Studies)', score: { business: 5, analytical: 4, communication: 3 } },
      { value: 'arts', text: 'Arts (Fine Arts, Music, Drama)', score: { creative: 5, artistic: 5, communication: 3 } }
    ]
  },
  {
    id: 'interest_1',
    question: 'What activities do you enjoy in your free time? (Select all that apply)',
    category: 'interest',
    type: 'multiple_choice',
    options: [
      { value: 'reading', text: 'Reading books/articles', score: { analytical: 4, communication: 3, research: 3 } },
      { value: 'problem_solving', text: 'Solving puzzles and problems', score: { analytical: 5, logical: 5, technical: 4 } },
      { value: 'creative_arts', text: 'Drawing, painting, or creative arts', score: { creative: 5, artistic: 5, communication: 3 } },
      { value: 'sports', text: 'Sports and physical activities', score: { leadership: 4, teamwork: 4, physical: 5 } },
      { value: 'technology', text: 'Working with computers and technology', score: { technical: 5, analytical: 4, innovation: 4 } },
      { value: 'social_activities', text: 'Social activities and meeting people', score: { social: 5, communication: 5, leadership: 3 } }
    ]
  },
  {
    id: 'career_1',
    question: 'What are your primary career goals? (Select all that apply)',
    category: 'career',
    type: 'multiple_choice',
    options: [
      { value: 'financial_security', text: 'Financial security and stability', score: { business: 4, practical: 4, security: 5 } },
      { value: 'social_impact', text: 'Making a positive social impact', score: { social: 5, communication: 4, service: 5 } },
      { value: 'innovation', text: 'Innovation and creating new things', score: { innovation: 5, creative: 4, technical: 4 } },
      { value: 'leadership', text: 'Leadership and management roles', score: { leadership: 5, communication: 4, business: 4 } },
      { value: 'research', text: 'Research and academic pursuits', score: { research: 5, analytical: 5, academic: 4 } },
      { value: 'entrepreneurship', text: 'Starting my own business', score: { business: 5, leadership: 4, innovation: 4 } }
    ]
  },
  {
    id: 'future_1',
    question: 'What are your plans after 12th grade?',
    category: 'future',
    type: 'single_choice',
    options: [
      { value: 'engineering', text: 'Engineering', score: { technical: 5, analytical: 4, science: 4 } },
      { value: 'medicine', text: 'Medicine', score: { service: 5, science: 4, research: 3 } },
      { value: 'commerce', text: 'Commerce/Business', score: { business: 5, analytical: 3, communication: 3 } },
      { value: 'arts', text: 'Arts/Humanities', score: { creative: 4, communication: 4, social: 3 } },
      { value: 'law', text: 'Law', score: { communication: 5, analytical: 4, social: 4 } },
      { value: 'design', text: 'Design/Architecture', score: { creative: 5, artistic: 4, technical: 3 } },
      { value: 'not_sure', text: 'Not sure yet', score: { exploration: 5, flexibility: 4, curiosity: 4 } }
    ]
  }
];

export default function AssessmentQuiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [recommendations, setRecommendations] = useState<any>(null);

  const currentQuestion = assessmentQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / assessmentQuestions.length) * 100;

  const handleAnswerChange = (questionId: string, value: string | string[]) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < assessmentQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
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
    
    Object.entries(answers).forEach(([questionId, answer]) => {
      const question = assessmentQuestions.find(q => q.id === questionId);
      if (!question) return;

      const selectedOptions = Array.isArray(answer) ? answer : [answer];
      
      selectedOptions.forEach(selectedValue => {
        const option = question.options.find(opt => opt.value === selectedValue);
        if (option && option.score) {
          Object.entries(option.score).forEach(([trait, score]) => {
            scores[trait] = (scores[trait] || 0) + score;
          });
        }
      });
    });

    // Determine recommended stream based on highest scores
    const streamScores = {
      science: (scores.science || 0) + (scores.analytical || 0) + (scores.technical || 0),
      arts: (scores.creative || 0) + (scores.artistic || 0) + (scores.communication || 0),
      commerce: (scores.business || 0) + (scores.analytical || 0) + (scores.leadership || 0)
    };

    const recommendedStream = Object.entries(streamScores).reduce((a, b) => 
      streamScores[a[0]] > streamScores[b[0]] ? a : b
    )[0];

    // Sample recommendations based on stream
    const sampleRecommendations = {
      science: {
        colleges: [
          { name: "Indian Institute of Technology Delhi", location: "New Delhi", courses: ["B.Tech Computer Science", "B.Tech Mechanical"], cutoffs: "95%", fees: "₹2.5L" },
          { name: "All India Institute of Medical Sciences", location: "New Delhi", courses: ["MBBS", "MD"], cutoffs: "99.5%", fees: "₹25K" }
        ],
        courses: [
          { name: "Bachelor of Technology in Computer Science", degree: "B.Tech", salary: "8-15 LPA" },
          { name: "Bachelor of Science in Physics", degree: "B.Sc", salary: "5-12 LPA" }
        ],
        scholarships: [
          { name: "Merit Scholarship for Engineering Students", amount: "₹50,000", provider: "Ministry of Education" }
        ]
      },
      arts: {
        colleges: [
          { name: "Delhi University", location: "New Delhi", courses: ["B.A", "B.A English"], cutoffs: "85%", fees: "₹35K" },
          { name: "St. Stephen's College", location: "New Delhi", courses: ["B.A English", "B.A Economics"], cutoffs: "98%", fees: "₹55K" }
        ],
        courses: [
          { name: "Bachelor of Arts in English Literature", degree: "B.A", salary: "3-8 LPA" },
          { name: "Bachelor of Arts in History", degree: "B.A", salary: "3-6 LPA" }
        ],
        scholarships: [
          { name: "Girl Child Education Scholarship", amount: "₹25,000", provider: "Women and Child Development Ministry" }
        ]
      },
      commerce: {
        colleges: [
          { name: "Indian Institute of Management Ahmedabad", location: "Ahmedabad", courses: ["MBA", "PGP"], cutoffs: "99%", fees: "₹25L" },
          { name: "Delhi University", location: "New Delhi", courses: ["B.Com", "M.Com"], cutoffs: "85%", fees: "₹35K" }
        ],
        courses: [
          { name: "Bachelor of Commerce", degree: "B.Com", salary: "4-10 LPA" },
          { name: "Master of Business Administration", degree: "MBA", salary: "10-25 LPA" }
        ],
        scholarships: [
          { name: "SC/ST Scholarship", amount: "₹30,000", provider: "Social Justice Ministry" }
        ]
      }
    };

    setRecommendations({
      stream: recommendedStream,
      scores,
      ...sampleRecommendations[recommendedStream as keyof typeof sampleRecommendations]
    });
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
              Recommended Colleges
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recommendations.colleges.map((college: any, index: number) => (
              <div key={index} className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg">{college.name}</h3>
                <p className="text-muted-foreground">{college.location}</p>
                <div className="mt-2 space-y-1">
                  <p><strong>Courses:</strong> {college.courses.join(', ')}</p>
                  <p><strong>Cutoffs:</strong> {college.cutoffs}</p>
                  <p><strong>Fees:</strong> {college.fees}</p>
                </div>
              </div>
            ))}
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
              <div key={index} className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg">{course.name}</h3>
                <p className="text-muted-foreground">{course.degree}</p>
                <div className="mt-2">
                  <p><strong>Average Salary:</strong> {course.salary}</p>
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
              <div key={index} className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg">{scholarship.name}</h3>
                <p className="text-muted-foreground">{scholarship.provider}</p>
                <div className="mt-2">
                  <p><strong>Amount:</strong> {scholarship.amount}</p>
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
              Question {currentQuestionIndex + 1} of {assessmentQuestions.length}
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
              {currentQuestionIndex === assessmentQuestions.length - 1 ? 'Complete' : 'Next'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}