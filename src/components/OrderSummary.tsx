import { imgProductPropel, imgProductAnthem, imgProductAurea, imgProductRevolt } from '../assets'
import * as GiantIcon from './GiantIcon'
import Divider from './Divider'
import { DELIVERY_OPTIONS } from '../types'
import type { DeliverySelection } from '../types'
import './OrderSummary.css'

interface Props {
  deliverySelection?: DeliverySelection
}

const PRODUCTS = [
  { img: imgProductPropel, name: 'Propel Advanced SL-FF Team', price: '$5,300.00', meta: 'Size L' },
  { img: imgProductAnthem, name: 'Anthem Advanced SL Frameset', price: '$999',      meta: 'Electrical Storm | L' },
  { img: imgProductAurea,  name: 'Aurea',                       price: '$200,00',   meta: 'Yellow / Silver Lens', salePrice: '$220,00' },
  { img: imgProductRevolt, name: 'Revolt Advanced 0',           price: '$3,950.00', meta: 'Snow Drift | L' },
]

const BASE_TOTAL = 15655 // 14350 + 1100 + 225 - 20

function formatEuro(amount: number): string {
  const [int, dec] = amount.toFixed(2).split('.')
  const intFormatted = int.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return `$${intFormatted},${dec}`
}

function InfoIcon() {
  return (
    <span className="info-icon">
      <GiantIcon.Info16 aria-hidden style={{ display: 'block' }} />
    </span>
  )
}

function TagIcon() {
  return (
    <span className="icon icon--md" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <GiantIcon.Tag24 aria-hidden />
    </span>
  )
}

export default function OrderSummary({ deliverySelection = 'store' }: Props) {
  const delivery = DELIVERY_OPTIONS[deliverySelection]
  const deliveryValueLabel = delivery.price === 0 ? 'Free' : formatEuro(delivery.price)
  const total = BASE_TOTAL + delivery.price
  const totalFormatted = formatEuro(total)

  const lineItems = [
    { label: '4 items',         value: '$14.350,00', cls: '' },
    { label: 'Sales tax',       value: '$1,100',     cls: '' },
    { label: 'Destination fee', value: '$225,00',    cls: '', tooltip: true },
    { label: 'Delivery',        value: deliveryValueLabel, cls: '' },
    { label: 'Total savings',   value: '- $20,00',   cls: 'order-summary__line-value--savings', savings: true },
  ]

  return (
    <div className="order-summary">

      {/* Header */}
      <div className="order-summary__header">
        <h2 className="order-summary__title">Your order</h2>
        <button className="order-summary__edit">Edit</button>
      </div>

      <Divider />

      {/* Line items */}
      <div className="order-summary__lines">
        {lineItems.map(item => (
          <div key={item.label} className={`order-summary__line${item.savings ? ' order-summary__line--savings' : ''}`}>
            <span className="order-summary__line-label">
              {item.label}
              {item.tooltip && <InfoIcon />}
            </span>
            <span className={`order-summary__line-value${item.cls ? ' ' + item.cls : ''}`}>
              {item.value}
            </span>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="order-summary__total">
        <span>Total</span>
        <span>{totalFormatted}</span>
      </div>

      {/* Coupon */}
      <button className="order-summary__coupon">
        <span className="order-summary__coupon-left">
          <TagIcon />
          <span className="order-summary__coupon-label">Add coupon</span>
        </span>
        <span className="icon icon--md" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <GiantIcon.ChevronDown24 aria-hidden />
        </span>
      </button>

      <Divider />

      {/* Product list */}
      <div className="order-summary__products">
        {PRODUCTS.map(p => (
          <div key={p.name} className="product-tile">
            <div className="product-tile__image">
              <img src={p.img} alt={p.name} />
            </div>
            <div className="product-tile__info">
              <div className="product-tile__name">{p.name}</div>
              <div className="product-tile__price">
                {p.salePrice
                  ? <><span className="product-tile__price--sale">{p.price}</span>{' '}<span className="product-tile__price--original">{p.salePrice}</span></>
                  : p.price
                }
              </div>
              <div className="product-tile__meta">{p.meta}</div>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
