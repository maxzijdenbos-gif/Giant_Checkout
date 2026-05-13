export type DeliverySelection = 'standard' | 'express' | 'store'

export const DELIVERY_OPTIONS = {
  standard: { name: 'Standard delivery',     date: 'Friday, May 8',              price: 4.99, priceLabel: '$4.99' },
  express:  { name: 'Express delivery',      date: 'Thursday, May 7',            price: 7.99, priceLabel: '$7.99' },
  store:    { name: 'Giant Store New York',  date: 'Pick up from Thursday, May 7', price: 0,   priceLabel: 'Free'  },
} as const
