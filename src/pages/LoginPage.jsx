import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaEnvelope, FaLock, FaExclamationCircle } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';
import { motion } from 'framer-motion';

// In a real app, these would be API calls to your backend
const mockLoginAPI = async (credentials) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock user credentials
  const mockUsers = [
    {
      email: 'demo@example.com',
      password: 'password123',
      _id: '1234567890',
      firstName: 'Demo',
      lastName: 'User',
      role: 'startup',
      isVerified: true,
      token: 'mock-jwt-token-demo'
    },
    {
      email: 'founder@example.com',
      password: 'founder123',
      _id: '2345678901',
      firstName: 'Founder',
      lastName: 'Example',
      role: 'startup',
      isVerified: true,
      token: 'mock-jwt-token-founder'
    },
    {
      email: 'investor@example.com',
      password: 'investor123',
      _id: '3456789012',
      firstName: 'Angel',
      lastName: 'Investor',
      role: 'investor',
      isVerified: true,
      token: 'mock-jwt-token-investor'
    },
    {
      email: 'admin@example.com',
      password: 'admin123',
      _id: '4567890123',
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
      isVerified: true,
      token: 'mock-jwt-token-admin'
    }
  ];
  
  // Find matching user
  const user = mockUsers.find(
    u => u.email === credentials.email && u.password === credentials.password
  );
  
  if (user) {
    return {
      success: true,
      data: { ...user }
    };
  }
  
  // Mock error
  throw new Error('Invalid email or password');
};

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const { login } = useUser();

  // Formik setup for form handling with Yup validation
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .required('Password is required'),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await mockLoginAPI(values);
        if (response.success) {
          // Save user to context
          login(response.data);
          
          // Redirect based on user role
          if (response.data.role === 'startup') {
            navigate('/startup/dashboard');
          } else if (response.data.role === 'investor') {
            navigate('/investor/dashboard');
          } else if (response.data.role === 'admin') {
            navigate('/admin/dashboard');
          } else {
            navigate('/');
          }
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="min-h-[80vh] w-full bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-dark-900 dark:via-dark-800 dark:to-dark-700 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-300/20 dark:bg-primary-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary-300/20 dark:bg-secondary-600/10 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-10"></div>
      </div>
      
      {/* Main content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full z-10"
      >
        <div className="glass-card p-8 md:p-10 backdrop-blur-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Sign in to continue your journey
            </p>
          </div>
          
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-red-100/80 dark:bg-red-900/30 backdrop-blur-sm border-l-4 border-red-500 p-4 mb-6 rounded"
            >
              <div className="flex items-center">
                <FaExclamationCircle className="text-red-500 mr-3 flex-shrink-0" />
                <p className="text-red-700 dark:text-red-300">{error}</p>
              </div>
            </motion.div>
          )}
          
          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className={`input pl-10 w-full ${
                    formik.touched.email && formik.errors.email 
                      ? 'border-red-300 dark:border-red-500 focus:ring-red-500 dark:focus:ring-red-400' 
                      : ''
                  }`}
                  placeholder="Your email address"
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formik.errors.email}</p>
              )}
            </div>
            
            {/* Password Input */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 transition-colors">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className={`input pl-10 w-full ${
                    formik.touched.password && formik.errors.password 
                      ? 'border-red-300 dark:border-red-500 focus:ring-red-500 dark:focus:ring-red-400' 
                      : ''
                  }`}
                  placeholder="Your password"
                />
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formik.errors.password}</p>
              )}
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Remember me
              </label>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`btn btn-primary w-full py-2.5 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : 'Sign in'}
              </button>
            </div>
          </form>
          
          <div className="mt-6 flex items-center justify-center">
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              Don't have an account?
            </span>
            <Link 
              to="/register" 
              className="ml-2 text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
            >
              Sign up now
            </Link>
          </div>
          
          <div className="mt-6 pt-5 border-t border-gray-200 dark:border-gray-700">
            <p className="text-center text-xs text-gray-500 dark:text-gray-400 mb-2">
              Available test accounts:
            </p>
            <div className="flex flex-col gap-1">
              <p className="text-center text-xs text-gray-500 dark:text-gray-400">
                <span className="font-medium">demo@example.com</span> / <span className="font-medium">password123</span> (Startup)
              </p>
              <p className="text-center text-xs text-gray-500 dark:text-gray-400">
                <span className="font-medium">founder@example.com</span> / <span className="font-medium">founder123</span> (Startup)
              </p>
              <p className="text-center text-xs text-gray-500 dark:text-gray-400">
                <span className="font-medium">investor@example.com</span> / <span className="font-medium">investor123</span> (Investor)
              </p>
              <p className="text-center text-xs text-gray-500 dark:text-gray-400">
                <span className="font-medium">admin@example.com</span> / <span className="font-medium">admin123</span> (Admin)
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage; 