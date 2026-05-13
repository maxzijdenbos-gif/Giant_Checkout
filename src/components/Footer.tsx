import PaymentIcons from './PaymentIcons'
import './Footer.css'

interface FooterProps {
  variant?: 'light' | 'dark'
}

export default function Footer({ variant = 'light' }: FooterProps) {
  return (
    <footer className={`footer footer--${variant}`}>
      <div className="footer-inner">
        <div className="footer-text">
          <p>Need some help? Please reach out to us directly through our contact form or live chat.</p>
          <p>Privacy | Terms and conditions</p>
          <p>Copyright © 2026 | Giant Bicycles United States</p>
        </div>
        <PaymentIcons />
      </div>
    </footer>
  )
}
