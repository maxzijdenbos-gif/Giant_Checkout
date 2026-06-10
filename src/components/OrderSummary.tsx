import { useState } from 'react'
import ReturnPolicyModal from './ReturnPolicyModal'
import {
  imgPurpleBikeBig, imgPurpleBikeSmall,
  imgBlueBikeBig,   imgBlueBikeSmall,
  imgGlassesBig,    imgGlassesSmall,
  imgWhiteBikeBig,  imgWhiteBikeSmall,
} from '../assets'
import * as GiantIcon from './GiantIcon'
import Divider from './Divider'
import CouponSection from './CouponSection'
import { DELIVERY_OPTIONS } from '../types'
import type { DeliverySelection } from '../types'
import './OrderSummary.css'

interface Props {
  deliverySelection?: DeliverySelection
}

const PRODUCTS = [
  { imgBig: imgPurpleBikeBig, imgSmall: imgPurpleBikeSmall, name: 'Propel Advanced SL-FF Team', price: '$5,300.00', meta: 'Size L' },
  { imgBig: imgBlueBikeBig,   imgSmall: imgBlueBikeSmall,   name: 'Anthem Advanced SL Frameset', price: '$999',      meta: 'Electrical Storm | L' },
  { imgBig: imgGlassesBig,    imgSmall: imgGlassesSmall,    name: 'Aurea',                       price: '$200,00',   meta: 'Yellow / Silver Lens', salePrice: '$220,00' },
  { imgBig: imgWhiteBikeBig,  imgSmall: imgWhiteBikeSmall,  name: 'Revolt Advanced 0',           price: '$3,950.00', meta: 'Snow Drift | L' },
]

const ITEMS_SUBTOTAL = 15675 // 14350 + 1100 + 225
const BUNDLE_DISCOUNT = 20
const COUPON_RATE = 0.10

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

export default function OrderSummary({ deliverySelection = 'store' }: Props) {
  const [itemsExpanded, setItemsExpanded] = useState(false)
  const [couponApplied, setCouponApplied] = useState(false)
  const [showReturnModal, setShowReturnModal] = useState(false)

  const delivery = DELIVERY_OPTIONS[deliverySelection]
  const deliveryValueLabel = delivery.price === 0 ? 'Free' : formatEuro(delivery.price)
  const couponDiscount = couponApplied ? Math.round(ITEMS_SUBTOTAL * COUPON_RATE * 100) / 100 : 0
  const totalSavings = BUNDLE_DISCOUNT + couponDiscount
  const total = ITEMS_SUBTOTAL - totalSavings + delivery.price
  const totalFormatted = formatEuro(total)

  const lineItems = [
    { label: '4 items',              value: '$14.350,00',                    cls: '' },
    { label: 'Sales tax',            value: '$1.100,00',                     cls: '' },
    { label: 'Destination fee',      value: '$225,00',                       cls: '', tooltip: true },
    ...(couponApplied ? [{ label: 'GIANT10', value: `- ${formatEuro(couponDiscount)}`, cls: 'order-summary__line-value--savings', savings: true }] : []),
    { label: 'Delivery estimation',  value: deliveryValueLabel,              cls: '' },
    { label: 'Total savings',        value: `- ${formatEuro(totalSavings)}`, cls: 'order-summary__line-value--savings', savings: true },
  ]

  return (
    <div className="order-summary">

      {/* Header */}
      <div className="order-summary__header">
        <h2 className="order-summary__title">Order summary</h2>
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
      <CouponSection onApplied={() => setCouponApplied(true)} />

      <Divider />

      {/* Your items — collapsible on mobile, always open on desktop */}
      <div className={`order-summary__items-section${itemsExpanded ? ' order-summary__items-section--open' : ''}`}>
        <button
          className="order-summary__items-toggle"
          onClick={() => setItemsExpanded(e => !e)}
          aria-expanded={itemsExpanded}
        >
          <span className="order-summary__items-heading">Your items</span>
          <span className="order-summary__items-chevron" aria-hidden>
            <GiantIcon.ChevronDown24 className={itemsExpanded ? 'order-summary__chevron--up' : undefined} aria-hidden />
          </span>
        </button>

        <div className="order-summary__mini-thumbs">
          {PRODUCTS.map(p => (
            <div key={p.name} className="order-summary__mini-thumb">
              <img src={p.imgSmall} alt={p.name} />
            </div>
          ))}
          <div className="order-summary__mini-fade" aria-hidden />
        </div>

        <div className="order-summary__products">
          {PRODUCTS.map(p => (
            <div key={p.name} className="product-tile">
              <div className="product-tile__image">
                <img src={p.imgBig} alt={p.name} />
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

      <Divider />

      {/* Return policy USP */}
      <button className="order-summary__usp" onClick={() => setShowReturnModal(true)}>
        <GiantIcon.ReturnProduct32 aria-hidden />
        <div className="order-summary__usp-content">
          <p className="order-summary__usp-title">Right to return</p>
          <p className="order-summary__usp-body">You have 14 days to change your mind</p>
        </div>
      </button>

      {showReturnModal && (
        <ReturnPolicyModal onClose={() => setShowReturnModal(false)} />
      )}

    </div>
  )
}
