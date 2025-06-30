import { Loader } from "lucide-react";

interface VideoLoaderProps {
  progress: number;
  loading: boolean;
  loadingStage?: string;
}
const clamp = (n: number) => Math.max(0, Math.min(n, 100));

const VideoLoader = ({ progress, loading, loadingStage = "Loading..." }: VideoLoaderProps) => {
  return loading ? (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-20 pointer-events-none transition-all duration-1000 ease-out">
      <div className="flex flex-col items-center gap-6 animate-fade-in max-w-md text-center px-6">
        <div className="relative">
          {/* Circular progress using SVG - no background div that could cause the square */}
          <svg width="90" height="90" viewBox="0 0 90 90" style={{ filter: "drop-shadow(0 0 10px rgba(255,252,249,0.2))" }}>
            {/* Background circle */}
            <circle
              cx="45"
              cy="45"
              r="38"
              fill="none"
              stroke="#FAF8F7"
              strokeOpacity="0.12"
              strokeWidth="4"
            />
            {/* Progress circle */}
            <circle
              cx="45"
              cy="45"
              r="38"
              fill="none"
              stroke="#FAF8F7"
              strokeOpacity="0.85"
              strokeWidth="4"
              strokeDasharray={2 * Math.PI * 38}
              strokeDashoffset={2 * Math.PI * 38 * (1 - clamp(progress) / 100)}
              strokeLinecap="round"
              style={{ 
                transition: "stroke-dashoffset 0.4s ease-out"
              }}
            />
          </svg>
          {/* Center spinning element */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader className="text-[#FFFCF9] animate-spin opacity-80" size={28} strokeWidth={2.5} />
          </div>
        </div>
        
        {/* Percentage indicator */}
        <div 
          className="text-2xl text-[#FAF8F7] font-cormorant font-semibold tracking-wide"
          style={{ 
            textShadow: "0 2px 12px rgba(0,0,0,0.5)",
            letterSpacing: "0.05em"
          }}
        >
          {Math.ceil(clamp(progress))}%
        </div>
        
        {/* Loading stage text */}
        <div 
          className="text-lg font-lora italic text-[#FFFCF9] opacity-95 mt-2"
          style={{ 
            textShadow: "0 1px 4px rgba(0,0,0,0.4)",
            transition: "all 0.4s ease"
          }}
        >
          {loadingStage}
        </div>
      </div>
    </div>
  ) : null;
};

export default VideoLoader;
