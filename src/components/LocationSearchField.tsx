import { useState, useRef, useEffect } from 'react'
import './LocationSearchField.css'

export interface LocationSuggestion {
  label: string
  sublabel: string
}

interface Props {
  label: string
  placeholder?: string
  suggestions: LocationSuggestion[]
  onSelect: (suggestion: LocationSuggestion | null) => void
  selectedValue?: string
}

export default function LocationSearchField({ label, placeholder, suggestions, onSelect, selectedValue }: Props) {
  const [value, setValue] = useState(selectedValue ?? '')
  const [showDropdown, setShowDropdown] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const filtered = value.trim()
    ? suggestions.filter(s => s.label.toLowerCase().includes(value.toLowerCase()))
    : []

  useEffect(() => {
    function onOutsideClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', onOutsideClick)
    return () => document.removeEventListener('mousedown', onOutsideClick)
  }, [])

  function handleChange(v: string) {
    setValue(v)
    setShowDropdown(v.length > 0)
    onSelect(null)
  }

  function handleClear() {
    setValue('')
    setShowDropdown(false)
    onSelect(null)
  }

  function handlePick(s: LocationSuggestion) {
    setValue(s.label)
    setShowDropdown(false)
    onSelect(s)
  }

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
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
              <div className="location-search__vdivider" />
              <span className="location-search__pin-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1.5C5.515 1.5 3.5 3.515 3.5 6C3.5 9.5 8 14.5 8 14.5C8 14.5 12.5 9.5 12.5 6C12.5 3.515 10.485 1.5 8 1.5ZM8 7.5C7.172 7.5 6.5 6.828 6.5 6C6.5 5.172 7.172 4.5 8 4.5C8.828 4.5 9.5 5.172 9.5 6C9.5 6.828 8.828 7.5 8 7.5Z" fill="currentColor" />
                </svg>
              </span>
            </div>
          )}
        </div>

        {showDropdown && filtered.length > 0 && (
          <div className="location-search__dropdown" role="listbox">
            {filtered.map((s, i) => (
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
