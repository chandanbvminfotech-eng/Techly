// src/features/seller/components/SellerStatCard.jsx
import React from "react";

const SellerStatCard = ({ title, value, icon, trend, color = "gold" }) => {
  const colorConfig = {
    gold: {
      bg: "bg-[#D4AF37]/5",
      border: "border-[#D4AF37]/20",
      text: "text-[#D4AF37]",
      iconBg: "bg-[#D4AF37]/10",
      trendUp: "text-green-400",
      trendDown: "text-red-400",
    },
    blue: {
      bg: "bg-blue-500/5",
      border: "border-blue-500/20",
      text: "text-blue-400",
      iconBg: "bg-blue-500/10",
      trendUp: "text-green-400",
      trendDown: "text-red-400",
    },
    purple: {
      bg: "bg-purple-500/5",
      border: "border-purple-500/20",
      text: "text-purple-400",
      iconBg: "bg-purple-500/10",
      trendUp: "text-green-400",
      trendDown: "text-red-400",
    },
    orange: {
      bg: "bg-orange-500/5",
      border: "border-orange-500/20",
      text: "text-orange-400",
      iconBg: "bg-orange-500/10",
      trendUp: "text-green-400",
      trendDown: "text-red-400",
    },
  };

  const colors = colorConfig[color];

  return (
    <div
      className={`relative group rounded-2xl ${colors.bg} border ${colors.border} backdrop-blur-sm overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl`}
    >
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl ${colors.iconBg} ${colors.text}`}>
            {icon}
          </div>
          {trend && (
            <div
              className={`text-xs font-mono font-bold ${trend >= 0 ? colors.trendUp : colors.trendDown}`}
            >
              {trend >= 0 ? "+" : ""}
              {trend}%
            </div>
          )}
        </div>

        <div>
          <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-black mb-2">
            {title}
          </p>
          <p className="text-3xl font-bold text-[#F5F0E8] font-[Georgia,serif] tracking-wide">
            {typeof value === "number" ? value.toLocaleString("en-IN") : value}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SellerStatCard;
