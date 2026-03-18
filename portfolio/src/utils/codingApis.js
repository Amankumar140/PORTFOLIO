/**
 * Live API utilities for coding platform stats.
 *
 * LeetCode   → leetcode-api-faisalshohag (Vercel, free, no rate-limit)
 * Codeforces → official public REST API
 * GitHub     → public REST API (no auth, 60 req/hr)
 * CodeChef   → static fallback (all free APIs are down / 402)
 * HackerRank → static fallback (no public API)
 */

/* ── Helpers ── */

/** Session-cache to survive hot-reloads without hitting APIs every time. */
function getCached(key) {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (Date.now() - ts < 10 * 60 * 1000) return data; // 10 min TTL
  } catch { /* ignore */ }
  return null;
}

function setCache(key, data) {
  try {
    sessionStorage.setItem(key, JSON.stringify({ data, ts: Date.now() }));
  } catch { /* ignore */ }
}

/* ── LeetCode ── */

/**
 * Fetch LeetCode user stats via faisalshohag's Vercel proxy.
 * Returns { totalSolved, easySolved, mediumSolved, hardSolved, ranking }
 */
export async function fetchLeetCodeStats(username) {
  const cacheKey = `lc_stats_${username}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  try {
    const res = await fetch(
      `https://leetcode-api-faisalshohag.vercel.app/${username}`
    );
    if (!res.ok) throw new Error(res.statusText);
    const data = await res.json();

    const result = {
      totalSolved: data.totalSolved ?? 0,
      easySolved: data.easySolved ?? 0,
      mediumSolved: data.mediumSolved ?? 0,
      hardSolved: data.hardSolved ?? 0,
      ranking: data.ranking ?? null,
    };
    setCache(cacheKey, result);
    return result;
  } catch (err) {
    console.warn('LeetCode API error:', err);
    return null;
  }
}

/* ── Codeforces ── */

/**
 * Fetch Codeforces user info via official API.
 * Returns { rating, maxRating, rank, maxRank, handle }
 */
export async function fetchCodeforcesStats(handle) {
  const cacheKey = `cf_stats_${handle}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  try {
    const res = await fetch(
      `https://codeforces.com/api/user.info?handles=${handle}`
    );
    if (!res.ok) throw new Error(res.statusText);
    const json = await res.json();
    if (json.status !== 'OK' || !json.result?.length) throw new Error('Bad response');
    const u = json.result[0];
    const result = {
      rating: u.rating ?? null,
      maxRating: u.maxRating ?? null,
      rank: u.rank ?? null,
      maxRank: u.maxRank ?? null,
      handle: u.handle,
    };
    setCache(cacheKey, result);
    return result;
  } catch {
    return null;
  }
}

/* ── GitHub ── */

/**
 * Fetch GitHub public user info.
 * Returns { publicRepos, followers, following, bio }
 */
export async function fetchGitHubStats(username) {
  const cacheKey = `gh_stats_${username}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  try {
    const res = await fetch(`https://api.github.com/users/${username}`);
    if (!res.ok) throw new Error(res.statusText);
    const u = await res.json();
    const result = {
      publicRepos: u.public_repos ?? null,
      followers: u.followers ?? null,
      following: u.following ?? null,
      bio: u.bio ?? null,
    };
    setCache(cacheKey, result);
    return result;
  } catch {
    return null;
  }
}

/* ── CodeChef ── */

/**
 * CodeChef – all known free APIs are returning 402.
 * Return curated static data so the card still looks good.
 * Update these values whenever your profile changes.
 */
export async function fetchCodeChefStats(_username) {
  return {
    rating: 1507,
    stars: '2',
    globalRank: '—',
    countryRank: '—',
    problemsSolved: '100+',
  };
}
