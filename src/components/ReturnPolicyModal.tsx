import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import * as GiantIcon from './GiantIcon'
import './ReturnPolicyModal.css'

interface Props {
  onClose: () => void
}

export default function ReturnPolicyModal({ onClose }: Props) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <div className="usp-modal usp-modal--return" onClick={e => e.stopPropagation()}>
        <div className="usp-modal__header">
          <h2 className="usp-modal__title">Right to return</h2>
          <p className="usp-modal__subtitle">How do returns work?</p>
        </div>

        <div className="return-modal__body">
          <p>For all orders placed through our website, you have 30 days from the delivery or pick-up date to return an unwanted item.</p>
          <p>We do not accept returns for bikes with an integrated seatpost.</p>
          <p>For full details, please visit our Returns and Cancellations section.</p>
        </div>

        <div className="return-modal__actions">
          <button className="return-modal__cta">
            Returns and Cancellations
          </button>
        </div>

        <button className="usp-modal__close" onClick={onClose} aria-label="Close">
          <GiantIcon.Close16 aria-hidden />
        </button>
      </div>
    </div>,
    document.body
  )
}
