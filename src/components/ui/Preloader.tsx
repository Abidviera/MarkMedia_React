import { useEffect, useState } from 'react';

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center">
      {/* Logo */}
      <div className="mb-8">
        <svg viewBox="0 0 300 60" className="w-64 h-14">
          <text x="0" y="45" className="fill-white font-display text-[42px] font-bold tracking-tighter">
            MARKMEDIA
          </text>
        </svg>
      </div>

      {/* Progress Bar */}
      <div className="w-48 h-[1px] bg-white/20 overflow-hidden">
        <div className="h-full bg-white animate-[slideRight_2.5s_ease-out_forwards]" />
      </div>

      {/* Loading Text */}
      <p className="mt-6 text-[10px] tracking-[0.3em] text-white/50 font-body">
        LOADING EXPERIENCE
      </p>

      <style>{`
        @keyframes slideRight {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}
