import * as GiantIcon from './GiantIcon'
import './InputField.css'
import './SelectField.css'

const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
  'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
  'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
  'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
  'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
  'West Virginia', 'Wisconsin', 'Wyoming',
]

interface SelectFieldProps {
  label: string
  optional?: boolean
  value: string
  onChange: (value: string) => void
  error?: boolean
}

export default function SelectField({ label, optional, value, onChange, error }: SelectFieldProps) {
  return (
    <div className={`input-field${error ? ' input-field--error' : ''}`}>
      <div className="input-field__label-row">
        <label className="input-field__label">{label}</label>
        {optional && <span className="input-field__optional">(Optional)</span>}
      </div>
      <div className="input-field__group">
        <div className="input-field__box">
          <select
            className={`input-field__select${!value ? ' input-field__select--empty' : ''}`}
            value={value}
            onChange={e => onChange(e.target.value)}
          >
            <option value="">Select state</option>
            {US_STATES.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <GiantIcon.ChevronDown16 className="input-field__chevron" aria-hidden />
        </div>
        {error && (
          <div className="input-field__error">
            <span className="input-field__error-text">{label} is mandatory, fill in this field to continue.</span>
          </div>
        )}
      </div>
    </div>
  )
}
