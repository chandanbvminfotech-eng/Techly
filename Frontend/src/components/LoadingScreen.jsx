import React from "react";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z- flex flex-col items-center justify-center bg-[#0a0a0a]">
      {/* Background Glow */}
      <div className="absolute w-[300px] h-[300px] bg-[#D4AF37]/10 blur-[120px] rounded-full" />

      <div className="relative flex flex-col items-center">
        {/* The Luxury Spinner */}
        <div className="w-16 h-16 border-2 border-[#D4AF37]/20 border-t-[#D4AF37] rounded-full animate-spin" />

        {/* Branding/Text */}
        <div className="mt-6 flex flex-col items-center">
          <h2 className="text-[#D4AF37] text-xl font-light tracking-[0.2em] uppercase animate-pulse">
            Loading
          </h2>
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent mt-2" />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
