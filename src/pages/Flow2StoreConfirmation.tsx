import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Divider from '../components/Divider'
import OrderSummary from '../components/OrderSummary'
import StorePickerModal, { STORES } from '../components/StorePickerModal'
import type { PrototypeFlow } from '../types'
import './DeliveryInfo.css'
import './DeliveryOptions.css'
import './Flow2DeliveryInfo.css'
import './Flow2StoreConfirmation.css'

interface Props {
  onBack: () => void
  onContinue: () => void
  prototypeFlow: PrototypeFlow
  onPrototypeFlowChange: (flow: PrototypeFlow) => void
}

export default function Flow2StoreConfirmation({ onBack, onContinue, prototypeFlow, onPrototypeFlowChange }: Props) {
  const [selectedStoreId, setSelectedStoreId] = useState(STORES[0].id)
  const [showModal, setShowModal] = useState(false)
  const [newsletter, setNewsletter] = useState(false)

  const store = STORES.find(s => s.id === selectedStoreId) ?? STORES[0]

  return (
    <div className="page">
      <Header onBack={onBack} prototypeFlow={prototypeFlow} onPrototypeFlowChange={onPrototypeFlowChange} />

      <div className="delivery-layout">

        <div className="delivery-left">
          <div className="delivery-left__inner">

            <section className="checkout-step checkout-step--active">
              <h2 className="checkout-step__heading">Delivery options</h2>

              {/* Delivery method toggle */}
              <div className="checkout-section">
                <h3 className="delivery-section-title">Choose your delivery method</h3>
                <div className="delivery-type-toggle">
                  <button className="delivery-type-toggle__option" onClick={onBack}>
                    <div className="delivery-type-toggle__icon-wrap">
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                        <rect x="2" y="9" width="19" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M21 14h5.5l2.5 4.5V22h-8V14z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                        <circle cx="9" cy="25" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
                        <circle cx="24" cy="25" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
                      </svg>
                    </div>
                    <span className="delivery-type-toggle__label">Delivery</span>
                  </button>
                  <button className="delivery-type-toggle__option delivery-type-toggle__option--selected">
                    <div className="delivery-type-toggle__icon-wrap">
                      <svg width="22" height="20" viewBox="0 0 22 20" fill="none" aria-hidden="true">
                        <path d="M1 8h20v10a1 1 0 01-1 1H2a1 1 0 01-1-1V8z" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M1 8h20M3 8V5l2-4h12l2 4v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <rect x="8" y="12" width="6" height="7" rx="0.5" stroke="currentColor" strokeWidth="1.5"/>
                      </svg>
                    </div>
                    <span className="delivery-type-toggle__label">Pick up in store</span>
                  </button>
                </div>
              </div>

              {/* Selected store card */}
              <div className="checkout-section">
                <h3 className="delivery-section-title">Select a store location</h3>
                <div className="store-confirmation-card">
                  <p className="store-confirmation-card__name">{store.name}</p>
                  <div className="store-confirmation-card__availability">
                    <span className="store-confirmation-card__avail-primary">{store.availability}</span>
                    <span className="store-confirmation-card__avail-detail">{store.availabilityDetail}</span>
                  </div>
                  <div className="store-confirmation-card__address">
                    <p>{store.address}</p>
                    <p>({store.distance})</p>
                  </div>
                  <div className="store-confirmation-card__actions">
                    <button className="store-confirmation-card__action-link">Show opening hours</button>
                    <span className="store-confirmation-card__action-divider" aria-hidden="true" />
                    <button className="store-confirmation-card__action-link" onClick={() => setShowModal(true)}>Change</button>
                    <span className="store-confirmation-card__action-divider" aria-hidden="true" />
                    <button className="store-confirmation-card__action-link" onClick={onBack}>Remove</button>
                  </div>
                </div>
              </div>

              {/* Newsletter */}
              <div className="form-checkbox-group">
                <button
                  type="button"
                  className="form-checkbox form-checkbox--top-aligned"
                  role="checkbox"
                  aria-checked={newsletter}
                  onClick={() => setNewsletter(!newsletter)}
                >
                  <div className={`form-checkbox__box${newsletter ? ' form-checkbox__box--checked' : ''}`}>
                    {newsletter && (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path d="M2 6L4.5 8.5L10 3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <span className="form-checkbox__label">
                    I would like to sign up and learn about new products, special events and get riding tips sent straight to my inbox every week. Learn more
                  </span>
                </button>
              </div>

              <button className="btn-save-continue" onClick={onContinue}>
                Continue to payment
              </button>
            </section>

            <section className="checkout-step checkout-step--collapsed">
              <Divider thick />
              <h2 className="checkout-step__heading">Payment</h2>
            </section>

          </div>
        </div>

        <div className="delivery-right">
          <OrderSummary />
        </div>

      </div>

      <Footer variant="dark" />

      {showModal && (
        <StorePickerModal
          onClose={() => setShowModal(false)}
          onSelect={(id) => {
            setSelectedStoreId(id)
            setShowModal(false)
          }}
        />
      )}
    </div>
  )
}
