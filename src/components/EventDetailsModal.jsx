import React from 'react';
import { FaExternalLinkAlt, FaTimes, FaUsers, FaCalendarCheck, FaClock } from 'react-icons/fa';

const EventDetailsModal = ({ event, isRegistered, onClose, onRegister }) => {
  if (!event) return null;
  
  // Check if the event is past
  const eventDate = new Date(event.date);
  const now = new Date();
  const isPast = eventDate < now || event.status === 'past';
  
  // Check if registration deadline is passed
  const deadlineDate = new Date(event.registrationDeadline);
  const isDeadlinePassed = deadlineDate < now;
  
  // Check if spots are available
  const canRegister = !isPast && !isDeadlinePassed && event.spotsRemaining > 0 && !isRegistered;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-dark-800 rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 dark:border-dark-700 flex justify-between items-start">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{event.title}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <div className="p-6 text-gray-700 dark:text-gray-300">
          <p className="text-gray-600 dark:text-gray-300 mb-6">{event.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex flex-col">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Date & Time:</p>
              <div className="flex items-center gap-2 mb-1">
                <FaCalendarCheck className="text-primary-500 dark:text-primary-400" />
                <p className="font-medium text-gray-900 dark:text-white">
                  {new Date(event.date).toLocaleDateString('en-US', { 
                    weekday: 'long',
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <FaClock className="text-primary-500 dark:text-primary-400" />
                <p className="font-medium text-gray-900 dark:text-white">{event.time}</p>
              </div>
            </div>
            
            <div className="flex flex-col">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Capacity:</p>
              <div className="flex items-center gap-2">
                <FaUsers className="text-primary-500 dark:text-primary-400" />
                <p className="font-medium text-gray-900 dark:text-white">
                  {event.spotsRemaining} of {event.capacity} spots remaining
                </p>
              </div>
              <div className="w-full bg-gray-200 dark:bg-dark-600 h-2 rounded-full mt-2">
                <div 
                  className="bg-primary-500 h-2 rounded-full" 
                  style={{ width: `${((event.capacity - event.spotsRemaining) / event.capacity) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          {event.investors && event.investors.length > 0 && (
            <div className="mb-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">Participating Investors</h3>
              <div className="flex -space-x-2 overflow-hidden mb-2">
                {event.investors.slice(0, 5).map((investor, index) => (
                  <div 
                    key={investor.id || index} 
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-white dark:ring-dark-800 bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
                    title={investor.name}
                  >
                    <span className="text-sm font-medium">{investor.name.charAt(0)}</span>
                  </div>
                ))}
                {event.investors.length > 5 && (
                  <div className="inline-block h-10 w-10 rounded-full ring-2 ring-white dark:ring-dark-800 bg-primary-500 flex items-center justify-center">
                    <span className="text-sm font-medium text-white">+{event.investors.length - 5}</span>
                  </div>
                )}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {event.investors.slice(0, 3).map((investor, i) => (
                  <span key={investor.id || i}>
                    {investor.name}
                    {i < Math.min(2, event.investors.length - 1) && ', '}
                  </span>
                ))}
                {event.investors.length > 3 && ` and ${event.investors.length - 3} more`}
              </div>
            </div>
          )}
          
          <div className="mb-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-3">Event Details</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Event Type</p>
                <p className="font-medium text-gray-900 dark:text-white">{event.type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Requirements</p>
                <p className="font-medium text-gray-900 dark:text-white">{event.requirements}</p>
              </div>
              {!isPast && (
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
              )}
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200 dark:border-dark-700">
            <button
              onClick={onClose}
              className="btn btn-ghost"
            >
              Close
            </button>
            
            {isRegistered ? (
              <a 
                href={event.meetingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary flex items-center"
              >
                <FaExternalLinkAlt className="mr-2" /> Join Virtual Room
              </a>
            ) : canRegister ? (
              <button
                onClick={() => {
                  onRegister(event);
                  onClose();
                }}
                className="btn btn-primary"
              >
                Register
              </button>
            ) : (
              <button
                disabled
                className="btn btn-ghost text-gray-500 cursor-not-allowed"
              >
                {isPast ? 'Event Ended' : isDeadlinePassed ? 'Registration Closed' : 'No Spots Available'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsModal; 