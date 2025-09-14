import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useAuth } from "@/hooks/useAuth";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { 
  Brain,
  CheckCircle,
  ArrowRight,
  Star,
  Target,
  TrendingUp,
  BookOpen,
  Award
} from "lucide-react";

interface AssessmentQuestion {
  id: string;
  category: string;
  question: string;
  options: Array<{ text: string; weight: number; stream?: string }>;
  stream?: string;
}

interface AssessmentResults {
  completed: boolean;
  results?: {
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
  };
  message?: string;
}

export default function Assessment() {
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  // Fetch assessment questions
  const { data: questions, isLoading: questionsLoading } = useQuery<AssessmentQuestion[]>({
    queryKey: ["/api/assessment/questions"],
    retry: false,
  });

  // Fetch assessment results
  const { data: results, refetch: refetchResults } = useQuery<AssessmentResults>({
    queryKey: ["/api/assessment/results"],
    enabled: false,
    retry: false,
  });

  // Submit answer mutation
  const submitAnswerMutation = useMutation({
    mutationFn: async ({ questionId, answer }: { questionId: string; answer: string }) => {
      await apiRequest("POST", "/api/assessment/submit", { questionId, answer });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to submit answer. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleAnswerSelect = async (answer: string) => {
    if (!questions || !questions[currentQuestionIndex]) return;

    const currentQuestion = questions[currentQuestionIndex];
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: answer }));

    // Submit answer to backend if user is authenticated
    if (isAuthenticated) {
      await submitAnswerMutation.mutateAsync({
        questionId: currentQuestion.id,
        answer,
      });
    }

    // Move to next question or show results
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // All questions completed
      if (isAuthenticated) {
        const resultsData = await refetchResults();
        if (resultsData.data?.completed) {
          setShowResults(true);
        }
      } else {
        // For non-authenticated users, show demo completion
        toast({
          title: "Demo Completed",
          description: "Sign in to get your personalized assessment results and AI recommendations.",
          variant: "default",
        });
      }
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  if (questionsLoading) {
    return (
      <div className="min-h-screen bg-background" data-testid="loading-state">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card>
            <CardContent className="p-8 text-center">
              <div className="animate-pulse space-y-4">
                <div className="h-8 bg-muted rounded w-3/4 mx-auto" />
                <div className="h-4 bg-muted rounded w-1/2 mx-auto" />
                <div className="space-y-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-12 bg-muted rounded" />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="min-h-screen bg-background" data-testid="no-questions-state">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card>
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">No Assessment Questions Available</h2>
              <p className="text-muted-foreground">
                Assessment questions are currently being prepared. Please check back later.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (showResults && results?.completed && results.results) {
    const assessmentResults = results.results;
    
    return (
      <div className="min-h-screen bg-background" data-testid="results-page">
        <Header />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Results Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Award className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2" data-testid="results-title">
              Your Assessment Results
            </h1>
            <p className="text-muted-foreground">
              Based on your responses, here's your personalized educational guidance
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recommended Stream */}
            <Card className="lg:col-span-2" data-testid="recommended-stream-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Recommended Stream
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 p-6 bg-primary/10 rounded-lg">
                  <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                    <BookOpen className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-primary" data-testid="recommended-stream">
                      {assessmentResults.recommended_stream}
                    </h3>
                    <p className="text-muted-foreground">
                      {(assessmentResults.confidence * 100).toFixed(0)}% confidence match
                    </p>
                  </div>
                  <div className="ml-auto">
                    <Badge variant="secondary" className="text-lg px-4 py-2">
                      Best Match
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Aptitude Scores */}
            <Card data-testid="aptitude-scores-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-secondary" />
                  Aptitude Scores
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(assessmentResults.aptitude_scores).map(([stream, score]) => (
                    <div key={stream} data-testid={`aptitude-${stream}`}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium capitalize">{stream}</span>
                        <span className="text-sm font-semibold">{score}/100</span>
                      </div>
                      <Progress value={score} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Personality & Interests */}
            <Card data-testid="personality-interests-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-accent" />
                  Your Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Personality Traits</h4>
                    <div className="flex flex-wrap gap-2">
                      {assessmentResults.personality_traits.map((trait, index) => (
                        <Badge key={index} variant="outline" data-testid={`personality-trait-${index}`}>
                          {trait}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Key Interests</h4>
                    <div className="flex flex-wrap gap-2">
                      {assessmentResults.interests.map((interest, index) => (
                        <Badge key={index} variant="secondary" data-testid={`interest-${index}`}>
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Next Steps */}
          <Card className="mt-8" data-testid="next-steps-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                What's Next?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-6 w-6 text-secondary" />
                  </div>
                  <h4 className="font-semibold mb-2">Get Course Recommendations</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Discover specific degree programs that match your profile
                  </p>
                  <Button 
                    className="w-full" 
                    onClick={() => {
                      // Trigger course recommendations
                      queryClient.invalidateQueries({ queryKey: ["/api/recommendations/courses"] });
                    }}
                    data-testid="get-course-recommendations-button"
                  >
                    Get Recommendations
                  </Button>
                </div>

                <div className="text-center p-6 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="h-6 w-6 text-accent" />
                  </div>
                  <h4 className="font-semibold mb-2">Explore Colleges</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Find government colleges offering your recommended stream
                  </p>
                  <Button variant="secondary" className="w-full" asChild data-testid="explore-colleges-button">
                    <a href="/colleges">Browse Colleges</a>
                  </Button>
                </div>

                <div className="text-center p-6 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">View Career Paths</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    See detailed career opportunities for your stream
                  </p>
                  <Button variant="outline" className="w-full" asChild data-testid="view-career-paths-button">
                    <a href="/career-paths">Career Paths</a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  // Assessment Quiz UI
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-background" data-testid="assessment-page">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Aptitude & Interest Assessment</h1>
            <Badge variant="outline" data-testid="question-counter">
              {currentQuestionIndex + 1} of {questions.length}
            </Badge>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" data-testid="progress-bar" />
          </div>
        </div>

        {/* Question Card */}
        <Card data-testid="question-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              {currentQuestion.category === 'aptitude' && 'Aptitude Assessment'}
              {currentQuestion.category === 'interest' && 'Interest Assessment'}
              {currentQuestion.category === 'personality' && 'Personality Assessment'}
            </CardTitle>
            {currentQuestion.stream && (
              <Badge variant="secondary" className="w-fit">
                {currentQuestion.stream}
              </Badge>
            )}
          </CardHeader>
          <CardContent>
            <h3 className="text-lg font-semibold mb-6" data-testid="question-text">
              {currentQuestion.question}
            </h3>
            
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  className={`w-full p-4 text-left border border-border rounded-lg hover:bg-muted/50 transition-colors ${
                    answers[currentQuestion.id] === option.text 
                      ? 'bg-primary/10 border-primary' 
                      : 'hover:border-muted-foreground'
                  }`}
                  onClick={() => handleAnswerSelect(option.text)}
                  disabled={submitAnswerMutation.isPending}
                  data-testid={`option-${index}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 ${
                      answers[currentQuestion.id] === option.text
                        ? 'border-primary bg-primary'
                        : 'border-muted-foreground'
                    }`}>
                      {answers[currentQuestion.id] === option.text && (
                        <CheckCircle className="w-4 h-4 text-primary-foreground" />
                      )}
                    </div>
                    <span className="flex-1">{option.text}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <Button 
                variant="outline" 
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
                data-testid="previous-button"
              >
                Previous
              </Button>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {!isAuthenticated && (
                  <span>Sign in to save your progress</span>
                )}
                {submitAnswerMutation.isPending && (
                  <span>Saving...</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tips Card */}
        <Card className="mt-6 bg-muted/50" data-testid="tips-card">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-accent font-bold text-sm">💡</span>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">Assessment Tips</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Answer honestly based on your genuine interests and preferences</li>
                  <li>• There are no right or wrong answers - this is about understanding you better</li>
                  <li>• Take your time to think about each question before answering</li>
                  {!isAuthenticated && (
                    <li>• Sign in to save your progress and get personalized AI recommendations</li>
                  )}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
}
