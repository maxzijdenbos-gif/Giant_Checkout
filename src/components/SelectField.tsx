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

export const COUNTRIES = [
  'Argentina',
  'Australia',
  'België | Belgique (Français)',
  'Bosna i Hercegovina',
  'Bulgaria',
  'Cambodia',
  'Canada | Canada (Français)',
  'Česká republika',
  'Chile',
  'China - Hong Kong',
  'China 中国大陆',
  'Colombia',
  'Costa Rica',
  'Danmark',
  'Deutschland / Österreich',
  'Ecuador',
  'España',
  'Estonia / Latvija / Lietuva',
  'France',
  'Hrvatska',
  'Iceland',
  'India',
  'Indonesia',
  'Ireland',
  'Israel',
  'Italia',
  'Japan 日本',
  'Magyarország',
  'Malaysia',
  'Mexico',
  'Moldova',
  'Nederland',
  'New Zealand',
  'Norge',
  'Österreich',
  'Peru',
  'Polska',
  'Portugal',
  'Romania',
  'Schweiz | Suisse (Français)',
  'Singapore',
  'Slovenija',
  'Slovenská republika',
  'South Africa',
  'South Korea 대한민국',
  'Suomi',
  'Sverige',
  'Taiwan 臺灣',
  'Thailand ประเทศไทย',
  'Türkiye',
  'UAE',
  'United Kingdom',
  'United States',
  'Vietnam',
  'Ελλάδα',
  'Україна',
]

interface SelectFieldProps {
  label: string
  optional?: boolean
  value: string
  onChange: (value: string) => void
  error?: boolean
  options?: string[]
  placeholder?: string
  prefilled?: boolean
}

export default function SelectField({ label, optional, value, onChange, error, options = US_STATES, placeholder = 'Select state', prefilled }: SelectFieldProps) {
  return (
    <div className={`input-field${prefilled ? ' input-field--locked' : ''}${error ? ' input-field--error' : ''}`}>
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
            disabled={prefilled}
          >
            <option value="">{placeholder}</option>
            {options.map(s => (
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
