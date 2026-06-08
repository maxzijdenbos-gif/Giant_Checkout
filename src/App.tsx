import { useState } from 'react'
import CheckoutStart from './pages/CheckoutStart'
import DeliveryInfo from './pages/DeliveryInfo'
import DeliveryOptions from './pages/DeliveryOptions'
import Payment from './pages/Payment'
import Flow2Payment from './pages/Flow2Payment'
import Flow2DeliveryInfo from './pages/Flow2DeliveryInfo'
import Flow2ShippingOptions from './pages/Flow2ShippingOptions'
import Flow2StoreConfirmation from './pages/Flow2StoreConfirmation'
import type { DeliverySelection, PrototypeFlow, AddressData } from './types'
import type { GiantDealer } from './giantDealers'

type Page = 'checkout-start' | 'delivery' | 'delivery-options' | 'payment' | 'flow2-delivery' | 'flow2-shipping' | 'flow2-store-selection'

export default function App() {
  const [page, setPage] = useState<Page>('checkout-start')
  const [deliverySelection, setDeliverySelection] = useState<DeliverySelection>('store')
  const [prototypeFlow, setPrototypeFlow] = useState<PrototypeFlow>('current-checkout')
  const [flow2DeliveryType, setFlow2DeliveryType] = useState<'delivery' | 'store'>('delivery')
  const [dealers, setDealers] = useState<GiantDealer[]>([])
  const [selectedDealer, setSelectedDealer] = useState<GiantDealer | null>(null)
  const [addressData, setAddressData] = useState<AddressData | null>(null)
  const [loggedIn, setLoggedIn] = useState(false)

  function handlePrototypeFlowChange(flow: PrototypeFlow) {
    setPrototypeFlow(flow)
    setPage('checkout-start')
    setDeliverySelection('store')
    setFlow2DeliveryType('delivery')
    setLoggedIn(false)
  }

  const prototypeSwitcherProps = {
    prototypeFlow,
    onPrototypeFlowChange: handlePrototypeFlowChange,
  }

  switch (page) {
    case 'flow2-store-selection':
      if (!selectedDealer) return null
      return (
        <Flow2StoreConfirmation
          onBack={() => { setFlow2DeliveryType('store'); setPage('flow2-delivery') }}
          onContinue={() => setPage('payment')}
          initialDealer={selectedDealer}
          allDealers={dealers}
          {...prototypeSwitcherProps}
        />
      )
    case 'flow2-delivery':
      return (
        <Flow2DeliveryInfo
          onBack={() => { setLoggedIn(false); setPage('checkout-start') }}
          onContinue={() => setPage('flow2-shipping')}
          onStoreFound={(foundDealers, closest) => {
            setDealers(foundDealers)
            setSelectedDealer(closest)
            setPage('flow2-store-selection')
          }}
          deliveryType={flow2DeliveryType}
          onDeliveryTypeChange={setFlow2DeliveryType}
          loggedIn={loggedIn}
          onLogOut={() => { setLoggedIn(false); setPage('checkout-start') }}
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
      if (prototypeFlow === 'new-checkout') {
        return (
          <Flow2Payment
            onBack={() => setPage(flow2DeliveryType === 'store' ? 'flow2-store-selection' : 'flow2-shipping')}
            deliverySelection={deliverySelection}
            selectedDealer={selectedDealer ?? undefined}
            {...prototypeSwitcherProps}
          />
        )
      }
      return (
        <Payment
          onBackToAddress={() => setPage('delivery')}
          onBackToDelivery={() => setPage('delivery-options')}
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
          addressData={addressData}
          {...prototypeSwitcherProps}
        />
      )
    case 'delivery':
      return (
        <DeliveryInfo
          onBack={() => { setLoggedIn(false); setPage('checkout-start') }}
          onContinue={(data) => { setAddressData(data); setPage('delivery-options') }}
          loggedIn={loggedIn}
          onLogOut={() => { setLoggedIn(false); setPage('checkout-start') }}
          {...prototypeSwitcherProps}
        />
      )
    default:
      return (
        <CheckoutStart
          onGuestCheckout={() => setPage(prototypeFlow === 'new-checkout' ? 'flow2-delivery' : 'delivery')}
          onLoggedInCheckout={() => {
            setLoggedIn(true)
            setPage(prototypeFlow === 'new-checkout' ? 'flow2-delivery' : 'delivery')
          }}
          {...prototypeSwitcherProps}
        />
      )
  }
}
