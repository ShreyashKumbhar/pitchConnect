import { useState } from 'react';
import { FaUser, FaBuilding, FaCheckCircle, FaChartLine, FaCog, FaBell, FaUserShield, FaBusinessTime, FaCalendarPlus, FaCalendarAlt, FaTrash } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useEvents } from '../context/EventsContext';

const AdminDashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState('stats');
  const { darkMode } = useTheme();
  const { events, addEvent, updateEvent, deleteEvent, endEvent } = useEvents();
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    timezone: 'EST',
    description: '',
    capacity: '',
    type: 'Virtual Pitch',
    requirements: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [eventSuccess, setEventSuccess] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  // Mock statistics
  const stats = {
    users: {
      total: 100,
      startups: 60,
      investors: 40
    },
    verifiedStartups: 40,
    pendingVerifications: 20,
    events: 5
  };

  // Mock startups for verification
  const pendingStartups = [
    {
      id: 1,
      name: 'TechInnovate',
      industry: ['SaaS', 'AI'],
      description: 'AI-powered productivity solution for remote teams',
      submittedDate: '2023-05-10'
    },
    {
      id: 2,
      name: 'FinFlow',
      industry: ['FinTech'],
      description: 'Simplified business expense management platform',
      submittedDate: '2023-05-12'
    }
  ];

  // Mock investors for verification
  const pendingInvestors = [
    {
      id: 1,
      name: 'Vision Capital',
      type: 'Venture Capital',
      description: 'Early-stage investor focused on SaaS and FinTech',
      submittedDate: '2023-05-09'
    }
  ];

  const handleEventChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEventSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Add the event to the global context
    setTimeout(() => {
      if (editingEvent) {
        updateEvent(editingEvent.id, newEvent);
      } else {
        addEvent(newEvent);
      }
      
      // Reset form
      setNewEvent({
        title: '',
        date: '',
        startTime: '',
        endTime: '',
        timezone: 'EST',
        description: '',
        capacity: '',
        type: 'Virtual Pitch',
        requirements: ''
      });
      
      setSubmitting(false);
      setEventSuccess(true);
      setEditingEvent(null);
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setEventSuccess(false);
      }, 3000);
    }, 800);
  };

  const handleDeleteEvent = (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      deleteEvent(id);
    }
  };

  const handleEndEvent = (id) => {
    if (window.confirm('Are you sure you want to mark this event as completed?')) {
      endEvent(id);
    }
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setNewEvent({
      title: event.title,
      date: event.date.split('T')[0], // Extract just the date part
      startTime: event.startTime,
      endTime: event.endTime,
      timezone: event.timezone,
      description: event.description,
      capacity: event.capacity,
      type: event.type,
      requirements: event.requirements || ''
    });
    setActiveTab('manageEvents');
    
    // Scroll to the form
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const cancelEdit = () => {
    setEditingEvent(null);
    setNewEvent({
      title: '',
      date: '',
      startTime: '',
      endTime: '',
      timezone: 'EST',
      description: '',
      capacity: '',
      type: 'Virtual Pitch',
      requirements: ''
    });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'stats':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-card p-6 backdrop-blur-sm"
          >
            <h3 className="text-2xl font-bold mb-6 gradient-text">Platform Statistics</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 backdrop-blur-sm p-6 rounded-xl border border-blue-500/20 shadow-lg"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Total Users</p>
                    <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-400 dark:to-blue-500">{stats.users.total}</p>
                  </div>
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-400">
                    <FaUser className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-4 flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Startups: {stats.users.startups}</span>
                  <span>Investors: {stats.users.investors}</span>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-green-500/10 to-green-600/10 backdrop-blur-sm p-6 rounded-xl border border-green-500/20 shadow-lg"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Verified Startups</p>
                    <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-green-700 dark:from-green-400 dark:to-green-500">{stats.verifiedStartups}</p>
                  </div>
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500/20 text-green-600 dark:text-green-400">
                    <FaCheckCircle className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                  <span>Verification Rate: {Math.round((stats.verifiedStartups / stats.users.startups) * 100)}%</span>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-amber-500/10 to-amber-600/10 backdrop-blur-sm p-6 rounded-xl border border-amber-500/20 shadow-lg"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Pending Verifications</p>
                    <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-amber-700 dark:from-amber-400 dark:to-amber-500">{stats.pendingVerifications}</p>
                  </div>
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400">
                    <FaBuilding className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                  <span>Action Required</span>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20 shadow-lg"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Active Events</p>
                    <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-700 dark:from-purple-400 dark:to-purple-500">{events.length}</p>
                  </div>
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-500/20 text-purple-600 dark:text-purple-400">
                    <FaChartLine className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                  <span>Upcoming Pitches & Networking</span>
                </div>
              </motion.div>
            </div>
            
            <div className="mt-12">
              <h4 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Platform Growth</h4>
              <div className="glass-card h-64 rounded-xl flex items-center justify-center border border-white/20 dark:border-gray-700/30">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary-500/20 flex items-center justify-center text-primary-600 dark:text-primary-400 mb-4">
                    <FaChartLine className="w-8 h-8" />
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">Growth chart will be displayed here</p>
                </div>
              </div>
            </div>
          </motion.div>
        );
      case 'manageEvents':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="glass-card p-6 backdrop-blur-sm mb-6">
              <h3 className="text-2xl font-bold mb-6 gradient-text">
                {editingEvent ? 'Edit Event' : 'Create New Event'}
              </h3>
              
              {eventSuccess && (
                <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 p-4 rounded-xl mb-6 flex items-center">
                  <FaCheckCircle className="mr-2" />
                  {editingEvent ? 'Event updated successfully!' : 'Event created successfully!'}
                </div>
              )}
              
              <form onSubmit={handleEventSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Event Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={newEvent.title}
                      onChange={handleEventChange}
                      className="w-full px-4 py-2 rounded-lg bg-white/50 dark:bg-dark-800/50 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary-500"
                      placeholder="E.g., Virtual Pitch Day: AI & Machine Learning"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Event Type
                    </label>
                    <select
                      name="type"
                      value={newEvent.type}
                      onChange={handleEventChange}
                      className="w-full px-4 py-2 rounded-lg bg-white/50 dark:bg-dark-800/50 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary-500"
                      required
                    >
                      <option value="Virtual Pitch">Virtual Pitch</option>
                      <option value="Networking">Networking</option>
                      <option value="Summit">Summit</option>
                      <option value="Workshop">Workshop</option>
                      <option value="Conference">Conference</option>
                      <option value="Roundtable">Roundtable</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={newEvent.date}
                      onChange={handleEventChange}
                      className="w-full px-4 py-2 rounded-lg bg-white/50 dark:bg-dark-800/50 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary-500"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Start Time
                      </label>
                      <input
                        type="time"
                        name="startTime"
                        value={newEvent.startTime}
                        onChange={handleEventChange}
                        className="w-full px-4 py-2 rounded-lg bg-white/50 dark:bg-dark-800/50 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        End Time
                      </label>
                      <input
                        type="time"
                        name="endTime"
                        value={newEvent.endTime}
                        onChange={handleEventChange}
                        className="w-full px-4 py-2 rounded-lg bg-white/50 dark:bg-dark-800/50 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Timezone
                    </label>
                    <select
                      name="timezone"
                      value={newEvent.timezone}
                      onChange={handleEventChange}
                      className="w-full px-4 py-2 rounded-lg bg-white/50 dark:bg-dark-800/50 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary-500"
                      required
                    >
                      <option value="EST">Eastern Time (EST)</option>
                      <option value="CST">Central Time (CST)</option>
                      <option value="MST">Mountain Time (MST)</option>
                      <option value="PST">Pacific Time (PST)</option>
                      <option value="UTC">Universal Time (UTC)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Capacity
                    </label>
                    <input
                      type="number"
                      name="capacity"
                      value={newEvent.capacity}
                      onChange={handleEventChange}
                      className="w-full px-4 py-2 rounded-lg bg-white/50 dark:bg-dark-800/50 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary-500"
                      min="1"
                      placeholder="Maximum number of participants"
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={newEvent.description}
                      onChange={handleEventChange}
                      className="w-full px-4 py-2 rounded-lg bg-white/50 dark:bg-dark-800/50 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary-500"
                      rows="4"
                      placeholder="Provide a detailed description of the event..."
                      required
                    ></textarea>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Requirements
                    </label>
                    <textarea
                      name="requirements"
                      value={newEvent.requirements}
                      onChange={handleEventChange}
                      className="w-full px-4 py-2 rounded-lg bg-white/50 dark:bg-dark-800/50 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary-500"
                      rows="2"
                      placeholder="Requirements for participation (funding stage, industry, etc.)"
                      required
                    ></textarea>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end space-x-3">
                  {editingEvent && (
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="px-6 py-2 rounded-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary px-6 py-2 rounded-full flex items-center"
                  >
                    {submitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {editingEvent ? 'Updating Event...' : 'Creating Event...'}
                      </>
                    ) : (
                      <>
                        <FaCalendarPlus className="mr-2" />
                        {editingEvent ? 'Update Event' : 'Create Event'}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
            
            <div className="glass-card p-6 backdrop-blur-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold gradient-text">Manage Events</h3>
                <span className="bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300 px-3 py-1 rounded-full text-sm">
                  {events.length} Events
                </span>
              </div>
              
              <div className="space-y-6">
                {events.map(event => (
                  <motion.div 
                    key={event.id}
                    whileHover={{ y: -2 }}
                    className="glass-card p-6 rounded-xl border border-white/20 dark:border-gray-700/30 transition-all"
                  >
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-lg text-gray-800 dark:text-white">{event.title}</h4>
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                            {event.type}
                          </span>
                          {event.status === 'past' && (
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                              Completed
                            </span>
                          )}
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-300 mb-2">{event.description}</p>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                          <div className="flex items-center">
                            <FaCalendarAlt className="mr-1" />
                            {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                          </div>
                          <div>
                            {event.time || `${event.startTime} - ${event.endTime} ${event.timezone}`}
                          </div>
                          <div>
                            Capacity: {event.capacity} (Available: {event.spotsRemaining || event.capacity})
                          </div>
                        </div>
                        
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                          Requirements: {event.requirements}
                        </p>
                      </div>
                      
                      <div className="flex md:flex-col gap-2">
                        <button 
                          onClick={() => handleEditEvent(event)}
                          className="bg-primary-500/10 text-primary-600 dark:text-primary-400 hover:bg-primary-500/20 px-4 py-2 rounded-full text-sm transition flex items-center justify-center"
                        >
                          <FaCalendarPlus className="mr-1" /> Edit
                        </button>
                        {event.status !== 'past' ? (
                          <button 
                            onClick={() => handleEndEvent(event.id)}
                            className="bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 px-4 py-2 rounded-full text-sm transition flex items-center justify-center"
                          >
                            <FaCheckCircle className="mr-1" /> End Event
                          </button>
                        ) : (
                          <button 
                            onClick={() => handleDeleteEvent(event.id)}
                            className="bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 px-4 py-2 rounded-full text-sm transition flex items-center justify-center"
                          >
                            <FaTrash className="mr-1" /> Delete
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {events.length === 0 && (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 dark:text-gray-500 mb-4">
                      <FaCalendarAlt className="w-8 h-8" />
                    </div>
                    <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-2">No Events Yet</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Create your first event to get started
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        );
      case 'verifyStartups':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-card p-6 backdrop-blur-sm"
          >
            <h3 className="text-2xl font-bold mb-6 gradient-text">Startups Pending Verification</h3>
            
            {pendingStartups.length > 0 ? (
              <div className="space-y-6">
                {pendingStartups.map(startup => (
                  <motion.div 
                    key={startup.id} 
                    whileHover={{ y: -2 }}
                    className="glass-card p-6 rounded-xl border border-white/20 dark:border-gray-700/30 transition-all"
                  >
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                      <div>
                        <h4 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">{startup.name}</h4>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {startup.industry.map((tag, index) => (
                            <span 
                              key={index} 
                              className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mb-2">{startup.description}</p>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">Submitted on {startup.submittedDate}</p>
                      </div>
                      <div className="flex md:flex-col gap-3">
                        <button className="btn-primary px-4 py-2 rounded-full text-sm">
                          Approve
                        </button>
                        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm shadow-lg hover:shadow-red-500/30 transition">
                          Reject
                        </button>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <button className="bg-white/50 dark:bg-dark-700/50 hover:bg-white/70 dark:hover:bg-dark-600/50 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-full text-sm transition">
                        View Documents
                      </button>
                      <button className="bg-white/50 dark:bg-dark-700/50 hover:bg-white/70 dark:hover:bg-dark-600/50 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-full text-sm transition">
                        View Full Profile
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-500 mb-4">
                  <FaCheckCircle className="w-8 h-8" />
                </div>
                <p className="text-gray-600 dark:text-gray-400">No startups pending verification at this time.</p>
              </div>
            )}
          </motion.div>
        );
      case 'verifyInvestors':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-card p-6 backdrop-blur-sm"
          >
            <h3 className="text-2xl font-bold mb-6 gradient-text">Investors Pending Verification</h3>
            
            {pendingInvestors.length > 0 ? (
              <div className="space-y-6">
                {pendingInvestors.map(investor => (
                  <motion.div 
                    key={investor.id} 
                    whileHover={{ y: -2 }}
                    className="glass-card p-6 rounded-xl border border-white/20 dark:border-gray-700/30 transition-all"
                  >
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                      <div>
                        <h4 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">{investor.name}</h4>
                        <div className="mb-3">
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                            {investor.type}
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mb-2">{investor.description}</p>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">Submitted on {investor.submittedDate}</p>
                      </div>
                      <div className="flex md:flex-col gap-3">
                        <button className="btn-primary px-4 py-2 rounded-full text-sm">
                          Approve
                        </button>
                        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm shadow-lg hover:shadow-red-500/30 transition">
                          Reject
                        </button>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <button className="bg-white/50 dark:bg-dark-700/50 hover:bg-white/70 dark:hover:bg-dark-600/50 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-full text-sm transition">
                        View Documents
                      </button>
                      <button className="bg-white/50 dark:bg-dark-700/50 hover:bg-white/70 dark:hover:bg-dark-600/50 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-full text-sm transition">
                        View Full Profile
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-500 mb-4">
                  <FaCheckCircle className="w-8 h-8" />
                </div>
                <p className="text-gray-600 dark:text-gray-400">No investors pending verification at this time.</p>
              </div>
            )}
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-dark-900 dark:via-dark-800 dark:to-dark-700">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-300/20 dark:bg-primary-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary-300/20 dark:bg-secondary-600/10 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-10"></div>
      </div>

      {/* Hero Section */}
      <div className="relative py-12 bg-gradient-to-r from-primary-600/90 to-secondary-600/90 dark:from-primary-800/90 dark:to-secondary-800/90 mb-10">
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" style={{
            backgroundImage: `linear-gradient(135deg, rgba(255,255,255,0.1) 25%, transparent 25%, 
            transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>
        
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
              <p className="text-blue-100 dark:text-blue-200 text-lg">
                Manage platform operations and oversee verification processes
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-3">
              <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-sm transition flex items-center">
                <FaBell className="mr-2" /> Notifications
              </button>
              <button className="bg-white text-primary-600 px-4 py-2 rounded-full text-sm font-medium transition hover:shadow-lg">
                <FaCog className="mr-2 inline" /> Settings
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 pb-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="glass-card p-4 backdrop-blur-sm"
            >
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-primary-500/30 to-secondary-600/30 rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-white/50 dark:border-white/10">
                  <FaUserShield className="text-primary-600 dark:text-primary-400 w-10 h-10" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{user?.firstName} {user?.lastName}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{user?.email}</p>
                <div className="mt-2">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300">
                    Platform Admin
                  </span>
                </div>
              </div>
              
              <nav className="mt-6 space-y-2">
                <button
                  onClick={() => setActiveTab('stats')}
                  className={`w-full text-left px-4 py-3 rounded-xl flex items-center transition ${
                    activeTab === 'stats' 
                      ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400 font-medium' 
                      : 'hover:bg-white/40 dark:hover:bg-dark-700/30 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <FaChartLine className="mr-3 w-5 h-5" />
                  <span>Dashboard</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('manageEvents')}
                  className={`w-full text-left px-4 py-3 rounded-xl flex items-center transition ${
                    activeTab === 'manageEvents' 
                      ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400 font-medium' 
                      : 'hover:bg-white/40 dark:hover:bg-dark-700/30 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <FaCalendarPlus className="mr-3 w-5 h-5" />
                  <span>Manage Events</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('verifyStartups')}
                  className={`w-full text-left px-4 py-3 rounded-xl flex items-center transition ${
                    activeTab === 'verifyStartups' 
                      ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400 font-medium' 
                      : 'hover:bg-white/40 dark:hover:bg-dark-700/30 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <FaBuilding className="mr-3 w-5 h-5" />
                  <span>Verify Startups</span>
                  {pendingStartups.length > 0 && (
                    <span className="ml-auto bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {pendingStartups.length}
                    </span>
                  )}
                </button>
                
                <button
                  onClick={() => setActiveTab('verifyInvestors')}
                  className={`w-full text-left px-4 py-3 rounded-xl flex items-center transition ${
                    activeTab === 'verifyInvestors' 
                      ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400 font-medium' 
                      : 'hover:bg-white/40 dark:hover:bg-dark-700/30 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <FaBusinessTime className="mr-3 w-5 h-5" />
                  <span>Verify Investors</span>
                  {pendingInvestors.length > 0 && (
                    <span className="ml-auto bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {pendingInvestors.length}
                    </span>
                  )}
                </button>
                
                <button
                  className="w-full text-left px-4 py-3 rounded-xl flex items-center transition hover:bg-white/40 dark:hover:bg-dark-700/30 text-gray-700 dark:text-gray-300"
                >
                  <FaUser className="mr-3 w-5 h-5" />
                  <span>Manage Users</span>
                </button>
                
                <button
                  className="w-full text-left px-4 py-3 rounded-xl flex items-center transition hover:bg-white/40 dark:hover:bg-dark-700/30 text-gray-700 dark:text-gray-300"
                >
                  <FaChartLine className="mr-3 w-5 h-5" />
                  <span>Reports</span>
                </button>
                
                <button
                  className="w-full text-left px-4 py-3 rounded-xl flex items-center transition hover:bg-white/40 dark:hover:bg-dark-700/30 text-gray-700 dark:text-gray-300"
                >
                  <FaCog className="mr-3 w-5 h-5" />
                  <span>Settings</span>
                </button>
              </nav>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 