import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Divider from '../components/Divider'
import InputField from '../components/InputField'
import SelectField from '../components/SelectField'
import OrderSummary from '../components/OrderSummary'
import LocationSearchField, { type LocationSuggestion } from '../components/LocationSearchField'
import type { PrototypeFlow } from '../types'
import './DeliveryInfo.css'
import './DeliveryOptions.css'
import './Flow2DeliveryInfo.css'

type DeliveryType = 'delivery' | 'store'

const NY_SUGGESTIONS: LocationSuggestion[] = [
  { label: 'New York, NY', sublabel: 'United States' },
  { label: 'New York', sublabel: 'United States' },
  { label: 'New York Mills, MN', sublabel: 'United States' },
  { label: 'New York, TX', sublabel: 'Netherlands' },
]

type AddressForm = {
  firstName: string; prefix: string; lastName: string
  email: string; phone: string
  address: string; apt: string
  city: string; state: string; zip: string
  company: string
}

type BillingForm = {
  country: string
  firstName: string; prefix: string; lastName: string
  email: string; phone: string
  address: string; apt: string
  city: string; state: string; zip: string
}

const EMPTY_ADDRESS: AddressForm = {
  firstName: '', prefix: '', lastName: '', email: '', phone: '',
  address: '', apt: '', city: '', state: '', zip: '', company: '',
}

const EMPTY_BILLING: BillingForm = {
  country: '',
  firstName: '', prefix: '', lastName: '', email: '', phone: '',
  address: '', apt: '', city: '', state: '', zip: '',
}

const AUTOFILL_ADDRESS: AddressForm = {
  firstName: 'John', prefix: '', lastName: 'Doe',
  email: 'test@gmail.com', phone: '0612345678',
  address: 'Oostelijke Handelskade 751', apt: '',
  city: 'Amsterdam', state: 'New York', zip: '1019 BW',
  company: '',
}

const AUTOFILL_BILLING: BillingForm = {
  country: 'Nederland',
  firstName: 'John', prefix: '', lastName: 'Doe',
  email: 'test@gmail.com', phone: '0612345678',
  address: 'Van Zandvlietplein 1', apt: '',
  city: 'Rotterdam', state: 'New York', zip: '3007 AP',
}

const MANDATORY_ADDRESS: (keyof AddressForm)[] = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zip']
const MANDATORY_BILLING: (keyof BillingForm)[] = ['country', 'firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zip']

interface Props {
  onBack: () => void
  onContinue: () => void
  onContinueToPayment: () => void
  prototypeFlow: PrototypeFlow
  onPrototypeFlowChange: (flow: PrototypeFlow) => void
  deliveryType: DeliveryType
  onDeliveryTypeChange: (type: DeliveryType) => void
}

