import { Link } from 'react-router-dom';
import { FaRocket, FaHandshake, FaSearchDollar, FaCalendarCheck, FaChartLine, FaLightbulb, FaUsers } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const HomePage = () => {
  const { darkMode } = useTheme();
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-28">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-secondary-700 dark:from-dark-800 dark:to-secondary-900"></div>
        
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" style={{
            backgroundImage: `linear-gradient(135deg, rgba(255,255,255,0.1) 25%, transparent 25%, 
            transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>
        
        {/* Animated circles */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-400 dark:bg-primary-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-secondary-400 dark:bg-secondary-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20" style={{animation: 'float 7s ease-in-out infinite'}}></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-white leading-tight">
            Connect <span className="text-accent-300">Startups</span> with <span className="text-accent-300">Investors</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 dark:text-blue-200 mb-10 max-w-3xl mx-auto">
            PitchConnect helps innovative startups find the right investors through AI-powered matchmaking.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/register"
              className="bg-white text-primary-600 hover:text-primary-700 hover:bg-gray-100 dark:bg-dark-800 dark:text-white dark:hover:bg-dark-700 px-8 py-4 rounded-xl font-semibold transition shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              Get Started
            </Link>
            <Link
              to="/events"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-primary-600 text-white px-8 py-4 rounded-xl font-semibold transition transform hover:-translate-y-1"
            >
              Explore Events
            </Link>
          </div>
          
          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white border border-white/20">
              <p className="text-3xl md:text-4xl font-bold">500+</p>
              <p className="text-sm md:text-base text-blue-100">Startups</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white border border-white/20">
              <p className="text-3xl md:text-4xl font-bold">250+</p>
              <p className="text-sm md:text-base text-blue-100">Investors</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white border border-white/20">
              <p className="text-3xl md:text-4xl font-bold">$40M+</p>
              <p className="text-sm md:text-base text-blue-100">Funding Secured</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white border border-white/20">
              <p className="text-3xl md:text-4xl font-bold">150+</p>
              <p className="text-sm md:text-base text-blue-100">Matches Made</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50 dark:bg-dark-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">How It Works</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="card group hover:shadow-xl dark:hover:shadow-dark-800/30 p-6 text-center">
              <div className="mx-auto bg-gradient-to-br from-primary-500 to-primary-600 w-16 h-16 flex items-center justify-center rounded-full mb-6 shadow-lg shadow-primary-500/20 group-hover:shadow-primary-500/40 transition-all duration-300">
                <FaRocket className="text-white w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Create Your Profile</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Sign up as a startup or investor and create your detailed profile with your requirements.
              </p>
            </div>

            {/* Step 2 */}
            <div className="card group hover:shadow-xl dark:hover:shadow-dark-800/30 p-6 text-center">
              <div className="mx-auto bg-gradient-to-br from-secondary-500 to-secondary-600 w-16 h-16 flex items-center justify-center rounded-full mb-6 shadow-lg shadow-secondary-500/20 group-hover:shadow-secondary-500/40 transition-all duration-300">
                <FaSearchDollar className="text-white w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Get Matched</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our AI-based algorithm matches startups with investors based on industry, stage, and preferences.
              </p>
            </div>

            {/* Step 3 */}
            <div className="card group hover:shadow-xl dark:hover:shadow-dark-800/30 p-6 text-center">
              <div className="mx-auto bg-gradient-to-br from-accent-500 to-accent-600 w-16 h-16 flex items-center justify-center rounded-full mb-6 shadow-lg shadow-accent-500/20 group-hover:shadow-accent-500/40 transition-all duration-300">
                <FaCalendarCheck className="text-white w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Attend Events</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Join virtual or in-person pitch events to showcase your startup or discover new opportunities.
              </p>
            </div>

            {/* Step 4 */}
            <div className="card group hover:shadow-xl dark:hover:shadow-dark-800/30 p-6 text-center">
              <div className="mx-auto bg-gradient-to-br from-blue-500 to-purple-500 w-16 h-16 flex items-center justify-center rounded-full mb-6 shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all duration-300">
                <FaHandshake className="text-white w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Connect & Grow</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Schedule meetings, exchange information, and build relationships that help your business grow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-dark-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">Platform Features</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full"></div>
            <p className="text-xl text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
              Discover all the tools and resources we offer to help startups and investors connect efficiently.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-6 group hover:shadow-lg dark:hover:shadow-dark-800/30 transition-all duration-300">
              <div className="text-primary-500 mb-4 bg-primary-50 dark:bg-primary-900/30 w-12 h-12 flex items-center justify-center rounded-lg">
                <FaChartLine className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Smart Matching</h3>
              <p className="text-gray-600 dark:text-gray-300">Advanced algorithms match startups with investors based on multiple factors including industry, investment stage, and funding requirements.</p>
            </div>
            
            <div className="card p-6 group hover:shadow-lg dark:hover:shadow-dark-800/30 transition-all duration-300">
              <div className="text-secondary-500 mb-4 bg-secondary-50 dark:bg-secondary-900/30 w-12 h-12 flex items-center justify-center rounded-lg">
                <FaLightbulb className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Virtual Pitch Events</h3>
              <p className="text-gray-600 dark:text-gray-300">Attend or host virtual pitch sessions with secure video conferencing, presentation tools, and real-time feedback features.</p>
            </div>
            
            <div className="card p-6 group hover:shadow-lg dark:hover:shadow-dark-800/30 transition-all duration-300">
              <div className="text-accent-500 mb-4 bg-accent-50 dark:bg-accent-900/30 w-12 h-12 flex items-center justify-center rounded-lg">
                <FaUsers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Verified Network</h3>
              <p className="text-gray-600 dark:text-gray-300">Connect with confidence through our verified network of startups and investors, all validated by our team to ensure authenticity.</p>
            </div>
          </div>
        </div>
      </section>

      {/* For Startups & Investors Section */}
      <section className="py-20 bg-gray-50 dark:bg-dark-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* For Startups */}
            <div className="card p-8 border-t-4 border-primary-500">
              <h3 className="text-2xl font-bold mb-6 gradient-text">For Startups</h3>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">Create a compelling profile to showcase your innovation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">Get matched with relevant investors based on your industry and stage</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">Participate in pitch events to present your business</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">Access a network of verified investors looking for opportunities</span>
                </li>
              </ul>
              <Link
                to="/register"
                className="btn-primary rounded-lg block text-center px-6 py-3"
              >
                Join as a Startup
              </Link>
            </div>

            {/* For Investors */}
            <div className="card p-8 border-t-4 border-secondary-500">
              <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-secondary-500 to-purple-500">For Investors</h3>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">Define your investment criteria and preferences</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">Discover pre-vetted startups that match your investment strategy</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">Attend virtual pitch events to evaluate multiple opportunities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">Connect directly with founders and schedule follow-up meetings</span>
                </li>
              </ul>
              <Link
                to="/register"
                className="btn-secondary rounded-lg block text-center px-6 py-3"
              >
                Join as an Investor
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white dark:bg-dark-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">Success Stories</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full"></div>
            <p className="text-xl text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
              Hear from startups and investors who found their perfect match on our platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card p-6">
              <div className="flex items-center mb-4">
                <div className="w-14 h-14 rounded-full bg-gray-200 dark:bg-dark-700 flex items-center justify-center text-xl font-bold text-gray-700 dark:text-gray-300 mr-4">
                  TS
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 dark:text-white">TechScale AI</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Series A Startup</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                "PitchConnect helped us connect with three serious investors who were perfectly aligned with our vision. We closed our Series A round in record time, raising $3.2M to scale our AI solution."
              </p>
              <p className="text-primary-600 dark:text-primary-400 font-medium">- Sarah Johnson, CEO</p>
            </div>
            
            <div className="card p-6">
              <div className="flex items-center mb-4">
                <div className="w-14 h-14 rounded-full bg-gray-200 dark:bg-dark-700 flex items-center justify-center text-xl font-bold text-gray-700 dark:text-gray-300 mr-4">
                  VF
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 dark:text-white">Venture First Capital</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Early-Stage Investor</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                "The quality of startups we've found through PitchConnect has been exceptional. Their AI matching saved us countless hours of screening and has led to three investments that are now thriving in our portfolio."
              </p>
              <p className="text-secondary-600 dark:text-secondary-400 font-medium">- Michael Chen, Managing Partner</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-700 dark:from-primary-900 dark:to-secondary-900"></div>
        
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-white rounded-full opacity-10"></div>
          <div className="absolute top-1/4 right-1/4 w-60 h-60 bg-white rounded-full opacity-5"></div>
          <div className="absolute bottom-1/3 left-1/3 w-20 h-20 bg-white rounded-full opacity-10"></div>
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white rounded-full opacity-5"></div>
        </div>
        
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Connect?</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join our community of innovative startups and strategic investors today.
          </p>
          <Link
            to="/register"
            className="bg-white text-primary-600 hover:text-primary-700 px-8 py-4 rounded-lg font-semibold transition shadow-xl hover:shadow-2xl transform hover:-translate-y-1 inline-block"
          >
            Create Your Account
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 