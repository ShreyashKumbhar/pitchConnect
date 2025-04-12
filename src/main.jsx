import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { EventsProvider } from './context/EventsContext.jsx'

// Error boundary for capturing React render errors
const ErrorFallback = ({ error }) => {
  return (
    <div style={{ 
      padding: '20px', 
      margin: '20px', 
      backgroundColor: '#fff1f0', 
      border: '1px solid #ffa39e',
      borderRadius: '4px'
    }}>
      <h2 style={{ color: '#cf1322' }}>Something went wrong:</h2>
      <p style={{ margin: '10px 0' }}>{error.message}</p>
      <button
        onClick={() => window.location.reload()}
        style={{
          backgroundColor: '#1890ff',
          color: 'white',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Refresh Page
      </button>
    </div>
  );
};

// Create container for React app
const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    const root = createRoot(rootElement);
    
    root.render(
      <StrictMode>
        <EventsProvider>
          <App />
        </EventsProvider>
      </StrictMode>
    );

    // Log successful render
    console.log('React app mounted successfully');

  } catch (error) {
    console.error('Error rendering React application:', error);
    
    // Render fallback UI in case of error
    const errorRoot = createRoot(rootElement);
    errorRoot.render(<ErrorFallback error={error} />);
  }
} else {
  console.error('Root element not found. Check your HTML file.');
  
  // Create error message in DOM
  const errorDiv = document.createElement('div');
  errorDiv.style.padding = '20px';
  errorDiv.style.margin = '20px';
  errorDiv.style.backgroundColor = '#fff1f0';
  errorDiv.style.border = '1px solid #ffa39e';
  
  const errorMessage = document.createElement('h2');
  errorMessage.textContent = 'React mount error: Root element not found';
  errorMessage.style.color = '#cf1322';
  
  errorDiv.appendChild(errorMessage);
  document.body.appendChild(errorDiv);
}
