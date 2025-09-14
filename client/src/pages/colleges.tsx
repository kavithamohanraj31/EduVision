import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Search, Filter, MapPin, University, GraduationCap, DollarSign, Users, BookOpen, Award } from "lucide-react";

// Comprehensive college data with all details
const collegesData = [
  {
    id: "1",
    name: "Indian Institute of Technology Delhi",
    location: "New Delhi",
    state: "Delhi",
    type: "Public",
    established: "1961",
    website: "https://www.iitd.ac.in",
    courses: [
      "B.Tech Computer Science Engineering",
      "B.Tech Mechanical Engineering", 
      "B.Tech Electrical Engineering",
      "B.Tech Civil Engineering",
      "B.Tech Chemical Engineering",
      "B.Tech Aerospace Engineering",
      "M.Tech Computer Science",
      "M.Tech Data Science",
      "PhD in Engineering"
    ],
    cutoffs: {
      general: 95.5,
      obc: 92.0,
      sc: 85.0,
      st: 80.0,
      ews: 90.0
    },
    fees: {
      btech: 250000,
      mtech: 200000,
      phd: 50000
    },
    facilities: [
      "24/7 Library",
      "Hostel Accommodation", 
      "Sports Complex",
      "Research Labs",
      "Cafeteria",
      "Medical Center",
      "WiFi Campus",
      "Transportation"
    ],
    placement: {
      averagePackage: "15-25 LPA",
      highestPackage: "50+ LPA",
      topRecruiters: ["Google", "Microsoft", "Amazon", "Apple", "Goldman Sachs"]
    },
    rating: 4.8,
    totalStudents: 8000
  },
  {
    id: "2", 
    name: "All India Institute of Medical Sciences",
    location: "New Delhi",
    state: "Delhi",
    type: "Public",
    established: "1956",
    website: "https://www.aiims.edu",
    courses: [
      "MBBS",
      "MD in Internal Medicine",
      "MD in Pediatrics", 
      "MD in Surgery",
      "MS in Orthopedics",
      "MCh in Neurosurgery",
      "DM in Cardiology",
      "PhD in Medical Sciences"
    ],
    cutoffs: {
      general: 99.5,
      obc: 98.0,
      sc: 96.0,
      st: 94.0,
      ews: 97.5
    },
    fees: {
      mbbs: 25000,
      md: 50000,
      ms: 50000,
      phd: 30000
    },
    facilities: [
      "Super Specialty Hospital",
      "Research Institute",
      "Library & Digital Resources",
      "Hostel for Students",
      "Cafeteria",
      "Sports Complex",
      "Auditorium",
      "Medical Equipment Labs"
    ],
    placement: {
      averagePackage: "12-20 LPA",
      highestPackage: "40+ LPA", 
      topRecruiters: ["AIIMS", "Apollo Hospitals", "Fortis Healthcare", "Max Healthcare", "Government Hospitals"]
    },
    rating: 4.9,
    totalStudents: 2500
  },
  {
    id: "3",
    name: "Delhi University",
    location: "New Delhi", 
    state: "Delhi",
    type: "Public",
    established: "1922",
    website: "https://www.du.ac.in",
    courses: [
      "B.A English Literature",
      "B.A Economics",
      "B.A History",
      "B.A Political Science",
      "B.Com",
      "B.Sc Mathematics",
      "B.Sc Physics",
      "B.Sc Chemistry",
      "B.Sc Computer Science",
      "M.A English",
      "M.A Economics",
      "M.Com",
      "M.Sc Mathematics"
    ],
    cutoffs: {
      general: 85.0,
      obc: 80.0,
      sc: 75.0,
      st: 70.0,
      ews: 82.0
    },
    fees: {
      ba: 35000,
      bcom: 35000,
      bsc: 40000,
      ma: 25000,
      mcom: 25000,
      msc: 30000
    },
    facilities: [
      "Central Library",
      "Hostel Facilities",
      "Sports Grounds",
      "Computer Labs",
      "Cafeteria",
      "Auditorium",
      "Research Centers",
      "Student Union"
    ],
    placement: {
      averagePackage: "4-8 LPA",
      highestPackage: "15+ LPA",
      topRecruiters: ["Government Jobs", "Banking Sector", "Education Sector", "Media Houses", "Corporate Sector"]
    },
    rating: 4.2,
    totalStudents: 150000
  },
  {
    id: "4",
    name: "St. Stephen's College",
    location: "New Delhi",
    state: "Delhi", 
    type: "Private",
    established: "1881",
    website: "https://www.ststephens.edu",
    courses: [
      "B.A English Literature",
      "B.A Economics",
      "B.A History",
      "B.A Philosophy",
      "B.A Mathematics",
      "B.Sc Physics",
      "B.Sc Chemistry",
      "B.Sc Mathematics",
      "M.A English",
      "M.A Economics"
    ],
    cutoffs: {
      general: 98.0,
      obc: 95.0,
      sc: 90.0,
      st: 85.0,
      ews: 96.0
    },
    fees: {
      ba: 55000,
      bsc: 60000,
      ma: 40000
    },
    facilities: [
      "Historic Library",
      "Hostel Accommodation",
      "Sports Facilities",
      "Chapel",
      "Cafeteria",
      "Computer Center",
      "Auditorium",
      "Garden Campus"
    ],
    placement: {
      averagePackage: "6-12 LPA",
      highestPackage: "25+ LPA",
      topRecruiters: ["Civil Services", "Banking", "Media", "Education", "Corporate Sector"]
    },
    rating: 4.6,
    totalStudents: 1200
  },
  {
    id: "5",
    name: "Indian Institute of Management Ahmedabad",
    location: "Ahmedabad",
    state: "Gujarat",
    type: "Public", 
    established: "1961",
    website: "https://www.iima.ac.in",
    courses: [
      "MBA",
      "PGP (Post Graduate Program)",
      "FPM (Fellow Program in Management)",
      "Executive MBA",
      "PGP-FABM (Food & Agribusiness)",
      "ePGP (Executive Post Graduate Program)"
    ],
    cutoffs: {
      general: 99.0,
      obc: 97.0,
      sc: 95.0,
      st: 92.0,
      ews: 98.0
    },
    fees: {
      mba: 2500000,
      pgp: 2500000,
      fpm: 1000000,
      executive: 3000000
    },
    facilities: [
      "World-class Library",
      "Hostel Accommodation",
      "Sports Complex",
      "Conference Halls",
      "Cafeteria",
      "Banking Services",
      "Medical Center",
      "Transportation"
    ],
    placement: {
      averagePackage: "25-35 LPA",
      highestPackage: "80+ LPA",
      topRecruiters: ["McKinsey", "BCG", "Bain", "Goldman Sachs", "JP Morgan", "Amazon", "Google"]
    },
    rating: 4.9,
    totalStudents: 1200
  },
  {
    id: "6",
    name: "Jadavpur University",
    location: "Kolkata",
    state: "West Bengal",
    type: "Public",
    established: "1955",
    website: "https://www.jaduniv.edu.in",
    courses: [
      "B.Tech Computer Science",
      "B.Tech Mechanical Engineering",
      "B.Tech Electrical Engineering",
      "B.A English",
      "B.A Bengali",
      "B.Sc Physics",
      "B.Sc Chemistry",
      "M.Tech Computer Science",
      "M.A English",
      "M.Sc Physics"
    ],
    cutoffs: {
      general: 88.0,
      obc: 83.0,
      sc: 78.0,
      st: 73.0,
      ews: 85.0
    },
    fees: {
      btech: 120000,
      ba: 25000,
      bsc: 30000,
      mtech: 100000,
      ma: 20000,
      msc: 25000
    },
    facilities: [
      "Central Library",
      "Hostel Facilities",
      "Sports Ground",
      "Computer Labs",
      "Cafeteria",
      "Auditorium",
      "Research Labs",
      "Student Activities Center"
    ],
    placement: {
      averagePackage: "6-15 LPA",
      highestPackage: "30+ LPA",
      topRecruiters: ["TCS", "Infosys", "Wipro", "Government Jobs", "Research Organizations"]
    },
    rating: 4.4,
    totalStudents: 15000
  }
];

