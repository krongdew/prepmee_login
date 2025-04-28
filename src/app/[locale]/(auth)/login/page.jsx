//src/app/[locale]/(auth)/login/page.jsx
'use client';

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Footer8 from "@/components/footer/Footer8";
import Header20 from "@/components/header/Header20";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import SocialLoginButtons from '@/components/auth/SocialLoginButton';

export default function StudentLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    const { loginStudent } = useAuth();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      // Validate form
      if (!email || !password) {
        setError('Please enter both email and password');
        return;
      }
      
      try {
        setLoading(true);
        setError('');
        
        // Login with credentials
        await loginStudent(email, password);
      } catch (error) {
        setError(error.message || 'Login failed. Please check your credentials and try again.');
      } finally {
        setLoading(false);
      }
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
                                    <h1 className="title">Student Log In</h1>
                                    <p>Access your student account to find tutors and lessons</p>
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
                                    {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              
                                
                                    <div className="mb30">
                                        <h4>Welcome back, student!</h4>
                                        <p className="text">
                                            Don't have an account?{" "}
                                            <Link
                                                href="/register"
                                                className="text-thm"
                                            >
                                                Sign Up!
                                            </Link>
                                        </p>
                                        <p className="text">
                                            Are you a tutor?{" "}
                                            <Link
                                                href="/tutor_login"
                                                className="text-thm"
                                            >
                                                Login as tutor
                                            </Link>
                                        </p>
                                    </div>
                                    
                                
                                    
                                    <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                                        <div className="checkbox-style1 d-block d-sm-flex align-items-center justify-content-between mb20">
                                            <label className="custom_checkbox fz14 ff-heading">
                                                Remember me
                                                <input
                                                    type="checkbox"
                                                    name="rememberMe"
                                                   
                                                />
                                                <span className="checkmark" />
                                            </label>
                                            <a 
                                                className="fz14 ff-heading" 
                                                href="#" 
                                               
                                            >
                                                Forgot password?
                                            </a>
                                        </div>
                                        <div className="d-grid mb20">
                                        <button 
                  type="submit" 
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Logging in...
                    </>
                  ) : 'Login'}
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