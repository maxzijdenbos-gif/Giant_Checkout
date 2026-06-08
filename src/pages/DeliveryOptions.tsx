import { useState, useEffect, useRef } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Divider from '../components/Divider'
import OrderSummary from '../components/OrderSummary'
import SelectableCard from '../components/SelectableCard'
import * as GiantIcon from '../components/GiantIcon'
import type { DeliverySelection, PrototypeFlow, AddressData } from '../types'
import './DeliveryOptions.css'

interface Props {
  onBack: () => void
  onContinue: () => void
  deliverySelection: DeliverySelection
  onDeliveryChange: (s: DeliverySelection) => void
  addressData: AddressData | null
  prototypeFlow: PrototypeFlow
  onPrototypeFlowChange: (flow: PrototypeFlow) => void
}

export default function DeliveryOptions({
  onBack,
  onContinue,
  deliverySelection,
  onDeliveryChange,
  addressData,
  prototypeFlow,
  onPrototypeFlowChange,
}: Props) {
  const fullName = addressData
    ? [addressData.firstName, addressData.prefix, addressData.lastName].filter(Boolean).join(' ')
    : ''
  const addressLine1 = addressData
    ? [addressData.address, addressData.apt].filter(Boolean).join(', ')
    : ''
  const addressLine2 = addressData
    ? [addressData.city, addressData.state, addressData.zip].filter(Boolean).join(', ')
    : ''

  const loadedCards = useRef<Set<DeliverySelection>>(new Set())
  const [subcardLoading, setSubcardLoading] = useState(false)

  useEffect(() => {
    if (deliverySelection === 'home-setup' || deliverySelection === 'store') {
      if (loadedCards.current.has(deliverySelection)) {
        setSubcardLoading(false)
        return
      }
      setSubcardLoading(true)
      const t = setTimeout(() => {
        loadedCards.current.add(deliverySelection)
        setSubcardLoading(false)
      }, 2000)
      return () => clearTimeout(t)
    } else {
      setSubcardLoading(false)
    }
  }, [deliverySelection])

  const storeSubcard = (
    subcardLoading
      ? <div className="subcard-skeleton" />
      : (
        <div className="store-subcard">
          <div className="store-subcard__header">
            <p className="store-subcard__name">Giant Store New York</p>
            <p className="store-subcard__description">Is the closest store with your items available</p>
          </div>
          <p className="store-subcard__date">Pick up from Thursday, May 7</p>
          <div className="store-subcard__address">
            <p>Giant Store New York, New York City</p>
            <p>317 Grand St</p>
            <p>(98.7 mi.)</p>
          </div>
          <div className="store-subcard__actions">
            <button className="store-subcard__btn" onClick={e => e.stopPropagation()}>
              Show opening hours
            </button>
            <button className="store-subcard__btn" onClick={e => e.stopPropagation()}>
              Change store
            </button>
          </div>
        </div>
      )
  )

  return (
    <div className="page">
      <Header onBack={onBack} prototypeFlow={prototypeFlow} onPrototypeFlowChange={onPrototypeFlowChange} />

      <div className="delivery-layout">

        {/* ── Left panel ──────────────────────────────── */}
        <div className="delivery-left">
          <div className="delivery-left__inner">

            {/* Address step — collapsed / complete */}
            <button
              className="collapsed-step"
              onClick={onBack}
              aria-label="Go back to address"
            >
              <div className="collapsed-step__header">
                <h2 className="checkout-step__heading">Address</h2>
                <GiantIcon.Edit24 className="collapsed-step__edit-icon" aria-hidden />
              </div>
              <div className="address-summary">
                <p className="address-summary__section-title">Delivery address</p>
                <div className="address-summary__lines">
                  {fullName && <p>{fullName}</p>}
                  {addressLine1 && <p>{addressLine1}</p>}
                  {addressLine2 && <p>{addressLine2}</p>}
                  {addressData?.phone && <p>{addressData.phone}</p>}
                </div>
              </div>
              <Divider thick />
            </button>

            {/* Delivery options — active */}
            <section className="checkout-step">
              <h2 className="checkout-step__heading">Delivery options</h2>

              <div className="delivery-cards">
                <p className="delivery-cards__label">Choose a delivery option</p>

                <SelectableCard
                  icon={<GiantIcon.Delivery32 aria-hidden />}
                  title="Standard delivery"
                  date="Friday, May 8"
                  price="$4.99"
                  selected={deliverySelection === 'standard'}
                  onClick={() => onDeliveryChange('standard')}
                />

                <SelectableCard
                  icon={<GiantIcon.Delivery32 aria-hidden />}
                  title="Express delivery"
                  date="Friday, May 4"
                  price="$12.99"
                  selected={deliverySelection === 'express'}
                  onClick={() => onDeliveryChange('express')}
                />

                <SelectableCard
                  icon={<GiantIcon.Home32 aria-hidden />}
                  title="Home setup"
                  subtitle="Home setup is available at select stores in your area"
                  price="$19.99"
                  selected={deliverySelection === 'home-setup'}
                  onClick={() => onDeliveryChange('home-setup')}
                >
                  {storeSubcard}
                </SelectableCard>

                <SelectableCard
                  icon={<GiantIcon.Store32 aria-hidden />}
                  title="Pick up in store"
                  subtitle="Pick up is available at select stores in your country"
                  price="Free"
                  selected={deliverySelection === 'store'}
                  onClick={() => onDeliveryChange('store')}
                >
                  {storeSubcard}
                </SelectableCard>
              </div>

              <button className="btn-save-continue" onClick={onContinue}>
                Continue to payment
              </button>
            </section>

            {/* Payment — collapsed */}
            <section className="checkout-step checkout-step--collapsed">
              <Divider thick />
              <h2 className="checkout-step__heading">Payment</h2>
            </section>

          </div>
        </div>

        {/* ── Right panel ─────────────────────────────── */}
        <div className="delivery-right">
          <OrderSummary deliverySelection={deliverySelection} />
        </div>

      </div>

      <Footer variant="dark" />
    </div>
  )
}
