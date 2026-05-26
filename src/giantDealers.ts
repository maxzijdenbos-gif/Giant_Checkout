/**
 * Fetches nearby bicycle dealers using the Overpass API (OpenStreetMap).
 *
 * Overpass is free, open, and supports CORS — no proxy or API key needed.
 * Results include Giant-branded stores (marked isGiantStore = true) as well
 * as other Giant authorised dealers that may not carry the brand tag in OSM.
 */

export interface GiantDealer {
  id: number
  name: string
  address: string
  city: string
  phone: string
  email: string | null
  website: string | null
  isGiantStore: boolean
  image: string | null
  lat: number
  lon: number
  /** Straight-line distance from the user's location in km, calculated client-side. */
  distanceKm: number
  country: string
}

/** Haversine great-circle distance between two lat/lon points, in kilometres. */
function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371
  const toRad = (deg: number) => (deg * Math.PI) / 180
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

interface OsmElement {
  id: number
  type: 'node' | 'way' | 'relation'
  lat?: number
  lon?: number
  center?: { lat: number; lon: number }
  tags: Record<string, string>
}

function buildAddress(tags: Record<string, string>): string {
  const parts = [
    [tags['addr:housenumber'], tags['addr:street']].filter(Boolean).join(' '),
    tags['addr:city'],
    tags['addr:state'],
    tags['addr:postcode'],
  ].filter(Boolean)
  return parts.join(', ')
}

function detectGiantStore(tags: Record<string, string>): boolean {
  const name = (tags.name ?? '').toLowerCase()
  const brand = (tags.brand ?? tags['brand:en'] ?? '').toLowerCase()
  const operator = (tags.operator ?? '').toLowerCase()
  return (
    brand === 'giant' ||
    operator.includes('giant') ||
    name.includes('giant store') ||
    name.startsWith('giant ')
  )
}

/**
 * Fetch bicycle shops within `radiusKm` of the given coordinates using
 * OpenStreetMap's Overpass API, then return them sorted nearest-first.
 * Capped at 20 results to keep the store picker manageable.
 */
export async function fetchDealersSortedByDistance(
  userLat: number,
  userLon: number,
  radiusKm = 80,
): Promise<GiantDealer[]> {
  const radiusM = radiusKm * 1000

  // Query all bicycle shops within radius; `out center` gives coords for ways too
  const query = `[out:json][timeout:25];
(
  node["shop"="bicycle"](around:${radiusM},${userLat},${userLon});
  way["shop"="bicycle"](around:${radiusM},${userLat},${userLon});
);
out center;`

  // POST is the recommended way to call Overpass for anything beyond trivial queries
  const res = await fetch('https://overpass-api.de/api/interpreter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `data=${encodeURIComponent(query)}`,
  })
  if (!res.ok) throw new Error(`Overpass API error: ${res.status}`)

  const data: { elements: OsmElement[] } = await res.json()

  return data.elements
    .filter(el => {
      // Must have a resolvable position and a name
      const lat = el.lat ?? el.center?.lat
      const lon = el.lon ?? el.center?.lon
      return lat != null && lon != null && el.tags?.name
    })
    .map((el): GiantDealer => {
      const lat = (el.lat ?? el.center!.lat)
      const lon = (el.lon ?? el.center!.lon)
      const tags = el.tags

      return {
        id: el.id,
        name: tags.name,
        address: buildAddress(tags),
        city: tags['addr:city'] ?? '',
        phone: tags.phone ?? tags['contact:phone'] ?? '',
        email: tags.email ?? tags['contact:email'] ?? null,
        website: tags.website ?? tags.url ?? null,
        isGiantStore: detectGiantStore(tags),
        image: null,
        lat,
        lon,
        distanceKm: haversineKm(userLat, userLon, lat, lon),
        country: tags['addr:country'] ?? 'United States',
      }
    })
    .sort((a, b) => a.distanceKm - b.distanceKm)
    .slice(0, 20)
}
