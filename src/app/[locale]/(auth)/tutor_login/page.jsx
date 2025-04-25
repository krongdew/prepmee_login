//src\app\[locale]\(auth)\tutor_login\page.jsx
'use client';

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Footer8 from "@/components/footer/Footer8";
import Header20 from "@/components/header/Header20";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext_backup";
import SocialLoginButtons from '@/components/auth/SocialLoginButton';

export default function TutorLoginPage() {
    const { loginTutor, error: authError, loading } = useAuth();
    const searchParams = useSearchParams();
    
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: true
    });
    const [formError, setFormError] = useState("");
    const [statusMessage, setStatusMessage] = useState("");

    // Check for any status messages passed via URL params
    useEffect(() => {
        const status = searchParams.get('status');
        const message = searchParams.get('message');
        
        if (status === 'success' && message) {
            setStatusMessage({ type: 'success', text: decodeURIComponent(message) });
        } else if (status === 'error' && message) {
            setStatusMessage({ type: 'error', text: decodeURIComponent(message) });
        } else if (status === 'verification-required') {
            setStatusMessage({ 
                type: 'warning', 
                text: 'Please verify your email before logging in.' 
            });
        }
    }, [searchParams]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError("");
        
        // Basic form validation
        if (!formData.email || !formData.password) {
            setFormError("Email and password are required");
            return;
        }

        try {
            await loginTutor(formData.email, formData.password);
            // Login successful - redirect handled in AuthContext
        } catch (error) {
            console.error('Login error in component:', error);
            setFormError(error.message || "Login failed. Please check your credentials.");
        }
    };

    // Password recovery handler
    const handleForgotPassword = (e) => {
        e.preventDefault();
        const locale = window.location.pathname.split('/')[1];
        window.location.href = `/${locale}/forgot-password?type=tutor`;
    };

    return (
        <>
            <div className="bgc-thm4">
                <Header20 />
                <section className="our-login">
                    <div className="container">
                        <div className="row">
                            <div
                                className="col-lg-6 m-auto wow fadeInUp"
                                data-wow-delay="300ms"
                            >
                                <div className="main-title text-center">
                                    <h1 className="title">Tutor Log In</h1>
                                    <p>Access your tutor account to manage your teaching</p>
                                </div>
                            </div>
                        </div>
                        <div
                            className="row wow fadeInRight"
                            data-wow-delay="300ms"
                        >
                            <div className="col-xl-6 mx-auto">
                                <div className="log-reg-form search-modal form-style1 bgc-white p50 p30-sm default-box-shadow1 bdrs12">
                                    {/* Status Message (verification success, etc.) */}
                                    {statusMessage && (
                                        <div className={`alert ${statusMessage.type === 'success' ? 'alert-success' : 
                                                               statusMessage.type === 'warning' ? 'alert-warning' : 
                                                               'alert-danger'} mb-4`}>
                                            {statusMessage.text}
                                        </div>
                                    )}
                                
                                    <div className="mb30">
                                        <h4>Welcome back, tutor!</h4>
                                        <p className="text">
                                            Don't have a tutor account?{" "}
                                            <Link
                                                href="/tutor-register"
                                                className="text-thm"
                                            >
                                                Apply to teach!
                                            </Link>
                                        </p>
                                        <p className="text">
                                            Are you a student?{" "}
                                            <Link
                                                href="/login"
                                                className="text-thm"
                                            >
                                                Login as student
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
                                        <div className="mb20">
                                            <label className="form-label fw600 dark-color">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="name@example.com"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="mb15">
                                            <label className="form-label fw600 dark-color">
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder="Enter your password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="checkbox-style1 d-block d-sm-flex align-items-center justify-content-between mb20">
                                            <label className="custom_checkbox fz14 ff-heading">
                                                Remember me
                                                <input
                                                    type="checkbox"
                                                    name="rememberMe"
                                                    checked={formData.rememberMe}
                                                    onChange={handleChange}
                                                />
                                                <span className="checkmark" />
                                            </label>
                                            <a 
                                                className="fz14 ff-heading" 
                                                href="#" 
                                                onClick={handleForgotPassword}
                                            >
                                                Forgot password?
                                            </a>
                                        </div>
                                        <div className="d-grid mb20">
                                            <button
                                                className="ud-btn btn-thm"
                                                type="submit"
                                                disabled={loading}
                                            >
                                                {loading ? "Logging In..." : "Log In"}{" "}
                                                <i className="fal fa-arrow-right-long" />
                                            </button>
                                        </div>
                                    </form>
                                    
                                    <div className="hr_content mb20">
                                        <hr />
                                        <span className="hr_top_text">OR</span>
                                    </div>
                                    
                                    <SocialLoginButtons role="tutor" />
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