import { imgLogo, imgComment } from '../assets'
import { PROTOTYPE_FLOWS } from '../types'
import type { PrototypeFlow } from '../types'
import './Header.css'

interface HeaderProps {
  onBack?: () => void
  prototypeFlow: PrototypeFlow
  onPrototypeFlowChange: (flow: PrototypeFlow) => void
}

export default function Header({ onBack, prototypeFlow, onPrototypeFlowChange }: HeaderProps) {
  return (
    <>
      <div className="prototype-bar">
        <select
          className="prototype-bar__select"
          value={prototypeFlow}
          aria-label="Switch prototype"
          onChange={event => onPrototypeFlowChange(event.target.value as PrototypeFlow)}
        >
          {PROTOTYPE_FLOWS.map(flow => (
            <option key={flow.id} value={flow.id}>{flow.label}</option>
          ))}
        </select>
      </div>

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
    </>
  )
}
