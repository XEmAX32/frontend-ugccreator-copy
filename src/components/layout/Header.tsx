
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Settings, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
    console.log("Signing out user...");

    // Simulate sign out
    setTimeout(() => {
      toast({
        title: "Signed out",
        description: "You have been successfully signed out"
      });
      navigate("/signin");
    }, 500);
  };

  // Skip rendering header on auth pages
  if (isAuthPage) return null;
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-theme-black/95 backdrop-blur supports-[backdrop-filter]:bg-theme-black/60">
      <div className="container flex h-16 items-center">
        {/* Logo */}
        <Link to="/home" className="flex items-center gap-2 mr-4">
          <span className="text-xl font-bold text-theme-orange">VideoAI</span>
        </Link>
        
        <div className="flex-1"></div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated && (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Settings className="h-5 w-5" />
                    <span className="sr-only">Settings</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Settings</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Account</DropdownMenuItem>
                  <DropdownMenuItem>Preferences</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative" size="icon">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/avatar.png" alt="Profile" />
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="text-foreground"
            onClick={toggleMenu}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden">
          <div className="fixed inset-y-0 right-0 w-full max-w-xs border-l border-border/40 bg-theme-black p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
                <span className="text-xl font-bold text-theme-orange">VideoAI</span>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={closeMenu}
                className="text-foreground"
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
            <div className="mt-8 flex flex-col gap-4">
              <Button variant="ghost" className="justify-start" onClick={() => {
                closeMenu();
                navigate('/home');
              }}>
                Settings
              </Button>
              <Button variant="ghost" className="justify-start" onClick={() => {
                closeMenu();
                navigate('/profile');
              }}>
                Profile
              </Button>
              <Button variant="ghost" className="justify-start" onClick={() => {
                closeMenu();
                handleSignOut();
              }}>
                Log out
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
