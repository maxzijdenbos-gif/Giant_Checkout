import Header from '../components/Header'
import Footer from '../components/Footer'
import Divider from '../components/Divider'
import OrderSummary from '../components/OrderSummary'
import * as GiantIcon from '../components/GiantIcon'
import { DELIVERY_OPTIONS } from '../types'
import type { DeliverySelection, PrototypeFlow } from '../types'
import type { GiantDealer } from '../giantDealers'
import './DeliveryOptions.css'
import './Payment.css'

interface Props {
  onBack: () => void
  deliverySelection: DeliverySelection
  prototypeFlow: PrototypeFlow
  onPrototypeFlowChange: (flow: PrototypeFlow) => void
  selectedDealer?: GiantDealer
}

const PAYMENT_OPTIONS = [
  { id: 'afterpay',  label: 'Afterpay' },
  { id: 'cashapp',   label: 'Cash App Pay' },
  { id: 'klarna',    label: 'Klarna' },
  { id: 'affirm',    label: 'Affirm' },
  { id: 'more',      label: 'More' },
] as const

type PaymentOptionId = typeof PAYMENT_OPTIONS[number]['id']

function ArrowRightIcon() { return <GiantIcon.ArrowRight16 aria-hidden /> }
function EditIcon() { return <GiantIcon.Edit24 className="collapsed-step__edit-icon" aria-hidden /> }

function CreditCardIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="1" y="3" width="14" height="10" rx="1.5" stroke="#635bff" strokeWidth="1.2" />
      <path d="M1 6.5H15" stroke="#635bff" strokeWidth="1.2" />
      <rect x="2.5" y="8.5" width="4" height="2" rx="0.5" fill="#635bff" />
    </svg>
  )
}

function LockIcon() { return <GiantIcon.Lock24 size={20} style={{color: '#697386'}} aria-hidden /> }
function ChevronDown() { return <GiantIcon.ChevronDown16 style={{color: '#697386'}} aria-hidden /> }

function CvcIcon() {
  return (
    <svg className="cvc-icon" width="24" height="18" viewBox="0 0 28 20" fill="none" aria-hidden="true">
      <rect x="1" y="3" width="26" height="16" rx="2.5" stroke="#697386" strokeWidth="1.2" />
      <path d="M1.5 7.5H26.5" stroke="#697386" strokeWidth="1.2" />
      <circle cx="16.5" cy="13.5" r="1.1" fill="#697386" />
      <circle cx="20" cy="13.5" r="1.1" fill="#697386" />
      <circle cx="23.5" cy="13.5" r="1.1" fill="#697386" />
    </svg>
  )
}

function CardBrand({ brand }: { brand: 'visa' | 'mastercard' | 'amex' | 'discover' }) {
  return (
    <span className={`payment-brand payment-brand--sm payment-brand--${brand}`} aria-hidden="true">
      {brand === 'visa' && <span className="payment-brand__word">VISA</span>}
      {brand === 'mastercard' && (
        <>
          <span className="payment-brand__circle payment-brand__circle--red" />
          <span className="payment-brand__circle payment-brand__circle--yellow" />
        </>
      )}
      {brand === 'amex' && <span className="payment-brand__word">AMEX</span>}
      {brand === 'discover' && (
        <>
          <span className="payment-brand__word">DISC</span>
          <span className="payment-brand__sun" />
        </>
      )}
    </span>
  )
}

function PaymentOptionIcon({ id }: { id: PaymentOptionId }) {
  if (id === 'more') {
    return <span className="payment-option-mark payment-option-mark--empty" aria-hidden="true" />
  }
  return (
    <span className={`payment-option-mark payment-option-mark--${id}`} aria-hidden="true">
      {id === 'afterpay' && <span>AP</span>}
      {id === 'cashapp'  && <span>$</span>}
      {id === 'klarna'   && <span>K.</span>}
      {id === 'affirm'   && <span>af</span>}
    </span>
  )
}

