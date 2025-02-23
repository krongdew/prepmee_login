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
    <div className="px30 bdr1 pt30 pb-3 mb30 bg-white bdrs12 wow fadeInUp default-box-shadow1">
    
      <div className="relative w-full max-w-full rounded-2xl overflow-hidden bg-gray-100 aspect-video" >
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/ouMZg0bQOe0?si=ZXmViT4AtNr9zXCT`}
          title="YouTube video player"
          width="560" height="315" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    
  </div>
    // <div className="px30 bdr1 pt30 pb-0 mb30 bg-white bdrs12 wow fadeInUp default-box-shadow1">
    //   <div className="w-full max-w-6xl bg-white rounded-3xl shadow-lg p-8">
    //     <div className="aspect-video relative rounded-2xl overflow-hidden bg-gray-100">
    //       <video
    //         className="w-full h-full object-cover"
    //         controls
    //         poster="/images/tutor-thumbnail.jpg"
    //       >
    //         <source src="/videos/tutor-intro.mp4" type="video/mp4" />
    //         ขออภัย เบราว์เซอร์ของคุณไม่รองรับการเล่นวิดีโอ
    //       </video>
    //     </div>
        
    //   </div>
    // </div>
  );
};

export default TutorVideo;