import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaGlobe, FaLinkedin, FaTwitter, FaFileAlt, FaCalendarCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';

const StartupProfile = () => {
  const { id } = useParams();
  const [startup, setStartup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { darkMode } = useTheme();
  const { currentUser } = useUser();

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

  useEffect(() => {
    const fetchStartupData = async () => {
      try {
        setLoading(true);
        
        // Mock data for demonstration - in a real app this would be from an API
        const mockStartups = [
          {
            id: '1',
            name: 'TechInnovate',
            logo: 'TI',
            foundedYear: 2022,
            location: 'San Francisco, CA',
            industry: ['SaaS', 'AI', 'Productivity'],
            description: 'An AI-powered productivity solution for remote teams that leverages machine learning to optimize workflow efficiency, automate repetitive tasks, and provide actionable insights for team performance.',
            founders: [
              { name: 'Jane Smith', position: 'CEO', linkedin: 'https://linkedin.com/in/jane-smith' },
              { name: 'Michael Chen', position: 'CTO', linkedin: 'https://linkedin.com/in/michael-chen' },
            ],
            funding: {
              stage: 'Early Traction',
              raised: '$500K',
              valuation: '$5M',
              seeking: '$2M',
              useOfFunds: 'Product development, scaling sales team, and marketing initiatives'
            },
            pitchDeck: 'https://example.com/pitch-deck.pdf',
            website: 'https://techinnovate.example.com',
            socialMedia: {
              twitter: 'https://twitter.com/techinnovate',
              linkedin: 'https://linkedin.com/company/techinnovate'
            },
            metrics: {
              revenue: '$25K MRR',
              growth: '18% MoM',
              users: 320,
              customers: '15 enterprise clients'
            },
            pitch: {
              tagline: 'AI-powered productivity for modern teams',
              problem: 'Remote teams struggle with coordination, communication gaps, and productivity tracking, leading to inefficiency and burnout.',
              solution: 'Our AI platform analyzes work patterns, automates routine tasks, and provides real-time insights to optimize team productivity.',
              traction: 'Grown from 0 to 320 users in 6 months with 15 paying enterprise customers and 18% month-over-month growth.',
              businessModel: 'SaaS subscription model with tiered pricing based on team size and feature access. Current ARPU is $450/month.'
            }
          },
          {
            id: '2',
            name: 'FinFlow',
            logo: 'FF',
            foundedYear: 2021,
            location: 'New York, NY',
            industry: ['FinTech', 'Payments'],
            description: 'Simplified business expense management platform for SMBs that streamlines expense reporting, approval workflows, and integrates seamlessly with accounting software.',
            founders: [
              { name: 'Alicia Johnson', position: 'CEO', linkedin: 'https://linkedin.com/in/alicia-johnson' },
              { name: 'David Park', position: 'COO', linkedin: 'https://linkedin.com/in/david-park' },
            ],
            funding: {
              stage: 'Seed',
              raised: '$750K',
              valuation: '$4M',
              seeking: '$1.5M',
              useOfFunds: 'Engineering team growth, compliance certifications, and market expansion'
            },
            pitchDeck: 'https://example.com/finflow-pitch.pdf',
            website: 'https://finflow.example.com',
            socialMedia: {
              twitter: 'https://twitter.com/finflow',
              linkedin: 'https://linkedin.com/company/finflow'
            },
            metrics: {
              revenue: '$35K MRR',
              growth: '22% MoM',
              users: 165,
              customers: '28 SMB clients'
            },
            pitch: {
              tagline: 'Expense management reimagined for small businesses',
              problem: 'Small businesses waste hours on manual expense tracking with outdated tools, causing delays, errors, and compliance risks.',
              solution: 'Our platform automates the entire expense lifecycle with smart receipt scanning, approval workflows, and accounting integrations.',
              traction: '28 paying SMB clients with 165 active users and 22% month-over-month growth.',
              businessModel: 'Subscription model with base platform fee plus per-user pricing. Current ARPU is $250/month.'
            }
          },
          {
            id: '3',
            name: 'CloudSecure',
            logo: 'CS',
            foundedYear: 2020,
            location: 'Boston, MA',
            industry: ['Cybersecurity', 'Cloud'],
            description: 'Advanced cloud security for enterprise systems with AI-driven threat detection that continuously monitors cloud environments for vulnerabilities and potential breaches.',
            founders: [
              { name: 'Robert Williams', position: 'CEO', linkedin: 'https://linkedin.com/in/robert-williams' },
              { name: 'Sarah Patel', position: 'CTO', linkedin: 'https://linkedin.com/in/sarah-patel' },
            ],
            funding: {
              stage: 'Series A',
              raised: '$3M',
              valuation: '$15M',
              seeking: '$7M',
              useOfFunds: 'Scaling sales operations, expanding security research team, and international expansion'
            },
            pitchDeck: 'https://example.com/cloudsecure-pitch.pdf',
            website: 'https://cloudsecure.example.com',
            socialMedia: {
              twitter: 'https://twitter.com/cloudsecure',
              linkedin: 'https://linkedin.com/company/cloudsecure'
            },
            metrics: {
              revenue: '$180K MRR',
              growth: '35% MoM',
              users: 78,
              customers: '12 enterprise clients'
            },
            pitch: {
              tagline: 'Intelligent cloud security for the enterprise',
              problem: 'Enterprises face increasingly sophisticated cloud-based attacks while lacking visibility into their distributed cloud environments.',
              solution: 'Our AI-powered platform provides continuous monitoring, automated threat response, and comprehensive security posture management.',
              traction: 'Secured 12 enterprise deals averaging $15K MRR each with 35% quarter-over-quarter growth.',
              businessModel: 'Enterprise SaaS model with annual contracts based on cloud footprint size and required security features.'
            }
          }
        ];
        
        // Find the startup with the matching ID
        const startupData = mockStartups.find(s => s.id === id);
        
        if (startupData) {
          // Simulate API delay
          setTimeout(() => {
            setStartup(startupData);
            setLoading(false);
          }, 800);
        } else {
          setError('Startup not found');
          setLoading(false);
        }
        
      } catch (err) {
        setError('Failed to fetch startup data');
        setLoading(false);
        console.error(err);
      }
    };

    fetchStartupData();
  }, [id]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-t-primary-500 border-r-transparent border-b-secondary-500 border-l-transparent animate-spin"></div>
        <div className="absolute top-2 left-2 w-12 h-12 rounded-full border-4 border-t-transparent border-r-accent-500 border-b-transparent border-l-accent-300 animate-spin-slow"></div>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-[60vh] flex justify-center items-center px-4">
      <div className="glass-card p-8 text-center max-w-md">
        <div className="text-red-500 dark:text-red-400 text-5xl mb-4">⚠️</div>
        <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">{error}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">We couldn't find the startup information you're looking for.</p>
        <Link to="/startups" className="btn btn-primary">
          Back to Startups
        </Link>
      </div>
    </div>
  );

  if (!startup) return null;

  const isInvestor = currentUser && currentUser.role === 'investor';

  return (
    <div className="min-h-[80vh] w-full bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-dark-900 dark:via-dark-800 dark:to-dark-700 py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-300/10 dark:bg-primary-600/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-24 w-96 h-96 bg-secondary-300/10 dark:bg-secondary-600/5 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-[0.03]"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <Link to="/startups" className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mb-6 transition-colors">
          <FaArrowLeft className="mr-2" />
          Back to Startups
        </Link>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div 
            variants={itemVariants}
            className="glass-card backdrop-blur-md p-6 md:p-8 mb-6"
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center flex-shrink-0 text-white font-bold text-3xl shadow-lg shadow-primary-500/20">
                {startup.logo}
              </div>
              <div className="flex-grow text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {startup.name}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">{startup.pitch?.tagline}</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                  {startup.industry.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 rounded-full text-sm font-medium bg-primary-100/80 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300"
                    >
                      {tag}
                    </span>
                  ))}
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-secondary-100/80 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-300">
                    {startup.funding.stage}
                  </span>
                </div>
                <div className="text-gray-500 dark:text-gray-400 text-sm">
                  {startup.location} • Founded {startup.foundedYear}
                </div>
              </div>
              {isInvestor && (
                <div className="flex flex-col gap-3">
                  <button className="btn btn-primary flex items-center justify-center gap-2">
                    <FaCalendarCheck className="text-lg" />
                    <span>Request Meeting</span>
                  </button>
                  <button className="btn btn-ghost border border-gray-200 dark:border-dark-600 flex items-center justify-center gap-2">
                    <FaFileAlt className="text-lg" />
                    <span>View Pitch Deck</span>
                  </button>
                </div>
              )}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Company Description */}
              <motion.div 
                variants={itemVariants}
                className="glass-card backdrop-blur-md p-6"
              >
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Company Overview</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  {startup.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">The Problem</h3>
                    <p className="text-gray-600 dark:text-gray-400">{startup.pitch?.problem}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Our Solution</h3>
                    <p className="text-gray-600 dark:text-gray-400">{startup.pitch?.solution}</p>
                  </div>
                </div>
              </motion.div>

              {/* Traction & Metrics */}
              <motion.div 
                variants={itemVariants}
                className="glass-card backdrop-blur-md p-6"
              >
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Traction & Metrics</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  {startup.pitch?.traction}
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white/50 dark:bg-dark-800/50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                      {startup.metrics?.revenue}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Revenue</div>
                  </div>
                  <div className="bg-white/50 dark:bg-dark-800/50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {startup.metrics?.growth}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Growth</div>
                  </div>
                  <div className="bg-white/50 dark:bg-dark-800/50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {startup.metrics?.users}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Users</div>
                  </div>
                  <div className="bg-white/50 dark:bg-dark-800/50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-accent-600 dark:text-accent-400">
                      {startup.metrics?.customers}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Customers</div>
                  </div>
                </div>
              </motion.div>

              {/* Business Model */}
              <motion.div 
                variants={itemVariants}
                className="glass-card backdrop-blur-md p-6"
              >
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Business Model</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  {startup.pitch?.businessModel}
                </p>
              </motion.div>

              {/* Team */}
              <motion.div 
                variants={itemVariants}
                className="glass-card backdrop-blur-md p-6"
              >
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Founding Team</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {startup.founders.map((founder, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-secondary-500 to-accent-500 flex items-center justify-center text-white font-bold text-xl shadow-md">
                        {founder.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">{founder.name}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-1">{founder.position}</p>
                        <a 
                          href={founder.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm"
                        >
                          <FaLinkedin className="mr-1" /> LinkedIn
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Funding Information */}
              <motion.div 
                variants={itemVariants}
                className="glass-card backdrop-blur-md p-6"
              >
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Funding</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-gray-200 dark:border-dark-600 pb-3">
                    <span className="text-gray-600 dark:text-gray-400">Stage</span>
                    <span className="font-medium text-gray-900 dark:text-white">{startup.funding.stage}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-200 dark:border-dark-600 pb-3">
                    <span className="text-gray-600 dark:text-gray-400">Raised</span>
                    <span className="font-medium text-gray-900 dark:text-white">{startup.funding.raised}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-200 dark:border-dark-600 pb-3">
                    <span className="text-gray-600 dark:text-gray-400">Valuation</span>
                    <span className="font-medium text-gray-900 dark:text-white">{startup.funding.valuation}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-200 dark:border-dark-600 pb-3">
                    <span className="text-gray-600 dark:text-gray-400">Seeking</span>
                    <span className="font-medium text-green-600 dark:text-green-400">{startup.funding.seeking}</span>
                  </div>
                </div>
                
                {startup.funding.useOfFunds && (
                  <div className="mt-4">
                    <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Use of Funds</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {startup.funding.useOfFunds}
                    </p>
                  </div>
                )}
                
                {isInvestor && (
                  <button className="w-full btn btn-primary mt-6">
                    Express Interest
                  </button>
                )}
              </motion.div>

              {/* Links & Resources */}
              <motion.div 
                variants={itemVariants}
                className="glass-card backdrop-blur-md p-6"
              >
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Connect</h2>
                <div className="space-y-3">
                  <a 
                    href={startup.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700/50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <FaGlobe />
                    </div>
                    <div className="flex-grow">
                      <div className="font-medium text-gray-900 dark:text-white">Website</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                        {startup.website.replace('https://', '')}
                      </div>
                    </div>
                  </a>
                  
                  <a 
                    href={startup.socialMedia.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700/50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <FaLinkedin />
                    </div>
                    <div className="flex-grow">
                      <div className="font-medium text-gray-900 dark:text-white">LinkedIn</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Company Page
                      </div>
                    </div>
                  </a>
                  
                  <a 
                    href={startup.socialMedia.twitter} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700/50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <FaTwitter />
                    </div>
                    <div className="flex-grow">
                      <div className="font-medium text-gray-900 dark:text-white">Twitter</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        @{startup.socialMedia.twitter.split('/').pop()}
                      </div>
                    </div>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StartupProfile; 