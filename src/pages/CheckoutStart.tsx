import Header from '../components/Header'
import Footer from '../components/Footer'
import { imgCheck } from '../assets'
import './CheckoutStart.css'

interface Props {
  onGuestCheckout: () => void
}

const BENEFITS = [
  'Save address details and order faster',
  'View invoice and order details',
  'Register your bikes',
]

export default function CheckoutStart({ onGuestCheckout }: Props) {
  return (
    <div className="page">
      <Header />

      <main className="checkout-start__main">
        <h1 className="checkout-start__title">Choose how you would like to check out</h1>

        <div className="checkout-start__options">

          <div className="option-card option-card--shaded">
            <h2 className="option-card__title">Giant ID</h2>
            <div className="option-card__buttons">
              <button className="btn btn--primary">Log in</button>
              <button className="btn btn--outline">Create account</button>
            </div>
            <div className="option-card__benefits">
              <h3 className="option-card__benefits-title">Sign in for faster checkout</h3>
              <ul className="option-card__benefits-list">
                {BENEFITS.map(b => (
                  <li key={b} className="option-card__benefit">
                    <span className="icon icon--sm"><img src={imgCheck} alt="" /></span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="option-card">
            <h2 className="option-card__title">Guest Checkout</h2>
            <div className="option-card__buttons">
              <button className="btn btn--primary" onClick={onGuestCheckout}>
                Checkout as guest
              </button>
            </div>
          </div>

        </div>
      </main>

      <Footer variant="light" />
    </div>
  )
}
