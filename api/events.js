const LUMA_API = 'https://api.lu.ma/discover/get-paginated-events';
const NYC_PLACE_ID = 'discplace-Izx1rQVSh8njYpP';
const MIMETIC_URL = 'https://trymimetic.com/events/nyc';

const QUERIES = [
  'AI', 'artificial intelligence', 'machine learning', 'agents', 'LLM',
  'startup tech', 'developer meetup', 'hackathon', 'data science',
  'GenAI', 'deep learning', 'robotics', 'founder',
];

const AI_KEYWORDS = [
  'ai', 'artificial intelligence', 'machine learning', 'ml', 'llm', 'gpt',
  'agent', 'agentic', 'deep learning', 'neural', 'nlp', 'transformer',
  'startup', 'founder', 'venture', 'seed', 'series a', 'series b',
  'tech meetup', 'tech night', 'developer meetup', 'engineer meetup',
  'hackathon', 'demo day',
  'data science', 'data engineering', 'analytics',
  'robotics', 'computer vision', 'genai', 'generative',
  'cloud', 'infrastructure', 'devops', 'open source',
];

function matchesKeywords(text) {
  const lower = text.toLowerCase();
  return AI_KEYWORDS.some(kw => lower.includes(kw));
}

function normalizeUrl(url) {
  return url.split('?')[0].replace(/\/+$/, '').toLowerCase();
}

async function fetchLumaPage(query, limit, cursor) {
  const params = new URLSearchParams({
    discover_place_api_id: NYC_PLACE_ID,
    pagination_limit: String(limit),
  });
  if (query) params.set('query', query);
  if (cursor) params.set('pagination_cursor', cursor);

  try {
    const res = await fetch(`${LUMA_API}?${params}`);
    if (!res.ok) return { entries: [], nextCursor: null };
    const data = await res.json();
    return {
      entries: data.entries || [],
      nextCursor: data.has_more ? data.next_cursor : null,
    };
  } catch {
    return { entries: [], nextCursor: null };
  }
}

async function fetchLumaEvents() {
  const allEntries = [];

  // Query-based searches
  const queryResults = await Promise.all(
    QUERIES.map(q => fetchLumaPage(q, 15, null))
  );
  for (const { entries } of queryResults) {
    allEntries.push(...entries);
  }

  // Unfiltered fetch with pagination (2 pages of 50)
  let cursor = null;
  for (let i = 0; i < 2; i++) {
    const { entries, nextCursor } = await fetchLumaPage(null, 50, cursor);
    allEntries.push(...entries.filter(e => {
      const ev = e.event || {};
      return matchesKeywords((ev.name || '') + ' ' + (ev.description || ''));
    }));
    cursor = nextCursor;
    if (!cursor) break;
  }

  return allEntries;
}

async function fetchMimeticEvents() {
  try {
    const res = await fetch(MIMETIC_URL, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!res.ok) return [];
    const html = await res.text();
    const match = html.match(/const eventsData = (\[.*?\]);/s);
    if (!match) return [];
    const events = JSON.parse(match[1]);
    return events.filter(e => (e.city || '').toUpperCase() === 'NYC');
  } catch {
    return [];
  }
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=7200');
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    const [lumaEntries, mimeticEvents] = await Promise.all([
      fetchLumaEvents(),
      fetchMimeticEvents(),
    ]);

    const seenUrls = new Set();
    const events = [];
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const maxDate = new Date(todayStart.getTime() + 30 * 24 * 60 * 60 * 1000);

    // Process Luma events
    for (const entry of lumaEntries) {
      const ev = entry.event || {};
      if (!matchesKeywords((ev.name || '') + ' ' + (ev.description || ''))) continue;

      const url = `https://lu.ma/${ev.url || ''}`;
      const norm = normalizeUrl(url);
      if (seenUrls.has(norm)) continue;
      seenUrls.add(norm);

      const startAt = ev.start_at || '';
      let dt;
      try {
        dt = new Date(startAt);
        if (isNaN(dt.getTime())) continue;
      } catch { continue; }
      if (dt < todayStart || dt > maxDate) continue;

      const addr = ev.geo_address_info || {};
      const hosts = (entry.hosts || []).map(h => h.name).filter(Boolean);

      events.push({
        name: ev.name || 'Untitled',
        start: dt.toISOString(),
        location: addr.full_address || addr.city_state || '',
        hosts: hosts.join(', '),
        url,
        isFree: (entry.ticket_info || {}).is_free || false,
        guestCount: entry.guest_count || 0,
        source: 'luma',
        soldOut: false,
      });
    }

    // Process mimetic events
    for (const me of mimeticEvents) {
      const rawUrl = (me.event_url || '').split('?')[0];
      const norm = normalizeUrl(rawUrl);
      if (seenUrls.has(norm)) continue;
      seenUrls.add(norm);

      const title = me.title || '';
      const desc = me.description || '';
      if (!matchesKeywords(title + ' ' + desc)) continue;

      let dt;
      try {
        dt = new Date(me.start_time);
        if (isNaN(dt.getTime())) continue;
      } catch { continue; }
      if (dt < todayStart || dt > maxDate) continue;

      events.push({
        name: title || 'Untitled',
        start: dt.toISOString(),
        location: me.venue_name || '',
        hosts: me.organizer || '',
        url: rawUrl,
        isFree: !me.is_sold_out,
        guestCount: 0,
        source: 'mimetic',
        soldOut: me.is_sold_out || false,
      });
    }

    // Sort by date
    events.sort((a, b) => new Date(a.start) - new Date(b.start));

    res.status(200).json({ events, updated: now.toISOString() });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch events', detail: err.message });
  }
}
