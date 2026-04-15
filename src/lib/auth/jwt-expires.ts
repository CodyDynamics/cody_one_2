/**
 * Parse JWT_EXPIRES_IN style strings (s/m/h/d/w) into seconds for `Set-Cookie` maxAge.
 * Not used on the Nest side (jsonwebtoken has its own parser); keep env values in sync with the backend.
 */
export function parseJwtExpiresToSeconds(input: string): number {
  const trimmed = input.trim().toLowerCase();
  const m = /^(\d+)(ms|s|m|h|d|w|y)$/.exec(trimmed);
  if (!m) {
    return 7 * 24 * 60 * 60;
  }
  const n = Number(m[1]);
  const u = m[2];
  switch (u) {
    case "ms":
      return Math.max(1, Math.floor(n / 1000));
    case "s":
      return n;
    case "m":
      return n * 60;
    case "h":
      return n * 60 * 60;
    case "d":
      return n * 60 * 60 * 24;
    case "w":
      return n * 60 * 60 * 24 * 7;
    case "y":
      return n * 60 * 60 * 24 * 365;
    default:
      return 7 * 24 * 60 * 60;
  }
}
