import { Link } from "wouter";
import { GraduationCap } from "lucide-react";

export default function Footer() {
  const platformLinks = [
    { name: "Assessment Quiz", href: "/assessment" },
    { name: "College Directory", href: "/colleges" },
    { name: "Career Paths", href: "/career-paths" },
    { name: "Timeline Tracker", href: "/" },
  ];

  const resourceLinks = [
    { name: "Study Materials", href: "#" },
    { name: "Scholarship Guide", href: "#" },
    { name: "Admission Help", href: "#" },
    { name: "Career Counseling", href: "#" },
  ];

  const supportLinks = [
    { name: "Help Center", href: "#" },
    { name: "Contact Us", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
  ];

  return (
    <footer className="bg-card border-t border-border py-12" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center mb-4" data-testid="footer-logo">
              <h4 className="text-2xl font-bold text-primary flex items-center">
                <GraduationCap className="mr-2" />
                EduPath
              </h4>
            </Link>
            <p className="text-muted-foreground mb-4">
              Empowering students to make informed educational decisions through AI-powered guidance and comprehensive resources.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="social-twitter">
                <i className="fab fa-twitter" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="social-facebook">
                <i className="fab fa-facebook" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="social-instagram">
                <i className="fab fa-instagram" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="social-linkedin">
                <i className="fab fa-linkedin" />
              </a>
            </div>
          </div>

          <div>
            <h5 className="font-semibold mb-4">Platform</h5>
            <ul className="space-y-2 text-muted-foreground">
              {platformLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-foreground transition-colors"
                    data-testid={`footer-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-semibold mb-4">Resources</h5>
            <ul className="space-y-2 text-muted-foreground">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-foreground transition-colors"
                    data-testid={`footer-resource-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-semibold mb-4">Support</h5>
            <ul className="space-y-2 text-muted-foreground">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-foreground transition-colors"
                    data-testid={`footer-support-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p data-testid="footer-copyright">
            &copy; 2024 EduPath. All rights reserved. Built with ❤️ for Indian students.
          </p>
        </div>
      </div>
    </footer>
  );
}
