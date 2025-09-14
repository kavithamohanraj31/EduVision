import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { GraduationCap, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Header() {
  const [location] = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/", icon: "home" },
    { name: "Assessment", href: "/assessment", icon: "brain" },
    { name: "Colleges", href: "/colleges", icon: "university" },
    { name: "Career Paths", href: "/career-paths", icon: "route" },
  ];

  const NavItems = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={`flex ${mobile ? "flex-col space-y-4" : "space-x-8"}`}>
      {navigation.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={`text-sm font-medium transition-colors hover:text-foreground ${
            location === item.href
              ? "text-foreground"
              : "text-muted-foreground"
          }`}
          data-testid={`nav-link-${item.name.toLowerCase()}`}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50" data-testid="header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0" data-testid="logo-link">
              <h1 className="text-2xl font-bold text-primary flex items-center">
                <GraduationCap className="mr-2" />
                EduPath
              </h1>
            </Link>
            <nav className="hidden md:ml-10 md:block">
              <NavItems />
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <Button asChild>
              <Link href="/assessment">Start Assessment</Link>
            </Button>

            {/* Mobile menu */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" data-testid="mobile-menu-trigger">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <nav className="mt-6">
                    <NavItems mobile />
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
