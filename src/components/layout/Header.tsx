
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  // Check if we're on an auth page
  const isAuthPage = currentPath === '/signin' || currentPath === '/signup';

  // Simulate authentication state (replace with actual Clerk auth state)
  const isAuthenticated = currentPath === '/dashboard';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Skip rendering header on auth pages
  if (isAuthPage) return null;

  return (
    <header className="py-4 px-4 border-b border-theme-gray bg-theme-black">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-theme-orange">
          Auth<span className="text-white">App</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className={`text-sm ${
              currentPath === '/' ? 'text-theme-orange' : 'text-foreground hover:text-theme-orange transition-colors'
            }`}
          >
            Home
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className={`text-sm ${
                  currentPath === '/dashboard' ? 'text-theme-orange' : 'text-foreground hover:text-theme-orange transition-colors'
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/signin"
                className="auth-button-outline px-4 py-2 h-auto"
              >
                Sign Out
              </Link>
            </>
          ) : (
            <>
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
            </>
          )}
        </nav>

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
            <Link
              to="/"
              className={`text-sm ${
                currentPath === '/' ? 'text-theme-orange' : 'text-foreground'
              }`}
              onClick={closeMenu}
            >
              Home
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className={`text-sm ${
                    currentPath === '/dashboard' ? 'text-theme-orange' : 'text-foreground'
                  }`}
                  onClick={closeMenu}
                >
                  Dashboard
                </Link>
                <Link
                  to="/signin"
                  className="auth-button-outline text-center"
                  onClick={closeMenu}
                >
                  Sign Out
                </Link>
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
