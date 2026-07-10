# STEMverse Website

Static marketing website for **STEMverse**, a STEM/STEAM education initiative based at the
National Incubation Centers in Peshawar and Islamabad, Pakistan.

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Landing page — hero, call-to-action, partner logos |
| `home.html` | About Us — intro video, photo gallery, programs, team, impact |
| `contactus.html` | Contact details, socials, and campus locations |

## Tech

Plain HTML, CSS, and vanilla JavaScript — no build step. Font Awesome is loaded from a CDN.

## Running locally

Serve the folder with any static file server, for example:

```bash
python -m http.server 8000
```

Then open <http://localhost:8000>.

## Notes

- The hero video is served from `pictures/stemverse.mp4` (H.264, ~30 MB). The original
  120 MB HEVC `.mov` is intentionally excluded from the repo (see `.gitignore`).
