import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaBuilding, FaFileAlt, FaCalendarAlt, FaChartLine, FaLightbulb, FaEdit, FaExternalLinkAlt, FaCalendarCheck, FaTrash } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';
import { useEvents } from '../context/EventsContext';
import StartupProfileForm from '../components/StartupProfileForm';
import PitchMaterialForm from '../components/PitchMaterialForm';
import EventDetailsModal from '../components/EventDetailsModal';

const StartupDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const { darkMode } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const { 
    currentUser, 
    startupProfile, 
    updateStartupProfile, 
    addPitchMaterial,
    updatePitchMaterial,
    deletePitchMaterial,
    registerForStartupEvent,
    unregisterFromStartupEvent,
    isRegisteredForStartupEvent
  } = useUser();
  
  const { events, registerForEvent, unregisterFromEvent, isRegisteredForEvent } = useEvents();
  
  // State for pitch materials
  const [showAddMaterialModal, setShowAddMaterialModal] = useState(false);
  const [materialToEdit, setMaterialToEdit] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [materialIdToDelete, setMaterialIdToDelete] = useState(null);
  
  // State for events
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showUnregisterConfirm, setShowUnregisterConfirm] = useState(false);
  const [eventIdToUnregister, setEventIdToUnregister] = useState(null);
  
  // Get registered events
  const registeredStartupEvents = events.filter(event => 
    isRegisteredForEvent(event.id) || startupProfile.registeredEvents.includes(event.id)
  );
  
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'today';
    } else if (diffDays === 1) {
      return 'yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    } else {
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };
  
  // Handlers for pitch materials
  const handlePreviewMaterial = (material) => {
    // In a real app, this would open the material in a preview window
    alert(`Previewing ${material.name}`);
  };
  
  const handleEditMaterial = (material) => {
    setMaterialToEdit(material);
    setShowAddMaterialModal(true);
  };
  
  const handleDeleteMaterial = (id) => {
    setMaterialIdToDelete(id);
    setShowDeleteConfirm(true);
  };
  
  const confirmDeleteMaterial = () => {
    if (materialIdToDelete) {
      deletePitchMaterial(materialIdToDelete);
      setShowDeleteConfirm(false);
      setMaterialIdToDelete(null);
    }
  };
  
  const handleSaveMaterial = (material) => {
    if (material.id) {
      // Update existing material
      updatePitchMaterial(material.id, material);
    } else {
      // Add new material
      addPitchMaterial(material);
    }
    
    setShowAddMaterialModal(false);
    setMaterialToEdit(null);
  };
  
  // Handlers for events
  const handleViewEventDetails = (event) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };
  
  const handleRegisterEvent = (eventId) => {
    // First try to register with EventsContext
    const success = registerForEvent(eventId);
    
    // If successful or as a fallback, use UserContext's registerForStartupEvent
    if (success || registerForStartupEvent(eventId)) {
      // Show success message
      alert(`Successfully registered for the event!`);
    } else {
      // Show error message
      alert('Failed to register. You may already be registered or the event is full.');
    }
  };
  
  const handleUnregisterEvent = (eventId) => {
    setEventIdToUnregister(eventId);
    setShowUnregisterConfirm(true);
  };
  
  const confirmUnregisterEvent = () => {
    if (eventIdToUnregister) {
      // Try both methods to ensure unregistration works
      const success = unregisterFromEvent(eventIdToUnregister) || 
                    unregisterFromStartupEvent(eventIdToUnregister);
      
      if (success) {
        // Show success message
        alert(`Successfully unregistered from the event.`);
      } else {
        // Show error message
        alert('Failed to unregister from the event.');
      }
      
      setShowUnregisterConfirm(false);
      setEventIdToUnregister(null);
    }
  };

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

  const handleSaveProfile = (updatedProfile) => {
    // Maintain the metrics which shouldn't be editable by the user
    const updatedProfileWithMetrics = {
      ...updatedProfile,
      metrics: startupProfile.metrics,
      // Calculate profile completion based on filled fields
      profileCompletion: calculateProfileCompletion(updatedProfile)
    };
    
    updateStartupProfile(updatedProfileWithMetrics);
    setIsEditing(false);
    // In a real application, you would save to backend here
    console.log('Profile updated:', updatedProfileWithMetrics);
  };

  const calculateProfileCompletion = (profile) => {
    const requiredFields = [
      'companyName', 
      'stage', 
      'description'
    ];
    
    const preferenceFields = [
      profile.industry.length > 0,
      !!profile.foundedYear,
      !!profile.location,
      !!profile.teamSize,
      !!profile.pitch.tagline,
      !!profile.pitch.problem,
      !!profile.pitch.solution,
      !!profile.funding.seeking
    ];
    
    const filled = requiredFields.filter(field => !!profile[field]).length;
    const preferencesFilled = preferenceFields.filter(Boolean).length;
    
    // Calculate percentage based on required fields (50% weight) and preferences (50% weight)
    return Math.round((filled / requiredFields.length * 50) + (preferencesFilled / preferenceFields.length * 50));
  };

  const renderProfileTab = () => {
    if (isEditing) {
      return (
        <StartupProfileForm 
          startup={startupProfile} 
          onSave={handleSaveProfile}
          onCancel={() => setIsEditing(false)}
        />
      );
    }

    return (
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="glass-card backdrop-blur-md overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200 dark:border-dark-600">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
            <motion.div variants={itemVariants} className="flex-grow">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{startupProfile.companyName}</h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {startupProfile.industry.map((tag, index) => (
                  <span 
                    key={index} 
                    className="bg-primary-100/80 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-medium px-2.5 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300">{startupProfile.description}</p>
            </motion.div>
            <motion.div variants={itemVariants} className="flex flex-col items-end">
              {startupProfile.verified ? (
                <span className="bg-green-100/80 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium px-3 py-1 rounded-full flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  Verified
                </span>
              ) : (
                <span className="bg-yellow-100/80 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 text-xs font-medium px-3 py-1 rounded-full flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                  </svg>
                  Pending Verification
                </span>
              )}
              <button 
                className="mt-4 btn btn-primary flex items-center"
                onClick={() => setIsEditing(true)}
              >
                <FaEdit className="mr-2" /> Edit Profile
              </button>
            </motion.div>
          </div>
          
          <motion.div variants={itemVariants} className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium text-gray-700 dark:text-gray-200">Profile Completion</h4>
              <span className="text-sm font-medium text-primary-600 dark:text-primary-400">{startupProfile.profileCompletion}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-dark-600 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${startupProfile.profileCompletion}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {startupProfile.profileCompletion < 100 && "Complete your profile to get more visibility from investors"}
            </p>
          </motion.div>
        </div>

        <div className="p-6">
          <motion.div variants={itemVariants} className="mb-8">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Key Metrics</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="glass-card p-4 bg-white/50 dark:bg-dark-800/50">
                <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Monthly Revenue</h5>
                <div className="flex items-end">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">${startupProfile.metrics.mtd.revenue.toLocaleString()}</span>
                  <span className="ml-2 text-xs text-green-500">↑ {startupProfile.metrics.mtd.growth}%</span>
                </div>
              </div>
              <div className="glass-card p-4 bg-white/50 dark:bg-dark-800/50">
                <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Active Users</h5>
                <div className="flex items-end">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">{startupProfile.metrics.mtd.users}</span>
                  <span className="ml-2 text-xs text-green-500">↑ {startupProfile.metrics.mtd.growth}%</span>
                </div>
              </div>
              <div className="glass-card p-4 bg-white/50 dark:bg-dark-800/50">
                <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">YTD Revenue</h5>
                <div className="flex items-end">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">${startupProfile.metrics.ytd.revenue.toLocaleString()}</span>
                  <span className="ml-2 text-xs text-green-500">↑ {startupProfile.metrics.ytd.growth}%</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Company Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Stage</p>
                  <p className="text-gray-800 dark:text-gray-200">{startupProfile.stage}</p>
                </div>
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Founded</p>
                  <p className="text-gray-800 dark:text-gray-200">2022</p>
                </div>
              </div>
              <div>
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Location</p>
                  <p className="text-gray-800 dark:text-gray-200">San Francisco, CA</p>
                </div>
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Team Size</p>
                  <p className="text-gray-800 dark:text-gray-200">8 employees</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  };

  const renderPitchMaterialsTab = () => {
    return (
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="glass-card backdrop-blur-md p-6"
      >
        <motion.div variants={itemVariants} className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Pitch Materials</h3>
          <button 
            onClick={() => setShowAddMaterialModal(true)}
            className="btn btn-secondary"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Add Document
          </button>
        </motion.div>
        
        <div className="space-y-6">
          {startupProfile.pitchMaterials.length > 0 ? (
            startupProfile.pitchMaterials.map((material) => (
              <motion.div 
                key={material.id}
                variants={itemVariants} 
                className="glass-card border border-gray-200 dark:border-dark-700 p-5 rounded-lg hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-lg ${
                      material.type === 'pitchDeck' 
                        ? 'bg-primary-100 dark:bg-primary-900/30' 
                        : material.type === 'financialProjections'
                          ? 'bg-secondary-100 dark:bg-secondary-900/30'
                          : 'bg-accent-100 dark:bg-accent-900/30'
                    } flex items-center justify-center mr-4`}>
                      {material.type === 'pitchDeck' ? (
                        <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                      ) : material.type === 'financialProjections' ? (
                        <svg className="w-6 h-6 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                        </svg>
                      ) : (
                        <svg className="w-6 h-6 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                        </svg>
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{material.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {material.fileFormat} • {material.description} • Last updated {formatDate(material.lastUpdated)}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handlePreviewMaterial(material)}
                      className="btn btn-ghost p-2 text-sm"
                    >
                      Preview
                    </button>
                    <button 
                      onClick={() => handleEditMaterial(material)}
                      className="btn btn-primary p-2 text-sm"
                    >
                      Update
                    </button>
                    <button 
                      onClick={() => handleDeleteMaterial(material.id)}
                      className="btn btn-ghost p-2 text-sm text-red-500 hover:text-red-700"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div variants={itemVariants} className="glass-card bg-gray-50/50 dark:bg-dark-700/50 border border-dashed border-gray-300 dark:border-dark-600 p-5 rounded-lg flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-dark-600 flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm text-center max-w-xs">
                No pitch materials yet. Upload documents like pitch deck, financial projections, product demos, or team profiles.
              </p>
              <button 
                onClick={() => setShowAddMaterialModal(true)}
                className="mt-4 btn btn-ghost text-primary-600 dark:text-primary-400"
              >
                Upload Document
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    );
  };

  const renderEventsTab = () => {
    // Filter upcoming events
    const upcomingEvents = events.filter(event => {
      const eventDate = new Date(event.date);
      const now = new Date();
      return eventDate > now && event.status !== 'past';
    });

    // Filter past events
    const pastEvents = events.filter(event => {
      const eventDate = new Date(event.date);
      const now = new Date();
      return eventDate < now || event.status === 'past';
    });

    return (
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="glass-card backdrop-blur-md p-6"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Events</h3>
          <p className="text-gray-600 dark:text-gray-400">Opportunities to connect with investors and showcase your startup</p>
        </motion.div>
        
        {/* Registered Events */}
        <motion.div variants={itemVariants} className="mb-8">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
            <FaCalendarCheck className="mr-2 text-green-500" />
            My Events
          </h4>
          
          {registeredStartupEvents.length > 0 ? (
            <div className="space-y-5">
              {registeredStartupEvents.map(event => {
                const eventDate = new Date(event.date);
                const now = new Date();
                const isPast = eventDate < now || event.status === 'past';
                
                return (
                  <motion.div 
                    key={event.id}
                    variants={itemVariants} 
                    className="relative glass-card border border-green-200 dark:border-green-900/30 rounded-lg overflow-hidden hover:shadow-md transition-all group"
                  >
                    <div className="absolute top-0 right-0 bg-green-500/80 text-white text-xs font-medium px-2.5 py-1 rounded-bl-lg">
                      {event.type}
                    </div>
                    <div className="p-5">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3">
                          <FaCalendarAlt className="text-green-500" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                            {event.title}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(event.date).toLocaleDateString('en-US', { 
                              month: 'long', 
                              day: 'numeric', 
                              year: 'numeric' 
                            })} - {event.time}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                        {event.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {isPast ? (
                          <span className="bg-gray-100/80 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300 text-xs font-medium px-2.5 py-1 rounded-full">
                            Past Event
                          </span>
                        ) : (
                          <span className="bg-green-100/80 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium px-2.5 py-1 rounded-full">
                            Registered
                          </span>
                        )}
                      </div>
                      <div className="border-t border-gray-200 dark:border-dark-700 pt-4 flex justify-between items-center">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-medium">Status:</span> {isPast ? 'Completed' : 'Upcoming'}
                        </div>
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleViewEventDetails(event)}
                            className="btn btn-ghost p-2 text-sm"
                          >
                            View Details
                          </button>
                          {!isPast && (
                            <a 
                              href={event.meetingLink} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="btn btn-primary p-2 text-sm flex items-center"
                            >
                              <FaExternalLinkAlt className="mr-1" /> Join Event
                            </a>
                          )}
                          {!isPast && (
                            <button 
                              onClick={() => handleUnregisterEvent(event.id)}
                              className="btn btn-ghost p-2 text-sm text-red-500 hover:text-red-700"
                              title="Unregister from event"
                            >
                              <FaTrash className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <motion.div 
              variants={itemVariants}
              className="glass-card bg-gray-50/50 dark:bg-dark-700/50 p-6 rounded-lg text-center"
            >
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                You haven't registered for any events yet.
              </p>
              <Link to="/events" className="btn btn-primary">
                Browse Events
              </Link>
            </motion.div>
          )}
        </motion.div>
        
        {/* Upcoming Events */}
        <motion.div variants={itemVariants} className="mb-8">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Upcoming Opportunities</h4>
          
          {upcomingEvents.length > 0 ? (
            <div className="space-y-5">
              {upcomingEvents.slice(0, 3).map(event => {
                const isRegistered = isRegisteredForStartupEvent(event.id);
                const deadlineDate = new Date(event.registrationDeadline);
                const isDeadlinePassed = deadlineDate < new Date();
                const canRegister = !isDeadlinePassed && event.spotsRemaining > 0 && !isRegistered;
                
                if (isRegistered) return null; // Skip if already registered
                
                return (
                  <motion.div 
                    key={event.id}
                    variants={itemVariants} 
                    className="relative glass-card border border-gray-200 dark:border-dark-700 rounded-lg overflow-hidden hover:shadow-md transition-all group"
                  >
                    <div className="absolute top-0 right-0 bg-primary-500/80 text-white text-xs font-medium px-2.5 py-1 rounded-bl-lg">
                      {event.type}
                    </div>
                    <div className="p-5">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mr-3">
                          <FaCalendarAlt className="text-primary-500" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                            {event.title}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(event.date).toLocaleDateString('en-US', { 
                              month: 'long', 
                              day: 'numeric', 
                              year: 'numeric' 
                            })} - {event.time}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                        {event.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="bg-blue-100/80 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium px-2.5 py-1 rounded-full">
                          {event.spotsRemaining} Spots Left
                        </span>
                      </div>
                      <div className="border-t border-gray-200 dark:border-dark-700 pt-4 flex justify-between items-center">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-medium">Deadline:</span> {new Date(event.registrationDeadline).toLocaleDateString()}
                        </div>
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleViewEventDetails(event)}
                            className="btn btn-ghost p-2 text-sm"
                          >
                            Details
                          </button>
                          {canRegister ? (
                            <button 
                              onClick={() => handleRegisterEvent(event.id)}
                              className="btn btn-primary p-2 text-sm"
                            >
                              Register
                            </button>
                          ) : (
                            <button 
                              disabled 
                              className="btn btn-ghost p-2 text-sm text-gray-500 cursor-not-allowed"
                            >
                              {isDeadlinePassed ? 'Deadline Passed' : 'Not Available'}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
              
              {upcomingEvents.length > 3 && (
                <div className="text-center mt-4">
                  <Link to="/events" className="btn btn-ghost text-primary-600 dark:text-primary-400">
                    View All Events
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <motion.div 
              variants={itemVariants}
              className="glass-card bg-gray-50/50 dark:bg-dark-700/50 p-6 rounded-lg text-center"
            >
              <p className="text-gray-600 dark:text-gray-400">
                No upcoming events available at the moment.
              </p>
            </motion.div>
          )}
        </motion.div>
        
        {/* View more link */}
        <motion.div variants={itemVariants} className="text-center">
          <Link to="/events" className="btn btn-primary">
            Browse All Events
          </Link>
        </motion.div>
      </motion.div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileTab();
      case 'pitch':
        return renderPitchMaterialsTab();
      case 'events':
        return renderEventsTab();
      default:
        return null;
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
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white gradient-text">Startup Dashboard</h2>
          <div className="flex items-center gap-3">
            <span className="text-gray-600 dark:text-gray-400">
              Welcome back, {currentUser?.firstName || 'Founder'}
            </span>
            <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center">
              <FaUser className="text-primary-600 dark:text-primary-400" />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass-card backdrop-blur-md p-4 sticky top-8">
              <div className="mb-6 flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center mb-3 shadow-lg shadow-primary-500/20">
                  <span className="text-white text-2xl font-bold">
                    {startupProfile.companyName.charAt(0)}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-center">{currentUser?.firstName} {currentUser?.lastName}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">{currentUser?.email}</p>
              </div>
              
              <nav className="space-y-1">
                <button
                  className={`w-full text-left p-3 rounded-lg flex items-center transition-all ${
                    activeTab === 'profile' 
                      ? 'bg-primary-100/60 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-dark-700/50'
                  }`}
                  onClick={() => setActiveTab('profile')}
                >
                  <FaBuilding className="mr-3" />
                  <span>Company Profile</span>
                </button>
                <button
                  className={`w-full text-left p-3 rounded-lg flex items-center transition-all ${
                    activeTab === 'pitch' 
                      ? 'bg-primary-100/60 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-dark-700/50'
                  }`}
                  onClick={() => setActiveTab('pitch')}
                >
                  <FaFileAlt className="mr-3" />
                  <span>Pitch Materials</span>
                </button>
                <button
                  className={`w-full text-left p-3 rounded-lg flex items-center transition-all ${
                    activeTab === 'events' 
                      ? 'bg-primary-100/60 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-dark-700/50'
                  }`}
                  onClick={() => setActiveTab('events')}
                >
                  <FaCalendarAlt className="mr-3" />
                  <span>Events</span>
                </button>
              </nav>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-dark-700">
                <div className="glass-card bg-primary-50/50 dark:bg-primary-900/20 p-4 rounded-lg">
                  <div className="flex items-center mb-3">
                    <FaLightbulb className="text-primary-500 mr-2" />
                    <h4 className="font-medium text-gray-900 dark:text-white">Pro Tip</h4>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Complete your profile to increase visibility with investors by up to 80%.
                  </p>
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
      
      {/* Pitch Material Form Modal */}
      {showAddMaterialModal && (
        <PitchMaterialForm 
          material={materialToEdit}
          onSave={handleSaveMaterial}
          onCancel={() => {
            setShowAddMaterialModal(false);
            setMaterialToEdit(null);
          }}
        />
      )}
      
      {/* Delete Material Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-dark-800 rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Confirm Deletion</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to delete this document? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="btn btn-ghost"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteMaterial}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Event Details Modal */}
      {showEventModal && selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          isRegistered={isRegisteredForEvent(selectedEvent.id) || isRegisteredForStartupEvent(selectedEvent.id)}
          onClose={() => {
            setShowEventModal(false);
            setSelectedEvent(null);
          }}
          onRegister={(event) => {
            handleRegisterEvent(event.id);
            setShowEventModal(false);
            setSelectedEvent(null);
          }}
        />
      )}
      
      {/* Unregister Event Confirmation Modal */}
      {showUnregisterConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-dark-800 rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Confirm Unregistration</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to unregister from this event? Your spot will be released to others.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowUnregisterConfirm(false)}
                className="btn btn-ghost"
              >
                Cancel
              </button>
              <button
                onClick={confirmUnregisterEvent}
                className="btn btn-danger"
              >
                Unregister
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StartupDashboard; 