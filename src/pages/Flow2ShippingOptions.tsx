import Header from '../components/Header'
import Footer from '../components/Footer'
import Divider from '../components/Divider'
import OrderSummary from '../components/OrderSummary'
import * as GiantIcon from '../components/GiantIcon'
import type { DeliverySelection, PrototypeFlow } from '../types'
import { DELIVERY_OPTIONS } from '../types'
import './DeliveryOptions.css'
import './Flow2DeliveryInfo.css'
import './Flow2ShippingOptions.css'

interface Props {
  onBack: () => void
  onContinue: () => void
  deliverySelection: DeliverySelection
  onDeliveryChange: (s: DeliverySelection) => void
  prototypeFlow: PrototypeFlow
  onPrototypeFlowChange: (flow: PrototypeFlow) => void
}

export default function Flow2ShippingOptions({
  onBack,
  onContinue,
  deliverySelection,
  onDeliveryChange,
  prototypeFlow,
  onPrototypeFlowChange,
}: Props) {
  const canContinue = deliverySelection === 'standard' || deliverySelection === 'express'

  return (
    <div className="page">
      <Header onBack={onBack} prototypeFlow={prototypeFlow} onPrototypeFlowChange={onPrototypeFlowChange} />

      <div className="delivery-layout">

        {/* ── Left: form ───────────────────────────────────── */}
        <div className="delivery-left">
          <div className="delivery-left__inner">

            <section className="checkout-step checkout-step--active">
              <h2 className="checkout-step__heading">Delivery options</h2>

              {/* Delivery method toggle — delivery selected, store coming later */}
              <div className="checkout-section">
                <h3 className="delivery-section-title">Choose delivery method</h3>
                <div className="delivery-type-toggle">
                  <div className="delivery-type-toggle__option delivery-type-toggle__option--selected">
                    <div className="delivery-type-toggle__icon-wrap">
                      <GiantIcon.Delivery32 aria-hidden />
                    </div>
                    <span className="delivery-type-toggle__label">Delivery</span>
                  </div>
                  <div className="delivery-type-toggle__option">
                    <div className="delivery-type-toggle__icon-wrap">
                      <GiantIcon.Store32 aria-hidden />
                    </div>
                    <span className="delivery-type-toggle__label">Pick up in store</span>
                  </div>
                </div>
              </div>

              {/* Address summary card — entire card is clickable to go back and edit */}
              <div className="checkout-section">
                <button className="selectable-card selectable-card--selected address-review-card" onClick={onBack}>
                  <div className="selectable-card__body">
                    <div className="selectable-card__title">Address</div>
                    <div className="address-review-card__lines">
                      <p>John Doe</p>
                      <p>Oostelijke Handelskade 751</p>
                      <p>1019 BW Amsterdam</p>
                      <p>Nederland</p>
                      <p>test@gmail.com</p>
                      <p>0612345678</p>
                      <br />
                      <p className="address-review-card__billing-label">Billing address</p>
                      <p>John Doe</p>
                      <p>Van Zandvlietplein 1</p>
                      <p>3007 AP Rotterdam</p>
                      <p>Nederland</p>
                      <p>test@gmail.com</p>
                      <p>0612345678</p>
                    </div>
                  </div>
                  <span className="address-review-card__edit" aria-hidden="true">Edit</span>
                </button>
              </div>

              {/* Shipping option cards */}
              <div className="checkout-section">
                <h3 className="delivery-section-title">Select shipping option</h3>
                <div className="delivery-cards">
                  <button
                    className={`selectable-card${deliverySelection === 'standard' ? ' selectable-card--selected' : ''}`}
                    onClick={() => onDeliveryChange('standard')}
                  >
                    <div className="selectable-card__icon">
                      <div className="selectable-card__icon-wrap">
                        <GiantIcon.Delivery32 aria-hidden />
                      </div>
                    </div>
                    <div className="selectable-card__body">
                      <div className="selectable-card__title">{DELIVERY_OPTIONS.standard.name}</div>
                      <div className="selectable-card__subtitle">{DELIVERY_OPTIONS.standard.date}</div>
                    </div>
                    <div className="selectable-card__price">{DELIVERY_OPTIONS.standard.priceLabel}</div>
                  </button>

                  <button
                    className={`selectable-card${deliverySelection === 'express' ? ' selectable-card--selected' : ''}`}
                    onClick={() => onDeliveryChange('express')}
                  >
                    <div className="selectable-card__icon">
                      <div className="selectable-card__icon-wrap">
                        <GiantIcon.Delivery32 aria-hidden />
                      </div>
                    </div>
                    <div className="selectable-card__body">
                      <div className="selectable-card__title">{DELIVERY_OPTIONS.express.name}</div>
                      <div className="selectable-card__subtitle">{DELIVERY_OPTIONS.express.date}</div>
                    </div>
                    <div className="selectable-card__price">{DELIVERY_OPTIONS.express.priceLabel}</div>
                  </button>
                </div>
              </div>

              <button className="btn-save-continue" onClick={onContinue} disabled={!canContinue}>
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

        {/* ── Right: order summary ──────────────────────────── */}
        <div className="delivery-right">
          <OrderSummary deliverySelection={deliverySelection} />
        </div>

      </div>

      <Footer variant="dark" />
    </div>
  )
}
