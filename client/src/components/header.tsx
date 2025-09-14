import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GraduationCap, Menu, User, LogOut } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Header() {
  const [location] = useLocation();
  const { user, isAuthenticated, isLoading } = useAuth();

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
            {isLoading ? (
              <div className="w-8 h-8 bg-muted rounded-full animate-pulse" />
            ) : isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild data-testid="user-menu-trigger">
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={user.profileImageUrl || undefined}
                        alt={`${user.firstName} ${user.lastName}`}
                      />
                      <AvatarFallback>
                        {user.firstName?.[0] || user.email?.[0] || <User className="h-4 w-4" />}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      {user.firstName && (
                        <p className="font-medium" data-testid="user-name">
                          {user.firstName} {user.lastName}
                        </p>
                      )}
                      {user.email && (
                        <p className="w-[200px] truncate text-sm text-muted-foreground" data-testid="user-email">
                          {user.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <a href="/api/logout" className="w-full" data-testid="logout-link">
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button asChild data-testid="sign-in-button">
                  <a href="/api/login">Sign In</a>
                </Button>
                <Button variant="secondary" asChild data-testid="get-started-button">
                  <Link href="/assessment">Get Started</Link>
                </Button>
              </>
            )}

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
