// components/Section.jsx
import { useNavigate } from 'react-router-dom';

export const Section = ({ title, children, viewAllLink }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#16162a] border border-white/5 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold">{title}</h3>
        {viewAllLink && (
          <button
            className="text-[#e2c97e] text-xs font-semibold hover:underline underline-offset-2"
            onClick={() => navigate(viewAllLink)}
          >
            View all →
          </button>
        )}
      </div>
      {children}
    </div>
  );
};
