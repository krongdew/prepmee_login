import React, { useState } from 'react';
import { Alert } from '@/components/ui/alert';

const applytoteach = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    subjects: [],
    profileImage: null,
    introVideo: null,
    description: '',
    experience: '',
    education: '',
    resume: null
  });
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState('');

  const subjects = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology',
    'English', 'Thai', 'History', 'Computer Science'
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Name is required';
    if (formData.subjects.length === 0) newErrors.subjects = 'Select at least one subject';
    if (!formData.profileImage) newErrors.profileImage = 'Profile image is required';
    if (!formData.introVideo) newErrors.introVideo = 'Introduction video is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.experience) newErrors.experience = 'Experience is required';
    if (!formData.education) newErrors.education = 'Education is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      setSubmitStatus('success');
    } else {
      setSubmitStatus('error');
    }
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        [field]: file
      }));
    }
  };

  const handleSubjectChange = (subject) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Apply to Teach</h1>
          <p className="text-gray-600">Share your knowledge and inspire others</p>
        </div>
        
        {submitStatus === 'success' && (
          <Alert className="mb-4 bg-green-100 text-green-800">
            Application submitted successfully!
          </Alert>
        )}

        {submitStatus === 'error' && (
          <Alert className="mb-4 bg-red-100 text-red-800">
            Please fill in all required fields.
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              className={`w-full px-3 py-2 border rounded-md ${
                errors.fullName ? 'border-red-500' : 'border-gray-300'
              }`}
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
            )}
          </div>

          {/* Subjects */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subjects
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {subjects.map(subject => (
                <div key={subject} className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    checked={formData.subjects.includes(subject)}
                    onChange={() => handleSubjectChange(subject)}
                  />
                  <label className="ml-2 text-sm text-gray-700">{subject}</label>
                </div>
              ))}
            </div>
            {errors.subjects && (
              <p className="mt-1 text-sm text-red-500">{errors.subjects}</p>
            )}
          </div>

          {/* Profile Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profile Image
            </label>
            <input
              type="file"
              accept="image/*"
              className={`w-full px-3 py-2 border rounded-md ${
                errors.profileImage ? 'border-red-500' : 'border-gray-300'
              }`}
              onChange={(e) => handleFileChange(e, 'profileImage')}
            />
            {errors.profileImage && (
              <p className="mt-1 text-sm text-red-500">{errors.profileImage}</p>
            )}
          </div>

          {/* Introduction Video */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Introduction Video
            </label>
            <input
              type="file"
              accept="video/*"
              className={`w-full px-3 py-2 border rounded-md ${
                errors.introVideo ? 'border-red-500' : 'border-gray-300'
              }`}
              onChange={(e) => handleFileChange(e, 'introVideo')}
            />
            {errors.introVideo && (
              <p className="mt-1 text-sm text-red-500">{errors.introVideo}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              className={`w-full px-3 py-2 border rounded-md ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              rows="4"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Tell us about yourself and your teaching style"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">{errors.description}</p>
            )}
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teaching Experience
            </label>
            <textarea
              className={`w-full px-3 py-2 border rounded-md ${
                errors.experience ? 'border-red-500' : 'border-gray-300'
              }`}
              rows="4"
              value={formData.experience}
              onChange={(e) => setFormData({...formData, experience: e.target.value})}
              placeholder="Share your teaching experience"
            />
            {errors.experience && (
              <p className="mt-1 text-sm text-red-500">{errors.experience}</p>
            )}
          </div>

          {/* Education */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Education Background
            </label>
            <textarea
              className={`w-full px-3 py-2 border rounded-md ${
                errors.education ? 'border-red-500' : 'border-gray-300'
              }`}
              rows="4"
              value={formData.education}
              onChange={(e) => setFormData({...formData, education: e.target.value})}
              placeholder="List your educational qualifications"
            />
            {errors.education && (
              <p className="mt-1 text-sm text-red-500">{errors.education}</p>
            )}
          </div>

          {/* Resume Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Resume/CV/Degree/Transcript or all
            </label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="w-full px-3 py-2 border rounded-md border-gray-300"
              onChange={(e) => handleFileChange(e, 'resume')}
            />
            <p className="mt-1 text-sm text-gray-500">Accepted formats: PDF, DOC, DOCX</p>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;