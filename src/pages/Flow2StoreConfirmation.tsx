import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Divider from '../components/Divider'
import InputField from '../components/InputField'
import OrderSummary from '../components/OrderSummary'
import StorePickerModal from '../components/StorePickerModal'
import * as GiantIcon from '../components/GiantIcon'
import type { GiantDealer } from '../giantDealers'
import type { PrototypeFlow } from '../types'
import './DeliveryInfo.css'
import './DeliveryOptions.css'
import './Flow2DeliveryInfo.css'
import './Flow2StoreConfirmation.css'

type PickupForm = {
  firstName: string
  lastName: string
  email: string
  phone: string
}

const EMPTY_PICKUP: PickupForm = { firstName: '', lastName: '', email: '', phone: '' }
const MANDATORY_PICKUP: (keyof PickupForm)[] = ['firstName', 'lastName', 'email', 'phone']

interface Props {
  onBack: () => void
  onContinue: () => void
  prototypeFlow: PrototypeFlow
  onPrototypeFlowChange: (flow: PrototypeFlow) => void
  initialDealer: GiantDealer
  allDealers: GiantDealer[]
}

export default function Flow2StoreConfirmation({
  onBack, onContinue, prototypeFlow, onPrototypeFlowChange,
  initialDealer, allDealers,
}: Props) {
  const [selectedDealer, setSelectedDealer] = useState<GiantDealer>(initialDealer)
  const [showModal, setShowModal] = useState(false)
  const [newsletter, setNewsletter] = useState(false)
  const [pickup, setPickup] = useState<PickupForm>(EMPTY_PICKUP)
  const [validated, setValidated] = useState(false)

  function setP(field: keyof PickupForm) {
    return (value: string) => setPickup(prev => ({ ...prev, [field]: value }))
  }

  function pe(field: keyof PickupForm): boolean {
    return validated && MANDATORY_PICKUP.includes(field) && !pickup[field].trim()
  }

  function handleContinue() {
    if (MANDATORY_PICKUP.some(f => !pickup[f].trim())) {
      setValidated(true)
      return
    }
    onContinue()
  }

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
                      <GiantIcon.Delivery32 aria-hidden />
                    </div>
                    <span className="delivery-type-toggle__label">Delivery</span>
                  </button>
                  <button className="delivery-type-toggle__option delivery-type-toggle__option--selected">
                    <div className="delivery-type-toggle__icon-wrap">
                      <GiantIcon.Store32 aria-hidden />
                    </div>
                    <span className="delivery-type-toggle__label">Pick up in store</span>
                  </button>
                </div>
              </div>

              {/* Selected store card */}
              <div className="checkout-section">
                <h3 className="delivery-section-title">This is the closest store with your items in stock</h3>
                <div className="store-confirmation-card">
                  <p className="store-confirmation-card__name">
                    {selectedDealer.name}
                    {selectedDealer.isGiantStore && (
                      <span className="store-confirmation-card__badge">Giant Store</span>
                    )}
                  </p>
                  <div className="store-confirmation-card__address">
                    <p>{selectedDealer.address}</p>
                    <p>({selectedDealer.distanceKm.toFixed(1)} km away)</p>
                  </div>
                  {selectedDealer.phone && (
                    <p className="store-confirmation-card__phone">{selectedDealer.phone}</p>
                  )}
                  <div className="store-confirmation-card__actions">
                    <button className="store-confirmation-card__action-link">Show opening hours</button>
                    <span className="store-confirmation-card__action-divider" aria-hidden="true" />
                    <button className="store-confirmation-card__action-link" onClick={() => setShowModal(true)}>Change</button>
                    <span className="store-confirmation-card__action-divider" aria-hidden="true" />
                    <button className="store-confirmation-card__action-link" onClick={onBack}>Remove</button>
                  </div>
                </div>
              </div>

              {/* Who's picking up the order? */}
              <div className="checkout-section">
                <h3 className="delivery-section-title">Who's picking up the order?</h3>
                <div className="form-grid">
                  <div className="form-row">
                    <InputField label="First name" placeholder="John"
                      value={pickup.firstName} onChange={setP('firstName')} error={pe('firstName')} />
                    <InputField label="Last name" placeholder="Doe"
                      value={pickup.lastName} onChange={setP('lastName')} error={pe('lastName')} />
                  </div>
                  <div className="form-row">
                    <InputField label="Email" type="email" placeholder="Name@email.com"
                      value={pickup.email} onChange={setP('email')} error={pe('email')} />
                    <InputField label="Phone number" type="tel" placeholder="(555) 555-5555"
                      value={pickup.phone} onChange={setP('phone')} error={pe('phone')} />
                  </div>
                </div>
                <p className="store-confirmation-note">Valid ID is required for pick-up.</p>
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
                      <GiantIcon.Check16 size={10} style={{color: 'white'}} aria-hidden />
                    )}
                  </div>
                  <span className="form-checkbox__label">
                    I would like to sign up and learn about new products, special events and get riding tips sent straight to my inbox every week. Learn more
                  </span>
                </button>
              </div>

              <button className="btn-save-continue" onClick={handleContinue}>
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
          dealers={allDealers}
          selectedId={selectedDealer.id}
          onClose={() => setShowModal(false)}
          onSelect={(dealer) => {
            setSelectedDealer(dealer)
            setShowModal(false)
          }}
        />
      )}
    </div>
  )
}
