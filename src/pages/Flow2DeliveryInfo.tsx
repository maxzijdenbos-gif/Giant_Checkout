import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Divider from '../components/Divider'
import InputField from '../components/InputField'
import OrderSummary from '../components/OrderSummary'
import StorePickerModal from '../components/StorePickerModal'
import { imgDelivery32, imgStoreIcon } from '../assets'
import type { PrototypeFlow } from '../types'
import './DeliveryInfo.css'
import './DeliveryOptions.css'
import './Flow2DeliveryInfo.css'

type DeliveryType = 'delivery' | 'store'

interface Props {
  onBack: () => void
  onContinue: () => void
  prototypeFlow: PrototypeFlow
  onPrototypeFlowChange: (flow: PrototypeFlow) => void
}

export default function Flow2DeliveryInfo({ onBack, onContinue, prototypeFlow, onPrototypeFlowChange }: Props) {
  const [deliveryType, setDeliveryType] = useState<DeliveryType>('delivery')
  const [showStorePicker, setShowStorePicker] = useState(false)

  return (
    <div className="page">
      <Header onBack={onBack} prototypeFlow={prototypeFlow} onPrototypeFlowChange={onPrototypeFlowChange} />

      <div className="delivery-layout">

        {/* ── Left: form ───────────────────────────────────── */}
        <div className="delivery-left">
          <div className="delivery-left__inner">

            {/* Delivery options — active */}
            <section className="checkout-step checkout-step--active">
              <h2 className="checkout-step__heading">Delivery options</h2>

              {/* Delivery type toggle */}
              <div className="delivery-type-toggle">
                <button
                  className={`delivery-type-toggle__option${deliveryType === 'delivery' ? ' delivery-type-toggle__option--selected' : ''}`}
                  onClick={() => setDeliveryType('delivery')}
                >
                  <img src={imgDelivery32} alt="" width="32" height="32" />
                  <span className="delivery-type-toggle__label">Delivery</span>
                </button>
                <button
                  className={`delivery-type-toggle__option${deliveryType === 'store' ? ' delivery-type-toggle__option--selected' : ''}`}
                  onClick={() => setDeliveryType('store')}
                >
                  <img src={imgStoreIcon} alt="" width="32" height="32" />
                  <span className="delivery-type-toggle__label">Pick up in store</span>
                </button>
              </div>

              {deliveryType === 'delivery' ? (
                /* ── Address / contact form ── */
                <div className="form-grid">
                  <div className="form-row">
                    <InputField label="First name" />
                    <InputField label="Last name" />
                  </div>
                  <div className="form-row">
                    <InputField label="Phone number" type="tel" />
                    <InputField label="Email" type="email" />
                  </div>
                  <div className="form-row">
                    <InputField label="Adress" />
                    <InputField label="Apt / Suite (optional)" />
                  </div>
                  <div className="form-row">
                    <InputField label="Company name (optional)" />
                    <InputField label="City" />
                  </div>
                  <div className="form-col">
                    <div className="form-row">
                      <InputField label="State" dropdown />
                      <InputField label="Zip code" />
                    </div>
                    <p className="form-note">
                      Note: orders can only ship to addresses in the Continental United States. At this time we are unable to ship to Alaska, Hawaii, or Puerto Rico. We are also unable to ship to APO/FPO/DPO, PMB or PO Box addresses.
                    </p>
                  </div>
                  <div className="form-row">
                    <InputField label="Country" locked defaultValue="United States" />
                    <div className="form-spacer" />
                  </div>
                </div>
              ) : (
                /* ── Store picker ── */
                <>
                  <h3 className="delivery-section-title">Select a store location</h3>
                  <div className="delivery-cards">
                    <button className="selectable-card selectable-card--selected">
                      <div className="selectable-card__body">
                        <div className="selectable-card__title">Giant Store New York</div>
                        <div className="selectable-card__subtitle">Pick up from Thursday, May 7</div>
                        <div className="selectable-card__address">
                          <p>Giant Store New York, New York City</p>
                          <p>317 Grand St</p>
                          <p>(98.7 mi.)</p>
                        </div>
                        <div className="selectable-card__actions">
                          <button
                            className="selectable-card__action-btn"
                            onClick={e => e.stopPropagation()}
                          >
                            Show opening hours
                          </button>
                          <button
                            className="selectable-card__action-btn"
                            onClick={e => { e.stopPropagation(); setShowStorePicker(true) }}
                          >
                            Change
                          </button>
                        </div>
                      </div>
                    </button>
                  </div>
                </>
              )}

              <button className="btn-save-continue btn-save-continue--full" onClick={onContinue}>
                {deliveryType === 'delivery' ? 'Save and continue' : 'Continue to payment'}
              </button>
            </section>

            {/* Payment — collapsed */}
            <section className="checkout-step checkout-step--collapsed">
              <Divider thick />
              <h2 className="checkout-step__heading">Payment</h2>
            </section>

          </div>
        </div>

        {/* ── Right: order summary ──────────────────────────── */}
        <div className="delivery-right">
          <OrderSummary />
        </div>

      </div>

      <Footer variant="dark" />

      {showStorePicker && (
        <StorePickerModal
          onClose={() => setShowStorePicker(false)}
          onSelect={() => setShowStorePicker(false)}
        />
      )}
    </div>
  )
}
