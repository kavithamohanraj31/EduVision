import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  MapPin, 
  Phone, 
  Mail, 
  ExternalLink, 
  BookOpen, 
  Building2,
  Star,
  DollarSign,
  Users
} from "lucide-react";
import type { College } from "@shared/schema";

interface CollegeCardProps {
  college: College;
}

export default function CollegeCard({ college }: CollegeCardProps) {
  const formatCourses = (courses: string[] | null) => {
    if (!courses || courses.length === 0) return "No courses listed";
    if (courses.length <= 3) return courses.join(", ");
    return `${courses.slice(0, 3).join(", ")} +${courses.length - 3} more`;
  };

  const formatFacilities = (facilities: string[] | null) => {
    if (!facilities || facilities.length === 0) return [];
    return facilities.slice(0, 4); // Show first 4 facilities
  };

  const getDistance = () => {
    // This would be calculated based on user location
    // For now, we'll show a placeholder
    return "2.4 km";
  };

  return (
    <Card className="card-hover h-full flex flex-col" data-testid={`college-card-${college.id}`}>
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-lg leading-tight">{college.name}</CardTitle>
          <Badge variant="outline" className="text-xs flex-shrink-0">
            {getDistance()}
          </Badge>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3 w-3" />
          <span>{college.city}, {college.state}</span>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        {/* Type Badge */}
        <div className="mb-4">
          <Badge variant="secondary" className="text-xs">
            {college.type} College
          </Badge>
        </div>

        {/* Courses */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="h-4 w-4 text-secondary" />
            <span className="text-sm font-medium">Available Courses</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {formatCourses(college.courses)}
          </p>
        </div>

        {/* Facilities */}
        {college.facilities && college.facilities.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium">Facilities</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {formatFacilities(college.facilities).map((facility, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {facility}
                </Badge>
              ))}
              {college.facilities.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{college.facilities.length - 4} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Quick Info */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-xs">
          {college.cutoffs && (
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 text-primary" />
              <span className="text-muted-foreground">Cutoffs available</span>
            </div>
          )}
          {college.fees && (
            <div className="flex items-center gap-1">
              <DollarSign className="h-3 w-3 text-accent" />
              <span className="text-muted-foreground">Fee structure</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-auto space-y-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full" data-testid={`view-details-${college.id}`}>
                View Details
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-start justify-between">
                  <span className="pr-4">{college.name}</span>
                  <Badge variant="secondary">{college.type}</Badge>
                </DialogTitle>
                <DialogDescription className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {college.location || `${college.city}, ${college.state}`}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Contact Information */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Contact Information
                  </h4>
                  <div className="space-y-2 text-sm">
                    {college.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        <a href={`tel:${college.phone}`} className="hover:text-primary">
                          {college.phone}
                        </a>
                      </div>
                    )}
                    {college.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <a href={`mailto:${college.email}`} className="hover:text-primary">
                          {college.email}
                        </a>
                      </div>
                    )}
                    {college.website && (
                      <div className="flex items-center gap-2">
                        <ExternalLink className="h-3 w-3 text-muted-foreground" />
                        <a 
                          href={college.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:text-primary"
                        >
                          Official Website
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Detailed Courses */}
                {college.courses && college.courses.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      Available Courses
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {college.courses.map((course, index) => (
                        <Badge key={index} variant="secondary">
                          {course}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* All Facilities */}
                {college.facilities && college.facilities.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      Campus Facilities
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {college.facilities.map((facility, index) => (
                        <Badge key={index} variant="outline">
                          {facility}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Cutoffs */}
                {college.cutoffs && (
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      Admission Cutoffs
                    </h4>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        Cutoff information varies by course and category. Contact the college for specific details.
                      </p>
                    </div>
                  </div>
                )}

                {/* Fee Structure */}
                {college.fees && (
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      Fee Structure
                    </h4>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        Fee structure varies by course. Contact the college for detailed fee information.
                      </p>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4 border-t">
                  {college.website && (
                    <Button asChild className="flex-1">
                      <a 
                        href={college.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        data-testid={`visit-website-${college.id}`}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Visit Website
                      </a>
                    </Button>
                  )}
                  {college.phone && (
                    <Button variant="outline" asChild className="flex-1">
                      <a href={`tel:${college.phone}`} data-testid={`call-college-${college.id}`}>
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {college.website && (
            <Button asChild variant="secondary" size="sm" className="w-full">
              <a 
                href={college.website} 
                target="_blank" 
                rel="noopener noreferrer"
                data-testid={`quick-visit-${college.id}`}
              >
                <ExternalLink className="h-3 w-3 mr-2" />
                Visit Website
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
