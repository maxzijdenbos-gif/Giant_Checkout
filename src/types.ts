export type DeliverySelection = 'standard' | 'express' | 'home-setup' | 'store'
export type PrototypeFlow = 'current-checkout' | 'new-checkout'

export type AddressData = {
  firstName: string
  prefix: string
  lastName: string
  phone: string
  address: string
  apt: string
  city: string
  state: string
  zip: string
  company: string
}

export const DELIVERY_OPTIONS = {
  standard:     { name: 'Standard delivery', date: 'Friday, May 8',  price: 4.99,  priceLabel: '$4.99'  },
  express:      { name: 'Express delivery',  date: 'Friday, May 4',  price: 12.99, priceLabel: '$12.99' },
  'home-setup': { name: 'Home setup',        date: '',               price: 19.99, priceLabel: '$19.99' },
  store:        { name: 'Pick up in store',  date: '',               price: 0,     priceLabel: 'Free'   },
} as const

export const PROTOTYPE_FLOWS: Array<{ id: PrototypeFlow; label: string }> = [
  { id: 'current-checkout', label: 'Regular flow' },
  { id: 'new-checkout',     label: 'Compact flow canceled' },
]
