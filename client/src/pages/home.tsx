import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useAuth } from "@/hooks/useAuth";
import { isUnauthorizedError } from "@/lib/authUtils";
import { 
  Brain, 
  Calendar, 
  Bot, 
  TrendingUp, 
  MapPin,
  Clock,
  Target,
  BookOpen
} from "lucide-react";
import { Link } from "wouter";

interface DashboardData {
  user: any;
  recommendations: any[];
  upcomingEvents: any[];
  personalizedAdvice: {
    advice: string;
    next_steps: string[];
  };
  assessmentProgress: number;
}

export default function Home() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  const { data: dashboardData, isLoading, error } = useQuery<DashboardData>({
    queryKey: ["/api/dashboard"],
    retry: false,
  });

  // Handle unauthorized errors at page level
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
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
  }, [isAuthenticated, authLoading, toast]);

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-background" data-testid="loading-state">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="animate-pulse">
                    <div className="h-4 bg-muted rounded w-3/4 mb-4" />
                    <div className="h-8 bg-muted rounded w-1/2 mb-4" />
                    <div className="space-y-2">
                      <div className="h-3 bg-muted rounded" />
                      <div className="h-3 bg-muted rounded w-5/6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    if (isUnauthorizedError(error as Error)) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return null;
    }

    return (
      <div className="min-h-screen bg-background" data-testid="error-state">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card>
            <CardContent className="p-6 text-center">
              <h2 className="text-2xl font-bold text-destructive mb-4">Error Loading Dashboard</h2>
              <p className="text-muted-foreground">
                {(error as Error).message || "Failed to load dashboard data"}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const user = dashboardData?.user;
  const recommendations = dashboardData?.recommendations || [];
  const upcomingEvents = dashboardData?.upcomingEvents || [];
  const personalizedAdvice = dashboardData?.personalizedAdvice;
  const assessmentProgress = dashboardData?.assessmentProgress || 0;

  return (
    <div className="min-h-screen bg-background" data-testid="home-page">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2" data-testid="welcome-message">
            Welcome back, {user?.firstName || 'Student'}! 👋
          </h1>
          <p className="text-muted-foreground">
            Here's your personalized education dashboard with insights and recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Assessment Progress Card */}
          <Card data-testid="assessment-progress-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                Assessment Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center mb-4">
                <div className="relative w-24 h-24">
                  <div 
                    className={`progress-circle w-full h-full rounded-full flex items-center justify-center`}
                    style={{
                      background: assessmentProgress > 0 
                        ? `conic-gradient(hsl(221, 83%, 53%) ${assessmentProgress}%, hsl(214, 32%, 91%) 0%)`
                        : 'hsl(214, 32%, 91%)'
                    }}
                  >
                    <div className="bg-card w-16 h-16 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary" data-testid="progress-percentage">
                        {assessmentProgress}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground text-center mb-4">
                {assessmentProgress === 100 
                  ? "Assessment completed! View your results."
                  : "Complete your aptitude assessment to get personalized recommendations"
                }
              </p>
              <Button asChild className="w-full" data-testid="continue-assessment-button">
                <Link href="/assessment">
                  {assessmentProgress === 100 ? "View Results" : "Continue Assessment"}
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Timeline Card */}
          <Card data-testid="timeline-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-accent" />
                Important Deadlines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.length > 0 ? (
                  upcomingEvents.slice(0, 3).map((event, index) => (
                    <div key={event.id || index} className="flex items-start space-x-3" data-testid={`timeline-event-${index}`}>
                      <div className="w-2 h-2 bg-accent rounded-full mt-2" />
                      <div className="flex-1">
                        <div className="font-medium text-sm">{event.title}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(event.eventDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No upcoming events available
                  </p>
                )}
              </div>
              <Button variant="outline" className="w-full mt-4" data-testid="view-all-deadlines-button">
                View All Deadlines
              </Button>
            </CardContent>
          </Card>

          {/* AI Recommendations Card */}
          <Card data-testid="recommendations-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-secondary" />
                AI Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendations.length > 0 ? (
                  recommendations.map((rec, index) => (
                    <div 
                      key={rec.id || index} 
                      className="p-3 bg-secondary/10 rounded-lg"
                      data-testid={`recommendation-${index}`}
                    >
                      <div className="font-medium text-sm text-secondary flex items-center gap-2">
                        {rec.recommendationType === 'stream' && <Target className="h-3 w-3" />}
                        {rec.recommendationType === 'college' && <MapPin className="h-3 w-3" />}
                        {rec.recommendationType === 'course' && <BookOpen className="h-3 w-3" />}
                        {rec.recommendationType || 'Recommendation'}
                      </div>
                      <div className="text-sm">{rec.recommendedItem}</div>
                      {rec.confidence && (
                        <Badge variant="outline" className="text-xs mt-1">
                          {Math.round(parseFloat(rec.confidence) * 100)}% confidence
                        </Badge>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Complete your assessment to get AI-powered recommendations
                  </p>
                )}
              </div>
              <div className="mt-4 text-xs text-muted-foreground text-center">
                Powered by advanced AI analysis of your assessment results
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Personalized Advice Section */}
        {personalizedAdvice && (
          <Card className="mt-8" data-testid="personalized-advice-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Your Personalized Guidance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Our Advice for You</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {personalizedAdvice.advice}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Next Steps to Take</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {personalizedAdvice.next_steps?.map((step, index) => (
                      <div 
                        key={index} 
                        className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg"
                        data-testid={`next-step-${index}`}
                      >
                        <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                          {index + 1}
                        </div>
                        <p className="text-sm">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button asChild variant="outline" className="h-auto p-6 flex flex-col gap-2" data-testid="explore-colleges-quick">
            <Link href="/colleges">
              <MapPin className="h-8 w-8 text-secondary" />
              <span className="font-semibold">Explore Colleges</span>
              <span className="text-xs text-muted-foreground">Find government colleges near you</span>
            </Link>
          </Button>

          <Button asChild variant="outline" className="h-auto p-6 flex flex-col gap-2" data-testid="career-paths-quick">
            <Link href="/career-paths">
              <TrendingUp className="h-8 w-8 text-accent" />
              <span className="font-semibold">Career Paths</span>
              <span className="text-xs text-muted-foreground">Visualize your career journey</span>
            </Link>
          </Button>

          <Button asChild variant="outline" className="h-auto p-6 flex flex-col gap-2" data-testid="assessment-quick">
            <Link href="/assessment">
              <Brain className="h-8 w-8 text-primary" />
              <span className="font-semibold">Take Assessment</span>
              <span className="text-xs text-muted-foreground">Discover your aptitude & interests</span>
            </Link>
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
