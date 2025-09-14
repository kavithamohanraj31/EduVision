import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CollegeCard from "@/components/college-card";
import { Search, Filter, MapPin, University } from "lucide-react";
import type { College } from "@shared/schema";

export default function Colleges() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(0);
  const limit = 12;

  // Fetch colleges with filters
  const { data: colleges, isLoading, error, refetch } = useQuery<College[]>({
    queryKey: ["/api/colleges", { 
      state: selectedState || undefined,
      city: selectedCity || undefined,
      limit,
      offset: currentPage * limit
    }],
    retry: false,
  });

  // Search colleges by location
  const { data: searchResults, isLoading: searchLoading } = useQuery<College[]>({
    queryKey: ["/api/colleges/search", { location: searchQuery }],
    enabled: searchQuery.length > 2,
    retry: false,
  });

  const displayColleges = searchQuery.length > 2 ? searchResults : colleges;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.length > 2) {
      // Search query will automatically trigger due to enabled condition
    } else {
      refetch();
    }
  };

  const handleFilterChange = () => {
    setCurrentPage(0);
    refetch();
  };

  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
    "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
    "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttarakhand", "Uttar Pradesh",
    "West Bengal", "Delhi", "Jammu and Kashmir", "Ladakh"
  ];

  return (
    <div className="min-h-screen bg-background" data-testid="colleges-page">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Government College Directory
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover government colleges near you with detailed information about courses, facilities, and admission requirements.
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8" data-testid="search-filters-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Find Your Perfect College
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-6">
              {/* Location Search */}
              <div className="space-y-2">
                <Label htmlFor="search">Search by Location</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      type="text"
                      placeholder="Enter city, district, or college name..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                      data-testid="location-search-input"
                    />
                  </div>
                  <Button type="submit" data-testid="search-button">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* State and City Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="state">Filter by State</Label>
                  <Select
                    value={selectedState}
                    onValueChange={(value) => {
                      setSelectedState(value);
                      setSelectedCity(""); // Reset city when state changes
                      handleFilterChange();
                    }}
                  >
                    <SelectTrigger data-testid="state-filter">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All States</SelectItem>
                      {indianStates.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">Filter by City</Label>
                  <Input
                    id="city"
                    type="text"
                    placeholder="Enter city name..."
                    value={selectedCity}
                    onChange={(e) => {
                      setSelectedCity(e.target.value);
                      handleFilterChange();
                    }}
                    data-testid="city-filter-input"
                  />
                </div>
              </div>

              {/* Active Filters */}
              {(selectedState || selectedCity || searchQuery) && (
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-sm font-medium">Active filters:</span>
                  {selectedState && (
                    <Badge variant="secondary" className="cursor-pointer" onClick={() => {
                      setSelectedState("");
                      handleFilterChange();
                    }}>
                      State: {selectedState} ×
                    </Badge>
                  )}
                  {selectedCity && (
                    <Badge variant="secondary" className="cursor-pointer" onClick={() => {
                      setSelectedCity("");
                      handleFilterChange();
                    }}>
                      City: {selectedCity} ×
                    </Badge>
                  )}
                  {searchQuery && (
                    <Badge variant="secondary" className="cursor-pointer" onClick={() => setSearchQuery("")}>
                      Search: {searchQuery} ×
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedState("");
                      setSelectedCity("");
                      setCurrentPage(0);
                      refetch();
                    }}
                    data-testid="clear-filters-button"
                  >
                    Clear all
                  </Button>
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Results */}
        {isLoading || searchLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="loading-state">
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
        ) : error ? (
          <Card data-testid="error-state">
            <CardContent className="p-8 text-center">
              <University className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Error Loading Colleges</h3>
              <p className="text-muted-foreground mb-4">
                {(error as Error).message || "Failed to load college data"}
              </p>
              <Button onClick={() => refetch()} data-testid="retry-button">
                Try Again
              </Button>
            </CardContent>
          </Card>
        ) : !displayColleges || displayColleges.length === 0 ? (
          <Card data-testid="empty-state">
            <CardContent className="p-8 text-center">
              <University className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Colleges Found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery || selectedState || selectedCity
                  ? "No colleges match your current search criteria. Try adjusting your filters."
                  : "No colleges are available in the database at the moment."}
              </p>
              {(searchQuery || selectedState || selectedCity) && (
                <Button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedState("");
                    setSelectedCity("");
                    setCurrentPage(0);
                    refetch();
                  }}
                  data-testid="clear-search-button"
                >
                  Clear Search
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-muted-foreground" data-testid="results-count">
                {displayColleges.length} colleges found
                {searchQuery && ` for "${searchQuery}"`}
              </p>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Showing government colleges only
                </span>
              </div>
            </div>

            {/* College Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8" data-testid="colleges-grid">
              {displayColleges.map((college) => (
                <CollegeCard key={college.id} college={college} />
              ))}
            </div>

            {/* Pagination */}
            {!searchQuery && colleges && colleges.length === limit && (
              <div className="flex justify-center gap-2" data-testid="pagination">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                  disabled={currentPage === 0}
                  data-testid="previous-page-button"
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  data-testid="next-page-button"
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}

        {/* Info Section */}
        <Card className="mt-12 bg-muted/50" data-testid="info-section">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <University className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">Government Colleges</h4>
                <p className="text-sm text-muted-foreground">
                  All listed colleges are government-affiliated institutions with quality education and affordable fees.
                </p>
              </div>
              <div>
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-6 w-6 text-secondary" />
                </div>
                <h4 className="font-semibold mb-2">Location-Based Search</h4>
                <p className="text-sm text-muted-foreground">
                  Find colleges near your location with detailed information about courses and facilities.
                </p>
              </div>
              <div>
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="h-6 w-6 text-accent" />
                </div>
                <h4 className="font-semibold mb-2">Advanced Filtering</h4>
                <p className="text-sm text-muted-foreground">
                  Use state, city, and course filters to find colleges that match your specific requirements.
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
