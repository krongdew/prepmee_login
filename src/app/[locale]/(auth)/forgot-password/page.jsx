'use client';

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Footer8 from "@/components/footer/Footer8";
import Header20 from "@/components/header/Header20";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext_backup";

export default function ForgotPasswordPage() {
    const { requestPasswordReset, resetPassword, loading, error: authError } = useAuth();
    const searchParams = useSearchParams();
    
    const [step, setStep] = useState(1); // 1: Email entry, 2: Code verification, 3: New password
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("student");
    const [verificationCode, setVerificationCode] = useState("");
    const [formError, setFormError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [countdown, setCountdown] = useState(0);
    const [isResending, setIsResending] = useState(false);
    const [passwords, setPasswords] = useState({
        newPassword: "",
        confirmPassword: ""
    });
    const [passwordStrength, setPasswordStrength] = useState(0);

    // Get role from URL params
    useEffect(() => {
        const typeParam = searchParams.get('type');
        
        if (typeParam && (typeParam === 'student' || typeParam === 'tutor')) {
            setRole(typeParam === 'tutor' ? 'tutor' : 'student');
        }
    }, [searchParams]);

    const handleRequestReset = async (e) => {
        e.preventDefault();
        
        if (!email) {
            setFormError("Email address is required");
            return;
        }
        
        if (countdown > 0) {
            setFormError(`Please wait ${countdown} seconds before requesting a new code`);
            return;
        }
        
        setIsResending(true);
        setFormError("");
        setSuccessMessage("");
        
        try {
            await requestPasswordReset(email, role);
            setSuccessMessage("Reset code has been sent to your email");
            setStep(2);
            // Start 60-second countdown
            setCountdown(60);
        } catch (error) {
            console.error('Password reset request error:', error);
            setFormError(error.message || "Failed to send reset code. Please try again.");
        } finally {
            setIsResending(false);
        }
    };

    const handleVerifyCode = async (e) => {
        e.preventDefault();
        
        if (!verificationCode) {
            setFormError("Verification code is required");
            return;
        }
        
        setFormError("");
        setSuccessMessage("");
        
        // Just validate the code format here (we'll use it in the final step)
        if (verificationCode.length < 4) {
            setFormError("Invalid verification code");
            return;
        }
        
        setStep(3);
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

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswords(prev => ({
            ...prev,
            [name]: value
        }));
        
        if (name === 'newPassword') {
            checkPasswordStrength(value);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        
        // Validate passwords
        if (!passwords.newPassword || !passwords.confirmPassword) {
            setFormError("Both password fields are required");
            return;
        }
        
        if (passwordStrength < 3) {
            setFormError("Password is too weak. It should include uppercase, lowercase, numbers, and special characters");
            return;
        }
        
        if (passwords.newPassword !== passwords.confirmPassword) {
            setFormError("Passwords do not match");
            return;
        }
        
        setFormError("");
        setSuccessMessage("");
        
        try {
            await resetPassword(email, verificationCode, passwords.newPassword, role);
            setSuccessMessage("Password has been reset successfully!");
            
            // Add a link to login page after successful reset
            setTimeout(() => {
                const locale = window.location.pathname.split('/')[1];
                const loginPath = role === 'tutor' ? '/tutor_login' : '/login';
                window.location.href = `/${locale}${loginPath}?status=success&message=${encodeURIComponent('Your password has been reset successfully')}`;
            }, 2000);
        } catch (error) {
            console.error('Password reset error:', error);
            setFormError(error.message || "Failed to reset password. Please try again.");
        }
    };

    // Handle countdown timer
    useEffect(() => {
        if (countdown <= 0) return;
        
        const timer = setInterval(() => {
            setCountdown(prev => prev - 1);
        }, 1000);
        
        return () => clearInterval(timer);
    }, [countdown]);

    // Render appropriate form based on current step
    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <form onSubmit={handleRequestReset}>
                        <div className="mb25">
                            <label className="form-label fw500 dark-color">
                                Email Address
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        
                        <div className="d-grid mb20">
                            <button
                                className="ud-btn btn-thm"
                                type="submit"
                                disabled={loading || isResending}
                            >
                                {loading || isResending ? "Sending..." : "Send Reset Code"}{" "}
                                <i className="fal fa-arrow-right-long" />
                            </button>
                        </div>
                    </form>
                );
                
            case 2:
                return (
                    <form onSubmit={handleVerifyCode}>
                        <div className="mb25">
                            <label className="form-label fw500 dark-color">
                                Verification Code
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter verification code"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                required
                            />
                        </div>
                        
                        <div className="d-flex justify-content-between align-items-center mb20">
                            <button
                                type="button"
                                className="btn btn-outline-primary"
                                onClick={(e) => handleRequestReset(e)}
                                disabled={countdown > 0 || isResending}
                            >
                                {countdown > 0 
                                    ? `Resend Code (${countdown}s)` 
                                    : isResending 
                                        ? "Sending..." 
                                        : "Resend Code"}
                            </button>
                            
                            <button
                                className="ud-btn btn-thm"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? "Verifying..." : "Verify Code"}{" "}
                                <i className="fal fa-arrow-right-long" />
                            </button>
                        </div>
                    </form>
                );
                
            case 3:
                return (
                    <form onSubmit={handleResetPassword}>
                        <div className="mb25">
                            <label className="form-label fw500 dark-color">
                                New Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Create new password"
                                name="newPassword"
                                value={passwords.newPassword}
                                onChange={handlePasswordChange}
                                required
                            />
                            {passwords.newPassword && (
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
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Confirm new password"
                                name="confirmPassword"
                                value={passwords.confirmPassword}
                                onChange={handlePasswordChange}
                                required
                            />
                            {passwords.newPassword && passwords.confirmPassword && 
                             passwords.newPassword !== passwords.confirmPassword && (
                                <small className="form-text text-danger">
                                    Passwords do not match
                                </small>
                            )}
                        </div>
                        
                        <div className="d-grid mb20">
                            <button
                                className="ud-btn btn-thm"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? "Resetting..." : "Reset Password"}{" "}
                                <i className="fal fa-arrow-right-long" />
                            </button>
                        </div>
                    </form>
                );
                
            default:
                return null;
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
                                    <h1 className="title">Reset Password</h1>
                                    <p className="paragraph">
                                        {role === 'tutor' ? 'Tutor account' : 'Student account'} password recovery
                                    </p>
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
                                        <h4>Forgot Your Password?</h4>
                                        <p className="text mt20">
                                            {step === 1 && "Enter your email address to request a password reset code."}
                                            {step === 2 && "Enter the verification code sent to your email."}
                                            {step === 3 && "Create a new password for your account."}
                                        </p>
                                    </div>
                                    
                                    {/* Progress indicator */}
                                    <div className="step-progress mb30">
                                        <div className="d-flex justify-content-between">
                                            <div className={`step-item ${step >= 1 ? 'active' : ''}`}>
                                                <div className="step-circle">1</div>
                                                <div className="step-label">Email</div>
                                            </div>
                                            <div className={`step-item ${step >= 2 ? 'active' : ''}`}>
                                                <div className="step-circle">2</div>
                                                <div className="step-label">Verify</div>
                                            </div>
                                            <div className={`step-item ${step >= 3 ? 'active' : ''}`}>
                                                <div className="step-circle">3</div>
                                                <div className="step-label">Reset</div>
                                            </div>
                                        </div>
                                        <div className="progress mt-2" style={{ height: '4px' }}>
                                            <div 
                                                className="progress-bar bg-thm" 
                                                role="progressbar" 
                                                style={{ width: `${(step - 1) * 50}%` }}
                                                aria-valuenow={(step - 1) * 50} 
                                                aria-valuemin="0" 
                                                aria-valuemax="100"
                                            ></div>
                                        </div>
                                    </div>
                                    
                                    {/* Success message */}
                                    {successMessage && (
                                        <div className="alert alert-success" role="alert">
                                            {successMessage}
                                        </div>
                                    )}
                                    
                                    {/* Error message */}
                                    {(formError || authError) && (
                                        <div className="alert alert-danger" role="alert">
                                            {formError || authError}
                                        </div>
                                    )}
                                    
                                    {/* Render form based on current step */}
                                    {renderStepContent()}
                                    
                                    <div className="hr_content mb20 mt20">
                                        <hr />
                                    </div>
                                    
                                    <div className="text-center">
                                        <p className="mb10">
                                            Remember your password?{" "}
                                            <Link 
                                                href={role === 'tutor' ? "/tutor_login" : "/login"} 
                                                className="text-thm"
                                            >
                                                Log In
                                            </Link>
                                        </p>
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