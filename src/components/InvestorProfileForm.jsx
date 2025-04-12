import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

const InvestorProfileForm = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    displayName: initialData?.displayName || '',
    type: initialData?.type || '',
    bio: initialData?.bio || '',
    investmentPreferences: {
      industries: initialData?.investmentPreferences?.industries || [],
      stages: initialData?.investmentPreferences?.stages || [],
      investmentSize: {
        min: initialData?.investmentPreferences?.investmentSize?.min || 0,
        max: initialData?.investmentPreferences?.investmentSize?.max || 0
      }
    }
  });

  const [industryInput, setIndustryInput] = useState('');
  const [stageInput, setStageInput] = useState('');

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
    if (initialData) {
      setFormData({
        displayName: initialData.displayName || '',
        type: initialData.type || '',
        bio: initialData.bio || '',
        investmentPreferences: {
          industries: initialData.investmentPreferences?.industries || [],
          stages: initialData.investmentPreferences?.stages || [],
          investmentSize: {
            min: initialData.investmentPreferences?.investmentSize?.min || 0,
            max: initialData.investmentPreferences?.investmentSize?.max || 0
          }
        }
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInvestmentSizeChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      investmentPreferences: {
        ...prev.investmentPreferences,
        investmentSize: {
          ...prev.investmentPreferences.investmentSize,
          [name]: parseInt(value) || 0
        }
      }
    }));
  };

  const addIndustry = () => {
    if (industryInput.trim() === '') return;
    
    setFormData(prev => ({
      ...prev,
      investmentPreferences: {
        ...prev.investmentPreferences,
        industries: [...prev.investmentPreferences.industries, industryInput.trim()]
      }
    }));
    setIndustryInput('');
  };

  const removeIndustry = (index) => {
    setFormData(prev => ({
      ...prev,
      investmentPreferences: {
        ...prev.investmentPreferences,
        industries: prev.investmentPreferences.industries.filter((_, i) => i !== index)
      }
    }));
  };

  const addStage = () => {
    if (stageInput.trim() === '') return;
    
    setFormData(prev => ({
      ...prev,
      investmentPreferences: {
        ...prev.investmentPreferences,
        stages: [...prev.investmentPreferences.stages, stageInput.trim()]
      }
    }));
    setStageInput('');
  };

  const removeStage = (index) => {
    setFormData(prev => ({
      ...prev,
      investmentPreferences: {
        ...prev.investmentPreferences,
        stages: prev.investmentPreferences.stages.filter((_, i) => i !== index)
      }
    }));
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
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Investor Profile</h2>
          <button 
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <FaTimes size={20} />
          </button>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Update your profile information to improve visibility and startup matches
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        <div className="grid grid-cols-1 gap-6">
          {/* Basic Information */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Basic Information</h4>
            
            <div className="mb-4">
              <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Fund / Investor Name
              </label>
              <input
                type="text"
                id="displayName"
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                className="input w-full"
                placeholder="e.g., Vision Capital"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Investor Type
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="input w-full"
                required
              >
                <option value="">Select investor type</option>
                <option value="Venture Capital">Venture Capital</option>
                <option value="Angel Investor">Angel Investor</option>
                <option value="Corporate Investor">Corporate Investor</option>
                <option value="Family Office">Family Office</option>
                <option value="Accelerator">Accelerator</option>
                <option value="Micro VC">Micro VC</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Bio / Description
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="input w-full"
                placeholder="Describe your investment philosophy and approach..."
                required
              />
            </div>
          </div>
          
          {/* Investment Preferences */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Investment Preferences</h4>
            
            {/* Industries */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Industries
              </label>
              <div className="flex mb-2">
                <input
                  type="text"
                  value={industryInput}
                  onChange={(e) => setIndustryInput(e.target.value)}
                  className="input flex-grow"
                  placeholder="e.g., SaaS, FinTech, AI"
                />
                <button
                  type="button"
                  onClick={addIndustry}
                  className="ml-2 btn btn-primary"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.investmentPreferences.industries.map((industry, index) => (
                  <div 
                    key={index} 
                    className="bg-primary-100/80 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-3 py-1 rounded-full flex items-center"
                  >
                    <span>{industry}</span>
                    <button 
                      type="button" 
                      onClick={() => removeIndustry(index)}
                      className="ml-2 text-primary-500 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                    >
                      <FaTimes size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Stages */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Investment Stages
              </label>
              <div className="flex mb-2">
                <input
                  type="text"
                  value={stageInput}
                  onChange={(e) => setStageInput(e.target.value)}
                  className="input flex-grow"
                  placeholder="e.g., Seed, Series A"
                />
                <button
                  type="button"
                  onClick={addStage}
                  className="ml-2 btn btn-primary"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.investmentPreferences.stages.map((stage, index) => (
                  <div 
                    key={index} 
                    className="bg-secondary-100/80 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-300 px-3 py-1 rounded-full flex items-center"
                  >
                    <span>{stage}</span>
                    <button 
                      type="button" 
                      onClick={() => removeStage(index)}
                      className="ml-2 text-secondary-500 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-300"
                    >
                      <FaTimes size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Investment Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Investment Size Range ($)
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="min" className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                    Minimum
                  </label>
                  <input
                    type="number"
                    id="min"
                    name="min"
                    value={formData.investmentPreferences.investmentSize.min}
                    onChange={handleInvestmentSizeChange}
                    className="input w-full"
                    placeholder="Min investment"
                    min="0"
                  />
                </div>
                <div>
                  <label htmlFor="max" className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                    Maximum
                  </label>
                  <input
                    type="number"
                    id="max"
                    name="max"
                    value={formData.investmentPreferences.investmentSize.max}
                    onChange={handleInvestmentSizeChange}
                    className="input w-full"
                    placeholder="Max investment"
                    min="0"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end mt-8 space-x-3">
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
            Save Profile
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default InvestorProfileForm; 