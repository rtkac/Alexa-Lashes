const defaultWidths = [640, 960, 1280, 1920];

/** Netlify Image CDN URL for a `public/` image, resized to `width` (format negotiated via `Accept`). */
export const cdnSrc = (src: string, width: number, quality = 100) =>
  `/.netlify/images?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`;

/** `srcSet` of Image CDN widths, capped at the source's intrinsic width (no upscaling). */
export const cdnSrcSet = (src: string, maxWidth: number, widths = defaultWidths) =>
  [...widths.filter((width) => width < maxWidth), maxWidth]
    .map((width) => `${cdnSrc(src, width)} ${width}w`)
    .join(', ');

/** Gallery thumbnails render at most ~400px wide, so 600w covers high-DPR screens. */
const thumbnailWidths = [200, 400];
const thumbnailMaxWidth = 600;

/** Image CDN thumbnail `src` for gallery grids (the lightbox keeps the original image). */
export const thumbnailSrc = (src: string) => cdnSrc(src, 400);

/** Image CDN thumbnail `srcSet` for gallery grids. */
export const thumbnailSrcSet = (src: string) => cdnSrcSet(src, thumbnailMaxWidth, thumbnailWidths);
