/**
 * Resolves asset paths correctly across local dev and production builds.
 * Also percent-encodes segments that may contain spaces, parentheses, or
 * non-ASCII characters (e.g. Persian filenames uploaded by the user).
 */
export function asset(path: string): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const normalized = path.startsWith('/') ? path : `/${path}`;
  // Encode each path segment so spaces / parentheses / Persian glyphs work in <img>/<audio> src.
  return normalized
    .split('/')
    .map((segment) => {
      // Preserve leading slash of absolute URLs handled above; segments may be empty after split.
      if (segment === '') return segment;
      try {
        return encodeURIComponent(decodeURIComponent(segment));
      } catch {
        return encodeURIComponent(segment);
      }
    })
    .join('/');
}
