'use client';

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Footer8 from "@/components/footer/Footer8";
import Header20 from "@/components/header/Header20";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function VerifyEmailSuccessPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { checkEmailVerification } = useAuth();
    
    const [role, setRole] = useState("student");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Extract data from URL parameters
    useEffect(() => {
        const roleParam = searchParams.get('role');
        const emailParam = searchParams.get('email');
        
        if (roleParam && (roleParam === 'student' || roleParam === 'tutor')) {
            setRole(roleParam);
        }
        
        if (emailParam) {
            setEmail(emailParam);
        }
    }, [searchParams]);

    const handleContinueToDashboard = async () => {
        setLoading(true);
        setError("");
        
        try {
            const isVerified = await checkEmailVerification(role);
            
            if (isVerified) {
                const locale = window.location.pathname.split('/')[1];
                const dashboardPath = role === 'tutor' ? 'tutor-dashboard' : 'dashboard';
                router.push(`/${locale}/${dashboardPath}`);
            } else {
                setError("There seems to be an issue with your verification. Please try logging in again.");
            }
        } catch (error) {
            console.error('Error checking verification:', error);
            setError("An error occurred while processing your request. Please try logging in.");
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
                                    <h1 className="title">Email Verified!</h1>
                                </div>
                            </div>
                        </div>
                        <div className="row wow fadeInRight">
                            <div className="col-xl-6 mx-auto">
                                <div className="log-reg-form search-modal form-style1 bgc-white p50 p30-sm default-box-shadow1 bdrs12">
                                    <div className="text-center">
                                        <div className="text-success mb-4">
                                            <i className="fas fa-check-circle fa-5x"></i>
                                        </div>
                                        
                                        <h3 className="mb-4">Email Verification Successful!</h3>
                                        
                                        <p className="mb-2">
                                            Congratulations! Your email <strong>{email}</strong> has been successfully verified.
                                        </p>
                                        
                                        <p className="mb-4">
                                            You can now access all features of your {role === 'tutor' ? 'tutor' : 'student'} account.
                                        </p>
                                        
                                        {error && (
                                            <div className="alert alert-danger mb-4">
                                                <i className="fas fa-exclamation-circle me-2"></i>
                                                {error}
                                            </div>
                                        )}
                                        
                                        <div className="mt-5">
                                            <div className="d-flex justify-content-center gap-3">
                                                <button 
                                                    onClick={handleGoToLogin}
                                                    className="ud-btn btn-outline-secondary"
                                                >
                                                    Go to Login
                                                    <i className="fal fa-sign-in ms-2"></i>
                                                </button>
                                                
                                                <button 
                                                    onClick={handleContinueToDashboard}
                                                    className="ud-btn btn-thm"
                                                    disabled={loading}
                                                >
                                                    {loading ? "Please wait..." : "Continue to Dashboard"}
                                                    <i className="fal fa-arrow-right-long ms-2"></i>
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