export default function Colleges() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedCourse, setSelectedCourse] = useState<string>("all");

  // Get unique states and courses for filters
  const states = ["all", ...new Set(collegesData.map(college => college.state))];
  const types = ["all", ...new Set(collegesData.map(college => college.type))];
  const courses = ["all", ...new Set(collegesData.flatMap(college => college.courses))];

  // Filter colleges based on search and filters
  const filteredColleges = collegesData.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         college.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         college.courses.some(course => course.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesState = selectedState === "all" || college.state === selectedState;
    const matchesType = selectedType === "all" || college.type === selectedType;
    const matchesCourse = selectedCourse === "all" || college.courses.some(course => course === selectedCourse);

    return matchesSearch && matchesState && matchesType && matchesCourse;
  });

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedState("all");
    setSelectedType("all");
    setSelectedCourse("all");
  };

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
            Discover top colleges with detailed information about courses, cutoffs, fees, and facilities.
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
                      placeholder="Search by college name, location, or course..."
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
                Showing detailed college information
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
                      <span>{college.location}, {college.state}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge variant={college.type === "Public" ? "default" : "secondary"}>
                      {college.type}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Award className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium">{college.rating}/5</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <University className="h-4 w-4 text-muted-foreground" />
                    <span>Est. {college.established}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{college.totalStudents.toLocaleString()} students</span>
                  </div>
                </div>

                {/* Cutoffs */}
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    Cutoff Percentages
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span>General:</span>
                      <span className="font-medium">{college.cutoffs.general}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>OBC:</span>
                      <span className="font-medium">{college.cutoffs.obc}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>SC:</span>
                      <span className="font-medium">{college.cutoffs.sc}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ST:</span>
                      <span className="font-medium">{college.cutoffs.st}%</span>
                    </div>
                  </div>
                </div>

                {/* Fees */}
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Annual Fees
                  </h4>
                  <div className="space-y-1 text-sm">
                    {Object.entries(college.fees).map(([course, fee]) => (
                      <div key={course} className="flex justify-between">
                        <span className="capitalize">{course}:</span>
                        <span className="font-medium">₹{fee.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Courses */}
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Popular Courses
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {college.courses.slice(0, 4).map((course, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {course}
                      </Badge>
                    ))}
                    {college.courses.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{college.courses.length - 4} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Placement Info */}
                <div>
                  <h4 className="font-semibold mb-2">Placement Highlights</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Average Package:</span>
                      <span className="font-medium text-green-600">{college.placement.averagePackage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Highest Package:</span>
                      <span className="font-medium text-green-600">{college.placement.highestPackage}</span>
                    </div>
                  </div>
                </div>

                {/* Facilities */}
                <div>
                  <h4 className="font-semibold mb-2">Key Facilities</h4>
                  <div className="flex flex-wrap gap-1">
                    {college.facilities.slice(0, 6).map((facility, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {facility}
                      </Badge>
                    ))}
                    {college.facilities.length > 6 && (
                      <Badge variant="secondary" className="text-xs">
                        +{college.facilities.length - 6} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-4 border-t">
                  <Button asChild className="w-full">
                    <a href={college.website} target="_blank" rel="noopener noreferrer">
                      Visit Official Website
                    </a>
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
                  Find colleges by state, city, or specific location with easy filtering options.
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