import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CareerPathVisualization from "@/components/career-path-visualization";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  Route, 
  TrendingUp, 
  BookOpen, 
  Briefcase, 
  DollarSign,
  Users,
  Building,
  Lightbulb,
  Target
} from "lucide-react";
import type { CareerPath } from "@shared/schema";

interface CareerAnalysis {
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

export default function CareerPaths() {
  const { toast } = useToast();
  const [selectedStream, setSelectedStream] = useState<string>("");
  const [selectedDegree, setSelectedDegree] = useState<string>("");
  const [analysisData, setAnalysisData] = useState<CareerAnalysis | null>(null);

  // Fetch career paths
  const { data: careerPaths, isLoading, error } = useQuery<CareerPath[]>({
    queryKey: ["/api/career-paths", { 
      stream: selectedStream || undefined,
      degree: selectedDegree || undefined
    }],
    retry: false,
  });

  // Career analysis mutation
  const analyzeCareerMutation = useMutation({
    mutationFn: async ({ degree, stream }: { degree: string; stream: string }) => {
      const response = await apiRequest("POST", "/api/career-paths/analyze", { degree, stream });
      return response.json();
    },
    onSuccess: (data) => {
      setAnalysisData(data);
    },
    onError: (error) => {
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze career path. Please try again.",
        variant: "destructive",
      });
    },
  });

  const streams = ["Science", "Commerce", "Arts", "Vocational"];
  const degreesByStream: Record<string, string[]> = {
    Science: ["B.Sc. Computer Science", "B.Sc. Physics", "B.Sc. Chemistry", "B.Sc. Mathematics", "B.Sc. Biology", "B.Tech", "B.E.", "MBBS", "B.Pharmacy"],
    Commerce: ["B.Com", "BBA", "B.Com (Hons)", "BCA", "B.A. Economics"],
    Arts: ["B.A. English", "B.A. History", "B.A. Psychology", "B.A. Sociology", "B.A. Political Science", "B.A. Philosophy", "BFA", "B.A. Journalism"],
    Vocational: ["Diploma in Engineering", "ITI Courses", "Polytechnic", "Certificate Courses"]
  };

  const handleAnalyze = () => {
    if (selectedDegree && selectedStream) {
      analyzeCareerMutation.mutate({ degree: selectedDegree, stream: selectedStream });
    }
  };

  return (
    <div className="min-h-screen bg-background" data-testid="career-paths-page">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Career Path Visualization
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore detailed career opportunities, salary ranges, and growth prospects for different degree programs and streams.
          </p>
        </div>

        {/* Stream and Degree Selection */}
        <Card className="mb-8" data-testid="selection-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Select Your Academic Path
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Stream</label>
                <Select
                  value={selectedStream}
                  onValueChange={(value) => {
                    setSelectedStream(value);
                    setSelectedDegree(""); // Reset degree when stream changes
                    setAnalysisData(null); // Clear analysis
                  }}
                >
                  <SelectTrigger data-testid="stream-select">
                    <SelectValue placeholder="Select stream" />
                  </SelectTrigger>
                  <SelectContent>
                    {streams.map((stream) => (
                      <SelectItem key={stream} value={stream}>
                        {stream}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Degree Program</label>
                <Select
                  value={selectedDegree}
                  onValueChange={(value) => {
                    setSelectedDegree(value);
                    setAnalysisData(null); // Clear analysis
                  }}
                  disabled={!selectedStream}
                >
                  <SelectTrigger data-testid="degree-select">
                    <SelectValue placeholder="Select degree" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedStream && degreesByStream[selectedStream]?.map((degree) => (
                      <SelectItem key={degree} value={degree}>
                        {degree}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              onClick={handleAnalyze}
              disabled={!selectedDegree || !selectedStream || analyzeCareerMutation.isPending}
              className="w-full md:w-auto"
              data-testid="analyze-button"
            >
              {analyzeCareerMutation.isPending ? "Analyzing..." : "Get AI-Powered Career Analysis"}
            </Button>
          </CardContent>
        </Card>

        {/* AI Career Analysis Results */}
        {analysisData && (
          <Card className="mb-8" data-testid="analysis-results">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                AI Career Analysis: {analysisData.career_title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="skills">Skills</TabsTrigger>
                  <TabsTrigger value="opportunities">Jobs</TabsTrigger>
                  <TabsTrigger value="entrepreneurship">Business</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <DollarSign className="h-5 w-5 text-accent" />
                          <h4 className="font-semibold">Salary Range</h4>
                        </div>
                        <p className="text-2xl font-bold text-accent">{analysisData.salary_range}</p>
                        <p className="text-sm text-muted-foreground mt-2">Expected starting salary in India</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <TrendingUp className="h-5 w-5 text-secondary" />
                          <h4 className="font-semibold">Growth Prospects</h4>
                        </div>
                        <p className="text-sm leading-relaxed">{analysisData.growth_prospects}</p>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <BookOpen className="h-5 w-5 text-primary" />
                        <h4 className="font-semibold">Career Description</h4>
                      </div>
                      <p className="leading-relaxed">{analysisData.description}</p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="skills" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardContent className="p-6">
                        <h4 className="font-semibold mb-4">Required Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {analysisData.required_skills.map((skill, index) => (
                            <Badge key={index} variant="secondary" data-testid={`skill-${index}`}>
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <h4 className="font-semibold mb-4">Industry Areas</h4>
                        <div className="flex flex-wrap gap-2">
                          {analysisData.industry_areas.map((area, index) => (
                            <Badge key={index} variant="outline" data-testid={`industry-${index}`}>
                              {area}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="opportunities" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <Building className="h-5 w-5 text-primary" />
                          <h4 className="font-semibold">Government Jobs</h4>
                        </div>
                        <ul className="space-y-2">
                          {analysisData.government_jobs.map((job, index) => (
                            <li key={index} className="text-sm flex items-start gap-2" data-testid={`gov-job-${index}`}>
                              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                              {job}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <Briefcase className="h-5 w-5 text-secondary" />
                          <h4 className="font-semibold">Private Sector</h4>
                        </div>
                        <ul className="space-y-2">
                          {analysisData.private_jobs.map((job, index) => (
                            <li key={index} className="text-sm flex items-start gap-2" data-testid={`private-job-${index}`}>
                              <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 flex-shrink-0" />
                              {job}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="entrepreneurship" className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Lightbulb className="h-5 w-5 text-accent" />
                        <h4 className="font-semibold">Entrepreneurial Opportunities</h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {analysisData.entrepreneurial_options.map((option, index) => (
                          <div key={index} className="p-4 border border-border rounded-lg" data-testid={`entrepreneur-option-${index}`}>
                            <div className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                              <p className="text-sm">{option}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}

        {/* Career Path Visualization */}
        {selectedStream && (
          <CareerPathVisualization 
            stream={selectedStream} 
            degree={selectedDegree} 
            careerPaths={careerPaths || []}
            isLoading={isLoading}
          />
        )}

        {/* Career Paths List */}
        {careerPaths && careerPaths.length > 0 && (
          <Card className="mt-8" data-testid="career-paths-list">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Route className="h-5 w-5" />
                Available Career Paths
                {selectedStream && <Badge variant="secondary">{selectedStream}</Badge>}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {careerPaths.map((path) => (
                  <Card key={path.id} className="card-hover" data-testid={`career-path-${path.id}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Briefcase className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1">{path.careerTitle}</h4>
                          <div className="flex gap-2 mb-2">
                            <Badge variant="outline" className="text-xs">{path.degree}</Badge>
                            <Badge variant="secondary" className="text-xs">{path.stream}</Badge>
                          </div>
                        </div>
                      </div>
                      
                      {path.description && (
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                          {path.description}
                        </p>
                      )}

                      {path.salaryRange && (
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="h-4 w-4 text-accent" />
                          <span className="text-sm font-medium">{path.salaryRange}</span>
                        </div>
                      )}

                      {path.requiredSkills && path.requiredSkills.length > 0 && (
                        <div className="mb-4">
                          <p className="text-xs font-medium text-muted-foreground mb-2">Key Skills:</p>
                          <div className="flex flex-wrap gap-1">
                            {path.requiredSkills.slice(0, 3).map((skill, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {path.requiredSkills.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{path.requiredSkills.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}

                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => {
                          setSelectedDegree(path.degree);
                          setSelectedStream(path.stream);
                          analyzeCareerMutation.mutate({ degree: path.degree, stream: path.stream });
                        }}
                        data-testid={`analyze-path-${path.id}`}
                      >
                        Analyze This Path
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" data-testid="loading-state">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="animate-pulse space-y-4">
                    <div className="h-6 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                    <div className="space-y-2">
                      <div className="h-3 bg-muted rounded" />
                      <div className="h-3 bg-muted rounded w-5/6" />
                    </div>
                    <div className="flex gap-2">
                      <div className="h-6 bg-muted rounded w-16" />
                      <div className="h-6 bg-muted rounded w-20" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <Card data-testid="error-state">
            <CardContent className="p-8 text-center">
              <Route className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Error Loading Career Paths</h3>
              <p className="text-muted-foreground">
                {(error as Error).message || "Failed to load career path data"}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Info Section */}
        <Card className="mt-12 bg-muted/50" data-testid="info-section">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">AI-Powered Analysis</h4>
                <p className="text-sm text-muted-foreground">
                  Get detailed career insights powered by advanced AI analysis of current market trends.
                </p>
              </div>
              <div>
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-secondary" />
                </div>
                <h4 className="font-semibold mb-2">Real Market Data</h4>
                <p className="text-sm text-muted-foreground">
                  Salary ranges and job opportunities based on current Indian job market conditions.
                </p>
              </div>
              <div>
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Route className="h-6 w-6 text-accent" />
                </div>
                <h4 className="font-semibold mb-2">Comprehensive Pathways</h4>
                <p className="text-sm text-muted-foreground">
                  Explore government jobs, private sector opportunities, and entrepreneurial options.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
