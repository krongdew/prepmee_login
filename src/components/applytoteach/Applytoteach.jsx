"use client"

import { useState } from 'react';

export default function Page() {
  const [formData, setFormData] = useState({
    fullName: '',
    subjects: [],
    teachingModes: [],
    areas: '',
    province: '',
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
   'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Science', 'Social','English', 'Thai', 'Chinese', 'Korean', 'Japanese', 'French', 'German','History', 
    'Coding & Programming', 'Chinese', 'Art', 'Music', 'Singing','Dance','Others'
  ];

  const teachingModes = [
    { id: 'online', label: 'Online Teaching' },
    { id: 'onsite', label: 'Onsite Teaching' }
  ];

  const provinces = [
    'Bangkok', 'Nonthaburi', 'Pathum Thani', 'Samut Prakan',
    'Nakhon Pathom', 'Samut Sakhon', 'Other'
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Name is required';
    if (formData.subjects.length === 0) newErrors.subjects = 'Select at least one subject';
    if (formData.teachingModes.length === 0) newErrors.teachingModes = 'Select at least one teaching mode';
    if (formData.teachingModes.includes('onsite') && !formData.province) {
      newErrors.province = 'Province is required for onsite teaching';
    }
    if (formData.teachingModes.includes('onsite') && !formData.areas) {
      newErrors.areas = 'Areas is required for onsite teaching';
    }
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

  const handleTeachingModeChange = (mode) => {
    setFormData(prev => ({
      ...prev,
      teachingModes: prev.teachingModes.includes(mode)
        ? prev.teachingModes.filter(m => m !== mode)
        : [...prev.teachingModes, mode]
    }));
  };

  return (
    <>
      <div className="bgc-thm4">
        
        <section className="our-register pt60">
          <div className="container">

            <div className="row wow fadeInRight" data-wow-delay="300ms">
              <div className="col-xl-10 mx-auto">
                <div className="log-reg-form form-style1 bgc-white p50 mb60 bdrs12 position-relative">
                  {submitStatus === 'success' && (
                    <div className="alert alert-success p4">
                      <i className="fas fa-check-circle me-2"></i>
                      Application submitted successfully!
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="alert alert-danger p4">
                      <i className="fas fa-exclamation-circle me-2"></i>
                      Please fill in all required fields.
                    </div>
                  )}

                  <div className="text-center mb40">
                    <h3 className="form_title">Teacher Application</h3>
                    <p className="text">Please complete all required fields to submit your application</p>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="section-block mb40">
                      <h4 className="section-title mb20">Personal Information</h4>
                      
                      <div className="mb20">
                        <label className="form-label fw600">
                          Full Name <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.fullName}
                          onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                          placeholder="Enter your full name"
                        />
                        {errors.fullName && (
                          <div className="text-danger fs-14 mt-1">{errors.fullName}</div>
                        )}
                      </div>

                      <div className="mb20">
                        <label className="form-label fw600">
                          Teaching Mode <span className="text-danger">*</span>
                        </label>
                        <div className="mode-grid">
                          {teachingModes.map(mode => (
                            <div key={mode.id} className="mode-item">
                              <input
                                type="checkbox"
                                id={`mode-${mode.id}`}
                                className="form-check-input"
                                checked={formData.teachingModes.includes(mode.id)}
                                onChange={() => handleTeachingModeChange(mode.id)}
                              />
                              <label className="form-check-label ms-2" htmlFor={`mode-${mode.id}`}>
                                {mode.label}
                              </label>
                            </div>
                          ))}
                        </div>
                        {errors.teachingModes && (
                          <div className="text-danger fs-14 mt-1">{errors.teachingModes}</div>
                        )}
                      </div>

                      {formData.teachingModes.includes('onsite') && (
                        <div className="location-section">
                          <div className="mb20">
                            <label className="form-label fw600">
                              Province <span className="text-danger">*</span>
                            </label>
                            <select
                              className="form-control"
                              value={formData.province}
                              onChange={(e) => setFormData({...formData, province: e.target.value})}
                            >
                              <option value="">Select Province</option>
                              {provinces.map(province => (
                                <option key={province} value={province}>
                                  {province}
                                </option>
                              ))}
                            </select>
                            {errors.province && (
                              <div className="text-danger fs-14 mt-1">{errors.province}</div>
                            )}
                          </div>

                          <div className="mb20">
                            <label className="form-label fw600">
                              Teaching Areas <span className="text-danger">*</span>
                            </label>
                            <textarea
                              className="form-control"
                              rows="3"
                              value={formData.areas}
                              onChange={(e) => setFormData({...formData, areas: e.target.value})}
                              placeholder="Specify areas where you can teach (e.g., districts, neighborhoods)"
                            />
                            {errors.areas && (
                              <div className="text-danger fs-14 mt-1">{errors.areas}</div>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="mb20">
                        <label className="form-label fw600">
                          Teaching Subjects <span className="text-danger">*</span>
                        </label>
                        <div className="subject-grid">
                          {subjects.map(subject => (
                            <div key={subject} className="subject-item">
                              <input
                                type="checkbox"
                                id={`subject-${subject}`}
                                className="form-check-input"
                                checked={formData.subjects.includes(subject)}
                                onChange={() => handleSubjectChange(subject)}
                              />
                              <label className="form-check-label ms-2" htmlFor={`subject-${subject}`}>
                                {subject}
                              </label>
                            </div>
                          ))}
                        </div>
                        {errors.subjects && (
                          <div className="text-danger fs-14 mt-1">{errors.subjects}</div>
                        )}
                      </div>
                    </div>

                    <div className="section-block mb40">
                      <h4 className="section-title mb20">Profile Media</h4>
                      
                      <div className="mb20">
                        <label className="form-label fw600">
                          Profile Image <span className="text-danger">*</span>
                        </label>
                        <div className="upload-container">
                          <div className="upload-button-wrapper">
                            <input
                              type="file"
                              accept="image/*"
                              className="form-control custom-file-input"
                              onChange={(e) => handleFileChange(e, 'profileImage')}
                            />
                          </div>
                          <p className="upload-text mt-2">Click to upload your profile image</p>
                        </div>
                        {errors.profileImage && (
                          <div className="text-danger fs-14 mt-1">{errors.profileImage}</div>
                        )}
                      </div>

                      <div className="mb20">
                        <label className="form-label fw600">
                          Introduction Video <span className="text-danger">*</span>
                        </label>
                        <div className="upload-container">
                          <div className="upload-button-wrapper">
                            <input
                              type="file"
                              accept="video/*"
                              className="form-control custom-file-input"
                              onChange={(e) => handleFileChange(e, 'introVideo')}
                            />
                          </div>
                          <p className="upload-text mt-2">Click to upload your introduction video</p>
                        </div>
                        {errors.introVideo && (
                          <div className="text-danger fs-14 mt-1">{errors.introVideo}</div>
                        )}
                      </div>
                    </div>

                    <div className="section-block mb40">
                      <h4 className="section-title mb20">Professional Information</h4>

                      <div className="mb20">
                        <label className="form-label fw600">
                          About You <span className="text-danger">*</span>
                        </label>
                        <textarea
                          className="form-control custom-textarea"
                          rows="8"
                          value={formData.description}
                          onChange={(e) => setFormData({...formData, description: e.target.value})}
                          placeholder="Tell us about yourself and your teaching style"
                        />
                        {errors.description && (
                          <div className="text-danger fs-14 mt-1">{errors.description}</div>
                        )}
                      </div>

                      <div className="mb20">
                        <label className="form-label fw600">
                          Teaching Experience <span className="text-danger">*</span>
                        </label>
                        <textarea
                          className="form-control custom-textarea"
                          rows="8"
                          value={formData.experience}
                          onChange={(e) => setFormData({...formData, experience: e.target.value})}
                          placeholder="Share your teaching experience"
                        />
                        {errors.experience && (
                          <div className="text-danger fs-14 mt-1">{errors.experience}</div>
                        )}
                      </div>

                      <div className="mb20">
                        <label className="form-label fw600">
                          Education Background <span className="text-danger">*</span>
                        </label>
                        <textarea
                          className="form-control custom-textarea"
                          rows="8"
                          value={formData.education}
                          onChange={(e) => setFormData({...formData, education: e.target.value})}
                          placeholder="List your educational qualifications"
                        />
                        {errors.education && (
                          <div className="text-danger fs-14 mt-1">{errors.education}</div>
                        )}
                      </div>
                    </div>

                    <div className="section-block mb40">
                      <h4 className="section-title mb20">Supporting Documents</h4>
                      
                      <div className="mb20">
                        <label className="form-label fw600">
                          Upload Documents
                        </label>
                        <div className="upload-container">
                          <div className="upload-button-wrapper">
                            <input
                              type="file"
                              accept=".pdf,.doc,.docx"
                              className="form-control custom-file-input"
                              onChange={(e) => handleFileChange(e, 'resume')}
                            />
                          </div>
                          <p className="upload-text mt-2">
                            Upload your Resume/CV, Degrees, or Transcripts (PDF, DOC, DOCX)
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="d-grid">
                      <button
                        type="submit"
                        className="ud-btn btn-thm default-box-shadow2"
                      >
                        Submit Application
                        <i className="fal fa-arrow-right-long"></i>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>


      <style jsx>{`
        .section-block {
          border-bottom: 1px solid #eee;
          padding-bottom: 30px;
        }
        
        .section-title {
          color: #0a0a0a;
          font-size: 1.25rem;
          font-weight: 600;
        }

        .form_title {
          font-size: 1.75rem;
          color: #0a0a0a;
          font-weight: 600;
        }

        .subject-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 15px;
          margin-top: 10px;
        }

        .subject-item {
          display: flex;
          align-items: center;
          padding: 8px;
          border: 1px solid #eee;
          border-radius: 6px;
          transition: all 0.3s ease;
        }

        .subject-item:hover {
          background-color: #f8f9fa;
        }

        .upload-container {
          border: 2px dashed #ddd;
          padding: 30px;
          border-radius: 8px;
          background-color: #f8f9fa;
          transition: all 0.3s ease;
          text-align: center;
          min-height: 150px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .upload-container:hover {
          border-color: #aaa;
        }

        .upload-button-wrapper {
          position: relative;
          overflow: hidden;
          display: inline-block;
        }

        .custom-file-input {
          display: block;
          margin: 0 auto;
          max-width: 300px;
          background-color: #fff;
          border: 1px solid #ddd;
          padding: 10px;
          cursor: pointer;
        }

        .custom-file-input:hover {
          background-color: #f0f0f0;
        }

        .upload-text {
          color: #666;
          margin-top: 10px;
          font-size: 0.9rem;
        }

        .custom-textarea {
          min-height: 200px !important;
          padding: 15px !important;
          font-size: 1rem !important;
          line-height: 1.6 !important;
          border-radius: 8px !important;
        }

        .custom-textarea:focus {
          border-color: #80bdff;
          box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
        }

        .form-text {
          font-size: 0.875rem;
        }

        .alert {
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 1.5rem;
        }

        .alert-success {
          background-color: #d1e7dd;
          color: #0f5132;
        }

        .alert-danger {
          background-color: #f8d7da;
          color: #842029;
        }

        .form-label {
          margin-bottom: 0.5rem;
          color: #2c3e50;
        }

        .text-danger {
          color: #dc3545;
        }

        .fs-14 {
          font-size: 14px;
        }

        @media (max-width: 768px) {
          .upload-container {
            padding: 20px;
            min-height: 120px;
          }

          .custom-textarea {
            min-height: 150px !important;
          }
        }
      `}</style>
    </>
  );
}