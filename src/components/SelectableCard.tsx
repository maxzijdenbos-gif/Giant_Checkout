import './SelectableCard.css'

interface Props {
  icon: React.ReactNode
  title: string
  subtitle?: string
  date?: string
  price: string
  selected: boolean
  onClick: () => void
  children?: React.ReactNode
}

export default function SelectableCard({ icon, title, subtitle, date, price, selected, onClick, children }: Props) {
  return (
    <button
      className={`selectable-card${selected ? ' selectable-card--selected' : ''}`}
      onClick={onClick}
    >
      <div className="selectable-card__row">
        <div className="selectable-card__icon" aria-hidden="true">
          {icon}
        </div>
        <div className="selectable-card__body">
          <div className="selectable-card__headline">
            <span className="selectable-card__title">{title}</span>
            {subtitle && <span className="selectable-card__sub">{subtitle}</span>}
          </div>
          {date && <span className="selectable-card__date">{date}</span>}
        </div>
        <div className="selectable-card__price">{price}</div>
      </div>
      {selected && children}
    </button>
  )
}
