import Header from '../components/Header'
import Footer from '../components/Footer'
import Divider from '../components/Divider'
import OrderSummary from '../components/OrderSummary'
import {
  imgPen, imgStripeIcon, imgLinkIcon, imgCvcIcon,
  imgPayOptionIcon, imgAffirmIcon, imgArrowRight,
  imgVisa, imgMastercard, imgAmex, imgDiscover,
} from '../assets'
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
  { id: 'afterpay',  label: 'Afterpay / Clearpay', icon: imgPayOptionIcon },
  { id: 'cashapp',   label: 'Cash App Pay',         icon: imgPayOptionIcon },
  { id: 'klarna',    label: 'Klarna',               icon: imgPayOptionIcon },
  { id: 'affirm',    label: 'Affirm',               icon: imgAffirmIcon   },
  { id: 'more',      label: 'More payment options', icon: null            },
]

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
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

            {/* Collapsed: Delivery options */}
            <button
              className="collapsed-step"
              onClick={onBackToDelivery}
              aria-label="Go back to delivery options"
            >
              <div className="collapsed-step__header">
                <h2 className="checkout-step__heading">Delivery options</h2>
                <img src={imgPen} alt="" width="24" height="24" className="collapsed-step__edit-icon" />
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
                      <img src={imgStripeIcon} alt="" width="16" height="16" />
                      <span className="stripe-card__header-title">Card</span>
                    </div>
                    <div className="stripe-card__header-right">
                      <img src={imgVisa}       alt="Visa"       />
                      <img src={imgMastercard} alt="Mastercard" />
                      <img src={imgAmex}       alt="Amex"       />
                      <img src={imgDiscover}   alt="Discover"   />
                      <span className="stripe-card__more-cards">+3</span>
                    </div>
                  </div>

                  {/* Link by Stripe */}
                  <div className="stripe-field stripe-field--link">
                    <img src={imgLinkIcon} alt="Link" height="16" />
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
                        <img src={imgCvcIcon} alt="" height="20" />
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
                      <div className="stripe-option__icon">
                        {opt.icon && <img src={opt.icon} alt="" />}
                      </div>
                      <span className="stripe-option__label">{opt.label}</span>
                    </div>
                    <span className="stripe-option__chevron"><ChevronRight /></span>
                  </button>
                ))}
              </div>

              {/* CTA */}
              <button className="btn-save-continue btn-payment-continue">
                Place order
                <img src={imgArrowRight} alt="" width="16" height="16" />
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
