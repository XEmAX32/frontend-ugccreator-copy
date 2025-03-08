
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Settings, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if we're on an auth page
  const isAuthPage = currentPath === '/signin' || currentPath === '/signup';

  // Simulate authentication state
  const isAuthenticated = currentPath === '/home' || currentPath === '/dashboard' || currentPath === '/avatar-selection';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleSignOut = () => {
    // Here you would connect to Clerk's sign out API
    console.log("Signing out user...");
    
    // Simulate sign out
    setTimeout(() => {
      toast({
        title: "Signed out",
        description: "You have been successfully signed out",
      });
      navigate("/signin");
    }, 500);
  };

  // Skip rendering header on auth pages
  if (isAuthPage) return null;

  return (
    <header className="py-4 px-4 border-b border-theme-gray bg-theme-black">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/home" className="text-xl font-bold text-theme-orange">
          Auth<span className="text-white">App</span>
        </Link>

        {/* Desktop Navigation */}
        {isAuthenticated && (
          <nav className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground hover:text-theme-orange hover:bg-transparent"
            >
              <Settings size={20} />
            </Button>
            
            <Button 
              variant="outline" 
              className="text-theme-orange border-theme-gray hover:bg-theme-gray hover:text-theme-orange-light"
              onClick={handleSignOut}
            >
              Sign out
            </Button>
            
            <Avatar className="h-9 w-9 cursor-pointer">
              <AvatarImage src="" alt="Profile" />
              <AvatarFallback className="bg-theme-orange text-white">
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
          </nav>
        )}

        {!isAuthenticated && (
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/signin"
              className="text-sm text-foreground hover:text-theme-orange transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="auth-button px-4 py-2 h-auto"
            >
              Sign Up
            </Link>
          </nav>
        )}

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground hover:text-theme-orange"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-theme-black border-b border-theme-gray z-50">
          <div className="container mx-auto py-4 px-4 flex flex-col space-y-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Settings</span>
                  <Settings size={20} className="text-theme-orange" />
                </div>
                <button
                  className="auth-button-outline text-center"
                  onClick={handleSignOut}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="text-sm text-foreground"
                  onClick={closeMenu}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="auth-button text-center"
                  onClick={closeMenu}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
