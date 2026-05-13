import { imgLogo, imgComment } from '../assets'
import './Header.css'

interface HeaderProps {
  onBack?: () => void
}

export default function Header({ onBack }: HeaderProps) {
  return (
    <header className="header">
      <a href="#" className="header-nav" onClick={e => { e.preventDefault(); onBack?.() }}>
        <span className="icon icon--sm">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
        <span className="action-m">Continue shopping</span>
      </a>

      <div className="header-logo">
        <img src={imgLogo} alt="Giant" />
      </div>

      <a href="#" className="header-nav">
        <span className="icon icon--md"><img src={imgComment} alt="" /></span>
        <span className="action-m">Customer Support</span>
      </a>
    </header>
  )
}
