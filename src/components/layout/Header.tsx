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
  const {
    toast
  } = useToast();

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
        description: "You have been successfully signed out"
      });
      navigate("/signin");
    }, 500);
  };

  // Skip rendering header on auth pages
  if (isAuthPage) return null;
  return;
};
export default Header;