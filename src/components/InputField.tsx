import { useState } from 'react'
import './InputField.css'

interface InputFieldProps {
  label: string
  optional?: boolean
  type?: string
  locked?: boolean
  placeholder?: string
  defaultValue?: string
}

export default function InputField({ label, optional, type = 'text', locked, placeholder, defaultValue }: InputFieldProps) {
  const [value, setValue] = useState(defaultValue ?? '')
  const [touched, setTouched] = useState(false)

  const hasError = !optional && !locked && touched && value.trim() === ''

  return (
    <div className={`input-field${locked ? ' input-field--locked' : ''}${hasError ? ' input-field--error' : ''}`}>
      <div className="input-field__label-row">
        <label className="input-field__label">{label}</label>
        {optional && <span className="input-field__optional">(Optional)</span>}
      </div>
      <div className="input-field__group">
        <div className="input-field__box">
          <input
            className="input-field__input"
            type={type}
            value={value}
            disabled={locked}
            placeholder={placeholder}
            onChange={e => setValue(e.target.value)}
            onBlur={() => setTouched(true)}
          />
          {locked && (
            <svg className="input-field__lock" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <rect x="4" y="11" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="12" cy="17" r="1.5" fill="currentColor"/>
            </svg>
          )}
        </div>
        {hasError && (
          <div className="input-field__error">
            <span className="input-field__error-text">Error message</span>
          </div>
        )}
      </div>
    </div>
  )
}
