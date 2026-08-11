# Background music

The sound toggle in the nav plays `theme.mp3` from this folder.

Drop your track in as:

    public/audio/theme.mp3

Until that file exists the toggle hides itself, so the site ships silent
rather than shipping a button that does nothing.

## What to use

Use something you have the rights to — a royalty-free sea-shanty loop, or
your own cover. The original One Piece soundtrack is copyrighted; don't
put the official recording on a public site.

## Notes

- The track loops forever, so pick a clip that loops cleanly.
- It plays at 32% volume and fades in over ~0.7s.
- Keep it small (under ~2 MB) — it's fetched on every page load.
- Browsers block autoplay, so nothing plays until the visitor clicks the
  toggle. After that the choice is remembered in localStorage and
  resumes on their next visit at their first interaction.
- To change the path or volume, edit `TRACK_SRC` / `TARGET_VOLUME` in
  `src/components/voyage/music-toggle.tsx`.
