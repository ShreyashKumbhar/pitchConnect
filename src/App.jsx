import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider, useUser } from './context/UserContext';
import { EventsProvider } from './context/EventsContext';

// Import Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StartupDashboard from './pages/StartupDashboard';
import InvestorDashboard from './pages/InvestorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import StartupProfile from './pages/StartupProfile';
import InvestorProfile from './pages/InvestorProfile';
import EventsPage from './pages/EventsPage';
import EventDetails from './pages/EventDetails';
import NotFoundPage from './pages/NotFoundPage';
import StartupsList from './pages/StartupsList';

// Import Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Main App Routes Component
const AppRoutes = () => {
  const { currentUser, isLoading } = useUser();

  // Show loading state if user auth is being checked
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="relative w-16 h-16">
          <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-t-primary-500 border-r-transparent border-b-secondary-500 border-l-transparent animate-spin"></div>
          <div className="absolute top-2 left-2 w-12 h-12 rounded-full border-4 border-t-transparent border-r-accent-500 border-b-transparent border-l-accent-300 animate-spin-slow"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      
      <main className="flex-grow w-full relative">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/startups" element={<StartupsList />} />
          <Route path="/startups/:id" element={<StartupProfile />} />
          <Route path="/investors/:id" element={<InvestorProfile />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:id" element={<EventDetails />} />
          
          {/* Protected Routes */}
          <Route 
            path="/startup/dashboard" 
            element={
              <ProtectedRoute requiredRole="startup">
                <StartupDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/investor/dashboard" 
            element={
              <ProtectedRoute requiredRole="investor">
                <InvestorDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      
      <Footer />
    </>
  );
};

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <EventsProvider>
          <Router>
            <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-dark-900 dark:text-gray-100 transition-colors duration-200 relative overflow-x-hidden">
              <AppRoutes />
            </div>
          </Router>
        </EventsProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
