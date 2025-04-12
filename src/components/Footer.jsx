import { Link } from 'react-router-dom';
import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram, FaGithub } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { darkMode } = useTheme();

  return (
    <footer className="relative bg-gradient-to-r from-primary-900 to-secondary-900 dark:from-dark-950 dark:to-secondary-950 text-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-10">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-accent-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-primary-400 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-secondary-400 rounded-full blur-3xl"></div>
      </div>
      
      {/* Grid pattern */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), 
                             linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <Link to="/" className="text-2xl font-bold font-display mb-4 block flex items-center">
              <svg 
                className="w-8 h-8 mr-2" 
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
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                PitchConnect
              </span>
            </Link>
            <p className="text-gray-300 dark:text-gray-400 mt-2 leading-relaxed">
              Connecting innovative startups with the right investors through our AI-powered matchmaking platform.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-white/10">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 dark:text-gray-400 hover:text-white transition flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary-400 rounded-full mr-2"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-300 dark:text-gray-400 hover:text-white transition flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary-400 rounded-full mr-2"></span>
                  Events
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-300 dark:text-gray-400 hover:text-white transition flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary-400 rounded-full mr-2"></span>
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 dark:text-gray-400 hover:text-white transition flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary-400 rounded-full mr-2"></span>
                  Log In
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-white/10">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 dark:text-gray-400 hover:text-white transition flex items-center">
                  <span className="w-1.5 h-1.5 bg-secondary-400 rounded-full mr-2"></span>
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 dark:text-gray-400 hover:text-white transition flex items-center">
                  <span className="w-1.5 h-1.5 bg-secondary-400 rounded-full mr-2"></span>
                  Success Stories
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 dark:text-gray-400 hover:text-white transition flex items-center">
                  <span className="w-1.5 h-1.5 bg-secondary-400 rounded-full mr-2"></span>
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 dark:text-gray-400 hover:text-white transition flex items-center">
                  <span className="w-1.5 h-1.5 bg-secondary-400 rounded-full mr-2"></span>
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-white/10">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="bg-white/5 hover:bg-white/10 border border-white/10 p-2 rounded-full transition duration-300 hover:scale-110 group">
                <FaLinkedin className="h-5 w-5 text-gray-300 group-hover:text-white" />
              </a>
              <a href="#" className="bg-white/5 hover:bg-white/10 border border-white/10 p-2 rounded-full transition duration-300 hover:scale-110 group">
                <FaTwitter className="h-5 w-5 text-gray-300 group-hover:text-white" />
              </a>
              <a href="#" className="bg-white/5 hover:bg-white/10 border border-white/10 p-2 rounded-full transition duration-300 hover:scale-110 group">
                <FaFacebook className="h-5 w-5 text-gray-300 group-hover:text-white" />
              </a>
              <a href="#" className="bg-white/5 hover:bg-white/10 border border-white/10 p-2 rounded-full transition duration-300 hover:scale-110 group">
                <FaInstagram className="h-5 w-5 text-gray-300 group-hover:text-white" />
              </a>
              <a href="#" className="bg-white/5 hover:bg-white/10 border border-white/10 p-2 rounded-full transition duration-300 hover:scale-110 group">
                <FaGithub className="h-5 w-5 text-gray-300 group-hover:text-white" />
              </a>
            </div>
            <p className="text-gray-300 dark:text-gray-400 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              info@pitchconnect.com
            </p>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-xl font-bold mb-2">Stay Updated</h3>
              <p className="text-gray-300 dark:text-gray-400">Get the latest news about startups, investors, and upcoming events right in your inbox.</p>
            </div>
            <div>
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="px-4 py-3 bg-white/10 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400 flex-grow"
                />
                <button 
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-400 hover:to-secondary-400 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg shadow-primary-900/20 hover:shadow-primary-900/40"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-white/10 text-gray-400 text-center">
          <p>&copy; {currentYear} PitchConnect. All rights reserved.</p>
          <div className="flex justify-center mt-2 text-sm space-x-6">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
            <a href="#" className="hover:text-white transition">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 