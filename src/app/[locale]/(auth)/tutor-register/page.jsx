//prepmee_website\src\app\[locale]\(auth)\tutor-register\page.jsx
'use client';

import { useState, useEffect } from "react";
import Footer8 from "@/components/footer/Footer8";
import Header20 from "@/components/header/Header20";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import SocialLoginButtons from '@/components/auth/SocialLoginButton';
import authService from "@/services/authService";

export default function TutorRegisterPage() {
    const { registerTutor, error: authError, loading } = useAuth();
    
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        displayName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        gender: "Not specified",
        teachingExperience: "",
        educationBackground: "",
        provinceId: "",
        subjects: [],
        onlineMode: true,
        onsiteMode: false,
        teachingArea: "",
        acceptTerms: false
    });
    
    const [provinces, setProvinces] = useState([]);
    const [availableSubjects, setAvailableSubjects] = useState([]);
    const [formError, setFormError] = useState("");
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [dataLoading, setDataLoading] = useState(true);

    // Fetch provinces and subjects on component mount
    useEffect(() => {
        const fetchData = async () => {
            setDataLoading(true);
            try {
                const commonData = await authService.getCommonData();
                
                if (commonData.subjects) {
                    setAvailableSubjects(commonData.subjects);
                }
                
                if (commonData.provinces) {
                    setProvinces(commonData.provinces);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setFormError('Failed to load necessary data. Please refresh the page.');
            } finally {
                setDataLoading(false);
            }
        };
        
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        
        setFormData(prev => ({
            ...prev,
            [name]: newValue
        }));

        // Update display name when first or last name changes
        if (name === 'firstName' || name === 'lastName') {
            const firstName = name === 'firstName' ? value : formData.firstName;
            const lastName = name === 'lastName' ? value : formData.lastName;
            
            setFormData(prev => ({
                ...prev,
                [name]: newValue,
                displayName: `${firstName} ${lastName}`.trim()
            }));
        }

        // Check password strength
        if (name === 'password') {
            checkPasswordStrength(value);
        }
    };

    // Handle subject selection
    const handleSubjectChange = (e) => {
        const subjectId = e.target.value;
        const isChecked = e.target.checked;
        
        setFormData(prev => ({
            ...prev,
            subjects: isChecked
                ? [...prev.subjects, subjectId]
                : prev.subjects.filter(id => id !== subjectId)
        }));
    };

    const checkPasswordStrength = (password) => {
        let strength = 0;
        
        // Length check
        if (password.length >= 8) strength += 1;
        
        // Contains lowercase letters
        if (/[a-z]/.test(password)) strength += 1;
        
        // Contains uppercase letters
        if (/[A-Z]/.test(password)) strength += 1;
        
        // Contains numbers
        if (/[0-9]/.test(password)) strength += 1;
        
        // Contains special characters
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;
        
        setPasswordStrength(strength);
    };

    const getPasswordStrengthText = () => {
        if (passwordStrength === 0) return "";
        if (passwordStrength <= 2) return "Weak";
        if (passwordStrength <= 4) return "Medium";
        return "Strong";
    };

    const getPasswordStrengthClass = () => {
        if (passwordStrength === 0) return "";
        if (passwordStrength <= 2) return "text-danger";
        if (passwordStrength <= 4) return "text-warning";
        return "text-success";
    };

    const validateForm = () => {
        // Clear previous errors
        setFormError("");
        
        // Check required fields
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
            setFormError("Please fill in all required fields");
            return false;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setFormError("Please enter a valid email address");
            return false;
        }
        
        // Check password strength
        if (passwordStrength < 3) {
            setFormError("Password is too weak. It should include uppercase, lowercase, numbers, and special characters");
            return false;
        }
        
        // Check password confirmation
        if (formData.password !== formData.confirmPassword) {
            setFormError("Passwords do not match");
            return false;
        }
        
        // Check if at least one subject is selected
        if (formData.subjects.length === 0) {
            setFormError("Please select at least one subject you can teach");
            return false;
        }
        
        // If onsite mode is selected, check for province and teaching area
        if (formData.onsiteMode) {
            if (!formData.provinceId) {
                setFormError("Please select a province for on-site teaching");
                return false;
            }
            
            if (!formData.teachingArea) {
                setFormError("Please specify your teaching area for on-site teaching");
                return false;
            }
        }
        
        // Check teaching experience
        if (!formData.teachingExperience) {
            setFormError("Please provide your teaching experience");
            return false;
        }
        
        // Check education background
        if (!formData.educationBackground) {
            setFormError("Please provide your education background");
            return false;
        }
        
        // Check terms acceptance
        if (!formData.acceptTerms) {
            setFormError("You must accept the Terms of Service and Privacy Policy");
            return false;
        }
        
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate form
        if (!validateForm()) {
            return;
        }

        try {
            await registerTutor({
                firstName: formData.firstName,
                lastName: formData.lastName,
                displayName: formData.displayName,
                email: formData.email,
                phone: formData.phone,
                password: formData.password,
                gender: formData.gender,
                teachingExperience: formData.teachingExperience,
                educationBackground: formData.educationBackground,
                provinceId: formData.provinceId,
                subjects: formData.subjects,
                onlineMode: formData.onlineMode,
                onsiteMode: formData.onsiteMode,
                teachingArea: formData.teachingArea
            });
            // Registration successful - redirect handled in AuthContext
        } catch (error) {
            console.error('Registration error:', error);
            setFormError(error.message || "Registration failed. Please try again.");
        }
    };

    return (
        <>
            <div className="bgc-thm4">
                <Header20 />
                <section className="our-register">
                    <div className="container">
                        <div className="row">
                            <div
                                className="col-lg-6 m-auto wow fadeInUp"
                                data-wow-delay="300ms"
                            >
                                <div className="main-title text-center">
                                    <h1 className="title">Apply to Teach</h1>
                                    <p className="paragraph">
                                        Join our platform as a tutor and share your knowledge
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div
                            className="row wow fadeInRight"
                            data-wow-delay="300ms"
                        >
                            <div className="col-xl-8 mx-auto">
                                <div className="log-reg-form search-modal form-style1 bgc-white p50 p30-sm default-box-shadow1 bdrs12">
                                    <div className="mb30">
                                        <h4>Create your tutor account!</h4>
                                        <p className="text mt20">
                                            Already have a tutor account?{" "}
                                            <Link
                                                href="/tutor_login"
                                                className="text-thm"
                                            >
                                                Log In!
                                            </Link>
                                        </p>
                                        <p className="text">
                                            Are you a student?{" "}
                                            <Link
                                                href="/register"
                                                className="text-thm"
                                            >
                                                Register as student
                                            </Link>
                                        </p>
                                    </div>
                                    
                                    {/* Error message */}
                                    {(formError || authError) && (
                                        <div className="alert alert-danger" role="alert">
                                            {formError || authError}
                                        </div>
                                    )}
                                    
                                    {dataLoading ? (
                                        <div className="text-center py-5">
                                            <div className="spinner-border text-primary" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                            <p className="mt-3">Loading registration data...</p>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmit}>
                                            <h5 className="form-section-title mb-4">Personal Information</h5>
                                            
                                            <div className="row">
                                                <div className="col-md-6 mb25">
                                                    <label className="form-label fw500 dark-color">
                                                        First Name <span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="First name"
                                                        name="firstName"
                                                        value={formData.firstName}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-md-6 mb25">
                                                    <label className="form-label fw500 dark-color">
                                                        Last Name <span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Last name"
                                                        name="lastName"
                                                        value={formData.lastName}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            
                                            <div className="mb25">
                                                <label className="form-label fw500 dark-color">
                                                    Display Name
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="How you'll appear to students"
                                                    name="displayName"
                                                    value={formData.displayName}
                                                    onChange={handleChange}
                                                    readOnly
                                                />
                                                <small className="form-text text-muted">
                                                    This will be automatically generated from your first and last name
                                                </small>
                                            </div>
                                            
                                            <div className="mb25">
                                                <label className="form-label fw500 dark-color">
                                                    Email <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    placeholder="name@example.com"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            
                                            <div className="mb25">
                                                <label className="form-label fw500 dark-color">
                                                    Phone Number <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="tel"
                                                    className="form-control"
                                                    placeholder="Phone number"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            
                                            <div className="mb25">
                                                <label className="form-label fw500 dark-color">
                                                    Gender
                                                </label>
                                                <select
                                                    className="form-select"
                                                    name="gender"
                                                    value={formData.gender}
                                                    onChange={handleChange}
                                                >
                                                    <option value="Not specified">Prefer not to say</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                            
                                            <div className="mb25">
                                                <label className="form-label fw500 dark-color">
                                                    Password <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    placeholder="Create a password"
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                {formData.password && (
                                                    <div className="password-strength mt-2">
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <div className="strength-bars d-flex">
                                                                {[1, 2, 3, 4, 5].map((level) => (
                                                                    <div 
                                                                        key={level}
                                                                        className={`strength-bar ${level <= passwordStrength ? 
                                                                            level <= 2 ? 'bg-danger' : 
                                                                            level <= 4 ? 'bg-warning' : 
                                                                            'bg-success' : 'bg-secondary'}`}
                                                                        style={{ 
                                                                            width: '30px', 
                                                                            height: '5px', 
                                                                            marginRight: '3px' 
                                                                        }}
                                                                    ></div>
                                                                ))}
                                                            </div>
                                                            <span className={`small ${getPasswordStrengthClass()}`}>
                                                                {getPasswordStrengthText()}
                                                            </span>
                                                        </div>
                                                        <small className="form-text text-muted">
                                                            Password should include uppercase, lowercase, numbers, and special characters
                                                        </small>
                                                    </div>
                                                )}
                                            </div>
                                            
                                            <div className="mb25">
                                                <label className="form-label fw500 dark-color">
                                                    Confirm Password <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    placeholder="Confirm your password"
                                                    name="confirmPassword"
                                                    value={formData.confirmPassword}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                {formData.password && formData.confirmPassword && 
                                                formData.password !== formData.confirmPassword && (
                                                    <small className="form-text text-danger">
                                                        Passwords do not match
                                                    </small>
                                                )}
                                            </div>
                                            
                                            <hr className="my-4" />
                                            
                                            <h5 className="form-section-title mb-4">Teaching Information</h5>
                                            
                                            <div className="mb25">
                                                <label className="form-label fw500 dark-color">
                                                    Teaching Mode <span className="text-danger">*</span>
                                                </label>
                                                <div className="d-flex flex-wrap gap-4 mt-2">
                                                    <div className="form-check">
                                                        <input
                                                            type="checkbox"
                                                            className="form-check-input"
                                                            id="onlineMode"
                                                            name="onlineMode"
                                                            checked={formData.onlineMode}
                                                            onChange={handleChange}
                                                        />
                                                        <label className="form-check-label" htmlFor="onlineMode">
                                                            Online Teaching
                                                        </label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input
                                                            type="checkbox"
                                                            className="form-check-input"
                                                            id="onsiteMode"
                                                            name="onsiteMode"
                                                            checked={formData.onsiteMode}
                                                            onChange={handleChange}
                                                        />
                                                        <label className="form-check-label" htmlFor="onsiteMode">
                                                            On-site Teaching
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            {formData.onsiteMode && (
                                                <div className="row">
                                                    <div className="col-md-6 mb25">
                                                        <label className="form-label fw500 dark-color">
                                                            Province <span className="text-danger">*</span>
                                                        </label>
                                                        <select
                                                            className="form-select"
                                                            name="provinceId"
                                                            value={formData.provinceId}
                                                            onChange={handleChange}
                                                            required={formData.onsiteMode}
                                                        >
                                                            <option value="">Select province</option>
                                                            {provinces.map(province => (
                                                                <option key={province.id} value={province.id}>
                                                                    {province.name_en}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div className="col-md-6 mb25">
                                                        <label className="form-label fw500 dark-color">
                                                            Teaching Area <span className="text-danger">*</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Specific areas you can teach in"
                                                            name="teachingArea"
                                                            value={formData.teachingArea}
                                                            onChange={handleChange}
                                                            required={formData.onsiteMode}
                                                        />
                                                        <small className="form-text text-muted">
                                                            E.g., "Sukhumvit, Silom, Ratchada"
                                                        </small>
                                                    </div>
                                                </div>
                                            )}
                                            
                                            <div className="mb25">
                                                <label className="form-label fw500 dark-color">
                                                    Subjects You Can Teach <span className="text-danger">*</span>
                                                </label>
                                                <div className="subject-selection mt-2">
                                                    <div className="row">
                                                        {availableSubjects.map(subject => (
                                                            <div key={subject.id} className="col-md-4 mb-2">
                                                                <div className="form-check">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="form-check-input"
                                                                        id={`subject-${subject.id}`}
                                                                        value={subject.id}
                                                                        checked={formData.subjects.includes(subject.id)}
                                                                        onChange={handleSubjectChange}
                                                                    />
                                                                    <label className="form-check-label" htmlFor={`subject-${subject.id}`}>
                                                                        {subject.name}
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <small className="form-text text-muted">
                                                    Select all subjects that you can teach
                                                </small>
                                            </div>
                                            
                                            <div className="mb25">
                                                <label className="form-label fw500 dark-color">
                                                    Teaching Experience <span className="text-danger">*</span>
                                                </label>
                                                <textarea
                                                    className="form-control"
                                                    rows="3"
                                                    placeholder="Describe your teaching experience"
                                                    name="teachingExperience"
                                                    value={formData.teachingExperience}
                                                    onChange={handleChange}
                                                    required
                                                ></textarea>
                                                <small className="form-text text-muted">
                                                    Include years of experience, types of students, and any relevant certifications
                                                </small>
                                            </div>
                                            
                                            <div className="mb25">
                                                <label className="form-label fw500 dark-color">
                                                    Education Background <span className="text-danger">*</span>
                                                </label>
                                                <textarea
                                                    className="form-control"
                                                    rows="3"
                                                    placeholder="Describe your education background"
                                                    name="educationBackground"
                                                    value={formData.educationBackground}
                                                    onChange={handleChange}
                                                    required
                                                ></textarea>
                                                <small className="form-text text-muted">
                                                    Include degrees, institutions, majors, and graduation years
                                                </small>
                                            </div>
                                            
                                            <div className="mb25">
                                                <div className="checkbox-style1">
                                                    <label className="custom_checkbox fz14 ff-heading">
                                                        I accept the <a href="/terms" className="text-thm">Terms of Service</a> and <a href="/privacy" className="text-thm">Privacy Policy</a>
                                                        <input
                                                            type="checkbox"
                                                            name="acceptTerms"
                                                            checked={formData.acceptTerms}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                        <span className="checkmark" />
                                                    </label>
                                                </div>
                                            </div>
                                            
                                            <div className="d-grid mb20">
                                                <button
                                                    className="ud-btn btn-thm default-box-shadow2"
                                                    type="submit"
                                                    disabled={loading}
                                                >
                                                    {loading ? "Submitting Application..." : "Submit Application"}{" "}
                                                    <i className="fal fa-arrow-right-long" />
                                                </button>
                                            </div>
                                            
                                            <p className="text-center text-muted mt-3">
                                                After registration, you'll need to verify your email and complete your profile 
                                                with additional details and documents.
                                            </p>
                                        </form>
                                    )}
                                    
                                    {!dataLoading && (
                                        <>
                                            <div className="hr_content mb20">
                                                <hr />
                                                <span className="hr_top_text">OR</span>
                                            </div>
                                            
                                            <SocialLoginButtons role="tutor" />
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer8 />
            </div>
        </>
    );
}