const RATE_LIMIT = 3;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour
type Entry = { windowStart: number; prevCount: number; currCount: number };
const hits = new Map<string, Entry>();

// Remove entries older than the previous window.
setInterval(() => {
  const currentWindowStart = Math.floor(Date.now() / WINDOW_MS) * WINDOW_MS;
  for (const [id, entry] of hits) {
    if (entry.windowStart < currentWindowStart - WINDOW_MS) {
      hits.delete(id);
    }
  }
}, WINDOW_MS);

export const isRateLimited = (id: string) => {
  const now = Date.now();
  const currentWindowStart = Math.floor(now / WINDOW_MS) * WINDOW_MS;

  let entry = hits.get(id);

  if (!entry || entry.windowStart !== currentWindowStart) {
    const carriedOver = entry?.windowStart === currentWindowStart - WINDOW_MS;
    entry = {
      windowStart: currentWindowStart,
      prevCount: carriedOver ? entry!.currCount : 0,
      currCount: 0,
    };
  }

  const elapsed = now - currentWindowStart;
  const weight = (WINDOW_MS - elapsed) / WINDOW_MS;
  const estimated = entry.currCount + entry.prevCount * weight;

  if (estimated >= RATE_LIMIT) {
    hits.set(id, entry);
    return true;
  }

  entry.currCount += 1;
  hits.set(id, entry);
  return false;
};
