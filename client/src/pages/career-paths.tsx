import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { 
  TrendingUp, 
  DollarSign, 
  Briefcase, 
  GraduationCap, 
  Target, 
  Users, 
  BarChart3,
  Lightbulb,
  Building,
  BookOpen
} from "lucide-react";

// Comprehensive career paths data
const careerPathsData = {
  Science: {
    "B.Tech Computer Science": {
      degree: "B.Tech Computer Science",
      stream: "Science",
      duration: "4 years",
      description: "Comprehensive computer science program covering programming, algorithms, data structures, and software engineering.",
      careerOptions: [
        {
          title: "Software Engineer",
          salary: "6-25 LPA",
          experience: "0-5 years",
          companies: ["Google", "Microsoft", "Amazon", "TCS", "Infosys"],
          skills: ["Programming", "Data Structures", "Algorithms", "System Design"],
          growth: "High"
        },
        {
          title: "Data Scientist",
          salary: "8-30 LPA",
          experience: "1-6 years",
          companies: ["IBM", "Accenture", "Wipro", "Startups"],
          skills: ["Machine Learning", "Python", "Statistics", "Data Analysis"],
          growth: "Very High"
        },
        {
          title: "Full Stack Developer",
          salary: "5-20 LPA",
          experience: "0-4 years",
          companies: ["Startups", "Mid-size companies", "Freelancing"],
          skills: ["Frontend", "Backend", "Database", "Cloud"],
          growth: "High"
        },
        {
          title: "DevOps Engineer",
          salary: "7-22 LPA",
          experience: "1-5 years",
          companies: ["AWS", "Azure", "Google Cloud", "Tech companies"],
          skills: ["Docker", "Kubernetes", "CI/CD", "Cloud Platforms"],
          growth: "High"
        }
      ],
      higherEducation: [
        "M.Tech Computer Science",
        "MS in Computer Science (Abroad)",
        "MBA in Technology Management",
        "PhD in Computer Science"
      ],
      governmentJobs: [
        "Software Engineer in ISRO",
        "Technical Officer in DRDO",
        "Programmer in Government Banks",
        "IT Officer in Government Departments"
      ],
      entrepreneurialOptions: [
        "Software Development Company",
        "Mobile App Development",
        "SaaS Product Development",
        "Tech Consulting"
      ]
    },
    "B.Sc Chemistry": {
      degree: "B.Sc Chemistry",
      stream: "Science",
      duration: "3 years",
      description: "Study of matter, its properties, composition, and reactions. Covers organic, inorganic, and physical chemistry.",
      careerOptions: [
        {
          title: "Research Scientist",
          salary: "4-15 LPA",
          experience: "0-5 years",
          companies: ["CSIR Labs", "DRDO", "ISRO", "Pharmaceutical Companies"],
          skills: ["Laboratory Techniques", "Research Methods", "Data Analysis", "Report Writing"],
          growth: "Medium"
        },
        {
          title: "Quality Control Analyst",
          salary: "3-12 LPA",
          experience: "0-4 years",
          companies: ["Pharmaceutical", "Food Industry", "Chemical Companies"],
          skills: ["Analytical Chemistry", "Quality Testing", "Documentation", "Compliance"],
          growth: "Medium"
        },
        {
          title: "Chemical Engineer",
          salary: "5-18 LPA",
          experience: "0-5 years",
          companies: ["Petrochemical", "Pharmaceutical", "Manufacturing"],
          skills: ["Process Design", "Chemical Processes", "Safety Protocols", "Project Management"],
          growth: "Medium"
        },
        {
          title: "Environmental Consultant",
          salary: "4-14 LPA",
          experience: "1-5 years",
          companies: ["Environmental Agencies", "Consulting Firms", "Government"],
          skills: ["Environmental Science", "Regulatory Compliance", "Assessment", "Reporting"],
          growth: "High"
        }
      ],
      higherEducation: [
        "M.Sc Chemistry",
        "M.Tech Chemical Engineering",
        "PhD in Chemistry",
        "MBA in Chemical Industry"
      ],
      governmentJobs: [
        "Scientist in CSIR",
        "Chemical Analyst in Government Labs",
        "Environmental Officer",
        "Research Officer in DRDO"
      ],
      entrepreneurialOptions: [
        "Chemical Testing Laboratory",
        "Environmental Consulting",
        "Specialty Chemical Manufacturing",
        "Research and Development Services"
      ]
    },
    "B.Tech Mechanical Engineering": {
      degree: "B.Tech Mechanical Engineering",
      stream: "Science",
      duration: "4 years",
      description: "Design, analysis, and manufacturing of mechanical systems. Covers thermodynamics, mechanics, and materials science.",
      careerOptions: [
        {
          title: "Mechanical Engineer",
          salary: "4-20 LPA",
          experience: "0-6 years",
          companies: ["Automotive", "Manufacturing", "Aerospace", "Energy"],
          skills: ["CAD/CAM", "Design", "Manufacturing", "Project Management"],
          growth: "Medium"
        },
        {
          title: "Design Engineer",
          salary: "5-18 LPA",
          experience: "1-5 years",
          companies: ["Automotive", "Aerospace", "Consumer Goods", "Industrial Equipment"],
          skills: ["SolidWorks", "AutoCAD", "FEA", "Product Design"],
          growth: "Medium"
        },
        {
          title: "Production Manager",
          salary: "6-25 LPA",
          experience: "2-8 years",
          companies: ["Manufacturing", "Automotive", "Pharmaceutical", "Food Processing"],
          skills: ["Operations", "Lean Manufacturing", "Team Management", "Quality Control"],
          growth: "High"
        },
        {
          title: "Maintenance Engineer",
          salary: "4-15 LPA",
          experience: "1-5 years",
          companies: ["Power Plants", "Manufacturing", "Oil & Gas", "Infrastructure"],
          skills: ["Equipment Maintenance", "Troubleshooting", "Preventive Maintenance", "Safety"],
          growth: "Medium"
        }
      ],
      higherEducation: [
        "M.Tech Mechanical Engineering",
        "MS in Mechanical Engineering (Abroad)",
        "MBA in Operations",
        "PhD in Mechanical Engineering"
      ],
      governmentJobs: [
        "Engineer in PWD",
        "Technical Officer in ISRO",
        "Mechanical Engineer in Railways",
        "Scientist in DRDO"
      ],
      entrepreneurialOptions: [
        "Manufacturing Company",
        "Engineering Consultancy",
        "Equipment Maintenance Services",
        "Product Design and Development"
      ]
    }
  },
  Commerce: {
    "B.Com": {
      degree: "B.Com",
      stream: "Commerce",
      duration: "3 years",
      description: "Comprehensive commerce program covering accounting, finance, economics, and business management.",
      careerOptions: [
        {
          title: "Accountant",
          salary: "3-12 LPA",
          experience: "0-5 years",
          companies: ["CA Firms", "Corporate", "Government", "Banks"],
          skills: ["Accounting", "Tally", "Taxation", "Financial Reporting"],
          growth: "Medium"
        },
        {
          title: "Financial Analyst",
          salary: "4-18 LPA",
          experience: "1-6 years",
          companies: ["Investment Banks", "Mutual Funds", "Corporate Finance", "Consulting"],
          skills: ["Financial Modeling", "Excel", "Market Analysis", "Risk Assessment"],
          growth: "High"
        },
        {
          title: "Banking Professional",
          salary: "4-15 LPA",
          experience: "0-5 years",
          companies: ["Public Sector Banks", "Private Banks", "NBFCs", "Cooperative Banks"],
          skills: ["Banking Operations", "Customer Service", "Loan Processing", "Compliance"],
          growth: "Medium"
        },
        {
          title: "Tax Consultant",
          salary: "3-15 LPA",
          experience: "1-6 years",
          companies: ["CA Firms", "Tax Consultancies", "Corporate", "Freelancing"],
          skills: ["Tax Planning", "GST", "Income Tax", "Compliance"],
          growth: "High"
        }
      ],
      higherEducation: [
        "M.Com",
        "MBA Finance",
        "CA (Chartered Accountant)",
        "CS (Company Secretary)"
      ],
      governmentJobs: [
        "Banking Officer",
        "Accountant in Government",
        "Tax Inspector",
        "Audit Officer"
      ],
      entrepreneurialOptions: [
        "Accounting Firm",
        "Tax Consultancy",
        "Financial Advisory Services",
        "Business Consultancy"
      ]
    },
    "BBA": {
      degree: "BBA",
      stream: "Commerce",
      duration: "3 years",
      description: "Business administration program covering management, marketing, finance, and entrepreneurship.",
      careerOptions: [
        {
          title: "Business Analyst",
          salary: "4-16 LPA",
          experience: "0-5 years",
          companies: ["IT Companies", "Consulting", "Corporate", "Startups"],
          skills: ["Data Analysis", "Process Improvement", "Project Management", "Communication"],
          growth: "High"
        },
        {
          title: "Marketing Executive",
          salary: "3-12 LPA",
          experience: "0-4 years",
          companies: ["FMCG", "E-commerce", "Digital Marketing", "Advertising"],
          skills: ["Digital Marketing", "Brand Management", "Market Research", "Social Media"],
          growth: "High"
        },
        {
          title: "HR Executive",
          salary: "3-10 LPA",
          experience: "0-4 years",
          companies: ["Corporate", "Consulting", "IT", "Manufacturing"],
          skills: ["Recruitment", "Employee Relations", "HR Policies", "Training"],
          growth: "Medium"
        },
        {
          title: "Operations Manager",
          salary: "5-20 LPA",
          experience: "2-8 years",
          companies: ["Manufacturing", "Logistics", "Retail", "E-commerce"],
          skills: ["Operations Management", "Process Optimization", "Team Leadership", "Supply Chain"],
          growth: "High"
        }
      ],
      higherEducation: [
        "MBA",
        "M.Com",
        "PGDM",
        "MS in Business (Abroad)"
      ],
      governmentJobs: [
        "Administrative Officer",
        "Manager in PSUs",
        "Banking Officer",
        "Government Consultant"
      ],
      entrepreneurialOptions: [
        "Startup Company",
        "Business Consultancy",
        "Digital Marketing Agency",
        "Training and Development"
      ]
    }
  },
  Arts: {
    "B.A English Literature": {
      degree: "B.A English Literature",
      stream: "Arts",
      duration: "3 years",
      description: "Study of English literature, language, and communication. Covers poetry, prose, drama, and critical analysis.",
      careerOptions: [
        {
          title: "Content Writer",
          salary: "2-10 LPA",
          experience: "0-4 years",
          companies: ["Digital Marketing", "Publishing", "E-learning", "Freelancing"],
          skills: ["Writing", "SEO", "Research", "Editing"],
          growth: "High"
        },
        {
          title: "Journalist",
          salary: "3-12 LPA",
          experience: "0-5 years",
          companies: ["Newspapers", "TV Channels", "Online Media", "Magazines"],
          skills: ["News Writing", "Interviewing", "Research", "Media Ethics"],
          growth: "Medium"
        },
        {
          title: "Teacher/Professor",
          salary: "3-15 LPA",
          experience: "0-10 years",
          companies: ["Schools", "Colleges", "Universities", "Coaching Centers"],
          skills: ["Teaching", "Curriculum Development", "Student Assessment", "Communication"],
          growth: "Medium"
        },
        {
          title: "Editor",
          salary: "4-14 LPA",
          experience: "1-6 years",
          companies: ["Publishing Houses", "Media", "Corporate", "Freelancing"],
          skills: ["Editing", "Proofreading", "Content Strategy", "Project Management"],
          growth: "Medium"
        }
      ],
      higherEducation: [
        "M.A English Literature",
        "M.A Journalism",
        "M.A Mass Communication",
        "B.Ed for Teaching"
      ],
      governmentJobs: [
        "Teacher in Government Schools",
        "Content Writer in Government",
        "Editor in Government Publications",
        "Public Relations Officer"
      ],
      entrepreneurialOptions: [
        "Content Writing Agency",
        "Publishing House",
        "Online Education Platform",
        "Media and Communication Services"
      ]
    },
    "B.A Economics": {
      degree: "B.A Economics",
      stream: "Arts",
      duration: "3 years",
      description: "Study of economic theories, policies, and market dynamics. Covers microeconomics, macroeconomics, and econometrics.",
      careerOptions: [
        {
          title: "Economic Analyst",
          salary: "4-15 LPA",
          experience: "0-5 years",
          companies: ["Research Institutes", "Banks", "Government", "Think Tanks"],
          skills: ["Economic Analysis", "Data Analysis", "Research", "Report Writing"],
          growth: "Medium"
        },
        {
          title: "Policy Analyst",
          salary: "5-18 LPA",
          experience: "1-6 years",
          companies: ["Government", "International Organizations", "NGOs", "Consulting"],
          skills: ["Policy Research", "Data Analysis", "Stakeholder Engagement", "Report Writing"],
          growth: "Medium"
        },
        {
          title: "Research Associate",
          salary: "3-12 LPA",
          experience: "0-4 years",
          companies: ["Universities", "Research Institutes", "Banks", "Consulting"],
          skills: ["Research Methods", "Data Collection", "Analysis", "Academic Writing"],
          growth: "Medium"
        },
        {
          title: "Business Development Manager",
          salary: "5-20 LPA",
          experience: "2-8 years",
          companies: ["Corporate", "Startups", "Consulting", "Financial Services"],
          skills: ["Market Analysis", "Strategy", "Client Relations", "Project Management"],
          growth: "High"
        }
      ],
      higherEducation: [
        "M.A Economics",
        "M.A Public Policy",
        "MBA",
        "PhD in Economics"
      ],
      governmentJobs: [
        "Economic Officer",
        "Research Officer",
        "Policy Analyst in Government",
        "Statistical Officer"
      ],
      entrepreneurialOptions: [
        "Economic Consultancy",
        "Research and Analysis Services",
        "Policy Advisory",
        "Data Analytics Company"
      ]
    }
  }
};

