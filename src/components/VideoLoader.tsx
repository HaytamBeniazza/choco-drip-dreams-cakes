
import { Loader } from "lucide-react";

interface VideoLoaderProps {
  progress: number;
  loading: boolean;
}
const clamp = (n: number) => Math.max(0, Math.min(n, 100));

const VideoLoader = ({ progress, loading }: VideoLoaderProps) => {
  return loading ? (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 z-20 pointer-events-none">
      <div className="flex flex-col items-center gap-2 animate-fade-in">
        <span className="relative flex items-center justify-center">
          {/* Circular progress using SVG */}
          <svg width="78" height="78" viewBox="0 0 78 78" className="drop-shadow-glow">
            <circle
              cx="39"
              cy="39"
              r="33"
              fill="none"
              stroke="#fff8ee"
              strokeOpacity="0.11"
              strokeWidth="8"
            />
            <circle
              cx="39"
              cy="39"
              r="33"
              fill="none"
              stroke="#ffe9ae"
              strokeWidth="8"
              strokeDasharray={2 * Math.PI * 33}
              strokeDashoffset={2 * Math.PI * 33 * (1 - clamp(progress) / 100)}
              strokeLinecap="round"
              style={{ filter: "drop-shadow(0 2px 14px #ffe9af88)" }}
            />
          </svg>
          <Loader className="absolute text-gold animate-spin" size={30} />
        </span>
        <span className="mt-2 text-lg text-[#faebcc] font-montserrat font-semibold drop-shadow-glow" style={{ textShadow: "0 2px 8px #fff8" }}>
          {Math.ceil(clamp(progress))}%
        </span>
        <span className="text-xs text-gold/70 font-playfair italic mt-1">Warming up the chocolate dreams…</span>
      </div>
    </div>
  ) : null;
};

export default VideoLoader;
