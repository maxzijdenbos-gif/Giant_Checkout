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
          {variant === 'dark' && (
            <div className="footer-usp">
              <strong className="footer-usp__title">Right to Return</strong>
              <span className="footer-usp__subtitle">You have 14-days to change your mind</span>
            </div>
          )}
          <p>Privacy | Terms and conditions</p>
          <p>Copyright © 2026 | Giant Bicycles United States</p>
        </div>
        <PaymentIcons />
      </div>
    </footer>
  )
}
