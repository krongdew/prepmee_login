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
        const [email, setEmail] = useState("");
        
        useEffect(() => {
            const emailParam = searchParams.get('email');
            if (emailParam) {
                setEmail(emailParam);
            }
        }, [searchParams]);
    
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
                                        <div className="text-center">
                                            <i className="fa fa-envelope-open text-success fa-5x mb-4"></i>
                                            <h3>Check Your Email</h3>
                                            <p className="mb-4">
                                                We have sent a verification link to <strong>{email}</strong>. 
                                                Please check your inbox and click the link to complete your registration.
                                            </p>
                                            <p className="mb-4">
                                                If you don't see the email, check your spam folder.
                                            </p>
                                            
                                            <div className="mt-4">
                                                <Link href="/login" className="ud-btn btn-thm">
                                                    Return to Login
                                                    <i className="fal fa-arrow-right-long" />
                                                </Link>
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