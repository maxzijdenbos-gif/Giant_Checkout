import { useState } from 'react'
import * as GiantIcon from './GiantIcon'
import './CouponSection.css'

export default function CouponSection() {
  const [isOpen, setIsOpen] = useState(false)
  const [code, setCode] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const isActive = code.length > 0          // has text → blue submit button
  const isTyping = isActive && isFocused    // has text + focused → blue border

  const labelGroup = (
    <span className="coupon-section__label-group">
      <GiantIcon.Tag24 aria-hidden />
      <span className="coupon-section__label">Add coupon</span>
    </span>
  )

  if (!isOpen) {
    return (
      <button
        className="coupon-section__closed"
        onClick={() => setIsOpen(true)}
        aria-expanded={false}
      >
        {labelGroup}
        <GiantIcon.ChevronDown24 aria-hidden />
      </button>
    )
  }

  return (
    <div className="coupon-section__open">
      <button
        className="coupon-section__open-header"
        onClick={() => setIsOpen(false)}
        aria-expanded={true}
      >
        {labelGroup}
        <GiantIcon.ChevronDown24 className="coupon-section__chevron--up" aria-hidden />
      </button>

      <div className="coupon-section__input-row">
        <input
          className={`coupon-section__field${isTyping ? ' coupon-section__field--active' : ''}`}
          type="text"
          value={code}
          placeholder="Enter coupon code"
          onChange={e => setCode(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <button
          className="coupon-section__apply"
          aria-label="Apply coupon"
          disabled={!isActive}
        >
          Apply
        </button>
      </div>
    </div>
  )
}
