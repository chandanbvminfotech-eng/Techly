import React from "react";

const LoadingScreen = () => (
  <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center" style={{ background: "var(--bg-base)" }}>
    <div className="absolute w-[280px] h-[280px] rounded-full blur-[120px]" style={{ background: "var(--gold-muted)" }} />
    <div className="relative flex flex-col items-center">
      <div className="w-14 h-14 rounded-full animate-spin" style={{ border: "2px solid var(--border-subtle)", borderTopColor: "var(--gold)" }} />
      <h2 className="mt-5 text-lg font-light tracking-[0.2em] uppercase animate-pulse" style={{ color: "var(--gold)" }}>
        Loading
      </h2>
    </div>
  </div>
);

export default LoadingScreen;
