// src/lib/auth.js
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://core-dev.prepmee.co/api/v1';

/**
 * Helper function to handle authentication errors
 */
const handleAuthError = (error) => {
  console.error("Authentication error:", error);
  
  if (error.response?.data?.message) {
    throw new Error(error.response.data.message);
  } else if (error.message) {
    throw new Error(error.message);
  } else {
    throw new Error("Authentication failed. Please try again.");
  }
};

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "student-credentials",
      name: "Student Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const response = await axios.post(`${API_URL}/auth/member/signin`, {
            email: credentials.email,
            password: credentials.password
          });

          if (response.data.result) {
            return {
              id: response.data.result.id || "student-id",
              email: credentials.email,
              role: "student",
              accessToken: response.data.result.accessToken,
              refreshToken: response.data.result.refreshToken
            };
          }
          
          return null;
        } catch (error) {
          handleAuthError(error);
        }
      }
    }),
    
    // เพิ่ม Provider สำหรับติวเตอร์
    CredentialsProvider({
      id: "tutor-credentials",
      name: "Tutor Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          console.log('Attempting tutor authorization with:', credentials.email);
          
          const response = await axios.post(`${API_URL}/auth/tutor/signin`, {
            email: credentials.email,
            password: credentials.password
          });
          
          console.log('Tutor auth response:', response.data);

          if (response.data.result) {
            return {
              id: response.data.result.id || "tutor-id",
              email: credentials.email,
              role: "tutor",
              accessToken: response.data.result.accessToken,
              refreshToken: response.data.result.refreshToken
            };
          }
          
          // สร้างข้อผิดพลาดที่ชัดเจนเมื่อไม่มีผลลัพธ์
          throw new Error('Invalid email or password');
        } catch (error) {
          console.error('Tutor authorization error:', error);
          // จัดการข้อผิดพลาดและส่งข้อความที่ชัดเจน
          const errorMessage = error.response?.data?.message || error.message || 'Login failed';
          throw new Error(errorMessage);
        }
      }
    }),
    
    // Google Provider (ถ้าต้องการใช้)
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          email: profile.email,
          name: profile.name,
          image: profile.picture,
          role: "pending" // Role will be determined during sign-in
        };
      }
    })
  ],
  
  callbacks: {
    async jwt({ token, user, account, trigger, session }) {
      // Initial sign in
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.role = user.role;
        token.id = user.id;
      }
      
      // Session update
      if (trigger === "update" && session?.role) {
        token.role = session.role;
      }

      return token;
    },
    
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.role = token.role;
      session.userId = token.id;
      session.error = token.error;
      
      return session;
    },
  },
  
  pages: {
    signIn: '/login',
    error: '/auth/error',
    verifyRequest: '/verify-email',
  },
  
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  
  secret: process.env.NEXTAUTH_SECRET,
  
  debug: process.env.NODE_ENV === "development"
};