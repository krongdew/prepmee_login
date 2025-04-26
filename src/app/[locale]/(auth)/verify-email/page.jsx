'use client';

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Footer8 from "@/components/footer/Footer8";
import Header20 from "@/components/header/Header20";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function VerifyEmailPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { 
        user, 
        emailVerified, 
        loading,
        requestEmailVerification, 
        checkEmailVerification 
    } = useAuth();
    
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("student");
    const [verificationSent, setVerificationSent] = useState(false);
    const [verificationChecking, setVerificationChecking] = useState(true);
    const [verificationError, setVerificationError] = useState("");

    // Extract data from URL parameters
    useEffect(() => {
        const emailParam = searchParams.get('email');
        const roleParam = searchParams.get('role');
        
        if (emailParam) {
            setEmail(emailParam);
        } else if (user?.email) {
            setEmail(user.email);
        }
        
        if (roleParam && (roleParam === 'student' || roleParam === 'tutor')) {
            setRole(roleParam);
        }
    }, [searchParams, user]);

    // Check email verification status on page load
    useEffect(() => {
        const checkVerification = async () => {
            setVerificationChecking(true);
            try {
                const isVerified = await checkEmailVerification(role);
                
                // If verified, redirect to dashboard
                if (isVerified) {
                    const locale = window.location.pathname.split('/')[1];
                    const dashboardPath = role === 'tutor' ? 'tutor-dashboard' : 'dashboard';
                    router.push(`/${locale}/${dashboardPath}`);
                }
            } catch (error) {
                console.error('Error checking verification status:', error);
            } finally {
                setVerificationChecking(false);
            }
        };
        
        checkVerification();
    }, [role, router, checkEmailVerification]);

    // Request email verification
    const handleResendVerification = async () => {
        if (!email) {
            setVerificationError("Email address is required");
            return;
        }
        
        try {
            setVerificationError("");
            setVerificationSent(false);
            
            await requestEmailVerification(email, role);
            setVerificationSent(true);
        } catch (error) {
            console.error('Error resending verification email:', error);
            setVerificationError(error.message || "Failed to send verification email");
        }
    };

    // Handler to go directly to dashboard
    const handleGoToDashboard = async () => {
        // Double-check verification status before going to dashboard
        const isVerified = await checkEmailVerification(role);
        
        if (isVerified) {
            const locale = window.location.pathname.split('/')[1];
            const dashboardPath = role === 'tutor' ? 'tutor-dashboard' : 'dashboard';
            router.push(`/${locale}/${dashboardPath}`);
        } else {
            setVerificationError("Please verify your email before accessing the dashboard");
        }
    };

    return (
        <>
            <div className="bgc-thm4">
                <Header20 />
                <section className="our-login">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 m-auto wow fadeInUp">
                                <div className="main-title text-center">
                                    <h1 className="title">Verify Your Email</h1>
                                </div>
                            </div>
                        </div>
                        <div className="row wow fadeInRight">
                            <div className="col-xl-6 mx-auto">
                                <div className="log-reg-form search-modal form-style1 bgc-white p50 p30-sm default-box-shadow1 bdrs12">
                                    {verificationChecking ? (
                                        <div className="text-center p-5">
                                            <div className="spinner-border text-primary mb-3" role="status">
                                                <span className="visually-hidden">Checking...</span>
                                            </div>
                                            <p>Checking verification status...</p>
                                        </div>
                                    ) : (
                                        <div className="text-center">
                                            <i className="fa fa-envelope-open text-success fa-5x mb-4"></i>
                                            <h3>Verify Your Email</h3>
                                            
                                            <p className="mb-4">
                                                We have sent a verification link to <strong>{email}</strong>. 
                                                Please check your inbox and click the link to complete your registration.
                                            </p>
                                            
                                            <p className="mb-4">
                                                If you don't see the email, check your spam folder.
                                            </p>
                                            
                                            {verificationError && (
                                                <div className="alert alert-danger mb-4">
                                                    <i className="fas fa-exclamation-circle me-2"></i>
                                                    {verificationError}
                                                </div>
                                            )}
                                            
                                            {verificationSent && (
                                                <div className="alert alert-success mb-4">
                                                    <i className="fas fa-check-circle me-2"></i>
                                                    Verification email has been sent! Please check your inbox.
                                                </div>
                                            )}
                                            
                                            <div className="mt-4 d-flex flex-column">
                                                <button
                                                    onClick={handleResendVerification}
                                                    className="ud-btn btn-outline-primary mb-3"
                                                    disabled={loading}
                                                >
                                                    {loading ? "Sending..." : "Resend Verification Email"}
                                                    <i className="fal fa-envelope ms-2" />
                                                </button>
                                                
                                                <div className="d-flex justify-content-center gap-3">
                                                    <Link 
                                                        href={role === 'tutor' ? "/tutor_login" : "/login"} 
                                                        className="ud-btn btn-outline-secondary"
                                                    >
                                                        Return to Login
                                                        <i className="fal fa-arrow-right-long ms-2" />
                                                    </Link>
                                                    
                                                    <button 
                                                        onClick={handleGoToDashboard} 
                                                        className="ud-btn btn-thm"
                                                    >
                                                        Go to Dashboard
                                                        <i className="fal fa-arrow-right-long ms-2" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
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