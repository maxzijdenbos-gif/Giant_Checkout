import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Divider from '../components/Divider'
import OrderSummary from '../components/OrderSummary'
import StorePickerModal from '../components/StorePickerModal'
import { imgDelivery32, imgPen } from '../assets'
import type { DeliverySelection } from '../types'
import type { PrototypeFlow } from '../types'
import './DeliveryOptions.css'

interface Props {
  onBack: () => void
  onContinue: () => void
  deliverySelection: DeliverySelection
  onDeliveryChange: (s: DeliverySelection) => void
  prototypeFlow: PrototypeFlow
  onPrototypeFlowChange: (flow: PrototypeFlow) => void
}

export default function DeliveryOptions({
  onBack,
  onContinue,
  deliverySelection,
  onDeliveryChange,
  prototypeFlow,
  onPrototypeFlowChange,
}: Props) {
  const [showStorePicker, setShowStorePicker] = useState(false)

  return (
    <div className="page">
      <Header onBack={onBack} prototypeFlow={prototypeFlow} onPrototypeFlowChange={onPrototypeFlowChange} />

      <div className="delivery-layout">

        {/* ── Left panel ──────────────────────────────── */}
        <div className="delivery-left">
          <div className="delivery-left__inner">

            {/* Address step — collapsed / complete — click to go back */}
            <button
              className="collapsed-step"
              onClick={onBack}
              aria-label="Go back to address"
            >
              <div className="collapsed-step__header">
                <h2 className="checkout-step__heading">Address</h2>
                <img src={imgPen} alt="" width="24" height="24" className="collapsed-step__edit-icon" />
              </div>
              <div className="address-summary">
                <p className="address-summary__section-title">Delivery address</p>
                <div className="address-summary__lines">
                  <p>Max Zijdenbos</p>
                  <p>1 New England River Rd</p>
                  <p>Washington, West Virginia, 26181-9479, US</p>
                  <p>(123) 456-7890</p>
                </div>
              </div>
              <Divider thick />
            </button>

            {/* Delivery options — active */}
            <section className="checkout-step">
              <h2 className="checkout-step__heading">Delivery options</h2>

              <div className="delivery-cards">
                {/* Standard Delivery */}
                <button
                  className={`selectable-card${deliverySelection === 'standard' ? ' selectable-card--selected' : ''}`}
                  onClick={() => onDeliveryChange('standard')}
                >
                  <div className="selectable-card__icon">
                    <img src={imgDelivery32} alt="" width="32" height="32" />
                  </div>
                  <div className="selectable-card__body">
                    <div className="selectable-card__title">Standard Delivery</div>
                    <div className="selectable-card__subtitle">Friday, May 8</div>
                  </div>
                  <div className="selectable-card__price">$4.99</div>
                </button>

                {/* Express Delivery */}
                <button
                  className={`selectable-card${deliverySelection === 'express' ? ' selectable-card--selected' : ''}`}
                  onClick={() => onDeliveryChange('express')}
                >
                  <div className="selectable-card__icon">
                    <img src={imgDelivery32} alt="" width="32" height="32" />
                  </div>
                  <div className="selectable-card__body">
                    <div className="selectable-card__title">Express Delivery</div>
                    <div className="selectable-card__subtitle">Thursday, May 7</div>
                  </div>
                  <div className="selectable-card__price">$7.99</div>
                </button>
              </div>

              <h3 className="delivery-section-title">Pick up in store</h3>

              <div className="delivery-cards">
                {/* Giant Store New York */}
                <button
                  className={`selectable-card${deliverySelection === 'store' ? ' selectable-card--selected' : ''}`}
                  onClick={() => onDeliveryChange('store')}
                >
                  <div className="selectable-card__body">
                    <div className="selectable-card__title">Giant Store New York</div>
                    <div className="selectable-card__subtitle">Pick up from Thursday, May 7</div>
                    <div className="selectable-card__address">
                      <p>Giant Store New York, New York City</p>
                      <p>317 Grand St</p>
                      <p>(98.7 mi.)</p>
                    </div>
                    {deliverySelection === 'store' && (
                      <div className="selectable-card__actions">
                        <button
                          className="selectable-card__action-btn"
                          onClick={e => e.stopPropagation()}
                        >
                          Show opening hours
                        </button>
                        <button
                          className="selectable-card__action-btn"
                          onClick={e => {
                            e.stopPropagation()
                            setShowStorePicker(true)
                          }}
                        >
                          Change
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="selectable-card__price">Free</div>
                </button>
              </div>

              <button className="btn-save-continue" onClick={onContinue}>
                Continue to payment
              </button>
            </section>

            {/* Payment — collapsed */}
            <section className="checkout-step checkout-step--collapsed">
              <Divider thick />
              <h2 className="checkout-step__heading">Payment</h2>
            </section>

          </div>
        </div>

        {/* ── Right panel ─────────────────────────────── */}
        <div className="delivery-right">
          <OrderSummary deliverySelection={deliverySelection} />
        </div>

      </div>

      <Footer variant="dark" />

      {showStorePicker && (
        <StorePickerModal
          onClose={() => setShowStorePicker(false)}
          onSelect={() => {
            onDeliveryChange('store')
            setShowStorePicker(false)
          }}
        />
      )}
    </div>
  )
}
