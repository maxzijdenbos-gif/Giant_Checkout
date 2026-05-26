import { useState, useRef, useEffect } from 'react'
import * as GiantIcon from './GiantIcon'
import './LocationSearchField.css'

export interface LocationSuggestion {
  label: string
  sublabel: string
  /** WGS-84 latitude from Nominatim — used downstream to find nearby dealers. */
  lat?: number
  /** WGS-84 longitude from Nominatim — used downstream to find nearby dealers. */
  lon?: number
}

// Shape of a single result from the Nominatim API
interface NominatimResult {
  place_id: number
  display_name: string
  lat: string  // Nominatim returns coordinates as strings
  lon: string
  address: {
    house_number?: string
    road?: string
    city?: string
    town?: string
    village?: string
    municipality?: string
    state?: string
    postcode?: string
    country?: string
  }
}

// Turn a raw Nominatim result into the { label, sublabel } shape the dropdown uses
function formatSuggestion(item: NominatimResult): LocationSuggestion {
  const a = item.address

  const parts: string[] = []

  // Street: "350 5th Avenue"
  const street = [a.house_number, a.road].filter(Boolean).join(' ')
  if (street) parts.push(street)

  // City / town / village fallback chain
  const city = a.city ?? a.town ?? a.village ?? a.municipality
  if (city) parts.push(city)

  if (a.state) parts.push(a.state)
  if (a.postcode) parts.push(a.postcode)

  return {
    label: parts.length > 0 ? parts.join(', ') : item.display_name,
    sublabel: a.country ?? '',
    lat: parseFloat(item.lat),
    lon: parseFloat(item.lon),
  }
}

interface Props {
  label: string
  placeholder?: string
  onSelect: (suggestion: LocationSuggestion | null) => void
  selectedValue?: string
}

type Status = 'idle' | 'loading' | 'done'

export default function LocationSearchField({ label, placeholder, onSelect, selectedValue }: Props) {
  const [value, setValue] = useState(selectedValue ?? '')
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([])
  const [status, setStatus] = useState<Status>('idle')
  const containerRef = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  // Close dropdown when clicking outside the component
  useEffect(() => {
    function onOutsideClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setStatus('idle')
      }
    }
    document.addEventListener('mousedown', onOutsideClick)
    return () => document.removeEventListener('mousedown', onOutsideClick)
  }, [])

  async function fetchSuggestions(query: string) {
    // Cancel any in-flight request from the previous keystroke
    if (abortRef.current) abortRef.current.abort()
    abortRef.current = new AbortController()

    try {
      const params = new URLSearchParams({
        q: query,
        format: 'json',
        limit: '5',
        addressdetails: '1',
      })
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?${params}`,
        {
          // Nominatim requires a meaningful Accept-Language so results come back in English
          headers: { 'Accept-Language': 'en' },
          signal: abortRef.current.signal,
        }
      )
      const data: NominatimResult[] = await res.json()
      setSuggestions(data.map(formatSuggestion))
      setStatus('done')
    } catch (err) {
      // AbortError just means a newer request superseded this one — not a real error
      if ((err as Error).name !== 'AbortError') {
        setSuggestions([])
        setStatus('done')
      }
    }
  }

  function handleChange(v: string) {
    setValue(v)
    onSelect(null)

    if (debounceRef.current) clearTimeout(debounceRef.current)

    // Don't fetch until the user has typed at least 2 characters
    if (v.trim().length < 2) {
      setSuggestions([])
      setStatus('idle')
      return
    }

    // Show loading immediately so the UI feels responsive, then fetch after 350 ms.
    // 350 ms keeps us comfortably within Nominatim's 1-request-per-second policy.
    setStatus('loading')
    debounceRef.current = setTimeout(() => fetchSuggestions(v.trim()), 350)
  }

  function handleClear() {
    setValue('')
    setSuggestions([])
    setStatus('idle')
    onSelect(null)
  }

  function handlePick(s: LocationSuggestion) {
    setValue(s.label)
    setSuggestions([])
    setStatus('idle')
    onSelect(s)
  }

  // Show dropdown whenever we're loading or have a result set to display
  const showDropdown = value.trim().length >= 2 && status !== 'idle'

  return (
    <div className="location-search" ref={containerRef}>
      <div className="location-search__label-row">
        <label className="location-search__label">{label}</label>
      </div>
      <div className="location-search__input-wrap">
        <div className="location-search__box">
          <input
            className="location-search__input"
            type="text"
            value={value}
            placeholder={placeholder}
            onChange={e => handleChange(e.target.value)}
          />
          {value && (
            <div className="location-search__icons">
              <button
                className="location-search__clear"
                onMouseDown={e => e.preventDefault()}
                onClick={handleClear}
                aria-label="Clear"
              >
                <GiantIcon.Close16 size={14} aria-hidden />
              </button>
              <div className="location-search__vdivider" />
              <span className="location-search__pin-icon">
                <GiantIcon.Location16 aria-hidden />
              </span>
            </div>
          )}
        </div>

        {showDropdown && (
          <div className="location-search__dropdown" role="listbox">
            {status === 'loading' && (
              <div className="location-search__status">Searching…</div>
            )}
            {status === 'done' && suggestions.length === 0 && (
              <div className="location-search__status">No results found</div>
            )}
            {status === 'done' && suggestions.map((s, i) => (
              <button
                key={i}
                className="location-search__option"
                role="option"
                onMouseDown={e => e.preventDefault()}
                onClick={() => handlePick(s)}
              >
                <span className="location-search__option-label">{s.label}</span>
                <span className="location-search__option-sublabel">{s.sublabel}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
