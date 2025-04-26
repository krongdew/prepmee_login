// //src/app/[locale]/(auth)/register/page.jsx
'use client';

import { useState } from "react";
import Footer8 from "@/components/footer/Footer8";
import Header20 from "@/components/header/Header20";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import SocialLoginButtons from '@/components/auth/SocialLoginButton';

export default function StudentRegisterPage() {
    const { registerStudent, error: authError, loading } = useAuth();
    
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        displayName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        gender: "Not specified",
        acceptTerms: false
    });
    const [formError, setFormError] = useState("");
    const [passwordStrength, setPasswordStrength] = useState(0);

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
            await registerStudent({
                firstName: formData.firstName,
                lastName: formData.lastName,
                displayName: formData.displayName,
                email: formData.email,
                phone: formData.phone,
                password: formData.password,
                gender: formData.gender
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
                                    <h1 className="title">Student Registration</h1>
                                    <p className="paragraph">
                                        Create your student account to find tutors and take lessons
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
                                        <h4>Create your student account!</h4>
                                        <p className="text mt20">
                                            Already have an account?{" "}
                                            <Link
                                                href="/login"
                                                className="text-thm"
                                            >
                                                Log In!
                                            </Link>
                                        </p>
                                        <p className="text">
                                            Are you a tutor?{" "}
                                            <Link
                                                href="/tutor-register"
                                                className="text-thm"
                                            >
                                                Apply to teach!
                                            </Link>
                                        </p>
                                    </div>
                                    
                                    {/* Error message */}
                                    {(formError || authError) && (
                                        <div className="alert alert-danger" role="alert">
                                            {formError || authError}
                                        </div>
                                    )}
                                    
                                    <form onSubmit={handleSubmit}>
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
                                                placeholder="How you'll appear to others"
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
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                className="form-control"
                                                placeholder="Phone number (optional)"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
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
                                                {loading ? "Creating Account..." : "Create Account"}{" "}
                                                <i className="fal fa-arrow-right-long" />
                                            </button>
                                        </div>
                                    </form>
                                    
                                    <div className="hr_content mb20">
                                        <hr />
                                        <span className="hr_top_text">OR</span>
                                    </div>
                                    
                                    <SocialLoginButtons role="student" />
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