export default function Flow2DeliveryInfo({ onBack, onContinue, onContinueToPayment, prototypeFlow, onPrototypeFlowChange, deliveryType, onDeliveryTypeChange }: Props) {
  const [selectedLocation, setSelectedLocation] = useState<LocationSuggestion | null>(null)
  const [billingAddressSame, setBillingAddressSame] = useState(true)
  const [newsletter, setNewsletter] = useState(false)
  const [validated, setValidated] = useState(false)
  const [delivery, setDelivery] = useState<AddressForm>(EMPTY_ADDRESS)
  const [billing, setBilling] = useState<BillingForm>(EMPTY_BILLING)

  function setD(field: keyof AddressForm) {
    return (value: string) => setDelivery(prev => ({ ...prev, [field]: value }))
  }

  function setB(field: keyof BillingForm) {
    return (value: string) => setBilling(prev => ({ ...prev, [field]: value }))
  }

  function de(field: keyof AddressForm): boolean {
    return validated && MANDATORY_ADDRESS.includes(field) && !delivery[field].trim()
  }

  function be(field: keyof BillingForm): boolean {
    return validated && MANDATORY_BILLING.includes(field) && !billing[field].trim()
  }

  function handleAutofill() {
    setDelivery(AUTOFILL_ADDRESS)
    setBilling(AUTOFILL_BILLING)
    setValidated(false)
  }

  function handleContinue() {
    const deliveryInvalid = MANDATORY_ADDRESS.some(f => !delivery[f].trim())
    const billingInvalid = !billingAddressSame && MANDATORY_BILLING.some(f => !billing[f].trim())
    if (deliveryInvalid || billingInvalid) {
      setValidated(true)
      return
    }
    onContinue()
  }

  return (
    <div className="page">
      <Header onBack={onBack} prototypeFlow={prototypeFlow} onPrototypeFlowChange={onPrototypeFlowChange} />

      {deliveryType === 'delivery' && (
        <div className="autofill-btn">
          <button className="btn btn--primary autofill-btn__btn" onClick={handleAutofill}>
            Autocomplete
          </button>
          <span className="autofill-btn__badge" aria-hidden="true">T</span>
        </div>
      )}

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
                    onClick={() => onDeliveryTypeChange('delivery')}
                  >
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
                  <button
                    className={`delivery-type-toggle__option${deliveryType === 'store' ? ' delivery-type-toggle__option--selected' : ''}`}
                    onClick={() => onDeliveryTypeChange('store')}
                  >
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

              {deliveryType === 'store' && (
                <div className="checkout-section">
                  <div style={{ width: '50%' }}>
                    <LocationSearchField
                      label="Enter address or postal code"
                      placeholder="New York"
                      suggestions={NY_SUGGESTIONS}
                      onSelect={s => setSelectedLocation(s)}
                      selectedValue={selectedLocation?.label}
                    />
                  </div>
                </div>
              )}

              {deliveryType === 'delivery' && (
                <>
                  {/* ── Address / contact form ── */}
                  <div className="checkout-section">
                    <h3 className="delivery-section-title">Enter delivery details</h3>

                    <div className="form-grid">
                      {/* Name row — 3 columns */}
                      <div className="form-row">
                        <InputField label="First name" placeholder="John"
                          value={delivery.firstName} onChange={setD('firstName')} error={de('firstName')} />
                        <InputField label="Prefix(es)" optional placeholder="Of"
                          value={delivery.prefix} onChange={setD('prefix')} />
                        <InputField label="Last name" placeholder="Doe"
                          value={delivery.lastName} onChange={setD('lastName')} error={de('lastName')} />
                      </div>

                      <InputField label="E-mail" type="email" placeholder="Name@email.com"
                        value={delivery.email} onChange={setD('email')} error={de('email')} />
                      <InputField label="Phone number" type="tel" placeholder="(555) 555-5555"
                        value={delivery.phone} onChange={setD('phone')} error={de('phone')} />

                      {/* Address row — 2:1 */}
                      <div className="form-row form-row--address">
                        <InputField label="Address" placeholder="Main Street 12"
                          value={delivery.address} onChange={setD('address')} error={de('address')} />
                        <InputField label="Apt / Suite" optional placeholder="123 A"
                          value={delivery.apt} onChange={setD('apt')} />
                      </div>

                      {/* City / State / Zip + note */}
                      <div className="form-col form-col--tight">
                        <div className="form-row">
                          <InputField label="City" placeholder="Anytown"
                            value={delivery.city} onChange={setD('city')} error={de('city')} />
                          <SelectField label="State"
                            value={delivery.state} onChange={setD('state')} error={de('state')} />
                          <InputField label="Zip code" placeholder="1234AB"
                            value={delivery.zip} onChange={setD('zip')} error={de('zip')} />
                        </div>
                        <p className="form-note">
                          Note: orders can only ship to addresses in the Continental United States. At this time we are unable to ship to Alaska, Hawaii, or Puerto Rico. We are also unable to ship to APO/FPO/DPO, PMB or PO Box addresses.
                        </p>
                      </div>

                      <InputField label="Company name" optional placeholder="Giant Bicycles"
                        value={delivery.company} onChange={setD('company')} />

                      {/* Country — half width, locked */}
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

                  {/* ── Billing address ── */}
                  {!billingAddressSame && (
                    <div className="checkout-section">
                      <h3 className="delivery-section-title">Billing address</h3>

                      <div className="form-grid">
                        <InputField label="Country" placeholder="United states"
                          value={billing.country} onChange={setB('country')} error={be('country')} />

                        {/* Name row — 3 columns */}
                        <div className="form-row">
                          <InputField label="First name" placeholder="John"
                            value={billing.firstName} onChange={setB('firstName')} error={be('firstName')} />
                          <InputField label="Prefix(es)" optional placeholder="Of"
                            value={billing.prefix} onChange={setB('prefix')} />
                          <InputField label="Last name" placeholder="Doe"
                            value={billing.lastName} onChange={setB('lastName')} error={be('lastName')} />
                        </div>

                        <InputField label="E-mail" type="email" placeholder="Name@email.com"
                          value={billing.email} onChange={setB('email')} error={be('email')} />
                        <InputField label="Phone number" type="tel" placeholder="(555) 555-5555"
                          value={billing.phone} onChange={setB('phone')} error={be('phone')} />

                        {/* Address row — 2:1 */}
                        <div className="form-row form-row--address">
                          <InputField label="Address" placeholder="Main Street 12"
                            value={billing.address} onChange={setB('address')} error={be('address')} />
                          <InputField label="Apt / Suite" optional placeholder="123 A"
                            value={billing.apt} onChange={setB('apt')} />
                        </div>

                        {/* City / State / Zip + note */}
                        <div className="form-col form-col--tight">
                          <div className="form-row">
                            <InputField label="City" placeholder="Anytown"
                              value={billing.city} onChange={setB('city')} error={be('city')} />
                            <SelectField label="State"
                              value={billing.state} onChange={setB('state')} error={be('state')} />
                            <InputField label="Zip code" placeholder="1234AB"
                              value={billing.zip} onChange={setB('zip')} error={be('zip')} />
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

              <button
                className="btn-save-continue"
                onClick={deliveryType === 'delivery' ? handleContinue : onContinueToPayment}
                disabled={deliveryType === 'store' && !selectedLocation}
              >
                {deliveryType === 'delivery' ? 'Continue' : 'Find store'}
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

    </div>
  )
}
