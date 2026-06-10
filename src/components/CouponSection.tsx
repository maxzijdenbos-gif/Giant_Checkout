import { useState } from 'react'
import * as GiantIcon from './GiantIcon'
import './CouponSection.css'

interface Props {
  onApplied: () => void
}

export default function CouponSection({ onApplied }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [code, setCode] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [redeemed, setRedeemed] = useState(false)
  const [invalid, setInvalid] = useState(false)

  const isActive = code.length > 0
  const isTyping = isActive && isFocused

  function handleApply() {
    if (code.trim().toLowerCase() === 'giant10') {
      setRedeemed(true)
      setInvalid(false)
      setCode('')
      onApplied()
    } else {
      setInvalid(true)
      setRedeemed(false)
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCode(e.target.value)
    if (invalid) setInvalid(false)
  }

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
        <div className="coupon-section__field-group">
          <div className="coupon-section__tooltip" aria-hidden="true">
            <div className="coupon-section__tooltip-box">Try "GIANT10"</div>
            <div className="coupon-section__tooltip-badge">T</div>
          </div>
          <input
            className={`coupon-section__field${redeemed ? ' coupon-section__field--success' : invalid ? ' coupon-section__field--error' : isTyping ? ' coupon-section__field--active' : ''}`}
            type="text"
            value={code}
            placeholder="Enter coupon code"
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={e => e.key === 'Enter' && handleApply()}
          />
          {redeemed && (
            <div className="coupon-section__success-msg">
              GIANT10 redeemed successfully
            </div>
          )}
          {invalid && (
            <div className="coupon-section__error-msg">
              Invalid coupon code
            </div>
          )}
        </div>
        <button
          className="coupon-section__apply"
          aria-label="Apply coupon"
          disabled={!isActive}
          onClick={handleApply}
        >
          Apply
        </button>
      </div>
    </div>
  )
}
