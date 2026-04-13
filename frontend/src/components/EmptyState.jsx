// components/EmptyState.jsx
const EmptyState = ({ icon, title, description }) => (
  <div className="flex flex-col items-center justify-center py-12 text-white/30 text-center">
    <span className="text-5xl mb-3">{icon}</span>
    <p className="text-sm font-medium">{title}</p>
    <p className="text-xs mt-1">{description}</p>
  </div>
);

export default EmptyState;
