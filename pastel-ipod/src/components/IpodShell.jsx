export default function IpodShell({ children, wheel }) {
  return (
    <div className="ipod-shell">
      <div className="ipod-screen-frame">
        <div className="ipod-screen">{children}</div>
      </div>

      {wheel}

      {/* stickers, same spirit as the reference photo */}
      <div className="sticker sticker-hello">hello</div>
      <div className="sticker sticker-star">
        <svg viewBox="0 0 24 24" width="16">
          <path
            d="M12 2l2.5 6.5L21 11l-6.5 2.5L12 20l-2.5-6.5L3 11l6.5-2.5z"
            fill="#fff3b0"
            stroke="#e0c65a"
            strokeWidth="0.6"
          />
        </svg>
      </div>
      <div className="sticker sticker-flower">
        <svg viewBox="0 0 40 40" width="30">
          <circle cx="20" cy="14" r="6" fill="#ffc4de" />
          <path d="M20 18 L20 34" stroke="#7fe6bd" strokeWidth="2.5" fill="none" />
          <path d="M20 26 C 26 24, 28 28, 24 32" stroke="#7fe6bd" strokeWidth="2.5" fill="none" />
        </svg>
      </div>
      <div className="sticker sticker-cat">cat</div>
      <div className="sticker sticker-bear">
        <svg viewBox="0 0 40 30" width="34">
          <circle cx="12" cy="16" r="9" fill="#e8c9a8" />
          <circle cx="6" cy="9" r="3" fill="#e8c9a8" />
          <circle cx="18" cy="9" r="3" fill="#e8c9a8" />
          <circle cx="27" cy="18" r="8" fill="#f7f4fb" />
          <circle cx="22" cy="12" r="2.6" fill="#f7f4fb" />
          <circle cx="32" cy="12" r="2.6" fill="#f7f4fb" />
        </svg>
      </div>
    </div>
  )
}
