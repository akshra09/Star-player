# ⋆ star player — pastel Y2K mp3 player

A cute, retro-pastel iPod-style web music player. Search for songs (any
popular track works — it's backed by YouTube), build a playlist, and play
it back right in the browser inside a clickwheel device skin.

**No login required, no subscription required, totally free.** This uses
the YouTube Data API for search and the YouTube IFrame Player API for
playback — the same official embedded player YouTube provides for any
website, just running invisibly in the background so it feels like a music
player instead of a video page.

---

## 1. Get a free YouTube API key (one-time, ~3 minutes)

1. Go to https://console.cloud.google.com/ and log in with any Google
   account.
2. Click the project dropdown at the top → **New Project** → give it any
   name (e.g. "star-player") → **Create**.
3. Once created, make sure that project is selected (top dropdown).
4. Go to **APIs & Services → Library** (or visit
   https://console.cloud.google.com/apis/library).
5. Search for **"YouTube Data API v3"** → click it → click **Enable**.
6. Go to **APIs & Services → Credentials** →
   **+ Create Credentials → API key**.
7. Copy the key that appears. That's it — this is free, no billing
   required for the usage this app needs.

Optional but recommended: click **Edit API key**, under
**API restrictions** choose "Restrict key" → select **YouTube Data API v3**
only. This keeps the key safely scoped even though it'll be visible in your
deployed site's frontend code (which is normal for this kind of key).

## 2. Run it locally

```bash
npm install
cp .env.example .env
# paste your key into .env:
# VITE_YOUTUBE_API_KEY=your_key_here
npm run dev
```

Open the printed local URL (usually `http://127.0.0.1:5173`).

## 3. How to use it

- Press **MENU** on the wheel to cycle: Playlist → Now Playing → Add Songs.
- On **Add Songs**, search any song, artist, or "song name official audio"
  — tap **+** to drop matches into your on-device playlist.
- Tap a track in the **Playlist** screen to start playing it.
- The wheel's outer ring is clickable: top = menu, left/right = previous/
  next track, bottom = play/pause. The pink heart in the middle is just
  decorative, like the reference photo.

## 4. Deploying so you can use it "live, anywhere"

This is a static single-page app — no backend/server needed — so any
static host works. **Vercel** is the easiest:


### Netlify

1. Connect your repo in the Netlify dashboard.
2. Build command: `npm run build`, publish directory: `dist`.
3. Add `VITE_YOUTUBE_API_KEY` under Site settings → Environment variables.

### GitHub Pages / any static host

Run `npm run build`, upload the contents of `dist/` anywhere that serves
static files. Since GitHub Pages has no runtime env vars, bake the key in
at build time (e.g. a `.env.production` file, kept out of a public repo, or
a CI secret).

---

## Project structure

```
src/
  App.jsx                    -- app state, screen routing, wheel wiring
  youtube.js                  -- YouTube Data API search calls
  useYouTubePlayer.js          -- hook wrapping the YouTube IFrame Player API
  device.css                   -- all visual styling (pastel/Y2K theme)
  components/
    IpodShell.jsx              -- outer device frame + stickers
    ClickWheel.jsx              -- the circular control wheel
    PlaylistScreen.jsx          -- checkerboard "PLAYLIST" screen
    NowPlayingScreen.jsx        -- "Now Playing" screen w/ thumbnail + progress
    SearchScreen.jsx             -- search YouTube + add to your playlist
    SkyDecor.jsx                  -- floating clouds/CDs/stars/butterflies
```

## Notes & limitations

- Playback is technically a hidden YouTube video element, not pure audio —
  this is what makes full mainstream tracks free and loginless. Expect
  occasional pre-roll ads on some videos, same as watching on youtube.com.
- Search quality depends on what's uploaded to YouTube for a given song —
  official audio, lyric videos, or full albums usually show up fine.
- Your on-device playlist lives in memory for the session. If you want it
  to persist across visits, the easiest next step is saving it to
  `localStorage` — say the word and I'll add that.
- The API key has a generous free daily quota (10,000 units/day, and a
  search costs ~100 units) — plenty for personal use, but if you ever hit
  the limit, Google Cloud Console shows usage under APIs & Services →
  Dashboard.
