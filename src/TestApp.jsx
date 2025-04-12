import React from 'react';

function TestApp() {
  return (
    <div className="min-h-screen flex flex-col bg-blue-50 items-center justify-center">
      <header className="bg-blue-600 text-white w-full py-4 text-center">
        <h1 className="text-2xl font-bold">PitchConnect</h1>
      </header>
      
      <main className="flex-grow flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Test Page</h2>
          <p className="text-gray-600 mb-4">
            This is a simplified test page to diagnose rendering issues.
          </p>
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            onClick={() => alert('Button clicked!')}
          >
            Test Button
          </button>
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white w-full py-4 text-center">
        <p>PitchConnect &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default TestApp; 