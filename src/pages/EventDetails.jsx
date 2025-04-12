import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEvents } from '../context/EventsContext';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUsers, FaUserTie, FaExclamationCircle, FaArrowLeft, FaCalendarCheck, FaExternalLinkAlt } from 'react-icons/fa';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const { currentUser } = useUser();
  const { 
    getEvent, 
    registerForEvent, 
    unregisterFromEvent, 
    isRegisteredForEvent 
  } = useEvents();
  
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
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
    try {
      // Get event details
      const eventData = getEvent(id);
      
      if (eventData) {
        setEvent(eventData);
        setIsRegistered(isRegisteredForEvent(id));
      } else {
        setError('Event not found');
      }
      
      // Simulate loading delay
      setTimeout(() => {
        setLoading(false);
      }, 600);
    } catch (err) {
      setError('Failed to load event details');
      setLoading(false);
    }
  }, [id, getEvent, isRegisteredForEvent]);

  const handleRegister = () => {
    if (currentUser) {
      const success = registerForEvent(id);
      if (success) {
        setIsRegistered(true);
        alert(`Successfully registered for ${event.title}`);
      } else {
        alert('Failed to register. You may already be registered or the event is full.');
      }
    } else {
      alert('Please log in to register for events');
    }
  };

  const handleUnregister = () => {
    const success = unregisterFromEvent(id);
    if (success) {
      setIsRegistered(false);
      alert(`Successfully unregistered from ${event.title}`);
    } else {
      alert('Failed to unregister from event.');
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-t-primary-500 border-r-transparent border-b-secondary-500 border-l-transparent animate-spin"></div>
        <div className="absolute top-2 left-2 w-12 h-12 rounded-full border-4 border-t-transparent border-r-accent-500 border-b-transparent border-l-accent-300 animate-spin-slow"></div>
      </div>
    </div>
  );

  if (error) return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <button
        onClick={() => navigate(-1)}
        className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mb-8 flex items-center"
      >
        <FaArrowLeft className="mr-2" /> Back to Events
      </button>
      <div className="glass-card p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 text-red-500 mb-4">
          <FaExclamationCircle className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Error</h3>
        <p className="text-gray-600 dark:text-gray-400">
          {error}
        </p>
        <Link to="/events" className="btn btn-primary mt-6">
          View All Events
        </Link>
      </div>
    </div>
  );

  if (!event) return null;

  // Check if event date is passed
  const eventDate = new Date(event.date);
  const currentDate = new Date();
  const isPast = eventDate < currentDate || event.status === 'past';
  
  // Check if registration deadline is passed
  const deadlineDate = new Date(event.registrationDeadline);
  const isDeadlinePassed = deadlineDate < currentDate;
  
  // Check if spots are available
  const spotsAvailable = event.spotsRemaining > 0;
  
  // Check if user can register
  const canRegister = !isPast && !isDeadlinePassed && spotsAvailable && !isRegistered;
  
  // Check if user can join event
  const canJoin = isRegistered && !isPast;

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-dark-900 dark:via-dark-800 dark:to-dark-700 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <button
          onClick={() => navigate(-1)}
          className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mb-8 flex items-center"
        >
          <FaArrowLeft className="mr-2" /> Back to Events
        </button>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="glass-card overflow-hidden"
        >
          {/* Event Header */}
          <div className={`p-8 ${
            isPast
              ? 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-dark-700 dark:to-dark-800'
              : isRegistered
                ? 'bg-gradient-to-br from-green-50 to-green-100 dark:from-dark-800 dark:to-green-900/20'
                : 'bg-gradient-to-br from-primary-50 to-primary-100 dark:from-dark-800 dark:to-primary-900/20'
          }`}>
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start gap-6 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    isPast
                      ? 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                      : isRegistered
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300'
                        : 'bg-primary-100 text-primary-800 dark:bg-primary-900/40 dark:text-primary-300'
                  }`}>
                    {event.type}
                  </span>
                  
                  {isPast ? (
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                      Completed
                    </span>
                  ) : isRegistered ? (
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300">
                      Registered
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300">
                      Upcoming
                    </span>
                  )}
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                  {event.title}
                </h1>
                
                <div className="flex flex-wrap gap-4 text-gray-600 dark:text-gray-400 mb-4">
                  <div className="flex items-center">
                    <FaCalendarAlt className="mr-2" />
                    {new Date(event.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <div className="flex items-center">
                    <FaClock className="mr-2" />
                    {event.time}
                  </div>
                </div>
              </div>
              
              {isRegistered && (
                <div className="flex flex-col items-center bg-white/50 dark:bg-dark-800/50 p-4 rounded-lg">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 mb-2">
                    <FaCalendarCheck className="w-8 h-8" />
                  </div>
                  <p className="text-green-700 dark:text-green-300 font-medium">You're registered!</p>
                </div>
              )}
            </motion.div>
            
            {!isPast && (
              <motion.div variants={itemVariants}>
                <div className={`p-4 rounded-lg ${
                  isRegistered
                    ? 'bg-green-100/70 dark:bg-green-900/20'
                    : 'bg-white/70 dark:bg-dark-800/50'
                }`}>
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div>
                      {isRegistered ? (
                        <p className="font-medium text-green-700 dark:text-green-300">
                          Join the event at the scheduled time!
                        </p>
                      ) : !isDeadlinePassed && spotsAvailable ? (
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            Registration is open!
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Register by {new Date(event.registrationDeadline).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                      ) : !spotsAvailable ? (
                        <p className="font-medium text-red-600 dark:text-red-400">
                          No spots remaining
                        </p>
                      ) : (
                        <p className="font-medium text-red-600 dark:text-red-400">
                          Registration deadline has passed
                        </p>
                      )}
                    </div>
                    
                    <div>
                      {isRegistered ? (
                        <div className="flex gap-3">
                          <button
                            onClick={handleUnregister}
                            className="btn btn-ghost"
                          >
                            Cancel Registration
                          </button>
                          
                          {canJoin && (
                            <a
                              href={event.meetingLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-primary flex items-center"
                            >
                              <FaExternalLinkAlt className="mr-2" /> Join Virtual Room
                            </a>
                          )}
                        </div>
                      ) : canRegister ? (
                        <button
                          onClick={handleRegister}
                          className="btn btn-primary"
                        >
                          Register Now
                        </button>
                      ) : (
                        <button
                          disabled
                          className="btn btn-ghost text-gray-500 cursor-not-allowed"
                        >
                          Registration Unavailable
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
          
          {/* Event Info */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <motion.div variants={itemVariants} className="lg:col-span-2">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Event Description</h2>
                <div className="prose dark:prose-invert mb-8">
                  <p className="text-gray-700 dark:text-gray-300">
                    {event.description}
                  </p>
                </div>
                
                {event.investors && event.investors.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Participating Investors</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {event.investors.map((investor, index) => (
                        <div key={investor.id || index} className="glass-card p-4 flex items-center">
                          <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-700 dark:text-primary-300 mr-3">
                            <FaUserTie />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">{investor.name}</h3>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
              
              <motion.div variants={itemVariants} className="space-y-6">
                <div className="glass-card p-6">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4">Event Details</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Capacity</p>
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-gray-900 dark:text-white">{event.capacity} Participants</p>
                        <p className="text-sm text-primary-600 dark:text-primary-400">{event.spotsRemaining} spots left</p>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-dark-600 h-2 rounded-full mt-1">
                        <div 
                          className="bg-primary-500 h-2 rounded-full" 
                          style={{ width: `${((event.capacity - event.spotsRemaining) / event.capacity) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Requirements</p>
                      <p className="font-medium text-gray-900 dark:text-white">{event.requirements}</p>
                    </div>
                    
                    {event.timezone && (
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Timezone</p>
                        <p className="font-medium text-gray-900 dark:text-white">{event.timezone}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                {!isPast && (
                  <div className="glass-card p-6 bg-primary-50 dark:bg-primary-900/10">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-4">Registration Information</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Registration Deadline</p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {new Date(event.registrationDeadline).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Registration Status</p>
                        <p className={`font-medium ${
                          isRegistered 
                            ? 'text-green-600 dark:text-green-400' 
                            : isDeadlinePassed 
                              ? 'text-red-600 dark:text-red-400'
                              : 'text-gray-900 dark:text-white'
                        }`}>
                          {isRegistered 
                            ? 'Registered' 
                            : isDeadlinePassed 
                              ? 'Closed' 
                              : 'Open'}
                        </p>
                      </div>
                    </div>
                    
                    {isRegistered && (
                      <div className="mt-6 pt-4 border-t border-primary-200 dark:border-primary-800">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Joining Information</h4>
                        <a
                          href={event.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary w-full flex items-center justify-center"
                        >
                          <FaExternalLinkAlt className="mr-2" /> Join Virtual Room
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EventDetails; 