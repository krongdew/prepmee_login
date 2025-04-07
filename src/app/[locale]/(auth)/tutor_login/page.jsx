//src/app/[locale]/(auth)/login/page.jsx
'use client';

import { useState } from "react";
import Footer8 from "@/components/footer/Footer8";
import Header20 from "@/components/header/Header20";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
    const { login, error, loading } = useAuth();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: true
    });
    const [formError, setFormError] = useState("");

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
            console.log('Attempting login with:', { email: formData.email }); // Debug: log login attempt
            const response = await login(formData.email, formData.password);
            console.log('Login response:', response); // Debug: log login response
            // Login successful - redirect handled in AuthContext
        } catch (error) {
            console.error('Login error in component:', error); // Debug: log login error
            setFormError(error.message || "Login failed. Please check your credentials.");
        }
    };

    // Google sign-in handler (can be implemented with Google OAuth)
    const handleGoogleSignIn = () => {
        // Implement Google OAuth login
        console.log("Google sign-in not implemented yet");
    };

    // Password recovery handler
    const handleForgotPassword = (e) => {
        e.preventDefault();
        // Implement password recovery flow
        console.log("Password recovery not implemented yet");
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
                                </div>
                            </div>
                        </div>
                        <div
                            className="row wow fadeInRight"
                            data-wow-delay="300ms"
                        >
                            <div className="col-xl-6 mx-auto">
                                <div className="log-reg-form search-modal form-style1 bgc-white p50 p30-sm default-box-shadow1 bdrs12">
                                    <div className="mb30">
                                        <h4>We're glad to see you again!</h4>
                                        <p className="text">
                                            Don't have an account?{" "}
                                            <Link
                                                href="/register"
                                                className="text-thm"
                                            >
                                                Sign Up!
                                            </Link>
                                        </p>
                                    </div>
                                    
                                    {/* Error message */}
                                    {(formError || error) && (
                                        <div className="alert alert-danger" role="alert">
                                            {formError || error}
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
                                                placeholder="@"
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
                                                placeholder="*******"
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
                                    <div className="d-md-flex justify-content-between">
                                        <button 
                                            className="ud-btn btn-google w-100 justify-content-center d-flex align-items-center"
                                            type="button"
                                            onClick={handleGoogleSignIn}
                                        >
                                            <i className="d-flex align-items-center" />{" "}
                                            Continue Google
                                        </button>
                                    </div>
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