export default function CareerPaths() {
  const [selectedStream, setSelectedStream] = useState<string>("Science");
  const [selectedDegree, setSelectedDegree] = useState<string>("B.Tech Computer Science");
  const [showAnalysis, setShowAnalysis] = useState(false);

  const streams = Object.keys(careerPathsData);
  const degrees = selectedStream ? Object.keys(careerPathsData[selectedStream as keyof typeof careerPathsData]) : [];
  const currentCareerData = selectedStream && selectedDegree ? careerPathsData[selectedStream as keyof typeof careerPathsData][selectedDegree as keyof typeof careerPathsData[typeof selectedStream]] : null;

  const handleAnalyze = () => {
    setShowAnalysis(true);
  };

  const resetAnalysis = () => {
    setShowAnalysis(false);
  };

  return (
    <div className="min-h-screen bg-background">
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

        {/* Selection Card */}
        <Card className="mb-8">
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
                <Select value={selectedStream} onValueChange={(value) => {
                  setSelectedStream(value);
                  setSelectedDegree(Object.keys(careerPathsData[value as keyof typeof careerPathsData])[0]);
                  setShowAnalysis(false);
                }}>
                  <SelectTrigger>
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
                <Select value={selectedDegree} onValueChange={(value) => {
                  setSelectedDegree(value);
                  setShowAnalysis(false);
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select degree" />
                  </SelectTrigger>
                  <SelectContent>
                    {degrees.map((degree) => (
                      <SelectItem key={degree} value={degree}>
                        {degree}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button onClick={handleAnalyze} className="w-full md:w-auto">
              <BarChart3 className="h-4 w-4 mr-2" />
              Get AI-Powered Career Analysis
            </Button>
          </CardContent>
        </Card>

        {/* Career Analysis Results */}
        {showAnalysis && currentCareerData && (
          <div className="space-y-8">
            {/* Career Path Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Career Path Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-primary/10 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{currentCareerData.careerOptions.length}</div>
                    <div className="text-sm text-muted-foreground">Career Options</div>
                  </div>
                  <div className="text-center p-4 bg-secondary/10 rounded-lg">
                    <div className="text-2xl font-bold text-secondary">{currentCareerData.higherEducation.length}</div>
                    <div className="text-sm text-muted-foreground">Higher Education</div>
                  </div>
                  <div className="text-center p-4 bg-accent/10 rounded-lg">
                    <div className="text-2xl font-bold text-accent">{currentCareerData.governmentJobs.length}</div>
                    <div className="text-sm text-muted-foreground">Government Jobs</div>
                  </div>
                  <div className="text-center p-4 bg-green-100 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{currentCareerData.entrepreneurialOptions.length}</div>
                    <div className="text-sm text-muted-foreground">Entrepreneurial Options</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Degree Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  {currentCareerData.degree}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <span className="font-semibold">Stream:</span> {currentCareerData.stream}
                  </div>
                  <div>
                    <span className="font-semibold">Duration:</span> {currentCareerData.duration}
                  </div>
                  <div>
                    <span className="font-semibold">Type:</span> Undergraduate
                  </div>
                </div>
                <p className="text-muted-foreground">{currentCareerData.description}</p>
              </CardContent>
            </Card>

            {/* Career Options */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Career Options
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {currentCareerData.careerOptions.map((career, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-semibold text-lg">{career.title}</h3>
                        <Badge variant={career.growth === "High" || career.growth === "Very High" ? "default" : "secondary"}>
                          {career.growth} Growth
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          <span className="font-medium text-green-600">{career.salary}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-blue-600" />
                          <span className="text-sm">{career.experience}</span>
                        </div>
                      </div>

                      <div className="mb-3">
                        <h4 className="font-medium mb-2">Top Companies:</h4>
                        <div className="flex flex-wrap gap-1">
                          {career.companies.map((company, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {company}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Key Skills:</h4>
                        <div className="flex flex-wrap gap-1">
                          {career.skills.map((skill, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Higher Education Options */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Higher Education Options
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {currentCareerData.higherEducation.map((option, index) => (
                    <div key={index} className="p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">{option}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Government Jobs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Government Job Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentCareerData.governmentJobs.map((job, index) => (
                    <div key={index} className="p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium">{job}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Entrepreneurial Options */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  Entrepreneurial Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentCareerData.entrepreneurialOptions.map((option, index) => (
                    <div key={index} className="p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-2">
                        <Lightbulb className="h-4 w-4 text-yellow-600" />
                        <span className="text-sm font-medium">{option}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
              <Button onClick={resetAnalysis} variant="outline">
                Analyze Different Path
              </Button>
              <Button asChild>
                <a href="/assessment">Take Career Assessment</a>
              </Button>
            </div>
          </div>
        )}

        {/* Info Section */}
        <Card className="mt-12 bg-muted/50">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">AI-Powered Analysis</h4>
                <p className="text-sm text-muted-foreground">
                  Get detailed career insights powered by advanced AI analysis of current market trends.
                </p>
              </div>
              <div>
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-secondary" />
                </div>
                <h4 className="font-semibold mb-2">Real Market Data</h4>
                <p className="text-sm text-muted-foreground">
                  Salary ranges and job opportunities based on current Indian job market conditions.
                </p>
              </div>
              <div>
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-6 w-6 text-accent" />
                </div>
                <h4 className="font-semibold mb-2">Comprehensive Guidance</h4>
                <p className="text-sm text-muted-foreground">
                  Complete career roadmap including education, skills, and growth opportunities.
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
