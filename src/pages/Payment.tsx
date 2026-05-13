import Header from '../components/Header'
import Footer from '../components/Footer'
import Divider from '../components/Divider'
import OrderSummary from '../components/OrderSummary'
import { DELIVERY_OPTIONS } from '../types'
import type { DeliverySelection } from '../types'
import './DeliveryOptions.css'
import './Payment.css'

interface Props {
  onBackToAddress: () => void
  onBackToDelivery: () => void
  deliverySelection: DeliverySelection
}

const PAYMENT_OPTIONS = [
  { id: 'afterpay', label: 'Afterpay / Clearpay' },
  { id: 'cashapp', label: 'Cash App Pay' },
  { id: 'klarna', label: 'Klarna' },
  { id: 'affirm', label: 'Affirm' },
  { id: 'more', label: 'More payment options' },
] as const

type PaymentOptionId = typeof PAYMENT_OPTIONS[number]['id']

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8H13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function EditIcon() {
  return (
    <svg className="collapsed-step__edit-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 16.75V20H7.25L17.08 10.17L13.83 6.92L4 16.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15.25 5.5L18.5 8.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function SelectedPaymentIcon() {
  return (
    <span className="payment-radio" aria-hidden="true">
      <span className="payment-radio__dot" />
    </span>
  )
}

function LinkMark() {
  return <span className="link-mark" aria-hidden="true">Link</span>
}

function CvcIcon() {
  return (
    <svg className="cvc-icon" width="28" height="20" viewBox="0 0 28 20" fill="none" aria-hidden="true">
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
    <span className={`payment-brand payment-brand--${brand}`} aria-hidden="true">
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
      {id === 'cashapp' && <span>$</span>}
      {id === 'klarna' && <span>K.</span>}
      {id === 'affirm' && <span>af</span>}
    </span>
  )
}

export default function Payment({ onBackToAddress, onBackToDelivery, deliverySelection }: Props) {
  const delivery = DELIVERY_OPTIONS[deliverySelection]

  return (
    <div className="page">
      <Header onBack={onBackToDelivery} />

      <div className="delivery-layout">

        {/* ── Left panel ──────────────────────────────── */}
        <div className="delivery-left">
          <div className="delivery-left__inner">

            {/* Collapsed: Address */}
            <button
              className="collapsed-step"
              onClick={onBackToAddress}
              aria-label="Go back to address"
            >
              <div className="collapsed-step__header">
                <h2 className="checkout-step__heading">Address</h2>
                <EditIcon />
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

            {/* Collapsed: Delivery options */}
            <button
              className="collapsed-step"
              onClick={onBackToDelivery}
              aria-label="Go back to delivery options"
            >
              <div className="collapsed-step__header">
                <h2 className="checkout-step__heading">Delivery options</h2>
                <EditIcon />
              </div>
              <div className="address-summary">
                <div className="address-summary__lines">
                  <p>{delivery.name}</p>
                  <p>{delivery.date}</p>
                  <p>{delivery.priceLabel}</p>
                </div>
              </div>
              <Divider thick />
            </button>

            {/* Active: Payment */}
            <section className="checkout-step">
              <h2 className="checkout-step__heading">Payment</h2>

              {/* Stripe Payment Element mock */}
              <div className="stripe-mock">

                {/* Card — selected state */}
                <div className="stripe-card">
                  <div className="stripe-card__header">
                    <div className="stripe-card__header-left">
                      <SelectedPaymentIcon />
                      <span className="stripe-card__header-title">Card</span>
                    </div>
                    <div className="stripe-card__header-right">
                      <CardBrand brand="visa" />
                      <CardBrand brand="mastercard" />
                      <CardBrand brand="amex" />
                      <CardBrand brand="discover" />
                      <span className="stripe-card__more-cards">+3</span>
                    </div>
                  </div>

                  {/* Link by Stripe */}
                  <div className="stripe-field stripe-field--link">
                    <LinkMark />
                    <span className="stripe-field__placeholder">Pay faster with Link</span>
                  </div>

                  {/* Card number */}
                  <div className="stripe-field">
                    <span className="stripe-field__placeholder">Card number</span>
                  </div>

                  {/* Expiry + CVC */}
                  <div className="stripe-field-row">
                    <div className="stripe-field stripe-field--half">
                      <span className="stripe-field__placeholder">MM / YY</span>
                    </div>
                    <div className="stripe-field stripe-field--half">
                      <div className="stripe-field__row">
                        <span className="stripe-field__placeholder">CVC</span>
                        <CvcIcon />
                      </div>
                    </div>
                  </div>

                  {/* Country */}
                  <div className="stripe-field">
                    <span className="stripe-field__placeholder">Country or region</span>
                  </div>
                </div>

                {/* Alternative payment methods */}
                {PAYMENT_OPTIONS.map(opt => (
                  <button key={opt.id} className="stripe-option">
                    <div className="stripe-option__left">
                      <PaymentOptionIcon id={opt.id} />
                      <span className="stripe-option__label">{opt.label}</span>
                    </div>
                    <span className="stripe-option__chevron"><ChevronRight /></span>
                  </button>
                ))}
              </div>

              {/* CTA */}
              <button className="btn-save-continue btn-payment-continue">
                Place order
                <ArrowRightIcon />
              </button>

              <p className="payment-terms">
                By placing your order you agree to Giant's{' '}
                <a href="#">Terms &amp; Conditions</a> and{' '}
                <a href="#">Privacy Policy</a>.
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
