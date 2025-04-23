
import { useState, useEffect, useRef } from 'react';

const VideoBackground = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    
    if (videoElement) {
      // Log video source
      console.log('Video Source:', videoElement.currentSrc);
      
      // Add more detailed event listeners
      videoElement.addEventListener('loadstart', () => {
        console.log('Video loading started');
      });

      videoElement.addEventListener('loadedmetadata', () => {
        console.log('Video metadata loaded');
        console.log('Video duration:', videoElement.duration);
      });

      videoElement.addEventListener('canplay', () => {
        console.log('Video can play');
        setVideoLoaded(true);
      });

      videoElement.addEventListener('error', (e) => {
        console.error('Video Error:', e);
      });

      videoElement.addEventListener('ended', () => {
        console.log('Video ended');
        setVideoEnded(true);
      });
    }
    
    return () => {
      if (videoElement) {
        // Cleanup event listeners
        videoElement.removeEventListener('loadstart', () => {});
        videoElement.removeEventListener('loadedmetadata', () => {});
        videoElement.removeEventListener('canplay', () => {});
        videoElement.removeEventListener('error', () => {});
        videoElement.removeEventListener('ended', () => {});
      }
    };
  }, []);

  return (
    <div className={`video-container ${videoEnded ? 'opacity-30 transition-opacity duration-1000' : 'opacity-100'}`}>
      <video 
        ref={videoRef}
        id="bg-video"
        autoPlay 
        muted 
        playsInline
        className="w-full h-full object-cover"
      >
        <source 
          src="https://www.dropbox.com/scl/fi/q8rie1nl09msirarfyitu/Generated-File-April-22-2025-5_37PM.mp4?raw=1" 
          type="video/mp4" 
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoBackground;
