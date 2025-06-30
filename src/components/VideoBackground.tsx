import { useState, useEffect, useRef } from 'react';
import VideoLoader from "./VideoLoader";

// Define the structure of the update payload for the callback
interface LoadUpdatePayload {
  isLoading: boolean;
  progress?: number;       // Optional: only send when updating
  loadingStage?: string;  // Optional: only send when updating
}

interface VideoBackgroundProps {
  onLoadingChange?: (isLoaded: boolean) => void;
  children: React.ReactNode;
}

const VideoBackground = ({ onLoadingChange, children }: VideoBackgroundProps) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loadingStage, setLoadingStage] = useState<string>("Initializing...");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef(0);
  const targetProgressRef = useRef(0);

  // Function to clear the loading interval
  const clearLoadingInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Function to update target progress
  const setTargetProgress = (value: number) => {
    targetProgressRef.current = value;
  };

  // Function to smoothly update visual progress
  const updateProgressSmooth = (value: number) => {
    progressRef.current = value;
    setProgress(value);
  };

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      // Prevent multiple initializations
      if (videoElement.dataset.initialized === 'true') {
        return;
      }
      
      videoElement.dataset.initialized = 'true';
      
      // Initialize progress values
      updateProgressSmooth(0);
      setTargetProgress(5);
      setVideoLoaded(false);
      setLoadingStage("Preparing chocolate...");
      
      // Ensure video is paused initially and ready
      videoElement.pause();
      videoElement.currentTime = 0;
      videoElement.loop = true;
      
      // Notify parent component about loading state
      if (onLoadingChange) onLoadingChange(false);

      // Smooth progress animation
      const animateProgress = () => {
        const diff = targetProgressRef.current - progressRef.current;
        if (Math.abs(diff) < 0.1) {
          updateProgressSmooth(targetProgressRef.current);
        } else {
          const step = diff * 0.08;
          updateProgressSmooth(progressRef.current + step);
        }
        
        updateLoadingStageFromProgress(progressRef.current);
      };

      // Update loading stage based on current progress
      const updateLoadingStageFromProgress = (currentProgress: number) => {
        if (currentProgress < 15) {
          setLoadingStage("Preparing chocolate...");
        } else if (currentProgress < 30) {
          setLoadingStage("Warming up the mixer...");
        } else if (currentProgress < 45) {
          setLoadingStage("Melting the chocolate...");
        } else if (currentProgress < 60) {
          setLoadingStage("Preparing the ganache...");
        } else if (currentProgress < 75) {
          setLoadingStage("Preparing the drip...");
        } else if (currentProgress < 90) {
          setLoadingStage("Adding finishing touches...");
        } else if (currentProgress < 100) {
          setLoadingStage("Ready to serve!");
        } else {
          setLoadingStage("Bon Appétit!");
        }
      };

      // Monitor video loading progress
      const monitorVideoProgress = () => {
        if (!videoElement) return;
        
        if (videoElement.readyState > 2) {
          const duration = videoElement.duration || 0;
          if (duration > 0 && videoElement.buffered && videoElement.buffered.length > 0) {
            let maxBuffered = 0;
            for (let i = 0; i < videoElement.buffered.length; i++) {
              const bufferedEnd = videoElement.buffered.end(i);
              maxBuffered = Math.max(maxBuffered, bufferedEnd);
            }
            
            const calculatedProgress = Math.floor((maxBuffered / duration) * 100);
            setTargetProgress(Math.max(calculatedProgress, targetProgressRef.current));
          }
        }
      };

      // Start smooth animation interval
      intervalRef.current = setInterval(animateProgress, 50);
      
      // Monitor actual video loading
      const videoMonitorInterval = setInterval(monitorVideoProgress, 300);

      // Video event handlers
      const loadstart = () => {
        setTargetProgress(10);
      };
      
      const loadeddata = () => {
        setTargetProgress(70);
      };
      
      const loadedmetadata = () => {
        setTargetProgress(40);
      };
      
      const canplay = () => {
        setTargetProgress(90);
      };

      const canplaythrough = () => {
        // Prevent multiple executions
        if (videoElement.dataset.canplaythroughHandled === 'true') {
          return;
        }
        videoElement.dataset.canplaythroughHandled = 'true';
        
        setTargetProgress(100);
        
        // Wait for visual progress to reach 100% but check more frequently
        const checkComplete = () => {
          if (progressRef.current >= 99.5) {
            clearLoadingInterval();
            clearInterval(videoMonitorInterval);
            
            // Ensure video is ready before showing
            if (videoElement) {
              // Set the video to the first frame
              videoElement.currentTime = 0;
              
              // Start immediately - no waiting
              setVideoLoaded(true);
              if (onLoadingChange) onLoadingChange(true);
              
              // Start video immediately when ready
        setTimeout(() => {
                if (videoElement) {
                  if (videoElement.paused) {
                    const playPromise = videoElement.play();
                    
                    if (playPromise !== undefined) {
                      playPromise
                        .then(() => {
                          videoElement.loop = true;
                        })
                        .catch(error => {
                          // Silent error handling - video will start on user interaction
                        });
                    }
                  }
                }
              }, 100);
            } else {
              // Fallback if no video element
          setVideoLoaded(true);
              if (onLoadingChange) onLoadingChange(true);
            }
          } else {
            setTimeout(checkComplete, 50); // Check more frequently
          }
        };
        
        checkComplete();
      };
      
      const errorHandler = (e: Event) => {
        setLoadingStage("Something went wrong. Retrying...");
        clearLoadingInterval();
        clearInterval(videoMonitorInterval);
      };
      
      const ended = () => {
        // Instead of just setting videoEnded, restart the video immediately
        if (videoElement) {
          videoElement.currentTime = 0;
          videoElement.play().catch(error => {
            // Silent error handling
          });
        }
      };

      // Add event listeners
      videoElement.addEventListener('loadstart', loadstart);
      videoElement.addEventListener('loadeddata', loadeddata);
      videoElement.addEventListener('loadedmetadata', loadedmetadata);
      videoElement.addEventListener('canplay', canplay);
      videoElement.addEventListener('canplaythrough', canplaythrough);
      videoElement.addEventListener('error', errorHandler);
      videoElement.addEventListener('ended', ended);

      return () => {
        // Clean up event listeners
        videoElement.removeEventListener('loadstart', loadstart);
        videoElement.removeEventListener('loadeddata', loadeddata);
        videoElement.removeEventListener('loadedmetadata', loadedmetadata);
        videoElement.removeEventListener('canplay', canplay);
        videoElement.removeEventListener('canplaythrough', canplaythrough);
        videoElement.removeEventListener('error', errorHandler);
        videoElement.removeEventListener('ended', ended);
        
        // Reset initialization flags
        videoElement.dataset.initialized = 'false';
        videoElement.dataset.canplaythroughHandled = 'false';
        
        // Clear intervals
        clearLoadingInterval();
        clearInterval(videoMonitorInterval);
      };
    }
  }, [onLoadingChange]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Video Container - Behind everything */}
      <div className={`video-container absolute inset-0 z-0 overflow-hidden transition-opacity duration-500 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <video
        ref={videoRef}
        id="bg-video"
        muted
        playsInline
          loop
          preload="metadata"
        className="w-full h-full object-cover"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            backgroundColor: 'black',
            visibility: videoLoaded ? 'visible' : 'hidden'
          }}
      >
        <source
          src="https://www.dropbox.com/scl/fi/q8rie1nl09msirarfyitu/Generated-File-April-22-2025-5_37PM.mp4?rlkey=wswqyzbi0jenwhm1sg2uxvryq&st=erux4lzj&raw=1"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      </div>

      {/* Loader Overlay - Between video and content */}
      <div className={`absolute inset-0 z-10 bg-black transition-all duration-1000 ease-out overflow-hidden ${videoLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <VideoLoader progress={progress} loading={!videoLoaded} loadingStage={loadingStage} />
      </div>

      {/* Content Container - On top of everything */}
      <div className={`relative z-20 overflow-hidden transition-opacity duration-500 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* This div will contain the Hero component content */}
        {children}
      </div>
    </div>
  );
};

export default VideoBackground;