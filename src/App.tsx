import { useState } from 'react'
import CheckoutStart from './pages/CheckoutStart'
import DeliveryInfo from './pages/DeliveryInfo'
import DeliveryOptions from './pages/DeliveryOptions'
import Payment from './pages/Payment'
import type { DeliverySelection } from './types'

type Page = 'checkout-start' | 'delivery' | 'delivery-options' | 'payment'

export default function App() {
  const [page, setPage] = useState<Page>('checkout-start')
  const [deliverySelection, setDeliverySelection] = useState<DeliverySelection>('store')

  switch (page) {
    case 'payment':
      return (
        <Payment
          onBackToAddress={() => setPage('delivery')}
          onBackToDelivery={() => setPage('delivery-options')}
          deliverySelection={deliverySelection}
        />
      )
    case 'delivery-options':
      return (
        <DeliveryOptions
          onBack={() => setPage('delivery')}
          onContinue={() => setPage('payment')}
          deliverySelection={deliverySelection}
          onDeliveryChange={setDeliverySelection}
        />
      )
    case 'delivery':
      return (
        <DeliveryInfo
          onBack={() => setPage('checkout-start')}
          onContinue={() => setPage('delivery-options')}
        />
      )
    default:
      return <CheckoutStart onGuestCheckout={() => setPage('delivery')} />
  }
}
