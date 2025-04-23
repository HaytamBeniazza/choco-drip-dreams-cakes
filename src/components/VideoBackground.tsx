
import { useState, useEffect } from 'react';

const VideoBackground = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);

  useEffect(() => {
    // Optional: Preload the video
    const videoElement = document.getElementById('bg-video') as HTMLVideoElement;
    if (videoElement) {
      videoElement.addEventListener('loadeddata', () => {
        setVideoLoaded(true);
      });
      
      videoElement.addEventListener('ended', () => {
        setVideoEnded(true);
      });
      
      // Fallback in case the video doesn't fire the ended event
      setTimeout(() => {
        setVideoEnded(true);
      }, 7500); // Slightly longer than the video duration
    }
    
    return () => {
      if (videoElement) {
        videoElement.removeEventListener('loadeddata', () => setVideoLoaded(true));
        videoElement.removeEventListener('ended', () => setVideoEnded(true));
      }
    };
  }, []);

  return (
    <div className={`video-container ${videoEnded ? 'opacity-30 transition-opacity duration-1000' : 'opacity-100'}`}>
      {/* Video element */}
      <video 
        id="bg-video"
        autoPlay 
        muted 
        playsInline
        className="w-full h-full object-cover"
      >
        <source 
          src="https://drive.google.com/uc?export=download&id=11a-w51Oy7EZgH7AF8nhcqOlecmr9XwuO" 
          type="video/mp4" 
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoBackground;
