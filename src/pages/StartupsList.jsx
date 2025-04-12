import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSearch, FaFilter, FaBuilding, FaExternalLinkAlt } from 'react-icons/fa';

const StartupsList = () => {
  const [startups, setStartups] = useState([]);
  const [filteredStartups, setFilteredStartups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

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

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    // Simulate API call
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
      setStartups(mockStartups);
      setFilteredStartups(mockStartups);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Apply filters and search when any filter changes
    let results = startups;
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(startup => 
        startup.name.toLowerCase().includes(query) ||
        startup.description.toLowerCase().includes(query) ||
        startup.industry.some(ind => ind.toLowerCase().includes(query))
      );
    }
    
    // Apply stage filter
    if (filter !== 'all') {
      results = results.filter(startup => startup.stage === filter);
    }
    
    setFilteredStartups(results);
  }, [searchQuery, filter, startups]);

  const stageOptions = [
    { value: 'all', label: 'All Stages' },
    { value: 'Pre-seed', label: 'Pre-seed' },
    { value: 'MVP', label: 'MVP' },
    { value: 'Seed', label: 'Seed' },
    { value: 'Early Traction', label: 'Early Traction' },
    { value: 'Series A', label: 'Series A' }
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="relative w-16 h-16">
          <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-t-primary-500 border-r-transparent border-b-secondary-500 border-l-transparent animate-spin"></div>
          <div className="absolute top-2 left-2 w-12 h-12 rounded-full border-4 border-t-transparent border-r-accent-500 border-b-transparent border-l-accent-300 animate-spin-slow"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] w-full bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-dark-900 dark:via-dark-800 dark:to-dark-700 py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-300/10 dark:bg-primary-600/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-24 w-96 h-96 bg-secondary-300/10 dark:bg-secondary-600/5 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-[0.03]"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3 gradient-text">
            Discover Promising Startups
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Browse innovative startups across various industries and stages
          </p>
        </div>

        <div className="mb-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="relative w-full md:max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400 dark:text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search by name, industry or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-10 pr-4 py-2 w-full focus:ring-primary-500 dark:focus:ring-primary-400"
            />
          </div>
          
          <div className="w-full md:w-auto flex items-center">
            <button 
              onClick={() => setShowFilters(!showFilters)} 
              className="flex items-center gap-2 btn btn-ghost mr-2"
            >
              <FaFilter /> 
              <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
            </button>
            
            {showFilters && (
              <div className="flex flex-wrap gap-2">
                <select 
                  value={filter} 
                  onChange={(e) => setFilter(e.target.value)}
                  className="input py-2"
                >
                  {stageOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {filteredStartups.length === 0 ? (
          <div className="glass-card p-8 text-center">
            <FaBuilding className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No startups found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Try adjusting your search or filter criteria
            </p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setFilter('all');
              }}
              className="btn btn-primary"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {filteredStartups.map(startup => (
              <motion.div 
                key={startup.id} 
                variants={itemVariants}
                className="glass-card bg-white/60 dark:bg-dark-800/60 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center flex-shrink-0 text-white font-bold shadow-md">
                      {startup.logo}
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                          {startup.name}
                        </h3>
                        <span className="bg-primary-100/80 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          {startup.stage}
                        </span>
                      </div>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
                        {startup.location} • Founded {new Date(startup.foundingDate).getFullYear()}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {startup.industry.map((tag, index) => (
                          <span 
                            key={index} 
                            className="bg-gray-100/80 dark:bg-dark-700/80 text-gray-700 dark:text-gray-300 text-xs font-medium px-2 py-0.5 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                        {startup.description}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-gray-50/80 dark:bg-dark-700/60 p-2 rounded">
                          <p className="text-xs text-gray-500 dark:text-gray-400">Funding Raised</p>
                          <p className="font-semibold text-gray-900 dark:text-white">{startup.funding.raised}</p>
                        </div>
                        <div className="bg-gray-50/80 dark:bg-dark-700/60 p-2 rounded">
                          <p className="text-xs text-gray-500 dark:text-gray-400">Seeking</p>
                          <p className="font-semibold text-gray-900 dark:text-white">{startup.funding.seeking}</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <span className="inline-block bg-green-100/80 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium px-2 py-0.5 rounded-full">
                            {startup.metrics.growth} growth
                          </span>
                        </div>
                        <Link 
                          to={`/startups/${startup.id}`}
                          className="btn btn-primary flex items-center gap-1 text-sm"
                        >
                          <span>View Profile</span>
                          <FaExternalLinkAlt size={12} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default StartupsList; 