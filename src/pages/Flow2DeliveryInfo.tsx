import { useState } from 'react'
import { fetchDealersSortedByDistance, type GiantDealer } from '../giantDealers'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Divider from '../components/Divider'
import InputField from '../components/InputField'
import SelectField, { COUNTRIES } from '../components/SelectField'
import OrderSummary from '../components/OrderSummary'
import LocationSearchField, { type LocationSuggestion } from '../components/LocationSearchField'
import * as GiantIcon from '../components/GiantIcon'
import type { PrototypeFlow } from '../types'
import './DeliveryInfo.css'
import './DeliveryOptions.css'
import './Flow2DeliveryInfo.css'

type DeliveryType = 'delivery' | 'store'

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

const LOGGED_IN_ADDRESS: AddressForm = {
  firstName: 'Marty', prefix: 'mc', lastName: 'Fly',
  email: 'marty@delorean.com', phone: '(555) 1985-1212',
  address: '9303 Lyon Drive', apt: '',
  city: 'Hill Valley', state: 'California', zip: '95420',
  company: 'DeLorean Motor Company',
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
  onStoreFound: (dealers: GiantDealer[], closest: GiantDealer) => void
  prototypeFlow: PrototypeFlow
  onPrototypeFlowChange: (flow: PrototypeFlow) => void
  deliveryType: DeliveryType
  onDeliveryTypeChange: (type: DeliveryType) => void
  loggedIn?: boolean
  onLogOut?: () => void
}

function StoreSkeletonLoader() {
  return (
    <div className="checkout-section">
      <p className="store-skeleton-heading">Find the closest store with your items in stock</p>
      <div className="store-skeleton">
        {/* Map / content area placeholder */}
        <div className="skeleton-bone skeleton-bone--map" aria-hidden="true" />
        {/* Short text label placeholder */}
        <div className="skeleton-bone skeleton-bone--text-short" aria-hidden="true" />
        {/* Store card row 1 */}
        <div className="store-skeleton__card-row" aria-hidden="true">
          <div className="skeleton-bone" />
          <div className="skeleton-bone" />
        </div>
        {/* Store card row 2 */}
        <div className="store-skeleton__card-row" aria-hidden="true">
          <div className="skeleton-bone" />
          <div className="skeleton-bone" />
        </div>
        {/* Checkbox / text bar placeholder */}
        <div className="skeleton-bone skeleton-bone--text-full" aria-hidden="true" />
        {/* CTA button placeholder */}
        <div className="skeleton-bone skeleton-bone--pill" aria-hidden="true" />
      </div>
    </div>
  )
}

