import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import * as GiantIcon from './GiantIcon'
import './OpeningHoursModal.css'

interface Props {
  onClose: () => void
}

const HOURS = [
  { day: 'Mon', time: 'Closed' },
  { day: 'Tue', time: 'Closed' },
  { day: 'Wed', time: '11:00–20:00' },
  { day: 'Thu', time: '11:00–20:00' },
  { day: 'Fri', time: '11:00–20:00' },
  { day: 'Sat', time: '11:00–20:00' },
  { day: 'Sun', time: '12:00–18:00' },
]

export default function OpeningHoursModal({ onClose }: Props) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <div className="usp-modal" onClick={e => e.stopPropagation()}>
        <div className="usp-modal__header">
          <h2 className="usp-modal__title">Giant Store New York</h2>
          <p className="usp-modal__subtitle">317 Grand St, New York City</p>
        </div>

        <div className="opening-hours">
          {HOURS.map(({ day, time }) => (
            <div key={day} className="opening-hours__row">
              <span className="opening-hours__day">{day}</span>
              <span className="opening-hours__time">{time}</span>
            </div>
          ))}
          <p className="opening-hours__pickup">Pick up from Friday June 12th</p>
        </div>

        <button className="usp-modal__close" onClick={onClose} aria-label="Close">
          <GiantIcon.Close16 aria-hidden />
        </button>
      </div>
    </div>,
    document.body
  )
}
