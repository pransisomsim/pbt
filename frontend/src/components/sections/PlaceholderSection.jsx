// src/components/sections/PlaceholderSection.jsx
export const PlaceholderSection = ({ icon, message }) => (
  <div className="bg-[#16162a] border border-white/5 rounded-2xl p-16 flex flex-col items-center justify-center text-white/30 text-center">
    <span className="text-5xl mb-3">{icon}</span>
    <p className="text-sm font-medium">{message}</p>
  </div>
);
