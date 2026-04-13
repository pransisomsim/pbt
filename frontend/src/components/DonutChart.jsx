// src/components/DonutChart.jsx
export default function DonutChart({ slices }) {
  const COLORS = ['#e2c97e', '#7eb8e2', '#7ee2b8', '#e27eb8', '#b87ee2'];
  const total = slices.reduce((s, d) => s + d.value, 0);

  if (!total) return (
    <div className="flex items-center justify-center h-32 text-sm text-white/30">
      No expense data yet
    </div>
  );

  const R = 54, cx = 70, cy = 70, circ = 2 * Math.PI * R;
  let offset = 0;
  const arcs = slices.map((s, i) => {
    const dash = (s.value / total) * circ;
    const arc = { ...s, dash, offset, color: COLORS[i % COLORS.length] };
    offset += dash;
    return arc;
  });

  return (
    <div className="flex items-center gap-5">
      <svg width="140" height="140" viewBox="0 0 140 140" className="flex-shrink-0">
        <circle cx={cx} cy={cy} r={R} fill="none" stroke="white" strokeOpacity="0.05" strokeWidth="18" />
        {arcs.map((a, i) => (
          <circle key={i} cx={cx} cy={cy} r={R} fill="none"
            stroke={a.color} strokeWidth="18"
            strokeDasharray={`${a.dash} ${circ - a.dash}`}
            strokeDashoffset={-a.offset + circ * 0.25}
            strokeLinecap="round"
          />
        ))}
        <text x={cx} y={cy - 7} textAnchor="middle" fill="#e2c97e" fontSize="10" fontWeight="600">SPENT</text>
        <text x={cx} y={cy + 10} textAnchor="middle" fill="white" fontSize="13" fontWeight="700">
          ₱{total >= 1000 ? `${(total / 1000).toFixed(1)}k` : total.toFixed(0)}
        </text>
      </svg>

      <div className="flex flex-col gap-2.5 flex-1 min-w-0">  
        {arcs.map((a, i) => (  
          <div key={i} className="flex items-center gap-2 min-w-0">  
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: a.color }} />  
            <span className="text-xs text-white/60 truncate">{a.name}</span>  
            <span className="text-xs font-semibold ml-auto flex-shrink-0" style={{ color: a.color }}>  
              {((a.value / total) * 100).toFixed(0)}%  
            </span>  
          </div>  
        ))}  
      </div>  
    </div>
  );
}
