import { useState } from 'react'
import { imgMapPreview, imgStoreIcon } from '../assets'
import './StorePickerModal.css'

export interface Store {
  id: string
  name: string
  availability: string
  availabilityDetail: string
  address: string
  distance: string
}

export const STORES: Store[] = [
  {
    id: 'gogo',
    name: 'GoGo Gone',
    availability: 'Pickup Today',
    availabilityDetail: 'Closes 20:00',
    address: '317 Grand Street, New York',
    distance: '0.8 Miles',
  },
  {
    id: 'nyc-velo',
    name: 'NYC Velo Eastside',
    availability: 'From Thursday May 7',
    availabilityDetail: '10:00 - 21:00',
    address: '66 2nd Avenue, New York',
    distance: '1.3 Miles',
  },
  {
    id: 'bicycle-habitat',
    name: 'Bicycle Habitat - Chelsea',
    availability: 'Available for pick-up in about 7 business days',
    availabilityDetail: '10:00 - 21:00',
    address: '228 7th Ave, New York',
    distance: '2.3 Miles',
  },
]

interface Props {
  onClose: () => void
  onSelect: (storeId: string) => void
}

export default function StorePickerModal({ onClose, onSelect }: Props) {
  const [selected, setSelected] = useState('gogo')

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>

        {/* Left panel */}
        <div className="modal-left">
          <div className="modal-content">
            <div className="modal-text">
              <h2 className="modal-title">Find a Giant retailer</h2>
              <div className="modal-search">
                <span className="modal-search__text">Enter location</span>
                <div className="modal-search__icons">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 1.5C5.515 1.5 3.5 3.515 3.5 6C3.5 9.5 8 14.5 8 14.5C8 14.5 12.5 9.5 12.5 6C12.5 3.515 10.485 1.5 8 1.5ZM8 7.5C7.172 7.5 6.5 6.828 6.5 6C6.5 5.172 7.172 4.5 8 4.5C8.828 4.5 9.5 5.172 9.5 6C9.5 6.828 8.828 7.5 8 7.5Z" fill="currentColor"/>
                  </svg>
                  <div className="modal-search__divider" />
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M10.5 10.5L13.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="modal-stores">
              {STORES.map(store => (
                <button
                  key={store.id}
                  className={`store-card${selected === store.id ? ' store-card--selected' : ''}`}
                  onClick={() => setSelected(store.id)}
                >
                  <div className="store-card__icon">
                    <img src={imgStoreIcon} alt="" width="22" height="20" />
                  </div>
                  <div className="store-card__body">
                    <div className="store-card__name">{store.name}</div>
                    <div className="store-card__availability">
                      <span className="store-card__avail-primary">{store.availability}</span>
                      <span className="store-card__avail-detail">{store.availabilityDetail}</span>
                    </div>
                    <div className="store-card__address">{store.address}</div>
                  </div>
                  <div className="store-card__distance">{store.distance}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="modal-actions">
            <div className="modal-actions__fade" />
            <button className="modal-cancel" onClick={onClose}>Cancel</button>
            <button className="modal-confirm" onClick={() => onSelect(selected)}>
              Pick up at this store
            </button>
          </div>
        </div>

        {/* Right panel: map */}
        <div className="modal-map">
          <img src={imgMapPreview} alt="Store map" />
        </div>

        {/* Close button */}
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 3L13 13M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  )
}
