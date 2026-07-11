function extFor(index) {
  const exts = ['mp3', 'wav', 'ogg', 'aiff', 'flac']
  return exts[index % exts.length]
}

export default function PlaylistScreen({
  tracks,
  currentTrack,
  onSelectTrack,
  selectedIndex,
  onSetSelectedIndex,
}) {
  return (
    <div className="playlist-screen">
      <div className="playlist-header">
        <span>PLAYLIST</span>
      </div>
      <div className="playlist-body">
        {tracks.length === 0 && (
          <p className="empty-hint">
            no songs yet — press MENU and search to add some ✦
          </p>
        )}
        <ul className="track-list">
          {tracks.map((t, i) => (
            <li
              key={t.id || i}
              className={selectedIndex === i ? 'track-row selected' : 'track-row'}
              onClick={() => {
                onSetSelectedIndex(i)
                onSelectTrack(i)
              }}
            >
              <svg className="row-star" viewBox="0 0 24 24" width="14">
                <path
                  d="M12 2l2.5 6.5L21 11l-6.5 2.5L12 20l-2.5-6.5L3 11l6.5-2.5z"
                  fill="#8dc3f2"
                />
              </svg>
              <span className="row-name">
                {t.title?.toUpperCase().replace(/\s+/g, '_') || 'UNKNOWN'}.{extFor(i)}
              </span>
            </li>
          ))}
        </ul>

        {currentTrack && (
          <div className="now-playing-mini">
            <div className="now-playing-label">NOW PLAYING</div>
            <div className="track-row playing">
              <svg className="row-heart" viewBox="0 0 24 22" width="14">
                <path
                  d="M12 20 C 4 14, 1 9, 3 5.5 C 5 2, 10 2.5, 12 7 C 14 2.5, 19 2, 21 5.5 C 23 9, 20 14, 12 20Z"
                  fill="#7fe6bd"
                />
              </svg>
              <span className="row-name">
                {currentTrack.title?.toUpperCase().replace(/\s+/g, '_')}.flac
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