export default function Flow2DeliveryInfo({ onBack, onContinue, onStoreFound, prototypeFlow, onPrototypeFlowChange, deliveryType, onDeliveryTypeChange, loggedIn, onLogOut }: Props) {
  const [selectedLocation, setSelectedLocation] = useState<LocationSuggestion | null>(null)
  const [findingStore, setFindingStore] = useState(false)
  const [billingAddressSame, setBillingAddressSame] = useState(true)
  const [newsletter, setNewsletter] = useState(false)
  const [validated, setValidated] = useState(false)
  const [delivery, setDelivery] = useState<AddressForm>(loggedIn ? LOGGED_IN_ADDRESS : EMPTY_ADDRESS)
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

  async function handleFindStore() {
    if (!selectedLocation?.lat || !selectedLocation?.lon) return
    setFindingStore(true)
    try {
      const dealers = await fetchDealersSortedByDistance(selectedLocation.lat, selectedLocation.lon)
      // Always navigate as long as at least one dealer was returned —
      // the nearest one is pre-selected regardless of how far away it is.
      if (dealers.length > 0) {
        onStoreFound(dealers, dealers[0])
        return
      }
    } catch {
      // Swallow the error — button resets so the user can try again silently.
      console.error('Failed to fetch Giant dealers')
    }
    setFindingStore(false)
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

      {deliveryType === 'delivery' && !loggedIn && (
        <div className="autofill-btn">
          <button className="btn btn--primary autofill-btn__btn" onClick={handleAutofill}>
            Autofill
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
              <div className="checkout-step__heading-row">
                <h2 className="checkout-step__heading">Delivery options</h2>
                {loggedIn && deliveryType === 'delivery' && (
                  <button className="checkout-step__logout-btn" onClick={onLogOut}>
                    Log out
                  </button>
                )}
              </div>

              {/* Choose delivery method */}
              <div className="checkout-section">
                <h3 className="delivery-section-title">Choose your delivery method</h3>
                <div className="delivery-type-toggle">
                  <button
                    className={`delivery-type-toggle__option${deliveryType === 'delivery' ? ' delivery-type-toggle__option--selected' : ''}`}
                    onClick={() => onDeliveryTypeChange('delivery')}
                  >
                    <div className="delivery-type-toggle__icon-wrap">
                      <GiantIcon.Delivery32 aria-hidden />
                    </div>
                    <span className="delivery-type-toggle__label">Delivery</span>
                  </button>
                  <button
                    className={`delivery-type-toggle__option${deliveryType === 'store' ? ' delivery-type-toggle__option--selected' : ''}`}
                    onClick={() => onDeliveryTypeChange('store')}
                  >
                    <div className="delivery-type-toggle__icon-wrap">
                      <GiantIcon.Store32 aria-hidden />
                    </div>
                    <span className="delivery-type-toggle__label">Pick up in store</span>
                  </button>
                </div>
              </div>

              {deliveryType === 'store' && (
                findingStore
                  ? <StoreSkeletonLoader />
                  : (
                    <div className="checkout-section">
                      <h3 className="delivery-section-title">Find the closest store with your items in stock</h3>
                      <div style={{ width: '50%' }}>
                        <LocationSearchField
                          label="Enter address or postal code"
                          placeholder="New York"
                          onSelect={s => setSelectedLocation(s)}
                          selectedValue={selectedLocation?.label}
                        />
                      </div>
                    </div>
                  )
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
                          value={delivery.firstName} onChange={setD('firstName')} error={de('firstName')} prefilled={loggedIn} />
                        <InputField label="Prefix(es)" optional placeholder="Of"
                          value={delivery.prefix} onChange={setD('prefix')} prefilled={loggedIn} />
                        <InputField label="Last name" placeholder="Doe"
                          value={delivery.lastName} onChange={setD('lastName')} error={de('lastName')} prefilled={loggedIn} />
                      </div>

                      <InputField label="E-mail" type="email" placeholder="Name@email.com"
                        value={delivery.email} onChange={setD('email')} error={de('email')} prefilled={loggedIn} />
                      <InputField label="Phone number" type="tel" placeholder="(555) 555-5555"
                        value={delivery.phone} onChange={setD('phone')} error={de('phone')} prefilled={loggedIn} />

                      {/* Address row — 2:1 */}
                      <div className="form-row form-row--address">
                        <InputField label="Address" placeholder="Main Street 12"
                          value={delivery.address} onChange={setD('address')} error={de('address')} prefilled={loggedIn} />
                        <InputField label="Apt / Suite" optional placeholder="123 A"
                          value={delivery.apt} onChange={setD('apt')} prefilled={loggedIn} />
                      </div>

                      {/* City / State / Zip + note */}
                      <div className="form-col form-col--tight">
                        <div className="form-row">
                          <InputField label="City" placeholder="Anytown"
                            value={delivery.city} onChange={setD('city')} error={de('city')} prefilled={loggedIn} />
                          <SelectField label="State"
                            value={delivery.state} onChange={setD('state')} error={de('state')} prefilled={loggedIn} />
                          <InputField label="Zip code" placeholder="1234AB"
                            value={delivery.zip} onChange={setD('zip')} error={de('zip')} prefilled={loggedIn} />
                        </div>
                        <p className="form-note">
                          Note: orders can only ship to addresses in the Continental United States. At this time we are unable to ship to Alaska, Hawaii, or Puerto Rico. We are also unable to ship to APO/FPO/DPO, PMB or PO Box addresses.
                        </p>
                      </div>

                      <InputField label="Company name" optional placeholder="Giant Bicycles"
                        value={delivery.company} onChange={setD('company')} prefilled={loggedIn} />

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
                          <GiantIcon.Check16 size={10} style={{color: 'white'}} aria-hidden />
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
                          <GiantIcon.Check16 size={10} style={{color: 'white'}} aria-hidden />
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
                        <SelectField label="Country" placeholder="Select country"
                          options={COUNTRIES}
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

              {!(deliveryType === 'store' && findingStore) && (
                <button
                  className="btn-save-continue"
                  onClick={deliveryType === 'delivery' ? handleContinue : handleFindStore}
                  disabled={deliveryType === 'store' && !selectedLocation}
                >
                  {deliveryType === 'delivery'
                    ? 'Select shipping option'
                    : 'Find closest store near me'}
                </button>
              )}
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
