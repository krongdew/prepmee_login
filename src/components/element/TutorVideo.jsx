"use client";
import { useEffect, useState } from "react";

const TutorVideo = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="h-96 w-full bg-gray-100 animate-pulse rounded-3xl" role="progressbar" aria-label="กำลังโหลดวิดีโอ" />
    );
  }

  return (
    <div className="container mx-auto flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-lg p-8">
        <div className="aspect-video relative rounded-2xl overflow-hidden bg-gray-100">
          <video
            className="w-full h-full object-cover"
            controls
            poster="/images/tutor-thumbnail.jpg"
          >
            <source src="/videos/tutor-intro.mp4" type="video/mp4" />
            ขออภัย เบราว์เซอร์ของคุณไม่รองรับการเล่นวิดีโอ
          </video>
        </div>
        
      </div>
    </div>
  );
};

export default TutorVideo;