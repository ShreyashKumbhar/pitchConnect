import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useTheme();
  const { currentUser, logout } = useUser();

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) && 
        buttonRef.current && 
        !buttonRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);
    
    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef, buttonRef]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Use the context logout function
    logout();
    
    // Navigate to home page
    navigate('/');
    
    // Close dropdown
    setIsDropdownOpen(false);
    
    // Close mobile menu if open
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-dark-800 dark:to-secondary-900 text-white shadow-lg backdrop-blur-sm border-b border-white/10 transition-all duration-300 relative z-40">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold font-display flex items-center">
            <svg 
              className="w-8 h-8 mr-2 animate-float" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M12 4L4 8L12 12L20 8L12 4Z" 
                fill="currentColor" 
                fillOpacity="0.7"
              />
              <path 
                d="M4 8V16L12 20V12" 
                fill="currentColor" 
                fillOpacity="0.5"
              />
              <path 
                d="M12 12V20L20 16V8" 
                fill="currentColor" 
                fillOpacity="0.3"
              />
            </svg>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100 dark:from-white dark:to-purple-200">
              PitchConnect
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-blue-200 transition relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-white after:transition-all">
              Home
            </Link>
            {currentUser && currentUser.role === 'investor' && (
              <Link to="/startups" className="hover:text-blue-200 transition relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-white after:transition-all">
                Startups
              </Link>
            )}
            <Link to="/events" className="hover:text-blue-200 transition relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-white after:transition-all">
              Events
            </Link>
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <FiSun className="w-5 h-5" />
              ) : (
                <FiMoon className="w-5 h-5" />
              )}
            </button>
            
            {currentUser ? (
              <>
                {/* Dropdown Menu for Logged In Users */}
                <div className="relative">
                  <button 
                    ref={buttonRef}
                    onClick={toggleDropdown}
                    className="flex items-center px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition border border-white/20"
                  >
                    <div className="mr-2 w-6 h-6 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center text-xs font-bold">
                      {currentUser.firstName ? currentUser.firstName[0] : "U"}
                    </div>
                    <span>{currentUser.firstName} {currentUser.lastName}</span>
                  </button>
                  {isDropdownOpen && (
                    <div 
                      ref={dropdownRef}
                      className="absolute right-0 mt-2 w-56 bg-white dark:bg-dark-800 text-gray-800 dark:text-gray-100 shadow-lg rounded-xl z-50 border border-gray-200 dark:border-dark-700 overflow-visible backdrop-blur-sm"
                    >
                      {/* Link to appropriate dashboard based on role */}
                      {currentUser.role === 'startup' && (
                        <Link to="/startup/dashboard" className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors border-b border-gray-200 dark:border-dark-700">
                          <div className="font-medium">Dashboard</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Manage your startup profile</div>
                        </Link>
                      )}
                      {currentUser.role === 'investor' && (
                        <Link to="/investor/dashboard" className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors border-b border-gray-200 dark:border-dark-700">
                          <div className="font-medium">Dashboard</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Manage your investor profile</div>
                        </Link>
                      )}
                      {currentUser.role === 'admin' && (
                        <Link to="/admin/dashboard" className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors border-b border-gray-200 dark:border-dark-700">
                          <div className="font-medium">Admin Dashboard</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Manage platform settings</div>
                        </Link>
                      )}
                      <button 
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors text-red-600 dark:text-red-400"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-blue-200 transition relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-white after:transition-all">
                  Log In
                </Link>
                <Link 
                  to="/register" 
                  className="bg-white/10 border border-white/20 backdrop-blur-sm text-white px-5 py-2 rounded-full hover:bg-white/20 transition shadow-lg hover:shadow-primary-500/20"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <FiSun className="w-5 h-5" />
              ) : (
                <FiMoon className="w-5 h-5" />
              )}
            </button>
            
            <button
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <HiX className="h-6 w-6" />
              ) : (
                <HiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2 border-t border-white/10 pt-4">
            <Link to="/" className="block p-3 rounded-lg hover:bg-white/10 transition">
              Home
            </Link>
            {currentUser && currentUser.role === 'investor' && (
              <Link to="/startups" className="block p-3 rounded-lg hover:bg-white/10 transition">
                Startups
              </Link>
            )}
            <Link to="/events" className="block p-3 rounded-lg hover:bg-white/10 transition">
              Events
            </Link>
            
            {currentUser ? (
              <>
                {/* Dashboard Link */}
                {currentUser.role === 'startup' && (
                  <Link to="/startup/dashboard" className="block p-3 rounded-lg hover:bg-white/10 transition">
                    Dashboard
                  </Link>
                )}
                {currentUser.role === 'investor' && (
                  <Link to="/investor/dashboard" className="block p-3 rounded-lg hover:bg-white/10 transition">
                    Dashboard
                  </Link>
                )}
                {currentUser.role === 'admin' && (
                  <Link to="/admin/dashboard" className="block p-3 rounded-lg hover:bg-white/10 transition">
                    Admin Dashboard
                  </Link>
                )}
                <button 
                  onClick={handleLogout}
                  className="block w-full text-left p-3 rounded-lg hover:bg-white/10 transition text-red-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-2 pt-2">
                <Link to="/login" className="block p-3 rounded-lg hover:bg-white/10 transition border border-white/10 text-center">
                  Log In
                </Link>
                <Link 
                  to="/register" 
                  className="block p-3 rounded-lg bg-white/10 hover:bg-white/20 transition border border-white/20 text-center font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 