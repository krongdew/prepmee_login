"use client"

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

// API base URL as a constant
const API_BASE_URL = 'https://core-dev.prepmee.co/api/v1';

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000, // 15 seconds timeout
  headers: {
    'Content-Type': 'application/json'
  }
});

export default function TutorRegistrationForm() {
  // References
  const isMounted = useRef(true);
  const router = useRouter();
  
  // Form state
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    display_name: '',
    gender: 'Male',
    password: '',
    phone: '',
    teaching_experience: '',
    education_background: '',
    teching_province_id: '',
    subjects: [],
    online_mode: false,
    onsite_mode: false,
    teching_area: ''
  });
  
  // UI state
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState('');
  const [subjectOptions, setSubjectOptions] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(null);

  // Fetch subjects and provinces on component mount
  const fetchInitialData = useCallback(async () => {
    setDataLoading(true);
    setLoadingError(null);
    
    try {
      // Use Promise.all to fetch both resources concurrently
      const [subjectsResponse, provincesResponse] = await Promise.all([
        apiClient.get('/common/subjects'),
        apiClient.get('/common/provinces')
      ]);
      
      // Only update state if component is still mounted
      if (isMounted.current) {
        const subjectsData = subjectsResponse.data.result || [];
        const provincesData = provincesResponse.data.result || [];
        
        setSubjectOptions(subjectsData);
        setProvinces(provincesData);
        
        // Set default province if available
        if (provincesData.length > 0) {
          setFormData(prev => ({
            ...prev,
            teching_province_id: provincesData[0].id
          }));
        }
      }
    } catch (error) {
      if (isMounted.current) {
        console.error('Failed to fetch initial data:', error);
        setLoadingError('Failed to load required data. Please refresh the page and try again.');
      }
    } finally {
      if (isMounted.current) {
        setDataLoading(false);
      }
    }
  }, []);

  // Load data on component mount
  useEffect(() => {
    fetchInitialData();
    
    // Cleanup function to set isMounted to false when component unmounts
    return () => {
      isMounted.current = false;
    };
  }, [fetchInitialData]);
  
  // Password strength validation
  const validatePasswordStrength = (password) => {
    if (!password || password.length < 8) return false;
    
    // Check for at least one uppercase, one lowercase, one number and one special character
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
  };
  
  // Validate email format
  const validateEmail = (email) => {
    // More comprehensive email validation
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return emailRegex.test(email);
  };
  
  // Phone number validation
  const validatePhone = (phone) => {
    // Basic phone validation - can be customized for specific country formats
    const phoneRegex = /^\d{9,15}$/;
    return phoneRegex.test(phone.replace(/[\s()-]/g, ''));
  };

  // Complete form validation
  const validateForm = () => {
    const newErrors = {};
    
    // Required fields validation with trimming
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.first_name.trim()) newErrors.first_name = 'First name is required';
    if (!formData.last_name.trim()) newErrors.last_name = 'Last name is required';
    if (!formData.display_name.trim()) newErrors.display_name = 'Display name is required';
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePasswordStrength(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character';
    }
    
    // Contact validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Enter a valid phone number';
    }
    
    // Professional info validation
    if (!formData.teaching_experience.trim()) newErrors.teaching_experience = 'Teaching experience is required';
    if (!formData.education_background.trim()) newErrors.education_background = 'Education background is required';
    
    // Teaching details validation
    if (formData.subjects.length === 0) newErrors.subjects = 'Select at least one subject';
    if (!formData.online_mode && !formData.onsite_mode) newErrors.mode = 'Select at least one teaching mode';
    
    if (formData.onsite_mode) {
      if (!formData.teching_province_id) {
        newErrors.teching_province_id = 'Province is required for onsite teaching';
      }
      if (!formData.teching_area.trim()) {
        newErrors.teching_area = 'Teaching area is required for onsite teaching';
      }
    }
    
    // Email format validation
    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setLoading(true);
      setSubmitStatus('');
      
      try {
        // Prepare the request data - create a clean copy of the form data
        const requestData = {
          ...formData,
          // Trim text fields to remove any leading/trailing whitespace
          email: formData.email.trim(),
          first_name: formData.first_name.trim(),
          last_name: formData.last_name.trim(),
          display_name: formData.display_name.trim(),
          phone: formData.phone.trim(),
          teaching_experience: formData.teaching_experience.trim(),
          education_background: formData.education_background.trim(),
          teching_area: formData.teching_area.trim()
        };
        
        // Only include teching_province_id and teching_area if onsite mode is selected
        if (!requestData.onsite_mode) {
          delete requestData.teching_province_id;
          delete requestData.teching_area;
        }
        
        // Log data for debugging
        console.log('Form data to submit:', requestData);
        
        // Make the API call using axios
        const response = await apiClient.post('/tutor/signup', requestData);
        
        // Check for success response
        if (response.data && response.status >= 200 && response.status < 300) {
          setSubmitStatus('success');
          
          // Show success message and redirect after delay
          setTimeout(() => {
            router.push('/tutor_login?registered=true');
          }, 2000);
        } else {
          throw new Error(response.data?.message || 'Registration failed');
        }
      } catch (error) {
        console.error('Registration error:', error);
        
        // Handle different types of errors
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          const errorMessage = error.response.data?.message || 'Registration failed. Server error.';
          setSubmitStatus('error');
          setErrors({
            ...errors,
            form: errorMessage
          });
          
          // Handle specific error codes
          if (error.response.status === 409) {
            setErrors({
              ...errors,
              email: 'This email is already registered'
            });
          }
        } else if (error.request) {
          // The request was made but no response was received
          setSubmitStatus('error');
          setErrors({
            ...errors,
            form: 'Network error. Please check your internet connection and try again.'
          });
        } else {
          // Something happened in setting up the request that triggered an Error
          setSubmitStatus('error');
          setErrors({
            ...errors,
            form: error.message || 'Registration failed. Please try again.'
          });
        }
      } finally {
        if (isMounted.current) {
          setLoading(false);
        }
      }
    } else {
      setSubmitStatus('error');
    }
  };

  // Throttle function to limit high-frequency events
  const throttle = (callback, delay = 300) => {
    let lastCall = 0;
    return (...args) => {
      const now = new Date().getTime();
      if (now - lastCall < delay) {
        return;
      }
      lastCall = now;
      return callback(...args);
    };
  };
  
  // Debounce function to delay processing until after a series of events
  const debounce = (callback, delay = 500) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        callback(...args);
      }, delay);
    };
  };

  // Handle field changes with validation
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    // Update form data
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
    
    // Clear specific error when field is modified
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    
    // Perform field-specific validations
    if (name === 'email' && value.trim() !== '') {
      const isValidEmail = validateEmail(value);
      if (!isValidEmail) {
        setErrors(prev => ({
          ...prev,
          email: 'Enter a valid email address'
        }));
      }
    }
    
    if (name === 'password' && value !== '') {
      const isStrongPassword = validatePasswordStrength(value);
      if (!isStrongPassword) {
        setErrors(prev => ({
          ...prev,
          password: 'Password must meet all requirements'
        }));
      }
    }
    
    if (name === 'phone' && value.trim() !== '') {
      const isValidPhone = validatePhone(value);
      if (!isValidPhone) {
        setErrors(prev => ({
          ...prev,
          phone: 'Enter a valid phone number'
        }));
      }
    }
    
    // Special handling for onsite_mode
    if (name === 'onsite_mode') {
      // If turning off onsite mode, clear any onsite-specific errors
      if (!checked) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.teching_province_id;
          delete newErrors.teching_area;
          return newErrors;
        });
      }
    }
  }, [errors, validateEmail, validatePasswordStrength, validatePhone]);

  // Handle subject selection
  const handleSubjectChange = useCallback((subjectId) => {
    setFormData(prev => {
      const updatedSubjects = prev.subjects.includes(subjectId)
        ? prev.subjects.filter(id => id !== subjectId)
        : [...prev.subjects, subjectId];
        
      return {
        ...prev,
        subjects: updatedSubjects
      };
    });
    
    // Clear subject-related error when subjects are selected
    if (errors.subjects) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.subjects;
        return newErrors;
      });
    }
  }, [errors]);
  
  // Update display name based on first and last name
  const updateDisplayName = useCallback(debounce(() => {
    if (formData.first_name && formData.last_name) {
      const firstName = formData.first_name.trim();
      const lastName = formData.last_name.trim();
      
      if (firstName && lastName) {
        setFormData(prev => ({
          ...prev,
          display_name: `${firstName} ${lastName}`
        }));
      }
    }
  }, 500), [formData.first_name, formData.last_name]);

  return (
    <div className="bgc-thm4">
      <section className="our-register pt60">
        <div className="container">
          <div className="row wow fadeInRight" data-wow-delay="300ms">
            <div className="col-xl-10 mx-auto">
              <div className="log-reg-form form-style1 bgc-white p50 mb60 bdrs12 position-relative">
                {submitStatus === 'success' && (
                  <div className="alert alert-success">
                    <i className="fas fa-check-circle me-2"></i>
                    Application submitted successfully! Redirecting to login...
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="alert alert-danger">
                    <i className="fas fa-exclamation-circle me-2"></i>
                    {errors.form || 'Please fix the errors in the form.'}
                  </div>
                )}

                {dataLoading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3">Loading required data...</p>
                  </div>
                ) : loadingError ? (
                  <div className="alert alert-danger">
                    <i className="fas fa-exclamation-circle me-2"></i>
                    {loadingError}
                  </div>
                ) : (
                  <>
                    <div className="text-center mb40">
                      <h3 className="form_title">Tutor Registration</h3>
                      <p className="text">Please complete all required fields to create your account</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                      <div className="section-block mb40">
                        <h4 className="section-title mb20">Personal Information</h4>
                        
                        <div className="row">
                          <div className="col-md-6 mb20">
                            <label className="form-label fw600">
                              First Name <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="first_name"
                              value={formData.first_name}
                              onChange={handleChange}
                              onBlur={updateDisplayName}
                              placeholder="Enter your first name"
                            />
                            {errors.first_name && (
                              <div className="text-danger fs-14 mt-1">{errors.first_name}</div>
                            )}
                          </div>
                          
                          <div className="col-md-6 mb20">
                            <label className="form-label fw600">
                              Last Name <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="last_name"
                              value={formData.last_name}
                              onChange={handleChange}
                              onBlur={updateDisplayName}
                              placeholder="Enter your last name"
                            />
                            {errors.last_name && (
                              <div className="text-danger fs-14 mt-1">{errors.last_name}</div>
                            )}
                          </div>
                        </div>
                        
                        <div className="row">
                          <div className="col-md-6 mb20">
                            <label className="form-label fw600">
                              Display Name <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="display_name"
                              value={formData.display_name}
                              onChange={handleChange}
                              placeholder="How your name will appear to students"
                            />
                            {errors.display_name && (
                              <div className="text-danger fs-14 mt-1">{errors.display_name}</div>
                            )}
                          </div>
                          
                          <div className="col-md-6 mb20">
                            <label className="form-label fw600">
                              Gender <span className="text-danger">*</span>
                            </label>
                            <select
                              className="form-control"
                              name="gender"
                              value={formData.gender}
                              onChange={handleChange}
                            >
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                              <option value="Prefer not to say">Prefer not to say</option>
                            </select>
                          </div>
                        </div>
                        
                        <div className="row">
                          <div className="col-md-6 mb20">
                            <label className="form-label fw600">
                              Email <span className="text-danger">*</span>
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="Enter your email address"
                            />
                            {errors.email && (
                              <div className="text-danger fs-14 mt-1">{errors.email}</div>
                            )}
                          </div>
                          
                          <div className="col-md-6 mb20">
                            <label className="form-label fw600">
                              Phone Number <span className="text-danger">*</span>
                            </label>
                            <input
                              type="tel"
                              className="form-control"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder="Enter your phone number"
                            />
                            {errors.phone && (
                              <div className="text-danger fs-14 mt-1">{errors.phone}</div>
                            )}
                          </div>
                        </div>
                        
                        <div className="mb20">
                          <label className="form-label fw600">
                            Password <span className="text-danger">*</span>
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Create a secure password"
                          />
                          {errors.password && (
                            <div className="text-danger fs-14 mt-1">{errors.password}</div>
                          )}
                          <small className="form-text text-muted">
                            Password must be at least 8 characters and include a mix of uppercase, lowercase, numbers, and special characters.
                          </small>
                        </div>
                      </div>

                      <div className="section-block mb40">
                        <h4 className="section-title mb20">Teaching Information</h4>
                        
                        <div className="mb20">
                          <label className="form-label fw600">
                            Teaching Mode <span className="text-danger">*</span>
                          </label>
                          <div className="d-flex gap-4 mt-2">
                            <div className="form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="online_mode"
                                name="online_mode"
                                checked={formData.online_mode}
                                onChange={handleChange}
                              />
                              <label className="form-check-label" htmlFor="online_mode">
                                Online Teaching
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="onsite_mode"
                                name="onsite_mode"
                                checked={formData.onsite_mode}
                                onChange={handleChange}
                              />
                              <label className="form-check-label" htmlFor="onsite_mode">
                                On-site Teaching
                              </label>
                            </div>
                          </div>
                          {errors.mode && (
                            <div className="text-danger fs-14 mt-1">{errors.mode}</div>
                          )}
                        </div>

                        {formData.onsite_mode && (
                          <div className="row">
                            <div className="col-md-6 mb20">
                              <label className="form-label fw600">
                                Province <span className="text-danger">*</span>
                              </label>
                              <select
  className="form-control"
  name="teching_province_id"
  value={formData.teching_province_id}
  onChange={handleChange}
>
  <option value="">Select Province</option>
  {provinces && provinces.length > 0 ? (
    provinces.map(province => (
      <option key={province.id} value={province.id}>
        {province.name_th || province.name_en}
      </option>
    ))
  ) : (
    <option value="">No provinces available</option>
  )}
</select>
                              {errors.teching_province_id && (
                                <div className="text-danger fs-14 mt-1">{errors.teching_province_id}</div>
                              )}
                            </div>

                            <div className="col-md-6 mb20">
                              <label className="form-label fw600">
                                Teaching Areas <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name="teching_area"
                                value={formData.teching_area}
                                onChange={handleChange}
                                placeholder="Specify areas where you can teach"
                              />
                              {errors.teching_area && (
                                <div className="text-danger fs-14 mt-1">{errors.teching_area}</div>
                              )}
                            </div>
                          </div>
                        )}

                        <div className="mb20">
                          <label className="form-label fw600">
                            Teaching Subjects <span className="text-danger">*</span>
                          </label>
                          <div className="subject-grid mt-2">
                            {subjectOptions.map(subject => (
                              <div key={subject.id} className="subject-item">
                                <input
                                  type="checkbox"
                                  id={`subject-${subject.id}`}
                                  className="form-check-input"
                                  checked={formData.subjects.includes(subject.id)}
                                  onChange={() => handleSubjectChange(subject.id)}
                                />
                                <label className="form-check-label ms-2" htmlFor={`subject-${subject.id}`}>
                                  
                                  {subject.name_th || subject.name_en}
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
                        <h4 className="section-title mb20">Professional Information</h4>

                        <div className="mb20">
                          <label className="form-label fw600">
                            Teaching Experience <span className="text-danger">*</span>
                          </label>
                          <textarea
                            className="form-control"
                            rows="4"
                            name="teaching_experience"
                            value={formData.teaching_experience}
                            onChange={handleChange}
                            placeholder="Describe your teaching experience"
                          />
                          {errors.teaching_experience && (
                            <div className="text-danger fs-14 mt-1">{errors.teaching_experience}</div>
                          )}
                        </div>

                        <div className="mb20">
                          <label className="form-label fw600">
                            Education Background <span className="text-danger">*</span>
                          </label>
                          <textarea
                            className="form-control"
                            rows="4"
                            name="education_background"
                            value={formData.education_background}
                            onChange={handleChange}
                            placeholder="List your educational qualifications"
                          />
                          {errors.education_background && (
                            <div className="text-danger fs-14 mt-1">{errors.education_background}</div>
                          )}
                        </div>
                      </div>

                      <div className="d-grid">
                        <button
                          type="submit"
                          className="ud-btn btn-thm default-box-shadow2"
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                              Submitting...
                            </>
                          ) : (
                            <>
                              Submit Application
                              <i className="fal fa-arrow-right-long ms-2"></i>
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

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
      `}</style>
    </div>
  );
}