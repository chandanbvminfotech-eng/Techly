import React, { useEffect } from "react";

const Modal = ({ isOpen, onClose, children }) => {
  // Prevent scrolling behind the modal when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      {/* Backdrop: Darker with a premium blur */}
      <div
        className="absolute inset-0 bg-[#08080E]/80 backdrop-blur-md animate-in fade-in duration-500"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg group animate-in zoom-in-95 fade-in duration-300">
        {/* Outer Gold Glow Effect */}
        <div className="absolute -inset-[1px] bg-gradient-to-b from-[#D4AF37]/30 to-transparent rounded-[32px] blur-sm opacity-50" />

        {/* Content Box */}
        <div className="relative bg-[#0C0C12] border border-white/10 rounded-[32px] overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.8)]">
          {/* Close Button: Minimalist X */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-[rgba(245,240,232,0.3)] hover:text-[#D4AF37] transition-colors z-20"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                d="M18 6L6 18M6 6l12 12"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Inner Content Area */}
          <div className="p-8 md:p-12">{children}</div>

          {/* Bottom Accent Line */}
          <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />
        </div>
      </div>
    </div>
  );
};

export default Modal;
