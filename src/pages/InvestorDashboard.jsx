import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaSearch, FaRegStar, FaCalendarAlt, FaChartLine, FaBriefcase, FaLightbulb, FaExternalLinkAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';
import InvestorProfileForm from '../components/InvestorProfileForm';

const InvestorDashboard = () => {
  const [activeTab, setActiveTab] = useState('discover');
  const { darkMode } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const { currentUser, investorProfile, updateInvestorProfile } = useUser();
  
  const [startups, setStartups] = useState([]);
  const [filteredStartups, setFilteredStartups] = useState([]);
  const [savedStartups, setSavedStartups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  // Fetch startups on component mount
  useEffect(() => {
    // In a real app, this would be an API call
    // For demo purposes, we're using mock data
    setTimeout(() => {
      const mockStartups = [
        {
          id: '1',
          name: 'TechInnovate',
          logo: 'TI',
          industry: ['SaaS', 'AI', 'Productivity'],
          description: 'An AI-powered productivity solution for remote teams.',
          stage: 'Early Traction',
          location: 'San Francisco, CA',
          foundingDate: '2022-01-15',
          match: 95,
          metrics: {
            users: 320,
            growth: '18%'
          },
          funding: {
            raised: '$500K',
            seeking: '$2M',
            valuation: '$5M'
          }
        },
        {
          id: '2',
          name: 'FinFlow',
          logo: 'FF',
          industry: ['FinTech', 'Payments'],
          description: 'Simplified business expense management platform for SMBs.',
          stage: 'Seed',
          location: 'New York, NY',
          foundingDate: '2021-11-05',
          match: 87,
          metrics: {
            users: 165,
            growth: '22%'
          },
          funding: {
            raised: '$750K',
            seeking: '$1.5M',
            valuation: '$4M'
          }
        },
        {
          id: '3',
          name: 'CloudSecure',
          logo: 'CS',
          industry: ['Cybersecurity', 'Cloud'],
          description: 'Advanced cloud security for enterprise systems with AI-driven threat detection.',
          stage: 'Series A',
          location: 'Boston, MA',
          foundingDate: '2020-03-22',
          match: 82,
          metrics: {
            users: 78,
            growth: '35%'
          },
          funding: {
            raised: '$3M',
            seeking: '$7M',
            valuation: '$15M'
          }
        },
        {
          id: '4',
          name: 'HealthSync',
          logo: 'HS',
          industry: ['HealthTech', 'AI'],
          description: 'Remote patient monitoring platform using wearable technology.',
          stage: 'Pre-seed',
          location: 'Austin, TX',
          foundingDate: '2022-05-10',
          match: 78,
          metrics: {
            users: 45,
            growth: '12%'
          },
          funding: {
            raised: '$250K',
            seeking: '$1M',
            valuation: '$3M'
          }
        },
        {
          id: '5',
          name: 'GreenEnergy',
          logo: 'GE',
          industry: ['CleanTech', 'Energy'],
          description: 'Renewable energy storage solutions for residential applications.',
          stage: 'Seed',
          location: 'Denver, CO',
          foundingDate: '2021-09-15',
          match: 75,
          metrics: {
            users: 120,
            growth: '28%'
          },
          funding: {
            raised: '$1.2M',
            seeking: '$3M',
            valuation: '$8M'
          }
        },
        {
          id: '6',
          name: 'DataSync',
          logo: 'DS',
          industry: ['SaaS', 'Data Analytics'],
          description: 'Real-time data synchronization across platforms with advanced analytics.',
          stage: 'MVP',
          location: 'Seattle, WA',
          foundingDate: '2022-07-20',
          match: 70,
          metrics: {
            users: 30,
            growth: '25%'
          },
          funding: {
            raised: '$150K',
            seeking: '$800K',
            valuation: '$2M'
          }
        }
      ];

      // Get saved startups from localStorage or use empty array
      const savedStartupsFromStorage = JSON.parse(localStorage.getItem('saved_startups')) || [];
      
      setStartups(mockStartups);
      setFilteredStartups(mockStartups);
      setSavedStartups(savedStartupsFromStorage);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter startups based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredStartups(startups);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = startups.filter(startup => 
        startup.name.toLowerCase().includes(query) ||
        startup.description.toLowerCase().includes(query) ||
        startup.industry.some(ind => ind.toLowerCase().includes(query))
      );
      setFilteredStartups(filtered);
    }
  }, [searchQuery, startups]);

  const handleSaveProfile = (updatedProfile) => {
    // Maintain the metrics which shouldn't be editable by the user
    const updatedProfileWithMetrics = {
      ...updatedProfile,
      metrics: investorProfile.metrics,
      // Calculate profile completion based on filled fields
      profileCompletion: calculateProfileCompletion(updatedProfile)
    };
    
    updateInvestorProfile(updatedProfileWithMetrics);
    setIsEditing(false);
    // In a real application, you would save to backend here
    console.log('Profile updated:', updatedProfileWithMetrics);
  };

  const calculateProfileCompletion = (profile) => {
    const requiredFields = [
      'displayName', 
      'type', 
      'bio'
    ];
    
    const preferenceFields = [
      profile.investmentPreferences.industries.length > 0,
      profile.investmentPreferences.stages.length > 0,
      profile.investmentPreferences.investmentSize.min > 0,
      profile.investmentPreferences.investmentSize.max > 0
    ];
    
    const filled = requiredFields.filter(field => !!profile[field]).length;
    const preferencesFilled = preferenceFields.filter(Boolean).length;
    
    // Calculate percentage based on required fields (60% weight) and preferences (40% weight)
    return Math.round((filled / requiredFields.length * 60) + (preferencesFilled / preferenceFields.length * 40));
  };

  // Save startup function
  const handleSaveStartup = (startup) => {
    const isAlreadySaved = savedStartups.some(saved => saved.id === startup.id);
    
    if (!isAlreadySaved) {
      // Add saved date to the startup object
      const startupWithDate = {
        ...startup,
        savedDate: new Date().toISOString().split('T')[0] // Format: YYYY-MM-DD
      };
      
      const updatedSavedStartups = [...savedStartups, startupWithDate];
      setSavedStartups(updatedSavedStartups);
      
      // Save to localStorage for persistence
      localStorage.setItem('saved_startups', JSON.stringify(updatedSavedStartups));
      
      // Show success notification (in a real app)
      alert(`${startup.name} has been saved to your list`);
    } else {
      alert('This startup is already in your saved list');
    }
  };

  // Remove startup from saved list
  const handleRemoveSavedStartup = (startupId) => {
    const updatedSavedStartups = savedStartups.filter(startup => startup.id !== startupId);
    setSavedStartups(updatedSavedStartups);
    
    // Update localStorage
    localStorage.setItem('saved_startups', JSON.stringify(updatedSavedStartups));
    
    // Show success notification (in a real app)
    alert('Startup removed from your saved list');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'discover':
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible" 
            className="glass-card backdrop-blur-md p-6"
          >
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Discover Startups</h3>
              <div className="flex items-center gap-3">
                <div className="relative max-w-md w-full">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="text-gray-400 dark:text-gray-500" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search by name, industry, or stage..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input pl-10 pr-4 py-2 w-full focus:ring-primary-500 dark:focus:ring-primary-400"
                  />
                </div>
                <Link 
                  to="/startups" 
                  className="btn btn-secondary flex items-center gap-1"
                >
                  <span>View All Startups</span>
                  <FaExternalLinkAlt size={12} />
                </Link>
              </div>
            </motion.div>
            
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="relative w-16 h-16">
                  <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-t-primary-500 border-r-transparent border-b-secondary-500 border-l-transparent animate-spin"></div>
                  <div className="absolute top-2 left-2 w-12 h-12 rounded-full border-4 border-t-transparent border-r-accent-500 border-b-transparent border-l-accent-300 animate-spin-slow"></div>
                </div>
              </div>
            ) : (
              <>
                {filteredStartups.length === 0 ? (
                  <div className="glass-card p-8 text-center">
                    <FaSearch className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No startups found</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Try adjusting your search criteria
                    </p>
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="btn btn-primary"
                    >
                      Clear Search
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {filteredStartups.map(startup => (
                      <motion.div 
                        key={startup.id} 
                        variants={itemVariants}
                        className="glass-card bg-white/60 dark:bg-dark-800/60 border border-gray-200 dark:border-dark-700 rounded-lg p-5 hover:shadow-lg transition-all duration-300 group"
                      >
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center flex-shrink-0 shadow-md shadow-primary-500/20">
                              <span className="text-white text-lg font-bold">{startup.logo}</span>
                            </div>
                            <div className="flex-grow">
                              <div className="flex flex-wrap items-center gap-2 mb-2">
                                <h4 className="font-semibold text-lg text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                  {startup.name}
                                </h4>
                                <span className="bg-green-100/80 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                  {startup.stage}
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-2 mb-2">
                                {startup.industry.map((tag, index) => (
                                  <span 
                                    key={index} 
                                    className="bg-primary-100/80 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-medium px-2.5 py-0.5 rounded-full"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                              <p className="text-gray-600 dark:text-gray-300 text-sm">{startup.description}</p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end md:pl-4">
                            <div className="mb-3 flex items-center">
                              <div className="w-16 h-16 relative">
                                <svg viewBox="0 0 36 36" className="w-16 h-16 transform -rotate-90">
                                  <path
                                    className="shadow-path fill-none stroke-gray-200 dark:stroke-dark-600"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                  />
                                  <path
                                    className="fill-none stroke-primary-500 dark:stroke-primary-400"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    strokeWidth="3"
                                    strokeDasharray={`${startup.match}, 100`}
                                    strokeLinecap="round"
                                  />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <span className="text-lg font-bold text-primary-600 dark:text-primary-400">{startup.match}%</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <button 
                                className="btn btn-ghost p-2"
                                onClick={() => handleSaveStartup(startup)}
                                disabled={savedStartups.some(saved => saved.id === startup.id)}
                              >
                                <FaRegStar className={`mr-1 ${savedStartups.some(saved => saved.id === startup.id) ? 'text-yellow-500' : 'text-primary-500 dark:text-primary-400'}`} /> 
                                {savedStartups.some(saved => saved.id === startup.id) ? 'Saved' : 'Save'}
                              </button>
                              <Link 
                                to={`/startups/${startup.id}`} 
                                className="btn btn-primary py-2 px-4"
                              >
                                View Profile
                              </Link>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </>
            )}
          </motion.div>
        );
      case 'saved':
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="glass-card backdrop-blur-md p-6"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Saved Startups</h3>
              <p className="text-gray-600 dark:text-gray-400">Startups you've saved for later review</p>
            </motion.div>
            
            {savedStartups.length > 0 ? (
              <div className="space-y-6">
                {savedStartups.map(startup => (
                  <motion.div 
                    key={startup.id} 
                    variants={itemVariants}
                    className="glass-card bg-white/60 dark:bg-dark-800/60 border border-gray-200 dark:border-dark-700 rounded-lg p-5 hover:shadow-md transition-all group"
                  >
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-secondary-500 to-accent-500 flex items-center justify-center flex-shrink-0 shadow-md shadow-secondary-500/20">
                          <span className="text-white text-lg font-bold">{startup.logo}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg text-gray-900 dark:text-white group-hover:text-secondary-600 dark:group-hover:text-secondary-400 transition-colors mb-2">
                            {startup.name}
                          </h4>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {startup.industry.map((tag, index) => (
                              <span 
                                key={index} 
                                className="bg-secondary-100/80 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-300 text-xs font-medium px-2.5 py-0.5 rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{startup.description}</p>
                          <p className="text-gray-500 dark:text-gray-400 text-xs">Saved on {startup.savedDate}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2 md:pl-4 md:flex-shrink-0">
                        <button 
                          className="btn btn-ghost p-2 text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                          onClick={() => handleRemoveSavedStartup(startup.id)}
                        >
                          Remove
                        </button>
                        <Link 
                          to={`/startups/${startup.id}`}
                          className="btn btn-primary py-2 px-4"
                        >
                          View Profile
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div 
                variants={itemVariants}
                className="glass-card bg-white/60 dark:bg-dark-800/60 p-8 rounded-lg text-center"
              >
                <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-dark-700 rounded-full flex items-center justify-center mb-4">
                  <FaRegStar className="text-gray-400 dark:text-gray-500 text-xl" />
                </div>
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No saved startups yet</h4>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  When you find interesting startups, save them here for quick access
                </p>
                <button 
                  className="btn btn-primary"
                  onClick={() => setActiveTab('discover')}
                >
                  Discover Startups
                </button>
              </motion.div>
            )}
          </motion.div>
        );
      case 'profile':
        return renderProfileTab();
      default:
        return null;
    }
  };

  const renderProfileTab = () => {
    // Add debugging info
    console.log("Rendering profile tab with investorProfile:", investorProfile);
    
    if (isEditing) {
      return (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <InvestorProfileForm
            initialData={investorProfile || {}}
            onSave={handleSaveProfile}
            onCancel={() => setIsEditing(false)}
          />
        </motion.div>
      );
    }

    try {
      // Safe check for investorProfile existence
      if (!investorProfile) {
        return (
          <div className="text-center py-12 glass-card backdrop-blur-md p-8">
            <div className="text-7xl mb-6 text-gray-300 flex justify-center">
              <FaUser className="opacity-50" />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Your investor profile is not yet complete</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">Create your investor profile to showcase your investment interests and connect with promising startups.</p>
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-primary px-6 py-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
            >
              Create Profile
            </button>
          </div>
        );
      }

      // Safe access to properties with optional chaining
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Profile Header */}
          <div className="glass-card backdrop-blur-md overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-dark-600">
              <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                <div className="flex-grow">
                  <div className="flex items-center mb-4">
                    <div className="h-16 w-16 bg-gradient-to-tr from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4 shadow-lg">
                      {investorProfile?.displayName?.charAt(0) || 'I'}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{investorProfile?.displayName || 'Your Investor Profile'}</h2>
                      <div className="flex items-center mt-1">
                        <span className="inline-block bg-gray-100/80 dark:bg-dark-700/80 text-gray-800 dark:text-gray-200 text-xs font-medium px-2.5 py-1 rounded-full mr-2">
                          {investorProfile?.type || 'Investor'}
                        </span>
                        {investorProfile?.verified && (
                          <span className="bg-green-100/80 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium px-3 py-1 rounded-full flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                            </svg>
                            Verified
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">{investorProfile?.bio || 'No bio provided yet.'}</p>
                </div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn btn-primary flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                  </svg>
                  Edit Profile
                </button>
              </div>

              <div className="mb-2">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-gray-700 dark:text-gray-300">Profile Completion</h4>
                  <span className="text-sm font-medium text-primary-600 dark:text-primary-400">{investorProfile?.profileCompletion || 0}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-dark-600 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${investorProfile?.profileCompletion || 0}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Investment Activity</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="glass-card p-4 bg-white/50 dark:bg-dark-800/50">
                    <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Startups Viewed</h5>
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">{investorProfile?.metrics?.startupsViewed || 0}</span>
                  </div>
                  <div className="glass-card p-4 bg-white/50 dark:bg-dark-800/50">
                    <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Meetings Requested</h5>
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">{investorProfile?.metrics?.meetingsRequested || 0}</span>
                  </div>
                  <div className="glass-card p-4 bg-white/50 dark:bg-dark-800/50">
                    <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Investments Made</h5>
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">{investorProfile?.metrics?.investmentsMade || 0}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Investment Preferences</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Industries</p>
                      <div className="flex flex-wrap gap-2">
                        {(investorProfile?.investmentPreferences?.industries || []).length > 0 ? (
                          investorProfile.investmentPreferences.industries.map((industry, index) => (
                            <span 
                              key={index} 
                              className="bg-primary-100/80 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-medium px-2.5 py-1 rounded-full"
                            >
                              {industry}
                            </span>
                          ))
                        ) : (
                          <p className="text-gray-500 dark:text-gray-400 text-sm italic">No industries specified</p>
                        )}
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Stages</p>
                      <div className="flex flex-wrap gap-2">
                        {(investorProfile?.investmentPreferences?.stages || []).length > 0 ? (
                          investorProfile.investmentPreferences.stages.map((stage, index) => (
                            <span 
                              key={index} 
                              className="bg-secondary-100/80 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-300 text-xs font-medium px-2.5 py-1 rounded-full"
                            >
                              {stage}
                            </span>
                          ))
                        ) : (
                          <p className="text-gray-500 dark:text-gray-400 text-sm italic">No stages specified</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Investment Size</p>
                    <div className="glass-card bg-white/50 dark:bg-dark-800/50 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Min</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Max</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-900 dark:text-white">${investorProfile?.investmentPreferences?.investmentSize?.min?.toLocaleString() || 0}</span>
                        <span className="text-gray-500 dark:text-gray-400">—</span>
                        <span className="font-bold text-gray-900 dark:text-white">${investorProfile?.investmentPreferences?.investmentSize?.max?.toLocaleString() || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      );
    } catch (error) {
      console.error("Error rendering profile tab:", error);
      return (
        <div className="glass-card backdrop-blur-md p-6 text-center">
          <div className="text-5xl mb-4 text-red-400 flex justify-center">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Error displaying profile</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">We encountered an error while loading your profile. Please try again.</p>
          <button
            onClick={() => setIsEditing(true)}
            className="btn btn-primary"
          >
            Edit Profile
          </button>
        </div>
      );
    }
  };

  return (
    <div className="min-h-[80vh] w-full bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-dark-900 dark:via-dark-800 dark:to-dark-700 py-8 px-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-secondary-300/10 dark:bg-secondary-600/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-24 w-96 h-96 bg-primary-300/10 dark:bg-primary-600/5 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-[0.03]"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white gradient-text">Investor Dashboard</h2>
          <div className="flex items-center gap-3">
            <span className="text-gray-600 dark:text-gray-400">
              Welcome back, {currentUser?.firstName || 'Investor'}
            </span>
            <div className="w-10 h-10 rounded-full bg-secondary-100 dark:bg-secondary-900/50 flex items-center justify-center">
              <FaUser className="text-secondary-600 dark:text-secondary-400" />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass-card backdrop-blur-md p-4 sticky top-8">
              <div className="mb-6 flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-secondary-500 to-primary-500 flex items-center justify-center mb-3 shadow-lg shadow-secondary-500/20">
                  <span className="text-white text-2xl font-bold">
                    {investorProfile.displayName.charAt(0)}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-center">{currentUser?.firstName} {currentUser?.lastName}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">{currentUser?.email}</p>
              </div>
              
              <nav className="space-y-1">
                <button
                  className={`w-full text-left p-3 rounded-lg flex items-center transition-all ${
                    activeTab === 'discover' 
                      ? 'bg-secondary-100/60 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-300 font-medium' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-dark-700/50'
                  }`}
                  onClick={() => setActiveTab('discover')}
                >
                  <FaSearch className="mr-3" />
                  <span>Discover Startups</span>
                </button>
                <button
                  className={`w-full text-left p-3 rounded-lg flex items-center transition-all ${
                    activeTab === 'saved' 
                      ? 'bg-secondary-100/60 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-300 font-medium' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-dark-700/50'
                  }`}
                  onClick={() => setActiveTab('saved')}
                >
                  <FaRegStar className="mr-3" />
                  <span>Saved Startups</span>
                </button>
                <button
                  className={`w-full text-left p-3 rounded-lg flex items-center transition-all ${
                    activeTab === 'profile' 
                      ? 'bg-secondary-100/60 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-300 font-medium' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-dark-700/50'
                  }`}
                  onClick={() => setActiveTab('profile')}
                >
                  <FaBriefcase className="mr-3" />
                  <span>Investor Profile</span>
                </button>
              </nav>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-dark-700">
                <div className="glass-card bg-secondary-50/50 dark:bg-secondary-900/20 p-4 rounded-lg">
                  <div className="flex items-center mb-3">
                    <FaLightbulb className="text-secondary-500 mr-2" />
                    <h4 className="font-medium text-gray-900 dark:text-white">Tip</h4>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Define specific investment criteria to get better startup recommendations.
                  </p>
                </div>
                <div className="mt-4">
                  <Link
                    to="/startups"
                    className="btn btn-primary w-full flex items-center justify-center gap-2"
                  >
                    <FaSearch className="mr-1" />
                    <span>Browse All Startups</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorDashboard; 