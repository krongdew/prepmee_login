"use client";
import { useState, useRef } from "react";

export default function TutorVideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative rounded-lg overflow-hidden bg-gray-900">
      <video
        ref={videoRef}
        className="w-full aspect-video object-cover"
        poster="/api/placeholder/640/360"
      >
        <source src="/path/to/your/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Center Play Button */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={handlePlayPause}
            className="w-20 h-20 flex items-center justify-center rounded-full bg-emerald-400 bg-opacity-90 hover:bg-opacity-100 text-white transition-all transform hover:scale-110"
          >
            <span className="text-4xl leading-none">▶️</span>
          </button>
        </div>
      )}
      
      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
        <div className="flex items-center justify-end">
          <button
            onClick={handleMute}
            className="p-2 rounded-full hover:bg-white/20 text-white transition-colors"
          >
            {isMuted ? '🔇' : '🔊'}
          </button>
        </div>
      </div>
    </div>
  );
}