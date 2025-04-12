import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useEvents } from '../context/EventsContext';
import { useUser } from '../context/UserContext';
import { motion } from 'framer-motion';
import { FaCalendarCheck, FaInfoCircle, FaUsers, FaExternalLinkAlt } from 'react-icons/fa';
import EventDetailsModal from '../components/EventDetailsModal';

const EventsPage = () => {
  const { darkMode } = useTheme();
  const { currentUser } = useUser();
  const { 
    events: allEvents, 
    registerForEvent, 
    unregisterFromEvent, 
    isRegisteredForEvent 
  } = useEvents();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // all, upcoming, past
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    // Simulate loading to match the original experience
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  const filteredEvents = allEvents.filter(event => {
    const eventDate = new Date(event.date);
    const now = new Date();
    
    switch(filter) {
      case 'upcoming':
        return (eventDate > now && event.status !== 'past');
      case 'past':
        return eventDate < now || event.status === 'past';
      default:
        return true;
    }
  });

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
      transition: { duration: 0.5 }
    }
  };

  const handleRegister = (event) => {
    if (currentUser) {
      const success = registerForEvent(event.id);
      if (success) {
        // Show success message
        alert(`Successfully registered for ${event.title}`);
      } else {
        // Show error message
        alert('Failed to register. You may already be registered or the event is full.');
      }
    } else {
      // Redirect to login page or show login modal
      alert('Please log in to register for events');
    }
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-t-primary-500 border-r-transparent border-b-secondary-500 border-l-transparent animate-spin"></div>
        <div className="absolute top-2 left-2 w-12 h-12 rounded-full border-4 border-t-transparent border-r-accent-500 border-b-transparent border-l-accent-300 animate-spin-slow"></div>
      </div>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div className="glass-card p-6 max-w-md">
        <h3 className="text-xl font-semibold text-red-500 mb-2">Error</h3>
        <p className="text-gray-700 dark:text-gray-300">{error}</p>
      </div>
    </div>
  );

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-dark-900 dark:via-dark-800 dark:to-dark-700 min-h-screen pb-16">
      {/* Hero Section */}
      <div className="relative py-16 bg-gradient-to-r from-primary-600/90 to-secondary-600/90 dark:from-primary-800/90 dark:to-secondary-800/90">
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Events & Networking</h1>
            <p className="text-lg text-white/80 mb-8">
              Connect with investors and fellow founders at our exclusive events designed 
              for meaningful interactions and opportunities.
            </p>
            
            {/* Filter Tabs */}
            <div className="inline-flex bg-white/10 backdrop-blur-sm rounded-full p-1 shadow-lg">
              <button 
                onClick={() => setFilter('all')}
                className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                  filter === 'all' 
                    ? 'bg-white text-primary-600 shadow-md' 
                    : 'text-white hover:bg-white/10'
                }`}
              >
                All Events
              </button>
              <button 
                onClick={() => setFilter('upcoming')}
                className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                  filter === 'upcoming' 
                    ? 'bg-white text-primary-600 shadow-md' 
                    : 'text-white hover:bg-white/10'
                }`}
              >
                Upcoming
              </button>
              <button 
                onClick={() => setFilter('past')}
                className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                  filter === 'past' 
                    ? 'bg-white text-primary-600 shadow-md' 
                    : 'text-white hover:bg-white/10'
                }`}
              >
                Past Events
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        {filteredEvents.length === 0 ? (
          <div className="glass-card p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">No Events Found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              There are no events matching your current filter criteria.
            </p>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredEvents.map(event => {
              const eventDate = new Date(event.date);
              const now = new Date();
              const isPast = eventDate < now || event.status === 'past';
              const deadlineDate = new Date(event.registrationDeadline);
              const isDeadlinePassed = deadlineDate < now;
              const isRegistered = isRegisteredForEvent(event.id);
              const canRegister = !isPast && !isDeadlinePassed && event.spotsRemaining > 0;
              
              return (
                <motion.div 
                  key={event.id} 
                  className={`glass-card overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                    isPast 
                      ? 'border-l-4 border-gray-400 dark:border-gray-600' 
                      : isRegistered
                        ? 'border-l-4 border-green-500 dark:border-green-400'
                        : 'border-l-4 border-primary-500 dark:border-primary-400'
                  }`}
                  variants={itemVariants}
                >
                  <div className={`p-6 ${
                    isPast 
                      ? 'bg-gradient-to-br from-gray-100/80 to-gray-200/80 dark:from-dark-700/80 dark:to-dark-800/80' 
                      : isRegistered
                        ? 'bg-gradient-to-br from-white/80 to-green-50/80 dark:from-dark-800/80 dark:to-green-900/20'
                        : 'bg-gradient-to-br from-white/80 to-blue-50/80 dark:from-dark-800/80 dark:to-primary-900/20'
                  }`}>
                    <div className="flex justify-between items-start">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        isPast
                          ? 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                          : isRegistered
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                            : 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300'
                      }`}>
                        {event.type}
                      </span>
                      {isPast ? (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Completed
                        </span>
                      ) : isRegistered ? (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Registered
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Upcoming
                        </span>
                      )}
                    </div>
                    
                    <h3 className={`text-xl font-bold mt-3 mb-2 ${
                      isPast 
                        ? 'text-gray-700 dark:text-gray-300' 
                        : 'text-gray-900 dark:text-white'
                    }`}>{event.title}</h3>
                    
                    <div className="mb-3 flex flex-wrap gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </div>
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {event.time}
                      </div>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {event.description}
                    </p>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      {!isPast && (
                        <div className="flex justify-between items-center mb-3">
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            <span className="font-medium">Spots:</span> {event.spotsRemaining} of {event.capacity} remaining
                          </div>
                          {isDeadlinePassed ? (
                            <span className="text-xs text-red-600 dark:text-red-400">Registration closed</span>
                          ) : (
                            <span className="text-xs text-green-600 dark:text-green-400 flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              Register by {new Date(event.registrationDeadline).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      )}
                      
                      {/* Investors section */}
                      {event.investors && event.investors.length > 0 && (
                        <div className="mb-4">
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Participating Investors:</p>
                          <div className="flex -space-x-2 overflow-hidden">
                            {event.investors.slice(0, 5).map((investor, index) => (
                              <div 
                                key={investor.id || index} 
                                className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-dark-800 bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
                                title={investor.name}
                              >
                                <span className="text-xs font-medium">{investor.name.charAt(0)}</span>
                              </div>
                            ))}
                            {event.investors.length > 5 && (
                              <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-dark-800 bg-primary-500 flex items-center justify-center">
                                <span className="text-xs font-medium text-white">+{event.investors.length - 5}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleEventClick(event)}
                          className="btn btn-ghost py-2 px-3"
                        >
                          <FaInfoCircle className="mr-1" /> View Details
                        </button>
                        
                        {!isPast && (
                          isRegistered ? (
                            <a 
                              href={event.meetingLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-primary py-2 px-3 flex items-center"
                            >
                              <FaExternalLinkAlt className="mr-2" /> Join Virtual Room
                            </a>
                          ) : canRegister ? (
                            <button 
                              onClick={() => handleRegister(event)}
                              className="btn btn-primary py-2 px-3"
                            >
                              <FaCalendarCheck className="mr-1" /> Register
                            </button>
                          ) : (
                            <button 
                              className="btn btn-ghost py-2 px-3 text-gray-500 cursor-not-allowed"
                              disabled
                            >
                              Not Available
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>

      {/* Event Details Modal */}
      {showModal && selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          isRegistered={isRegisteredForEvent(selectedEvent.id)}
          onClose={() => setShowModal(false)} 
          onRegister={handleRegister}
        />
      )}
    </div>
  );
};

export default EventsPage; 