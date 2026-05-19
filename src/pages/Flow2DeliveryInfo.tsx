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
  const [billingAddressSame, setBillingAddressSame] = useState(true)
  const [newsletter, setNewsletter] = useState(false)

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

              {/* Choose delivery method */}
              <div className="checkout-section">
                <h3 className="delivery-section-title">Choose your delivery method</h3>
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
                    onClick={() => {
                      setDeliveryType('store')
                      setShowStorePicker(true)
                    }}
                  >
                    <img src={imgStoreIcon} alt="" width="32" height="32" />
                    <span className="delivery-type-toggle__label">Pick up in store</span>
                  </button>
                </div>
              </div>

              {deliveryType === 'delivery' && (
                <>
                  {/* ── Address / contact form ── */}
                  <div className="checkout-section">
                    <h3 className="delivery-section-title">Enter delivery details</h3>

                    <div className="form-grid">
                      {/* Name row — 3 columns */}
                      <div className="form-row">
                        <InputField label="First name" placeholder="John" />
                        <InputField label="Prefix(es)" optional placeholder="Of" />
                        <InputField label="Last name" placeholder="Doe" />
                      </div>

                      <InputField label="E-mail" type="email" placeholder="Name@email.com" />
                      <InputField label="Phone number" type="tel" placeholder="(555) 555-5555" />

                      {/* Address row — 2:1 */}
                      <div className="form-row form-row--address">
                        <InputField label="Address" placeholder="Main Street 12" />
                        <InputField label="Apt / Suite" optional placeholder="123 A" />
                      </div>

                      {/* City / State / Zip + note */}
                      <div className="form-col form-col--tight">
                        <div className="form-row">
                          <InputField label="City" placeholder="Anytown" />
                          <InputField label="State" placeholder="" />
                          <InputField label="Zip code" placeholder="1234AB" />
                        </div>
                        <p className="form-note">
                          Note: orders can only ship to addresses in the Continental United States. At this time we are unable to ship to Alaska, Hawaii, or Puerto Rico. We are also unable to ship to APO/FPO/DPO, PMB or PO Box addresses.
                        </p>
                      </div>

                      <InputField label="Company name" optional placeholder="Giant Bicycles" />

                      {/* Country — half width */}
                      <div className="form-row">
                        <InputField label="Country" locked defaultValue="United states" />
                        <div className="form-spacer" />
                      </div>
                    </div>
                  </div>

                  {/* ── Checkboxes ── */}
                  <div className="form-checkbox-group">
                    <button
                      type="button"
                      className="form-checkbox"
                      role="checkbox"
                      aria-checked={billingAddressSame}
                      onClick={() => setBillingAddressSame(!billingAddressSame)}
                    >
                      <div className={`form-checkbox__box${billingAddressSame ? ' form-checkbox__box--checked' : ''}`}>
                        {billingAddressSame && (
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                            <path d="M2 6L4.5 8.5L10 3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                      <span className="form-checkbox__label">Billing and delivery address are the same</span>
                    </button>
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

                  {/* ── Billing address (shown when not same as delivery) ── */}
                  {!billingAddressSame && (
                    <div className="checkout-section">
                      <h3 className="delivery-section-title">Billing address</h3>

                      <div className="form-grid">
                        <InputField label="Country" placeholder="United states" />

                        {/* Name row — 3 columns */}
                        <div className="form-row">
                          <InputField label="First name" placeholder="John" />
                          <InputField label="Prefix(es)" optional placeholder="Of" />
                          <InputField label="Last name" placeholder="Doe" />
                        </div>

                        <InputField label="E-mail" type="email" placeholder="Name@email.com" />
                        <InputField label="Phone number" type="tel" placeholder="(555) 555-5555" />

                        {/* Address row — 2:1 */}
                        <div className="form-row form-row--address">
                          <InputField label="Address" placeholder="Main Street 12" />
                          <InputField label="Apt / Suite" optional placeholder="123 A" />
                        </div>

                        {/* City / State / Zip + note */}
                        <div className="form-col form-col--tight">
                          <div className="form-row">
                            <InputField label="City" placeholder="Anytown" />
                            <InputField label="State" placeholder="" />
                            <InputField label="Zip code" placeholder="1234AB" />
                          </div>
                          <p className="form-note">
                            Note: orders can only ship to addresses in the Continental United States. At this time we are unable to ship to Alaska, Hawaii, or Puerto Rico. We are also unable to ship to APO/FPO/DPO, PMB or PO Box addresses.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              <button className="btn-save-continue" onClick={onContinue}>
                {deliveryType === 'delivery' ? 'Continue' : 'Continue to payment'}
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
