import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Building, 
  Users, 
  Briefcase, 
  GraduationCap,
  ArrowRight,
  DollarSign,
  Target,
  BookOpen
} from "lucide-react";
import type { CareerPath } from "@shared/schema";

interface CareerPathVisualizationProps {
  stream: string;
  degree?: string;
  careerPaths: CareerPath[];
  isLoading?: boolean;
}

export default function CareerPathVisualization({
  stream,
  degree,
  careerPaths,
  isLoading = false,
}: CareerPathVisualizationProps) {
  // Group career paths by degree if no specific degree is selected
  const groupedPaths = degree 
    ? { [degree]: careerPaths.filter(path => path.degree === degree) }
    : careerPaths.reduce((acc, path) => {
        if (!acc[path.degree]) acc[path.degree] = [];
        acc[path.degree].push(path);
        return acc;
      }, {} as Record<string, CareerPath[]>);

  const getStreamColor = (stream: string) => {
    switch (stream.toLowerCase()) {
      case 'science':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'commerce':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'arts':
        return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'vocational':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getOpportunityIcon = (type: string) => {
    switch (type) {
      case 'government':
        return <Building className="h-4 w-4" />;
      case 'private':
        return <Briefcase className="h-4 w-4" />;
      case 'entrepreneurial':
        return <TrendingUp className="h-4 w-4" />;
      default:
        return <Users className="h-4 w-4" />;
    }
  };

  if (isLoading) {
    return (
      <Card data-testid="visualization-loading">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Career Path Visualization
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-6 bg-muted rounded w-1/3 mb-4" />
                <div className="space-y-4">
                  <div className="h-20 bg-muted rounded" />
                  <div className="h-16 bg-muted rounded" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (Object.keys(groupedPaths).length === 0) {
    return (
      <Card data-testid="visualization-empty">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Career Path Visualization
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Career Paths Available</h3>
            <p className="text-muted-foreground">
              No career path data is available for the selected stream and degree combination.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card data-testid="career-path-visualization">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Career Path Visualization
          <Badge variant="secondary" className={getStreamColor(stream)}>
            {stream}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {Object.entries(groupedPaths).map(([degreeTitle, paths]) => (
            <div key={degreeTitle} className="space-y-6" data-testid={`degree-section-${degreeTitle}`}>
              {/* Degree Header */}
              <div className="flex items-center gap-3 pb-4 border-b">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{degreeTitle}</h3>
                  <p className="text-sm text-muted-foreground">
                    {paths.length} career {paths.length === 1 ? 'path' : 'paths'} available
                  </p>
                </div>
              </div>

              {/* Career Paths Flow */}
              <div className="space-y-6">
                {paths.map((path, pathIndex) => (
                  <div key={path.id} className="relative" data-testid={`career-path-${path.id}`}>
                    {/* Main Career Card */}
                    <Card className="border-l-4 border-l-primary">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold mb-2">{path.careerTitle}</h4>
                            {path.description && (
                              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                                {path.description}
                              </p>
                            )}
                            
                            {/* Salary and Growth */}
                            <div className="flex flex-wrap gap-4 mb-4">
                              {path.salaryRange && (
                                <div className="flex items-center gap-2">
                                  <DollarSign className="h-4 w-4 text-accent" />
                                  <span className="text-sm font-medium">{path.salaryRange}</span>
                                </div>
                              )}
                              {path.growthProspects && (
                                <div className="flex items-center gap-2">
                                  <TrendingUp className="h-4 w-4 text-secondary" />
                                  <span className="text-sm">Good growth prospects</span>
                                </div>
                              )}
                            </div>

                            {/* Required Skills */}
                            {path.requiredSkills && path.requiredSkills.length > 0 && (
                              <div className="mb-4">
                                <p className="text-xs font-medium text-muted-foreground mb-2">Required Skills:</p>
                                <div className="flex flex-wrap gap-1">
                                  {path.requiredSkills.slice(0, 5).map((skill, index) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                      {skill}
                                    </Badge>
                                  ))}
                                  {path.requiredSkills.length > 5 && (
                                    <Badge variant="outline" className="text-xs">
                                      +{path.requiredSkills.length - 5} more
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Opportunity Branches */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {/* Government Jobs */}
                          {path.governmentJobs && path.governmentJobs.length > 0 && (
                            <Card className="bg-primary/5 border-primary/20">
                              <CardContent className="p-4">
                                <div className="flex items-center gap-2 mb-3">
                                  <Building className="h-4 w-4 text-primary" />
                                  <span className="font-medium text-sm">Government Sector</span>
                                </div>
                                <ul className="space-y-1">
                                  {path.governmentJobs.slice(0, 3).map((job, index) => (
                                    <li key={index} className="text-xs text-muted-foreground flex items-start gap-2">
                                      <ArrowRight className="h-3 w-3 mt-0.5 flex-shrink-0 text-primary" />
                                      {job}
                                    </li>
                                  ))}
                                  {path.governmentJobs.length > 3 && (
                                    <li className="text-xs text-primary font-medium">
                                      +{path.governmentJobs.length - 3} more opportunities
                                    </li>
                                  )}
                                </ul>
                              </CardContent>
                            </Card>
                          )}

                          {/* Private Jobs */}
                          {path.privateJobs && path.privateJobs.length > 0 && (
                            <Card className="bg-secondary/5 border-secondary/20">
                              <CardContent className="p-4">
                                <div className="flex items-center gap-2 mb-3">
                                  <Briefcase className="h-4 w-4 text-secondary" />
                                  <span className="font-medium text-sm">Private Sector</span>
                                </div>
                                <ul className="space-y-1">
                                  {path.privateJobs.slice(0, 3).map((job, index) => (
                                    <li key={index} className="text-xs text-muted-foreground flex items-start gap-2">
                                      <ArrowRight className="h-3 w-3 mt-0.5 flex-shrink-0 text-secondary" />
                                      {job}
                                    </li>
                                  ))}
                                  {path.privateJobs.length > 3 && (
                                    <li className="text-xs text-secondary font-medium">
                                      +{path.privateJobs.length - 3} more opportunities
                                    </li>
                                  )}
                                </ul>
                              </CardContent>
                            </Card>
                          )}

                          {/* Entrepreneurial Options */}
                          {path.entrepreneurialOptions && path.entrepreneurialOptions.length > 0 && (
                            <Card className="bg-accent/5 border-accent/20">
                              <CardContent className="p-4">
                                <div className="flex items-center gap-2 mb-3">
                                  <TrendingUp className="h-4 w-4 text-accent" />
                                  <span className="font-medium text-sm">Entrepreneurship</span>
                                </div>
                                <ul className="space-y-1">
                                  {path.entrepreneurialOptions.slice(0, 3).map((option, index) => (
                                    <li key={index} className="text-xs text-muted-foreground flex items-start gap-2">
                                      <ArrowRight className="h-3 w-3 mt-0.5 flex-shrink-0 text-accent" />
                                      {option}
                                    </li>
                                  ))}
                                  {path.entrepreneurialOptions.length > 3 && (
                                    <li className="text-xs text-accent font-medium">
                                      +{path.entrepreneurialOptions.length - 3} more options
                                    </li>
                                  )}
                                </ul>
                              </CardContent>
                            </Card>
                          )}
                        </div>

                        {/* Higher Education Paths */}
                        {path.higherEducationPaths && path.higherEducationPaths.length > 0 && (
                          <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <GraduationCap className="h-4 w-4 text-primary" />
                              <span className="font-medium text-sm">Higher Education Options</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {path.higherEducationPaths.map((option, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {option}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Connection Line to Next Path */}
                    {pathIndex < paths.length - 1 && (
                      <div className="flex justify-center py-4">
                        <div className="w-px h-8 bg-border" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Summary Card */}
        <Card className="mt-8 bg-gradient-to-r from-primary/5 to-secondary/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Target className="h-5 w-5 text-primary" />
              <h4 className="font-semibold">Career Path Summary</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">
                  {Object.values(groupedPaths).flat().length}
                </div>
                <div className="text-sm text-muted-foreground">Career Options</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary">
                  {Object.keys(groupedPaths).length}
                </div>
                <div className="text-sm text-muted-foreground">Degree Programs</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">
                  {Object.values(groupedPaths)
                    .flat()
                    .reduce((acc, path) => {
                      const total = (path.governmentJobs?.length || 0) + 
                                   (path.privateJobs?.length || 0) + 
                                   (path.entrepreneurialOptions?.length || 0);
                      return acc + total;
                    }, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Job Opportunities</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
