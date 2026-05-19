import { useState } from 'react'
import CheckoutStart from './pages/CheckoutStart'
import DeliveryInfo from './pages/DeliveryInfo'
import DeliveryOptions from './pages/DeliveryOptions'
import Payment from './pages/Payment'
import Flow2DeliveryInfo from './pages/Flow2DeliveryInfo'
import Flow2ShippingOptions from './pages/Flow2ShippingOptions'
import type { DeliverySelection } from './types'
import type { PrototypeFlow } from './types'

type Page = 'checkout-start' | 'delivery' | 'delivery-options' | 'payment' | 'flow2-delivery' | 'flow2-shipping'

export default function App() {
  const [page, setPage] = useState<Page>('checkout-start')
  const [deliverySelection, setDeliverySelection] = useState<DeliverySelection>('store')
  const [prototypeFlow, setPrototypeFlow] = useState<PrototypeFlow>('current-checkout')

  function handlePrototypeFlowChange(flow: PrototypeFlow) {
    setPrototypeFlow(flow)
    setPage('checkout-start')
    setDeliverySelection('store')
  }

  const prototypeSwitcherProps = {
    prototypeFlow,
    onPrototypeFlowChange: handlePrototypeFlowChange,
  }

  switch (page) {
    case 'flow2-delivery':
      return (
        <Flow2DeliveryInfo
          onBack={() => setPage('checkout-start')}
          onContinue={() => setPage('flow2-shipping')}
          onContinueToPayment={() => setPage('payment')}
          {...prototypeSwitcherProps}
        />
      )
    case 'flow2-shipping':
      return (
        <Flow2ShippingOptions
          onBack={() => setPage('flow2-delivery')}
          onContinue={() => setPage('payment')}
          deliverySelection={deliverySelection}
          onDeliveryChange={setDeliverySelection}
          {...prototypeSwitcherProps}
        />
      )
    case 'payment':
      return (
        <Payment
          onBackToAddress={() => setPage(prototypeFlow === 'new-checkout' ? 'flow2-delivery' : 'delivery')}
          onBackToDelivery={() => setPage(prototypeFlow === 'new-checkout' ? 'flow2-shipping' : 'delivery-options')}
          deliverySelection={deliverySelection}
          {...prototypeSwitcherProps}
        />
      )
    case 'delivery-options':
      return (
        <DeliveryOptions
          onBack={() => setPage('delivery')}
          onContinue={() => setPage('payment')}
          deliverySelection={deliverySelection}
          onDeliveryChange={setDeliverySelection}
          {...prototypeSwitcherProps}
        />
      )
    case 'delivery':
      return (
        <DeliveryInfo
          onBack={() => setPage('checkout-start')}
          onContinue={() => setPage('delivery-options')}
          {...prototypeSwitcherProps}
        />
      )
    default:
      return (
        <CheckoutStart
          onGuestCheckout={() => setPage(prototypeFlow === 'new-checkout' ? 'flow2-delivery' : 'delivery')}
          {...prototypeSwitcherProps}
        />
      )
  }
}
