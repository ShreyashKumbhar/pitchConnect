import React, { createContext, useState, useContext, useEffect } from 'react';

const EventsContext = createContext();

export const EventsProvider = ({ children }) => {
  // Load events from localStorage or initialize with default events
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem('events');
    if (savedEvents) {
      return JSON.parse(savedEvents);
    }
    
    // Initial mock events
    return [
      {
        id: "evt-001",
        title: "AI Startups Showcase",
        date: new Date(Date.now() + 86400000 * 10).toISOString(), // 10 days in future
        time: "10:00 AM - 12:00 PM EST",
        startTime: "10:00",
        endTime: "12:00",
        timezone: "EST",
        description: "A showcase of the most promising AI startups. Present your innovative solutions and connect with potential investors.",
        registrationDeadline: new Date(Date.now() + 86400000 * 5).toISOString(), // 5 days in future
        capacity: 12,
        spotsRemaining: 4,
        investors: [
          { id: "inv-001", name: "Venture Capital Partners" },
          { id: "inv-002", name: "TechStars Ventures" },
          { id: "inv-003", name: "AI Investments Inc." },
          { id: "inv-004", name: "Innovation Capital" },
          { id: "inv-005", name: "FutureFund" }
        ],
        type: "Virtual Pitch",
        requirements: "Pre-seed to Series A startups in AI/ML space",
        applicationLink: "#",
        status: "upcoming",
        meetingLink: "https://meet.pitchconnect.com/event/1"
      },
      {
        id: "evt-002",
        title: "Networking Mixer: FinTech Edition",
        date: new Date(Date.now() + 86400000 * 25).toISOString(), // 25 days in future
        time: "6:30 PM - 9:00 PM PST",
        startTime: "18:30", 
        endTime: "21:00",
        timezone: "PST",
        description: "An exclusive networking event bringing together fintech founders and investors for meaningful connections and conversations.",
        registrationDeadline: new Date(Date.now() + 86400000 * 15).toISOString(), // 15 days in future
        capacity: 50,
        spotsRemaining: 22,
        investors: [
          { id: "inv-004", name: "FinTech Capital" },
          { id: "inv-005", name: "Global Ventures" },
          { id: "inv-006", name: "Banking Innovation Fund" }
        ],
        type: "Networking",
        requirements: "FinTech startups at any stage",
        applicationLink: "#",
        status: "upcoming",
        meetingLink: "https://meet.pitchconnect.com/event/2"
      },
      {
        id: "evt-003",
        title: "Healthcare Innovation Summit",
        date: new Date(Date.now() + 86400000 * 45).toISOString(), // 45 days in future
        time: "9:00 AM - 4:00 PM EST",
        startTime: "09:00",
        endTime: "16:00",
        timezone: "EST",
        description: "A full-day summit focused on healthcare innovation, featuring panel discussions, pitch sessions, and one-on-one meetings with healthcare investors.",
        registrationDeadline: new Date(Date.now() + 86400000 * 30).toISOString(), // 30 days in future
        capacity: 25,
        spotsRemaining: 10,
        investors: [
          { id: "inv-007", name: "Healthcare Ventures" },
          { id: "inv-008", name: "Medical Innovations Fund" },
          { id: "inv-009", name: "BioTech Partners" }
        ],
        type: "Summit",
        requirements: "Healthcare and biotech startups with working prototypes or products",
        applicationLink: "#",
        status: "upcoming",
        meetingLink: "https://meet.pitchconnect.com/event/3"
      },
      {
        id: "evt-004",
        title: "SaaS Founders Roundtable",
        date: new Date(Date.now() - 86400000 * 15).toISOString(), // 15 days in past
        time: "1:00 PM - 3:00 PM EST",
        startTime: "13:00",
        endTime: "15:00",
        timezone: "EST",
        description: "A closed-door roundtable discussion for SaaS founders to share challenges and get feedback from experienced investors.",
        registrationDeadline: new Date(Date.now() - 86400000 * 30).toISOString(), // 30 days in past
        capacity: 15,
        spotsRemaining: 0,
        investors: [
          { id: "inv-010", name: "SaaS Capital" },
          { id: "inv-011", name: "Cloud Ventures" }
        ],
        type: "Roundtable",
        requirements: "SaaS startups with at least $10K MRR",
        applicationLink: "#",
        status: "past",
        meetingLink: "https://meet.pitchconnect.com/event/4"
      }
    ];
  });

  // Load registered events from localStorage
  const [registeredEvents, setRegisteredEvents] = useState(() => {
    const savedRegistrations = localStorage.getItem('registered_events');
    return savedRegistrations ? JSON.parse(savedRegistrations) : [];
  });

  // Save events to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  // Save registered events to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('registered_events', JSON.stringify(registeredEvents));
  }, [registeredEvents]);

  // Add a new event
  const addEvent = (newEvent) => {
    // Generate a random ID if not provided
    if (!newEvent.id) {
      newEvent.id = `evt-${Math.floor(Math.random() * 1000)}`;
    }
    
    // Format the time for display on the events page
    if (newEvent.startTime && newEvent.endTime && newEvent.timezone) {
      // Convert 24-hour format to 12-hour format for display
      const formatTime = (time) => {
        const [hours, minutes] = time.split(':');
        const hour = parseInt(hours, 10);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const formattedHour = hour % 12 || 12;
        return `${formattedHour}:${minutes} ${ampm}`;
      };
      
      newEvent.time = `${formatTime(newEvent.startTime)} - ${formatTime(newEvent.endTime)} ${newEvent.timezone}`;
    }
    
    // Add default values for events page compatibility
    if (!newEvent.registrationDeadline) {
      // Default deadline is 5 days before the event
      const eventDate = new Date(newEvent.date);
      const deadline = new Date(eventDate);
      deadline.setDate(deadline.getDate() - 5);
      newEvent.registrationDeadline = deadline.toISOString();
    }
    
    if (!newEvent.spotsRemaining) {
      newEvent.spotsRemaining = newEvent.capacity;
    }
    
    if (!newEvent.investors) {
      newEvent.investors = [];
    }
    
    if (!newEvent.applicationLink) {
      newEvent.applicationLink = "#";
    }

    if (!newEvent.meetingLink) {
      newEvent.meetingLink = "#";
    }
    
    // Determine if the event is in the past
    const eventDate = new Date(newEvent.date);
    const now = new Date();
    if (eventDate < now) {
      newEvent.status = "past";
    } else {
      newEvent.status = "upcoming";
    }
    
    setEvents([...events, newEvent]);
    return newEvent.id;
  };

  // Update an existing event
  const updateEvent = (id, updatedEvent) => {
    setEvents(events.map(event => 
      event.id === id ? { ...event, ...updatedEvent } : event
    ));
  };

  // Delete an event
  const deleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
    // Also remove from registered events if it exists
    setRegisteredEvents(registeredEvents.filter(eventId => eventId !== id));
  };

  // End an event (mark it as completed)
  const endEvent = (id) => {
    setEvents(events.map(event => 
      event.id === id ? { ...event, status: "past" } : event
    ));
  };

  // Get a single event by ID
  const getEvent = (id) => {
    return events.find(event => event.id === id);
  };

  // Register for an event
  const registerForEvent = (eventId) => {
    // Check if already registered
    if (isRegisteredForEvent(eventId)) {
      return false;
    }

    // Get the event
    const event = getEvent(eventId);
    if (!event || event.spotsRemaining <= 0) {
      return false;
    }

    // Update spots remaining
    updateEvent(eventId, { 
      spotsRemaining: event.spotsRemaining - 1 
    });

    // Add to registered events
    setRegisteredEvents([...registeredEvents, eventId]);
    return true;
  };

  // Unregister from an event
  const unregisterFromEvent = (eventId) => {
    // Check if registered
    if (!isRegisteredForEvent(eventId)) {
      return false;
    }

    // Get the event
    const event = getEvent(eventId);
    if (!event) {
      return false;
    }

    // Update spots remaining
    updateEvent(eventId, { 
      spotsRemaining: event.spotsRemaining + 1 
    });

    // Remove from registered events
    setRegisteredEvents(registeredEvents.filter(id => id !== eventId));
    return true;
  };

  // Check if registered for an event
  const isRegisteredForEvent = (eventId) => {
    return registeredEvents.includes(eventId);
  };

  // Get all registered events
  const getRegisteredEvents = () => {
    return events.filter(event => registeredEvents.includes(event.id));
  };

  return (
    <EventsContext.Provider value={{ 
      events, 
      addEvent, 
      updateEvent, 
      deleteEvent, 
      endEvent,
      getEvent,
      registerForEvent,
      unregisterFromEvent,
      isRegisteredForEvent,
      getRegisteredEvents
    }}>
      {children}
    </EventsContext.Provider>
  );
};

// Custom hook for using the events context
export const useEvents = () => useContext(EventsContext);

export default EventsContext; 