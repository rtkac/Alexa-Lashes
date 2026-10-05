const defaultWidths = [640, 960, 1280, 1920];

/** Netlify Image CDN URL for a `public/` image, resized to `width` (format negotiated via `Accept`). */
export const cdnSrc = (src: string, width: number, quality = 90) =>
  `/.netlify/images?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`;

/** `srcSet` of Image CDN widths, capped at the source's intrinsic width (no upscaling). */
export const cdnSrcSet = (
  src: string,
  maxWidth: number,
  widths = defaultWidths,
  quality?: number,
) =>
  [...widths.filter((width) => width < maxWidth), maxWidth]
    .map((width) => `${cdnSrc(src, width, quality)} ${width}w`)
    .join(', ');

/** Gallery thumbnails render at most ~400px wide, so 600w covers high-DPR screens. */
const thumbnailWidths = [200, 400];
const thumbnailMaxWidth = 600;
const thumbnailQuality = 70;

/** Image CDN thumbnail `src` for gallery grids (the lightbox keeps the original image). */
export const thumbnailSrc = (src: string) => cdnSrc(src, 400, thumbnailQuality);

/** Image CDN thumbnail `srcSet` for gallery grids. */
export const thumbnailSrcSet = (src: string) =>
  cdnSrcSet(src, thumbnailMaxWidth, thumbnailWidths, thumbnailQuality);
