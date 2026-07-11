const Cloud = ({ style }) => (
  <svg style={style} className="decor cloud" viewBox="0 0 100 60" width="70">
    <path
      d="M20 45c-9 0-16-7-16-15 0-7 5-13 12-15 2-9 10-15 19-15 8 0 15 5 18 12 8 1 14 8 14 16 0 9-8 17-17 17H20z"
      fill="#eaf1fb"
      stroke="#bcdcf9"
      strokeWidth="2.5"
    />
  </svg>
)

const CD = ({ style }) => (
  <svg style={style} className="decor cd" viewBox="0 0 100 100" width="60">
    <defs>
      <linearGradient id={`cdGrad${Math.random()}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ffc4de" />
        <stop offset="35%" stopColor="#fff3b0" />
        <stop offset="65%" stopColor="#bdf5e0" />
        <stop offset="100%" stopColor="#bcdcf9" />
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="46" fill="url(#cdGrad)" opacity="0.85" stroke="#d6c5ee" strokeWidth="2" />
    <circle cx="50" cy="50" r="14" fill="#f7f4fb" stroke="#c9bbe0" strokeWidth="2" />
    <circle cx="50" cy="50" r="4" fill="#c9bbe0" />
  </svg>
)

const Star = ({ style, color = '#fff3b0' }) => (
  <svg style={style} className="decor star" viewBox="0 0 24 24" width="18">
    <path
      d="M12 2l2.5 6.5L21 11l-6.5 2.5L12 20l-2.5-6.5L3 11l6.5-2.5z"
      fill={color}
      stroke="#4a4467"
      strokeWidth="0.6"
    />
  </svg>
)

const Butterfly = ({ style }) => (
  <svg style={style} className="decor butterfly" viewBox="0 0 60 40" width="34">
    <g fill="none" stroke="#9b8ec9" strokeWidth="1.6">
      <path d="M30 20 C 20 4, 4 6, 6 16 C 8 24, 22 22, 30 20" fill="#e3d6f5" />
      <path d="M30 20 C 40 4, 56 6, 54 16 C 52 24, 38 22, 30 20" fill="#ffc4de" />
      <path d="M30 20 C 22 30, 10 30, 10 24" fill="#bdf5e0" />
      <path d="M30 20 C 38 30, 50 30, 50 24" fill="#bcdcf9" />
      <line x1="30" y1="14" x2="30" y2="28" />
    </g>
  </svg>
)

const HeartOutline = ({ style }) => (
  <svg style={style} className="decor heart" viewBox="0 0 24 22" width="18">
    <path
      d="M12 20 C 4 14, 1 9, 3 5.5 C 5 2, 10 2.5, 12 7 C 14 2.5, 19 2, 21 5.5 C 23 9, 20 14, 12 20Z"
      fill="none"
      stroke="#7a72a0"
      strokeWidth="1.4"
    />
  </svg>
)

export default function SkyDecor() {
  return (
    <div className="sky-decor" aria-hidden="true">
      <Cloud style={{ top: '4%', left: '6%' }} />
      <Cloud style={{ top: '6%', right: '8%' }} />
      <Cloud style={{ bottom: '10%', left: '10%' }} />
      <Cloud style={{ bottom: '6%', right: '6%' }} />
      <CD style={{ top: '18%', left: '2%' }} />
      <CD style={{ top: '20%', right: '2%' }} />
      <CD style={{ bottom: '20%', left: '4%' }} />
      <CD style={{ bottom: '18%', right: '3%' }} />
      <Star style={{ top: '30%', left: '14%' }} color="#fff3b0" />
      <Star style={{ top: '38%', right: '15%' }} color="#ffc4de" />
      <Star style={{ bottom: '32%', left: '18%' }} color="#bdf5e0" />
      <Star style={{ bottom: '38%', right: '17%' }} color="#bcdcf9" />
      <Butterfly style={{ top: '48%', left: '5%' }} />
      <Butterfly style={{ top: '52%', right: '4%' }} />
      <HeartOutline style={{ top: '60%', left: '16%' }} />
      <HeartOutline style={{ top: '64%', right: '14%' }} />
    </div>
  )
}
