import Header from '../components/Header'
import Footer from '../components/Footer'
import Divider from '../components/Divider'
import InputField from '../components/InputField'
import OrderSummary from '../components/OrderSummary'
import type { PrototypeFlow } from '../types'
import './DeliveryInfo.css'

interface Props {
  onBack: () => void
  onContinue: () => void
  prototypeFlow: PrototypeFlow
  onPrototypeFlowChange: (flow: PrototypeFlow) => void
}

export default function DeliveryInfo({ onBack, onContinue, prototypeFlow, onPrototypeFlowChange }: Props) {
  return (
    <div className="page">
      <Header onBack={onBack} prototypeFlow={prototypeFlow} onPrototypeFlowChange={onPrototypeFlowChange} />

      <div className="delivery-layout">

        {/* ── Left: form ───────────────────────────────────── */}
        <div className="delivery-left">
          <div className="delivery-left__inner">

            {/* Address section */}
            <section className="checkout-step checkout-step--active">
              <h2 className="checkout-step__heading">Address</h2>
              <div className="form-grid">
                <div className="form-row">
                  <InputField label="First name" />
                  <InputField label="Last name" />
                </div>
                <div className="form-row">
                  <InputField label="Phone number" type="tel" />
                  <InputField label="Email" type="email" />
                </div>
                <div className="form-row">
                  <InputField label="Address" />
                  <InputField label="Apt / Suite (optional)" />
                </div>
                <div className="form-row">
                  <InputField label="Company name (optional)" />
                  <InputField label="City" />
                </div>
                <div className="form-col">
                  <div className="form-row">
                    <InputField label="State" dropdown />
                    <InputField label="Zip code" />
                  </div>
                  <p className="form-note">
                    Note: orders can only ship to addresses in the Continental United States. At this time we are unable to ship to Alaska, Hawaii, or Puerto Rico. We are also unable to ship to APO/FPO/DPO, PMB or PO Box addresses.
                  </p>
                </div>
                <div className="form-row">
                  <InputField label="Country" locked defaultValue="United States" />
                  <div className="form-spacer" />
                </div>
              </div>
              <button className="btn-save-continue" onClick={onContinue}>Save and continue</button>
            </section>

            {/* Delivery options — collapsed */}
            <section className="checkout-step checkout-step--collapsed">
              <Divider thick />
              <h2 className="checkout-step__heading">Delivery options</h2>
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
          <OrderSummary />
        </div>

      </div>

      <Footer variant="dark" />
    </div>
  )
}
