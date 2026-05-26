import { imgLogo } from '../assets'
import * as GiantIcon from './GiantIcon'
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
            <GiantIcon.ArrowLeft16 aria-hidden />
          </span>
          <span className="action-m">Continue shopping</span>
        </a>

        <div className="header-logo">
          <img src={imgLogo} alt="Giant" />
        </div>

        <a href="#" className="header-nav">
          <span className="icon icon--md"><GiantIcon.Comment24 aria-hidden /></span>
          <span className="action-m">Customer Support</span>
        </a>
      </header>
    </>
  )
}
