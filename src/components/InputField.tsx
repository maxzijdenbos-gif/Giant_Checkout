import { useState } from 'react'
import './InputField.css'

interface InputFieldProps {
  label: string
  type?: string
  locked?: boolean
  dropdown?: boolean
  defaultValue?: string
}

export default function InputField({ label, type = 'text', locked, dropdown, defaultValue }: InputFieldProps) {
  const [value, setValue] = useState(defaultValue ?? '')

  return (
    <div className={`input-field${value ? ' input-field--filled' : ''}${locked ? ' input-field--locked' : ''}`}>
      <label className="input-field__label">{label}</label>
      {dropdown ? (
        <select className="input-field__select" disabled={locked}>
          <option value="" />
        </select>
      ) : (
        <input
          className="input-field__input"
          type={type}
          value={value}
          disabled={locked}
          onChange={e => setValue(e.target.value)}
        />
      )}
    </div>
  )
}
