import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const StartupProfileForm = ({ startup, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    logo: '',
    stage: '',
    industry: [],
    description: '',
    location: '',
    teamSize: '',
    foundedYear: '',
    website: '',
    pitch: {
      tagline: '',
      problem: '',
      solution: '',
      traction: '',
      businessModel: ''
    },
    funding: {
      raised: '',
      seeking: '',
      useOfFunds: ''
    }
  });
  const [newIndustry, setNewIndustry] = useState('');

  // Animation variants
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 } 
    }
  };

  useEffect(() => {
    if (startup) {
      setFormData({
        companyName: startup.companyName || '',
        logo: startup.logo || '',
        stage: startup.stage || '',
        industry: Array.isArray(startup.industry) ? startup.industry : [],
        description: startup.description || '',
        location: startup.location || '',
        teamSize: startup.teamSize || '',
        foundedYear: startup.foundedYear || '',
        website: startup.website || '',
        pitch: {
          tagline: startup.pitch?.tagline || '',
          problem: startup.pitch?.problem || '',
          solution: startup.pitch?.solution || '',
          traction: startup.pitch?.traction || '',
          businessModel: startup.pitch?.businessModel || ''
        },
        funding: {
          raised: startup.funding?.raised || '',
          seeking: startup.funding?.seeking || '',
          useOfFunds: startup.funding?.useOfFunds || ''
        }
      });
    }
  }, [startup]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const addIndustry = () => {
    if (newIndustry.trim() && !formData.industry.includes(newIndustry.trim())) {
      setFormData({
        ...formData,
        industry: [...formData.industry, newIndustry.trim()]
      });
      setNewIndustry('');
    }
  };

  const removeIndustry = (industry) => {
    setFormData({
      ...formData,
      industry: formData.industry.filter(i => i !== industry)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      className="glass-card backdrop-blur-md overflow-hidden"
    >
      <div className="p-6 border-b border-gray-200 dark:border-dark-600">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Edit Startup Profile</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Update your startup information to attract investors and improve visibility
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Company Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="input w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="logo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Logo URL
            </label>
            <input
              type="text"
              id="logo"
              name="logo"
              value={formData.logo}
              onChange={handleChange}
              className="input w-full"
              placeholder="https://example.com/logo.png"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label htmlFor="stage" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Stage
            </label>
            <select
              id="stage"
              name="stage"
              value={formData.stage}
              onChange={handleChange}
              className="input w-full"
              required
            >
              <option value="">Select Stage</option>
              <option value="Idea">Idea</option>
              <option value="MVP">MVP</option>
              <option value="Pre-seed">Pre-seed</option>
              <option value="Seed">Seed</option>
              <option value="Early Traction">Early Traction</option>
              <option value="Series A">Series A</option>
              <option value="Series B+">Series B+</option>
            </select>
          </div>
          <div>
            <label htmlFor="foundedYear" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Founded Year
            </label>
            <input
              type="number"
              id="foundedYear"
              name="foundedYear"
              value={formData.foundedYear}
              onChange={handleChange}
              className="input w-full"
              placeholder="2023"
              min="1900"
              max={new Date().getFullYear()}
            />
          </div>
          <div>
            <label htmlFor="teamSize" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Team Size
            </label>
            <input
              type="text"
              id="teamSize"
              name="teamSize"
              value={formData.teamSize}
              onChange={handleChange}
              className="input w-full"
              placeholder="e.g., 5 employees"
            />
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Company Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="input w-full"
            required
          ></textarea>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="input w-full"
              placeholder="City, Country"
            />
          </div>
          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Website
            </label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="input w-full"
              placeholder="https://example.com"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Industry Tags
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.industry.map((industry, index) => (
              <span
                key={index}
                className="bg-primary-100/80 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-medium px-2.5 py-1 rounded-full flex items-center"
              >
                {industry}
                <button
                  type="button"
                  onClick={() => removeIndustry(industry)}
                  className="ml-1.5 text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-200"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </span>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              placeholder="Add industry (e.g., SaaS, FinTech)"
              value={newIndustry}
              onChange={(e) => setNewIndustry(e.target.value)}
              className="input flex-grow mr-2"
            />
            <button
              type="button"
              onClick={addIndustry}
              className="btn btn-primary px-3"
            >
              Add
            </button>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-dark-600 pt-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Pitch Information</h3>
          
          <div className="mb-4">
            <label htmlFor="pitch.tagline" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tagline
            </label>
            <input
              type="text"
              id="pitch.tagline"
              name="pitch.tagline"
              value={formData.pitch.tagline}
              onChange={handleChange}
              className="input w-full"
              placeholder="One-sentence description of your startup"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="pitch.problem" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Problem
              </label>
              <textarea
                id="pitch.problem"
                name="pitch.problem"
                value={formData.pitch.problem}
                onChange={handleChange}
                rows="3"
                className="input w-full"
                placeholder="What problem are you solving?"
              ></textarea>
            </div>
            <div>
              <label htmlFor="pitch.solution" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Solution
              </label>
              <textarea
                id="pitch.solution"
                name="pitch.solution"
                value={formData.pitch.solution}
                onChange={handleChange}
                rows="3"
                className="input w-full"
                placeholder="How does your product solve this problem?"
              ></textarea>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label htmlFor="pitch.traction" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Traction
              </label>
              <textarea
                id="pitch.traction"
                name="pitch.traction"
                value={formData.pitch.traction}
                onChange={handleChange}
                rows="3"
                className="input w-full"
                placeholder="Key metrics and growth to date"
              ></textarea>
            </div>
            <div>
              <label htmlFor="pitch.businessModel" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Business Model
              </label>
              <textarea
                id="pitch.businessModel"
                name="pitch.businessModel"
                value={formData.pitch.businessModel}
                onChange={handleChange}
                rows="3"
                className="input w-full"
                placeholder="How do you make money?"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-dark-600 pt-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Funding Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            <div>
              <label htmlFor="funding.raised" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Funding Raised
              </label>
              <input
                type="text"
                id="funding.raised"
                name="funding.raised"
                value={formData.funding.raised}
                onChange={handleChange}
                className="input w-full"
                placeholder="e.g., $500K"
              />
            </div>
            <div>
              <label htmlFor="funding.seeking" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Seeking
              </label>
              <input
                type="text"
                id="funding.seeking"
                name="funding.seeking"
                value={formData.funding.seeking}
                onChange={handleChange}
                className="input w-full"
                placeholder="e.g., $2M"
              />
            </div>
            <div>
              <label htmlFor="funding.useOfFunds" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Use of Funds
              </label>
              <input
                type="text"
                id="funding.useOfFunds"
                name="funding.useOfFunds"
                value={formData.funding.useOfFunds}
                onChange={handleChange}
                className="input w-full"
                placeholder="e.g., Product development, marketing"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200 dark:border-dark-600">
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-ghost"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
          >
            Save Changes
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default StartupProfileForm; 