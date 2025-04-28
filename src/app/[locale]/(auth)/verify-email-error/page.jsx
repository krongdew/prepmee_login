'use client';

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Footer8 from "@/components/footer/Footer8";
import Header20 from "@/components/header/Header20";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function VerifyEmailErrorPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { requestEmailVerification, loading: authLoading } = useAuth();
    
    const [role, setRole] = useState("student");
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [verificationSent, setVerificationSent] = useState(false);

    // Extract data from URL parameters
    useEffect(() => {
        const roleParam = searchParams.get('role');
        const emailParam = searchParams.get('email');
        const messageParam = searchParams.get('message');
        
        if (roleParam && (roleParam === 'student' || roleParam === 'tutor')) {
            setRole(roleParam);
        }
        
        if (emailParam) {
            setEmail(emailParam);
        }
        
        if (messageParam) {
            setErrorMessage(decodeURIComponent(messageParam));
        } else {
            setErrorMessage("Your email verification link has expired or is invalid.");
        }
    }, [searchParams]);

    const handleResendVerification = async () => {
        if (!email) {
            setErrorMessage("Email address is missing. Please return to login.");
            return;
        }
        
        setLoading(true);
        try {
            await requestEmailVerification(email, role);
            setVerificationSent(true);
        } catch (error) {
            console.error('Error resending verification email:', error);
            setErrorMessage("Failed to send verification email. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoToLogin = () => {
        const locale = window.location.pathname.split('/')[1];
        const loginPath = role === 'tutor' ? 'tutor_login' : 'login';
        router.push(`/${locale}/${loginPath}`);
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
                                    <h1 className="title">Email Verification Failed</h1>
                                </div>
                            </div>
                        </div>
                        <div className="row wow fadeInRight">
                            <div className="col-xl-6 mx-auto">
                                <div className="log-reg-form search-modal form-style1 bgc-white p50 p30-sm default-box-shadow1 bdrs12">
                                    <div className="text-center">
                                        <div className="text-danger mb-4">
                                            <i className="fas fa-exclamation-circle fa-5x"></i>
                                        </div>
                                        
                                        <h3 className="mb-4">Verification Failed</h3>
                                        
                                        <div className="alert alert-danger mb-4">
                                            {errorMessage}
                                        </div>
                                        
                                        {email && (
                                            <p className="mb-4">
                                                We were unable to verify the email address <strong>{email}</strong>.
                                            </p>
                                        )}
                                        
                                        {verificationSent && (
                                            <div className="alert alert-success mb-4">
                                                <i className="fas fa-check-circle me-2"></i>
                                                New verification email has been sent! Please check your inbox.
                                            </div>
                                        )}
                                        
                                        <div className="mt-5">
                                            <div className="d-flex justify-content-center gap-3 flex-wrap">
                                                {email && (
                                                    <button
                                                        onClick={handleResendVerification}
                                                        className="ud-btn btn-outline-primary"
                                                        disabled={loading || authLoading || verificationSent}
                                                    >
                                                        {loading || authLoading ? "Sending..." : "Resend Verification Email"}
                                                        <i className="fal fa-envelope ms-2"></i>
                                                    </button>
                                                )}
                                                
                                                <button 
                                                    onClick={handleGoToLogin}
                                                    className="ud-btn btn-thm"
                                                >
                                                    Return to Login
                                                    <i className="fal fa-sign-in ms-2"></i>
                                                </button>
                                            </div>
                                        </div>
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