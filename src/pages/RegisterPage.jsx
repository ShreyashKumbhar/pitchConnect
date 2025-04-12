import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaUser, FaEnvelope, FaLock, FaExclamationCircle } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';
import { motion } from 'framer-motion';

// In a real app, this would be an API call to your backend
const mockRegisterAPI = async (userData) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock successful registration
  return {
    success: true,
    data: {
      _id: '1234567890',
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      role: userData.role,
      isVerified: false,
      token: 'mock-jwt-token'
    }
  };
};

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const { register } = useUser();

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Formik setup for form handling with Yup validation
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'startup' // Default role
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .required('First name is required'),
      lastName: Yup.string()
        .required('Last name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
      role: Yup.string()
        .oneOf(['startup', 'investor'], 'Invalid role')
        .required('Role is required')
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await mockRegisterAPI(values);
        if (response.success) {
          // Save user to context
          register(response.data);
          
          // Redirect based on user role
          if (response.data.role === 'startup') {
            navigate('/startup/dashboard');
          } else if (response.data.role === 'investor') {
            navigate('/investor/dashboard');
          } else {
            navigate('/');
          }
        }
      } catch (error) {
        setError(error.message || 'Registration failed');
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
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="max-w-xl w-full z-10"
      >
        <div className="glass-card p-8 md:p-10 backdrop-blur-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Join PitchConnect
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Create your account and start connecting
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
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                I am registering as a:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className={`flex items-center justify-center px-4 py-3 rounded-lg border-2 transition-all ${
                    formik.values.role === 'startup'
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                      : 'border-gray-200 dark:border-dark-600 bg-white/60 dark:bg-dark-800/60 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-700/60'
                  }`}
                  onClick={() => formik.setFieldValue('role', 'startup')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                  Startup
                </button>
                <button
                  type="button"
                  className={`flex items-center justify-center px-4 py-3 rounded-lg border-2 transition-all ${
                    formik.values.role === 'investor'
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                      : 'border-gray-200 dark:border-dark-600 bg-white/60 dark:bg-dark-800/60 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-700/60'
                  }`}
                  onClick={() => formik.setFieldValue('role', 'investor')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                  </svg>
                  Investor
                </button>
              </div>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* First Name */}
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  First Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  </div>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstName}
                    className={`input pl-10 w-full ${
                      formik.touched.firstName && formik.errors.firstName
                        ? 'border-red-300 dark:border-red-500 focus:ring-red-500 dark:focus:ring-red-400'
                        : ''
                    }`}
                    placeholder="Your first name"
                  />
                </div>
                {formik.touched.firstName && formik.errors.firstName && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formik.errors.firstName}</p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Last Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  </div>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastName}
                    className={`input pl-10 w-full ${
                      formik.touched.lastName && formik.errors.lastName
                        ? 'border-red-300 dark:border-red-500 focus:ring-red-500 dark:focus:ring-red-400'
                        : ''
                    }`}
                    placeholder="Your last name"
                  />
                </div>
                {formik.touched.lastName && formik.errors.lastName && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formik.errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email Address
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

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    className={`input pl-10 w-full ${
                      formik.touched.password && formik.errors.password
                        ? 'border-red-300 dark:border-red-500 focus:ring-red-500 dark:focus:ring-red-400'
                        : ''
                    }`}
                    placeholder="Create a password"
                  />
                </div>
                {formik.touched.password && formik.errors.password && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formik.errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                    className={`input pl-10 w-full ${
                      formik.touched.confirmPassword && formik.errors.confirmPassword
                        ? 'border-red-300 dark:border-red-500 focus:ring-red-500 dark:focus:ring-red-400'
                        : ''
                    }`}
                    placeholder="Confirm your password"
                  />
                </div>
                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formik.errors.confirmPassword}</p>
                )}
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className={`btn btn-primary w-full py-3 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </span>
                ) : 'Create Account'}
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
              >
                Sign in instead
              </Link>
            </p>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-center text-xs text-gray-500 dark:text-gray-400">
              By creating an account, you agree to our{' '}
              <a href="#" className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage; 