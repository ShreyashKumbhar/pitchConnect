import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../context/UserContext';

const InvestorProfile = () => {
  const { id } = useParams();
  const { currentUser, investorProfile: contextInvestorProfile } = useUser();
  const [investor, setInvestor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvestorData = async () => {
      try {
        setLoading(true);
        
        // If this is the current user's investor profile or specified with 'me', use the data from context
        if (id === 'me' || (currentUser && currentUser.id === id)) {
          console.log('Using investor profile from context:', contextInvestorProfile);
          if (contextInvestorProfile) {
            setInvestor(contextInvestorProfile);
            setLoading(false);
            return;
          }
        }

        // For demo purposes, using a mock API call
        // In production, replace with actual API endpoint
        // const response = await axios.get(`http://localhost:5000/api/investors/${id}`);
        
        // Mock data for demonstration
        const mockData = {
          name: "Venture Capital Partners",
          logo: "https://via.placeholder.com/150",
          founded: "2010-05-20",
          location: "New York, NY",
          type: "Venture Capital",
          description: "A leading VC firm focused on early-stage tech startups with transformative potential.",
          teamMembers: [
            { name: "Michael Johnson", position: "Managing Partner", linkedin: "https://linkedin.com/in/michaeljohnson" },
            { name: "Sarah Williams", position: "Partner", linkedin: "https://linkedin.com/in/sarahwilliams" },
            { name: "David Chen", position: "Principal", linkedin: "https://linkedin.com/in/davidchen" }
          ],
          portfolio: {
            companiesCount: 45,
            notableInvestments: [
              "Acme Technologies",
              "CloudSync Solutions",
              "DataMinds AI"
            ],
            successStories: 12,
            averageInvestment: "$2.5M"
          },
          investmentCriteria: {
            stages: ["Seed", "Series A"],
            industries: ["SaaS", "FinTech", "Health Tech", "AI/ML"],
            checkSize: "$500K - $3M",
            geographicFocus: ["United States", "Canada", "Europe"]
          },
          fundInfo: {
            currentFund: "Fund IV",
            size: "$150M",
            yearEstablished: 2023
          },
          website: "https://vcpartners.example.com",
          socialMedia: {
            twitter: "https://twitter.com/vcpartners",
            linkedin: "https://linkedin.com/company/vcpartners"
          }
        };
        
        // Simulate API delay
        setTimeout(() => {
          setInvestor(mockData);
          setLoading(false);
        }, 300);
        
      } catch (err) {
        setError('Failed to fetch investor data');
        setLoading(false);
        console.error('Error fetching investor data:', err);
      }
    };

    fetchInvestorData();
  }, [id, currentUser, contextInvestorProfile]);

  // Display a loading spinner
  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  // Display an error message if fetch failed
  if (error) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>{error}</p>
      </div>
    </div>
  );

  // Display a message if the investor profile isn't found
  if (!investor) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
        <p>Investor profile not found</p>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6 flex items-center">
          <div className="bg-white p-2 rounded-lg mr-4">
            {investor.logo ? (
              <img src={investor.logo} alt={`${investor.name || investor.displayName} logo`} className="h-16 w-16 object-contain" />
            ) : (
              <div className="h-16 w-16 bg-gray-200 rounded-lg flex items-center justify-center text-xl font-bold text-gray-600">
                {(investor.name || investor.displayName || "Investor").charAt(0)}
              </div>
            )}
          </div>
          <div className="text-white">
            <h1 className="text-3xl font-bold">{investor.name || investor.displayName}</h1>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="bg-purple-700 bg-opacity-50 px-2 py-1 rounded text-sm">{investor.type}</span>
              {investor.location && (
                <span className="bg-purple-700 bg-opacity-50 px-2 py-1 rounded text-sm">{investor.location}</span>
              )}
              {investor.founded && (
                <span className="bg-purple-700 bg-opacity-50 px-2 py-1 rounded text-sm">
                  Est. {new Date(investor.founded).getFullYear()}
                </span>
              )}
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="p-6">
          {/* Description */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-gray-800 border-b pb-2">Firm Overview</h2>
            <p className="text-gray-700 leading-relaxed">{investor.description || investor.bio}</p>
          </section>
          
          {/* Fund Information */}
          {investor.fundInfo && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Fund Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Current Fund</p>
                  <p className="font-semibold text-gray-800">{investor.fundInfo.currentFund}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Fund Size</p>
                  <p className="font-semibold text-gray-800">{investor.fundInfo.size}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Established</p>
                  <p className="font-semibold text-gray-800">{investor.fundInfo.yearEstablished}</p>
                </div>
              </div>
            </section>
          )}
          
          {/* Investment Criteria */}
          {(investor.investmentCriteria || investor.investmentPreferences) && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Investment Criteria</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Investment Stages</h3>
                  <div className="flex flex-wrap gap-2">
                    {(investor.investmentCriteria?.stages || investor.investmentPreferences?.stages || []).map((stage, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {stage}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Check Size</h3>
                  <p className="text-gray-800">
                    {investor.investmentCriteria?.checkSize || 
                     (investor.investmentPreferences?.investmentSize && 
                     `$${investor.investmentPreferences.investmentSize.min.toLocaleString()} - $${investor.investmentPreferences.investmentSize.max.toLocaleString()}`)}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="font-medium text-gray-700 mb-2">Industry Focus</h3>
                  <div className="flex flex-wrap gap-2">
                    {(investor.investmentCriteria?.industries || investor.investmentPreferences?.industries || []).map((industry, index) => (
                      <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        {industry}
                      </span>
                    ))}
                  </div>
                </div>
                {(investor.investmentCriteria?.geographicFocus || investor.location) && (
                  <div className="md:col-span-2">
                    <h3 className="font-medium text-gray-700 mb-2">Geographic Focus</h3>
                    <div className="flex flex-wrap gap-2">
                      {(investor.investmentCriteria?.geographicFocus || [investor.location]).filter(Boolean).map((region, index) => (
                        <span key={index} className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                          {region}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}
          
          {/* Portfolio */}
          {investor.portfolio && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Portfolio</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Stats</h3>
                  <div className="flex flex-col space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Companies</span>
                      <span className="font-semibold">{investor.portfolio.companiesCount || investor.portfolio.companies || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Success Stories</span>
                      <span className="font-semibold">{investor.portfolio.successStories || investor.portfolio.exited || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Average Investment</span>
                      <span className="font-semibold">{investor.portfolio.averageInvestment || '-'}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Notable Investments</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {(investor.portfolio.notableInvestments || 
                      (investor.portfolio.notableFunding && investor.portfolio.notableFunding.map(item => item.company)) || 
                      []).map((company, index) => (
                      <li key={index} className="text-gray-800">{company}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          )}
          
          {/* Team Members */}
          {(investor.teamMembers || investor.team) && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Investment Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(investor.teamMembers || investor.team).map((member, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-gray-200 h-20 w-20 rounded-full flex items-center justify-center mb-3">
                        <span className="text-2xl font-bold text-gray-600">{member.name.charAt(0)}</span>
                      </div>
                      <h3 className="font-medium text-gray-800">{member.name}</h3>
                      <p className="text-gray-600 mb-2">{member.position || member.title}</p>
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">LinkedIn Profile</a>
                      )}
                      {member.bio && (
                        <p className="text-sm text-gray-500 mt-2">{member.bio}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* Contact and Links */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Links & Contact</h2>
            <div className="flex flex-wrap gap-4">
              {investor.website && (
                <a href={investor.website} target="_blank" rel="noopener noreferrer" 
                  className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors">
                  Visit Website
                </a>
              )}
              {investor.socialMedia?.linkedin && (
                <a href={investor.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" 
                  className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-900 transition-colors">
                  LinkedIn
                </a>
              )}
              {investor.socialMedia?.twitter && (
                <a href={investor.socialMedia.twitter} target="_blank" rel="noopener noreferrer" 
                  className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500 transition-colors">
                  Twitter
                </a>
              )}
              <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">
                Request Pitch Meeting
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default InvestorProfile; 