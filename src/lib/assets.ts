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
  const clean = path.startsWith('/') ? path.slice(1) : path;
  const encoded = clean
    .split('/')
    .map((segment) => {
      if (segment === '') return segment;
      try {
        return encodeURIComponent(decodeURIComponent(segment));
      } catch {
        return encodeURIComponent(segment);
      }
    })
    .join('/');
  const base = import.meta.env.BASE_URL || '/';
  return base.endsWith('/') ? `${base}${encoded}` : `${base}/${encoded}`;
}
