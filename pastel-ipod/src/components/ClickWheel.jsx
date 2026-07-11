export default function ClickWheel({
  onMenu,
  onPrev,
  onNext,
  onPlayPause,
  isPlaying,
}) {
  return (
    <div className="click-wheel">
      <button className="wheel-zone wheel-menu" onClick={onMenu} aria-label="Menu">
        MENU
      </button>
      <button className="wheel-zone wheel-prev" onClick={onPrev} aria-label="Previous track">
        ⏮
      </button>
      <button className="wheel-zone wheel-next" onClick={onNext} aria-label="Next track">
        ⏭
      </button>
      <button
        className="wheel-zone wheel-playpause"
        onClick={onPlayPause}
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? '❚❚' : '▶'}
      </button>
      <button className="wheel-center" aria-hidden="true" tabIndex={-1}>
        <svg viewBox="0 0 24 22" width="26">
          <path
            d="M12 20 C 4 14, 1 9, 3 5.5 C 5 2, 10 2.5, 12 7 C 14 2.5, 19 2, 21 5.5 C 23 9, 20 14, 12 20Z"
            fill="#ff8fb3"
          />
        </svg>
      </button>
    </div>
  )
}
