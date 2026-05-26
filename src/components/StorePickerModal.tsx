import { useState } from 'react'
import { imgMapPreview } from '../assets'
import * as GiantIcon from './GiantIcon'
import type { GiantDealer } from '../giantDealers'
import './StorePickerModal.css'

interface Props {
  dealers: GiantDealer[]
  selectedId: number
  onClose: () => void
  onSelect: (dealer: GiantDealer) => void
}

export default function StorePickerModal({ dealers, selectedId, onClose, onSelect }: Props) {
  const [currentId, setCurrentId] = useState(selectedId)
  const currentDealer = dealers.find(d => d.id === currentId) ?? dealers[0]

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
                  <GiantIcon.Location16 aria-hidden />
                  <div className="modal-search__divider" />
                  <GiantIcon.Search16 aria-hidden />
                </div>
              </div>
            </div>

            <div className="modal-stores">
              {dealers.map(dealer => (
                <button
                  key={dealer.id}
                  className={`store-card${currentId === dealer.id ? ' store-card--selected' : ''}`}
                  onClick={() => setCurrentId(dealer.id)}
                >
                  <div className="store-card__icon">
                    <GiantIcon.Store24 aria-hidden />
                  </div>
                  <div className="store-card__body">
                    <div className="store-card__name">
                      {dealer.name}
                      {dealer.isGiantStore && (
                        <span className="store-card__badge">Giant Store</span>
                      )}
                    </div>
                    <div className="store-card__address">{dealer.address}</div>
                    {dealer.phone && (
                      <div className="store-card__phone">{dealer.phone}</div>
                    )}
                  </div>
                  <div className="store-card__distance">
                    {dealer.distanceKm.toFixed(1)} km
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="modal-actions">
            <div className="modal-actions__fade" />
            <button className="modal-cancel" onClick={onClose}>Cancel</button>
            <button className="modal-confirm" onClick={() => onSelect(currentDealer)}>
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
          <GiantIcon.Close16 aria-hidden />
        </button>

      </div>
    </div>
  )
}
