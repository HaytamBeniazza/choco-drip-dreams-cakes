
import { useState, useEffect, useRef } from 'react';
import VideoLoader from "./VideoLoader";

const VideoBackground = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [progress, setProgress] = useState(2);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    let interval: NodeJS.Timeout;

    if (videoElement) {
      // Log video source
      console.log('Video Source:', videoElement.currentSrc);

      setProgress(2);
      setVideoLoaded(false);

      const simulateProgress = () => {
        setProgress((curr) => {
          if (curr < 90) return curr + 3.5;
          return curr;
        });
      };

      interval = setInterval(simulateProgress, 48);

      const loadstart = () => {
        console.log('Video loading started');
        setProgress(5);
      };
      const loadedmetadata = () => {
        console.log('Video metadata loaded');
        setProgress(30);
        console.log('Video duration:', videoElement.duration);
      };
      const canplay = () => {
        console.log('Video can play');
        setProgress(100);
        setTimeout(() => {
          setVideoLoaded(true);
        }, 300);
        if (interval) clearInterval(interval);
      };
      const errorHandler = (e: any) => {
        console.error('Video Error:', e);
        if (interval) clearInterval(interval);
      };
      const ended = () => {
        console.log('Video ended');
        setVideoEnded(true);
      };

      videoElement.addEventListener('loadstart', loadstart);
      videoElement.addEventListener('loadedmetadata', loadedmetadata);
      videoElement.addEventListener('canplay', canplay);
      videoElement.addEventListener('error', errorHandler);
      videoElement.addEventListener('ended', ended);

      return () => {
        videoElement.removeEventListener('loadstart', loadstart);
        videoElement.removeEventListener('loadedmetadata', loadedmetadata);
        videoElement.removeEventListener('canplay', canplay);
        videoElement.removeEventListener('error', errorHandler);
        videoElement.removeEventListener('ended', ended);
        if (interval) clearInterval(interval);
      };
    }
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
          src="https://www.dropbox.com/scl/fi/q8rie1nl09msirarfyitu/Generated-File-April-22-2025-5_37PM.mp4?rlkey=wswqyzbi0jenwhm1sg2uxvryq&st=erux4lzj&raw=1"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      {/* Loader overlay */}
      <VideoLoader progress={progress} loading={!videoLoaded} />
    </div>
  );
};

export default VideoBackground;