export default function Flow2Payment({ onBack, deliverySelection, prototypeFlow, onPrototypeFlowChange, selectedDealer }: Props) {
  const delivery = DELIVERY_OPTIONS[deliverySelection]

  return (
    <div className="page">
      <Header onBack={onBack} prototypeFlow={prototypeFlow} onPrototypeFlowChange={onPrototypeFlowChange} />

      <div className="delivery-layout">

        {/* ── Left panel ──────────────────────────────── */}
        <div className="delivery-left">
          <div className="delivery-left__inner">

            {/* Collapsed: Delivery options */}
            <button className="collapsed-step" onClick={onBack} aria-label="Go back to delivery options">
              <div className="collapsed-step__header">
                <h2 className="checkout-step__heading">Delivery options</h2>
                <EditIcon />
              </div>
              <div className="address-summary">
                <div className="address-summary__lines">
                  <div className="delivery-summary__name-price">
                    <span>{deliverySelection === 'store' && selectedDealer ? selectedDealer.name : delivery.name}</span>
                    <span>{delivery.priceLabel}</span>
                  </div>
                  <p>{delivery.date}</p>
                  {deliverySelection === 'store' && selectedDealer && (
                    <>
                      <p>{selectedDealer.address}</p>
                      <p>({selectedDealer.distanceKm.toFixed(1)} km away)</p>
                    </>
                  )}
                </div>
              </div>
              <Divider thick />
            </button>

            {/* Active: Payment */}
            <section className="checkout-step">
              <h2 className="checkout-step__heading">Payment</h2>

              <div className="stripe-mock">

                {/* Card — selected state */}
                <div className="stripe-card stripe-card--flow2">
                  <div className="stripe-card__header stripe-card__header--flow2">
                    <div className="stripe-card__header-left">
                      <CreditCardIcon />
                      <span className="stripe-card__header-title">Card</span>
                    </div>
                  </div>

                  <div className="stripe-link-row">
                    <LockIcon />
                    <span className="stripe-link-row__text">Secure, fast checkout with Link</span>
                    <ChevronDown />
                  </div>

                  <div className="stripe-card__fields">
                    {/* Card number */}
                    <div className="stripe-labeled-field">
                      <p className="stripe-labeled-field__label">Card number</p>
                      <div className="stripe-labeled-field__input">
                        <span className="stripe-labeled-field__placeholder">1234 1234 1234 1234</span>
                        <div className="stripe-card__brands-row">
                          <CardBrand brand="mastercard" />
                          <CardBrand brand="visa" />
                          <CardBrand brand="amex" />
                          <CardBrand brand="discover" />
                        </div>
                      </div>
                    </div>

                    {/* Expiration + CVC */}
                    <div className="stripe-field-row-labeled">
                      <div className="stripe-labeled-field">
                        <p className="stripe-labeled-field__label">Expiration</p>
                        <div className="stripe-labeled-field__input">
                          <span className="stripe-labeled-field__placeholder">MM / YY</span>
                        </div>
                      </div>
                      <div className="stripe-labeled-field">
                        <p className="stripe-labeled-field__label">CVC</p>
                        <div className="stripe-labeled-field__input">
                          <span className="stripe-labeled-field__placeholder">CVC</span>
                          <CvcIcon />
                        </div>
                      </div>
                    </div>

                    {/* Country */}
                    <div className="stripe-labeled-field">
                      <p className="stripe-labeled-field__label">Country</p>
                      <div className="stripe-labeled-field__input">
                        <span className="stripe-labeled-field__placeholder">Select</span>
                        <ChevronDown />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Alternative payment methods */}
                {PAYMENT_OPTIONS.map(opt => (
                  <button key={opt.id} className="stripe-option">
                    <div className="stripe-option__left">
                      <PaymentOptionIcon id={opt.id} />
                      <span className="stripe-option__label">{opt.label}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* CTA */}
              <button className="btn-save-continue btn-payment-continue">
                Place order
                <ArrowRightIcon />
              </button>

              <p className="payment-terms">
                By clicking Place Order you agree to the{' '}
                <a href="#">Terms &amp; Conditions</a>.
              </p>
            </section>

          </div>
        </div>

        {/* ── Right panel ─────────────────────────────── */}
        <div className="delivery-right">
          <OrderSummary deliverySelection={deliverySelection} />
        </div>

      </div>

      <Footer variant="dark" />
    </div>
  )
}
