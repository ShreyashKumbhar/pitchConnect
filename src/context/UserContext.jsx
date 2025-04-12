import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [startupProfile, setStartupProfile] = useState(() => {
    const savedProfile = localStorage.getItem('startupProfile');
    if (savedProfile) {
      return JSON.parse(savedProfile);
    }
    
    // Default startup profile
    return {
      companyName: 'TechInnovate AI',
      stage: 'Seed',
      foundedYear: 2022,
      location: 'San Francisco, CA',
      teamSize: 8,
      industry: ['Artificial Intelligence', 'Enterprise Software'],
      description: 'TechInnovate AI is developing a next-generation AI platform that helps businesses automate complex workflows and extract insights from unstructured data.',
      website: 'https://techinnovate.example.com',
      logo: null,
      verified: false,
      profileCompletion: 85,
      pitch: {
        tagline: 'AI-powered workflow automation for the enterprise',
        problem: 'Businesses struggle with inefficient manual processes and can\'t leverage their unstructured data effectively.',
        solution: 'Our AI platform automates complex workflows and extracts actionable insights from any data source.',
        traction: '15 enterprise clients, $300K ARR',
        market: '$50B TAM, growing at 25% annually',
        businessModel: 'SaaS subscription ($5K-$25K per month based on usage)',
        competitiveAdvantage: 'Proprietary LLM fine-tuning that requires 70% less training data'
      },
      funding: {
        raised: '$750K',
        seeking: '$2.5M',
        valuation: '$10M',
        use: 'Product development, expanding enterprise sales team'
      },
      metrics: {
        mtd: {
          revenue: 28000,
          growth: 15,
          users: 1240
        },
        ytd: {
          revenue: 240000,
          growth: 110,
          users: 5600
        }
      },
      pitchMaterials: [
        {
          id: 'pm-001',
          type: 'pitchDeck',
          name: 'Pitch Deck',
          fileFormat: 'PDF',
          fileSize: '3.5 MB',
          description: '12 slides covering our solution, market opportunity, traction, and team',
          dateAdded: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
          lastUpdated: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          url: '#',
          thumbnailUrl: '#'
        },
        {
          id: 'pm-002',
          type: 'financialProjections',
          name: 'Financial Projections',
          fileFormat: 'Excel',
          fileSize: '1.2 MB',
          description: '5-year forecast with detailed financial models',
          dateAdded: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
          lastUpdated: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          url: '#',
          thumbnailUrl: '#'
        },
        {
          id: 'pm-003',
          type: 'productDemo',
          name: 'Product Demo Video',
          fileFormat: 'MP4',
          fileSize: '28.5 MB',
          description: '3-minute walkthrough of our platform capabilities',
          dateAdded: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
          lastUpdated: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
          url: '#',
          thumbnailUrl: '#'
        }
      ],
      registeredEvents: []
    };
  });

  const [investorProfile, setInvestorProfile] = useState(() => {
    const savedProfile = localStorage.getItem('investorProfile');
    if (savedProfile) {
      return JSON.parse(savedProfile);
    }
    
    // Default investor profile
    return {
      displayName: 'Growth Ventures',
      type: 'Venture Capital',
      bio: 'We invest in early-stage B2B SaaS companies with a focus on AI, fintech, and healthcare technology. Looking for founders with deep domain expertise and passion.',
      website: 'https://growthventures.example.com',
      logo: null,
      verified: true,
      profileCompletion: 90,
      investmentPreferences: {
        stages: ['Seed', 'Series A'],
        industries: ['Artificial Intelligence', 'Fintech', 'Enterprise Software', 'Healthcare'],
        investmentSize: {
          min: 250000,
          max: 2000000
        },
        location: 'US and Canada'
      },
      portfolio: {
        companies: 12,
        exited: 3,
        notableFunding: [
          {
            company: 'DataSense AI',
            amount: '$1.5M',
            year: 2021,
            stage: 'Seed'
          },
          {
            company: 'FinFlow',
            amount: '$3.2M',
            year: 2020,
            stage: 'Series A'
          },
          {
            company: 'MedConnect',
            amount: '$750K',
            year: 2022,
            stage: 'Pre-seed'
          }
        ]
      },
      team: [
        {
          name: 'Sarah Johnson',
          title: 'Managing Partner',
          bio: 'Former founder with 2 successful exits. 10+ years in enterprise SaaS.'
        },
        {
          name: 'David Chen',
          title: 'Principal',
          bio: 'Background in AI research and product management at Google.'
        }
      ]
    };
  });

  // Save to localStorage whenever the data changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('startupProfile', JSON.stringify(startupProfile));
  }, [startupProfile]);

  useEffect(() => {
    localStorage.setItem('investorProfile', JSON.stringify(investorProfile));
  }, [investorProfile]);

  // User authentication functions
  const login = (userData) => {
    setCurrentUser(userData);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const register = (userData) => {
    setCurrentUser(userData);
  };

  // Profile update functions
  const updateStartupProfile = (updatedProfile) => {
    setStartupProfile(prevProfile => {
      return {
        ...prevProfile,
        ...updatedProfile
      };
    });
  };

  const updateInvestorProfile = (updatedProfile) => {
    setInvestorProfile(prevProfile => {
      return {
        ...prevProfile,
        ...updatedProfile
      };
    });
  };

  // Pitch materials management functions
  const addPitchMaterial = (newMaterial) => {
    // Generate a random ID if not provided
    if (!newMaterial.id) {
      newMaterial.id = `pm-${Math.floor(Math.random() * 1000)}`;
    }
    
    // Set current date for dateAdded and lastUpdated if not provided
    if (!newMaterial.dateAdded) {
      newMaterial.dateAdded = new Date().toISOString();
    }
    
    if (!newMaterial.lastUpdated) {
      newMaterial.lastUpdated = new Date().toISOString();
    }
    
    setStartupProfile(prevProfile => {
      return {
        ...prevProfile,
        pitchMaterials: [...prevProfile.pitchMaterials, newMaterial]
      };
    });
    
    return newMaterial.id;
  };
  
  const updatePitchMaterial = (id, updatedMaterial) => {
    setStartupProfile(prevProfile => {
      const updatedMaterials = prevProfile.pitchMaterials.map(material => 
        material.id === id 
          ? { 
              ...material, 
              ...updatedMaterial, 
              lastUpdated: new Date().toISOString() 
            } 
          : material
      );
      
      return {
        ...prevProfile,
        pitchMaterials: updatedMaterials
      };
    });
  };
  
  const deletePitchMaterial = (id) => {
    setStartupProfile(prevProfile => {
      return {
        ...prevProfile,
        pitchMaterials: prevProfile.pitchMaterials.filter(material => material.id !== id)
      };
    });
  };
  
  // Event registration functions
  const registerForStartupEvent = (eventId) => {
    // Check if already registered
    if (startupProfile.registeredEvents.includes(eventId)) {
      return false;
    }
    
    setStartupProfile(prevProfile => {
      return {
        ...prevProfile,
        registeredEvents: [...prevProfile.registeredEvents, eventId]
      };
    });
    
    return true;
  };
  
  const unregisterFromStartupEvent = (eventId) => {
    // Check if registered
    if (!startupProfile.registeredEvents.includes(eventId)) {
      return false;
    }
    
    setStartupProfile(prevProfile => {
      return {
        ...prevProfile,
        registeredEvents: prevProfile.registeredEvents.filter(id => id !== eventId)
      };
    });
    
    return true;
  };
  
  const isRegisteredForStartupEvent = (eventId) => {
    return startupProfile.registeredEvents.includes(eventId);
  };

  return (
    <UserContext.Provider value={{
      currentUser,
      startupProfile,
      investorProfile,
      login,
      logout,
      register,
      updateStartupProfile,
      updateInvestorProfile,
      addPitchMaterial,
      updatePitchMaterial,
      deletePitchMaterial,
      registerForStartupEvent,
      unregisterFromStartupEvent,
      isRegisteredForStartupEvent
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export default UserContext; 