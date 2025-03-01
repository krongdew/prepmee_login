//src/app/[locale]/(auth)/register/page.jsx
'use client';

import { useState } from "react";
import Footer8 from "@/components/footer/Footer8";
import Header20 from "@/components/header/Header20";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
    const { register, error, loading } = useAuth();
    const [formData, setFormData] = useState({
        displayName: "",
        username: "",
        email: "",
        password: "",
    });
    const [formError, setFormError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError("");
        
        // Basic form validation
        if (!formData.displayName || !formData.email || !formData.password) {
            setFormError("All fields are required");
            return;
        }

        try {
            await register(formData);
            // Registration successful - redirect handled in AuthContext
        } catch (error) {
            setFormError(error.message || "Registration failed. Please try again.");
        }
    };

    // Google sign-in handler (can be implemented with Google OAuth)
    const handleGoogleSignIn = () => {
        // Implement Google OAuth login
        console.log("Google sign-in not implemented yet");
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
                                    <h1 className="title">Register</h1>
                                    <h4 className="paragraph">
                                        Please sign up before booking tutors or applying to teach
                                    </h4>
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
                                        <h4>Let's create your account!</h4>
                                        <p className="text mt20">
                                            Already have an account?{" "}
                                            <Link
                                                href="/login"
                                                className="text-thm"
                                            >
                                                Log In!
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
                                        <div className="mb25">
                                            <label className="form-label fw500 dark-color">
                                                Display Name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="name"
                                                name="displayName"
                                                value={formData.displayName}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="mb25">
                                            <label className="form-label fw500 dark-color">
                                                Username
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="username"
                                                name="username"
                                                value={formData.username}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="mb25">
                                            <label className="form-label fw500 dark-color">
                                                Email
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
                                            <label className="form-label fw500 dark-color">
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
                                    <div className="d-md-flex display-flex justify-content-center">
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