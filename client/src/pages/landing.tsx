import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { 
  Brain, 
  University, 
  Route, 
  PlayCircle, 
  CheckCircle, 
  Star,
  UserPlus,
  Play
} from "lucide-react";

export default function Landing() {
  const stats = [
    { label: "Students Guided", value: "50,000+" },
    { label: "Government Colleges", value: "2,500+" },
    { label: "Career Paths", value: "150+" },
    { label: "Success Rate", value: "92%" },
  ];

  const features = [
    {
      icon: Brain,
      title: "Aptitude & Interest Assessment",
      description: "Take our scientifically designed quiz to discover your strengths, interests, and personality traits. Get personalized recommendations for Arts, Science, Commerce, or Vocational streams.",
      highlights: [
        "Comprehensive personality assessment",
        "Subject-wise aptitude testing",
        "AI-powered stream recommendations"
      ]
    },
    {
      icon: University,
      title: "Government College Directory",
      description: "Discover nearby government colleges with detailed information about courses, facilities, admission criteria, and cut-offs. Make informed decisions about where to apply.",
      highlights: [
        "Location-based college search",
        "Detailed course and facility information",
        "Admission requirements and deadlines"
      ]
    },
    {
      icon: Route,
      title: "Visual Career Path Mapping",
      description: "Understand exactly where each degree can take you. See detailed career paths, job opportunities, salary ranges, and further education options for every stream.",
      highlights: [
        "Interactive career visualization",
        "Salary and growth projections",
        "Higher education pathways"
      ]
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      college: "Delhi University, B.A. English",
      content: "EduPath helped me realize that my passion for writing could lead to a successful career in English Literature. The assessment quiz was spot-on!",
      rating: 5
    },
    {
      name: "Rahul Kumar",
      college: "BHU, B.Sc. Computer Science", 
      content: "The college directory feature saved me hours of research. I found the perfect government college near home with excellent CS programs.",
      rating: 5
    },
    {
      name: "Anjali Patel",
      college: "Pune University, B.Com",
      content: "The career path visualization showed me exactly how Commerce could lead to exciting opportunities in finance and consulting. So helpful!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background" data-testid="landing-page">
      <Header />
      
      {/* Hero Section */}
      <section className="gradient-hero py-20 sm:py-24" data-testid="hero-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-6xl font-bold text-white mb-6">
            Your Personalized Path to
            <span className="text-yellow-300"> Educational Success</span>
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Discover the perfect degree program, find nearby government colleges, and map your career journey with AI-powered guidance tailored just for you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90" data-testid="start-assessment-button">
              <Link href="/assessment">
                <PlayCircle className="mr-2 h-5 w-5" />
                Start Assessment Quiz
              </Link>
            </Button>
            <Button
              asChild
              variant="secondary"
              size="lg"
              className="bg-white/10 text-white hover:bg-white/20 backdrop-blur"
              data-testid="explore-colleges-button"
            >
              <Link href="/colleges">
                <University className="mr-2 h-5 w-5" />
                Explore Colleges
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted" data-testid="stats-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} data-testid={`stat-${index}`}>
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20" data-testid="features-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Everything You Need for Smart Educational Decisions
            </h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From aptitude assessment to career mapping, we provide comprehensive guidance for your educational journey.
            </p>
          </div>
          
          <div className="space-y-20">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                }`}
                data-testid={`feature-${index}`}
              >
                <Card className={`card-hover ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <div className="bg-primary/10 p-3 rounded-lg mr-4">
                        <feature.icon className="text-primary h-6 w-6" />
                      </div>
                      <h4 className="text-2xl font-semibold">{feature.title}</h4>
                    </div>
                    <p className="text-muted-foreground mb-6">{feature.description}</p>
                    <div className="space-y-3 mb-6">
                      {feature.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center text-sm text-muted-foreground">
                          <CheckCircle className="text-secondary mr-3 h-4 w-4" />
                          {highlight}
                        </div>
                      ))}
                    </div>
                    <Button className="bg-primary hover:bg-primary/90" data-testid={`feature-button-${index}`}>
                      {index === 0 && "Start Assessment"}
                      {index === 1 && "Explore Colleges"}
                      {index === 2 && "View Career Paths"}
                    </Button>
                  </CardContent>
                </Card>

                {/* Feature Preview */}
                <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                  {index === 0 && (
                    <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200">
                      <CardContent className="p-8">
                        <div className="mb-6">
                          <h5 className="font-semibold text-lg mb-2">Sample Assessment Question</h5>
                          <p className="text-muted-foreground mb-4">Which activity interests you most?</p>
                        </div>
                        <div className="space-y-3">
                          <label className="flex items-center p-3 bg-white rounded-lg cursor-pointer hover:bg-blue-50 transition-colors">
                            <input type="radio" name="sample1" className="mr-3" disabled />
                            <span>Conducting scientific experiments and research</span>
                          </label>
                          <label className="flex items-center p-3 bg-white rounded-lg cursor-pointer hover:bg-blue-50 transition-colors">
                            <input type="radio" name="sample1" className="mr-3" disabled />
                            <span>Writing stories and creative content</span>
                          </label>
                          <label className="flex items-center p-3 bg-white rounded-lg cursor-pointer hover:bg-blue-50 transition-colors">
                            <input type="radio" name="sample1" className="mr-3" disabled />
                            <span>Analyzing business data and trends</span>
                          </label>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {index === 1 && (
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h5 className="font-semibold text-lg">Find Colleges Near You</h5>
                          <i className="fas fa-search text-muted-foreground" />
                        </div>
                        <div className="mb-4">
                          <input
                            type="text"
                            placeholder="Enter your location..."
                            className="w-full p-3 border border-input rounded-lg bg-background text-foreground"
                            disabled
                          />
                        </div>
                        <div className="space-y-3">
                          <div className="p-4 border border-border rounded-lg cursor-pointer">
                            <div className="flex justify-between items-start mb-2">
                              <h6 className="font-medium">Delhi University - North Campus</h6>
                              <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded">4.2km</span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">B.A., B.Sc., B.Com available</p>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <i className="fas fa-map-marker-alt mr-1" />
                              <span>Delhi, India</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {index === 2 && (
                    <Card className="bg-gradient-to-br from-orange-50 to-red-100 border-orange-200">
                      <CardContent className="p-8">
                        <div className="mb-6">
                          <h5 className="font-semibold text-lg mb-2">B.Sc. Computer Science Career Path</h5>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-accent rounded-full mr-4" />
                            <div className="flex-1">
                              <div className="font-medium">Software Developer</div>
                              <div className="text-sm text-muted-foreground">₹4-8 LPA starting</div>
                            </div>
                          </div>
                          <div className="flex items-center ml-3">
                            <div className="w-px h-8 bg-border mr-3" />
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-secondary rounded-full mr-4" />
                            <div className="flex-1">
                              <div className="font-medium">Data Scientist</div>
                              <div className="text-sm text-muted-foreground">₹6-12 LPA starting</div>
                            </div>
                          </div>
                          <div className="flex items-center ml-3">
                            <div className="w-px h-8 bg-border mr-3" />
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-primary rounded-full mr-4" />
                            <div className="flex-1">
                              <div className="font-medium">M.Sc./M.Tech</div>
                              <div className="text-sm text-muted-foreground">Higher education path</div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20" data-testid="testimonials-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Success Stories from Students Like You
            </h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See how EduPath has helped thousands of students make confident educational decisions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="card-hover" data-testid={`testimonial-${index}`}>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                      <i className="fas fa-user text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.college}</div>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                  <div className="flex text-accent">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-hero py-20" data-testid="cta-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Start Your Educational Journey?
          </h3>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of students who have already discovered their perfect career path with EduPath's AI-powered guidance.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90" data-testid="create-account-button">
              <a href="/api/login">
                <UserPlus className="mr-2 h-5 w-5" />
                Create Free Account
              </a>
            </Button>
            <Button
              asChild
              variant="secondary"
              size="lg"
              className="bg-white/10 text-white hover:bg-white/20 backdrop-blur"
              data-testid="demo-quiz-button"
            >
              <Link href="/assessment">
                <Play className="mr-2 h-5 w-5" />
                Take Demo Quiz
              </Link>
            </Button>
          </div>
          <p className="text-sm text-blue-200 mt-6">
            Free forever • No credit card required • Get started in 2 minutes
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
