import React, { useState, useEffect } from 'react';
import { FaTimes, FaFile, FaFilePdf, FaFileExcel, FaFileVideo, FaUpload } from 'react-icons/fa';

const PitchMaterialForm = ({ material, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    id: '',
    type: 'pitchDeck',
    name: '',
    fileFormat: '',
    fileSize: '',
    description: '',
    url: '#',
    thumbnailUrl: '#'
  });
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [errors, setErrors] = useState({});
  
  useEffect(() => {
    if (material) {
      setFormData({
        ...material
      });
    }
  }, [material]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      
      // Auto-detect file format and update related fields
      const fileExtension = file.name.split('.').pop().toUpperCase();
      let fileFormat = fileExtension;
      let type = formData.type;
      
      // Set type based on file extension
      if (['PDF', 'DOC', 'DOCX'].includes(fileExtension)) {
        type = 'pitchDeck';
      } else if (['XLS', 'XLSX', 'CSV'].includes(fileExtension)) {
        type = 'financialProjections';
      } else if (['MP4', 'MOV', 'AVI', 'WEBM'].includes(fileExtension)) {
        type = 'productDemo';
      }
      
      // Calculate file size in MB with one decimal place
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(1);
      
      setFormData({
        ...formData,
        fileFormat,
        fileSize: `${fileSizeMB} MB`,
        type,
        name: file.name.split('.')[0] // Set name to filename without extension
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!material && !selectedFile) {
      newErrors.file = 'Please select a file to upload';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, you would upload the file here
      // For now, we'll just pass the form data
      onSave(formData);
    }
  };
  
  const getTypeIcon = (type) => {
    switch (type) {
      case 'pitchDeck':
        return <FaFilePdf className="text-primary-500" />;
      case 'financialProjections':
        return <FaFileExcel className="text-secondary-500" />;
      case 'productDemo':
        return <FaFileVideo className="text-accent-500" />;
      default:
        return <FaFile className="text-gray-500" />;
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-dark-800 rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 dark:border-dark-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {material ? 'Update Pitch Material' : 'Add New Pitch Material'}
          </h2>
          <button 
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <FaTimes size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          {!material && (
            <div className="mb-6">
              <label className="block text-gray-700 dark:text-gray-200 mb-2 font-medium">
                Upload File
              </label>
              <div className={`border-2 border-dashed rounded-lg p-8 text-center ${
                errors.file ? 'border-red-500' : 'border-gray-300 dark:border-dark-600'
              }`}>
                {selectedFile ? (
                  <div className="flex items-center justify-center flex-col">
                    <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-3">
                      {getTypeIcon(formData.type)}
                    </div>
                    <p className="text-gray-900 dark:text-white font-medium">{selectedFile.name}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      {formData.fileSize} • {formData.fileFormat}
                    </p>
                    <button 
                      type="button" 
                      className="mt-3 text-primary-600 dark:text-primary-400 text-sm font-medium"
                      onClick={() => setSelectedFile(null)}
                    >
                      Change File
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center flex-col">
                    <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-dark-600 flex items-center justify-center mb-3">
                      <FaUpload className="text-gray-400 dark:text-gray-500" />
                    </div>
                    <p className="text-gray-900 dark:text-white font-medium">
                      Drag and drop or click to upload
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                      Supported formats: PDF, DOCX, XLSX, MP4
                    </p>
                    <input
                      type="file"
                      id="file"
                      className="hidden"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.mp4,.mov,.avi,.webm"
                    />
                    <label
                      htmlFor="file"
                      className="btn btn-primary cursor-pointer"
                    >
                      Browse Files
                    </label>
                  </div>
                )}
                {errors.file && (
                  <p className="text-red-500 text-sm mt-2">{errors.file}</p>
                )}
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-200 mb-2 font-medium">
                Document Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md bg-white dark:bg-dark-700 text-gray-900 dark:text-white border-gray-300 dark:border-dark-600 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="pitchDeck">Pitch Deck</option>
                <option value="financialProjections">Financial Projections</option>
                <option value="productDemo">Product Demo</option>
                <option value="other">Other Document</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-700 dark:text-gray-200 mb-2 font-medium">
                Name*
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-dark-700 text-gray-900 dark:text-white border-gray-300 dark:border-dark-600 focus:ring-primary-500 focus:border-primary-500 ${
                  errors.name ? 'border-red-500' : ''
                }`}
                placeholder="e.g., Investor Pitch Deck"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 mb-2 font-medium">
              Description*
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-dark-700 text-gray-900 dark:text-white border-gray-300 dark:border-dark-600 focus:ring-primary-500 focus:border-primary-500 ${
                errors.description ? 'border-red-500' : ''
              }`}
              placeholder="Brief description of this document"
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>
          
          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200 dark:border-dark-700">
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
              {material ? 'Update Material' : 'Add Material'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PitchMaterialForm; 