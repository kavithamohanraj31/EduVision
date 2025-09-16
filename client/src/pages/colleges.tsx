import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Search, Filter, MapPin, University, GraduationCap, DollarSign, Users, BookOpen, Award, Loader2 } from "lucide-react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";

// Define the College interface based on Firebase data structure
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

export default function Colleges() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedCourse, setSelectedCourse] = useState<string>("all");

  // Fetch colleges from Firebase
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        setLoading(true);
        setError(null);
        
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
      } catch (err) {
        console.error("Error fetching colleges:", err);
        setError("Failed to load colleges. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, []);

  // Get unique states, types, and courses for filters
  const states = ["all", ...new Set(colleges.map(college => college.state).filter(Boolean))];
  const types = ["all", ...new Set(colleges.map(college => college.type).filter(Boolean))];
  const courses = ["all", ...new Set(colleges.flatMap(college => college.coursesOffered || []).filter(Boolean))];

  // Filter colleges based on search and filters
  const filteredColleges = colleges.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (college.district && college.district.toLowerCase().includes(searchQuery.toLowerCase())) ||
                         (college.coursesOffered && college.coursesOffered.some(course => course.toLowerCase().includes(searchQuery.toLowerCase())));
    
    const matchesState = selectedState === "all" || college.state === selectedState;
    const matchesType = selectedType === "all" || college.type === selectedType;
    const matchesCourse = selectedCourse === "all" || (college.coursesOffered && college.coursesOffered.some(course => course === selectedCourse));

    return matchesSearch && matchesState && matchesType && matchesCourse;
  });

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedState("all");
    setSelectedType("all");
    setSelectedCourse("all");
  };

  // Loading skeleton component
  const CollegeCardSkeleton = () => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-4 w-12" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/3" />
          <div className="grid grid-cols-2 gap-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/3" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-16" />
          </div>
        </div>
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              College Directory
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Loading colleges from our database...
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <CollegeCardSkeleton key={i} />
            ))}
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              College Directory
            </h1>
            <Card className="max-w-md mx-auto">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Loader2 className="h-6 w-6 text-destructive" />
                </div>
                <h3 className="font-semibold mb-2">Error Loading Colleges</h3>
                <p className="text-sm text-muted-foreground mb-4">{error}</p>
                <Button onClick={() => window.location.reload()}>
                  Try Again
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            College Directory
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover colleges from Tamil Nadu with detailed information about courses, cutoffs, fees, and facilities.
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Find Your Perfect College
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Search Bar */}
              <div className="space-y-2">
                <Label htmlFor="search">Search Colleges</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      type="text"
                      placeholder="Search by college name, district, or course..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>State</Label>
                  <Select value={selectedState} onValueChange={setSelectedState}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {states.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state === "all" ? "All States" : state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {types.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type === "all" ? "All Types" : type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Course</Label>
                  <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.slice(0, 20).map((course) => (
                        <SelectItem key={course} value={course}>
                          {course === "all" ? "All Courses" : course}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Active Filters */}
              {(selectedState !== "all" || selectedType !== "all" || selectedCourse !== "all" || searchQuery) && (
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-sm font-medium">Active filters:</span>
                  {selectedState !== "all" && (
                    <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedState("all")}>
                      State: {selectedState} ×
                    </Badge>
                  )}
                  {selectedType !== "all" && (
                    <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedType("all")}>
                      Type: {selectedType} ×
                    </Badge>
                  )}
                  {selectedCourse !== "all" && (
                    <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedCourse("all")}>
                      Course: {selectedCourse} ×
                    </Badge>
                  )}
                  {searchQuery && (
                    <Badge variant="secondary" className="cursor-pointer" onClick={() => setSearchQuery("")}>
                      Search: {searchQuery} ×
                    </Badge>
                  )}
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear all
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <p className="text-muted-foreground">
              {filteredColleges.length} colleges found
              {searchQuery && ` for "${searchQuery}"`}
            </p>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Showing college information from Tamil Nadu
              </span>
            </div>
          </div>
        </div>

        {/* College Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {filteredColleges.map((college) => (
            <Card key={college.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl mb-2">{college.name}</CardTitle>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{college.district || 'Tamil Nadu'}, {college.state || 'Tamil Nadu'}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge variant={college.type === "Public" ? "default" : "secondary"}>
                      {college.type || 'College'}
                    </Badge>
                    {college.scholarshipAvailable && (
                    <div className="flex items-center gap-1">
                      <Award className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium">Scholarship Available</span>
                    </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {college.cutoff && (
                  <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-muted-foreground" />
                      <span>Cutoff: {college.cutoff}%</span>
                    </div>
                  )}
                  {college.seats && (
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{college.seats} seats</span>
                    </div>
                  )}
                </div>

                {/* Fees */}
                {college.fees && (
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Annual Fees
                  </h4>
                    <div className="text-sm">
                      <span className="font-medium">₹{college.fees.toLocaleString()}</span>
                      </div>
                  </div>
                )}

                {/* Courses */}
                {college.coursesOffered && college.coursesOffered.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                      Available Courses
                  </h4>
                  <div className="flex flex-wrap gap-1">
                      {college.coursesOffered.slice(0, 4).map((course, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
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

                {/* Scholarship Info */}
                {college.scholarshipAvailable && (
                <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      Scholarship Information
                    </h4>
                    <div className="text-sm text-green-600">
                      <span className="font-medium">Scholarship opportunities available</span>
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <div className="pt-4 border-t">
                  <Button variant="outline" className="w-full" disabled>
                    Contact College for More Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Section */}
        <Card className="bg-muted/50">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <University className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">Comprehensive Information</h4>
                <p className="text-sm text-muted-foreground">
                  Detailed information about cutoffs, fees, courses, and facilities for each college.
                </p>
              </div>
              <div>
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-6 w-6 text-secondary" />
                </div>
                <h4 className="font-semibold mb-2">Location-Based Search</h4>
                <p className="text-sm text-muted-foreground">
                  Find colleges by district, state, or specific location with easy filtering options.
                </p>
              </div>
              <div>
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="h-6 w-6 text-accent" />
                </div>
                <h4 className="font-semibold mb-2">Advanced Filtering</h4>
                <p className="text-sm text-muted-foreground">
                  Filter by course type, college type, and other criteria to find your perfect match.
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