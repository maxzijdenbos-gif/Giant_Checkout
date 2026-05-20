# Giant Checkout

A clickable prototype for Giant Bicycles' checkout redesign. Two flows are implemented side-by-side and switchable via a prototype switcher in the header.

## Stack

- React 19, TypeScript, Vite
- Plain CSS with design tokens (`src/tokens.css`)
- No routing library — page state managed manually in `App.tsx`
- No external UI libraries; no state management library

## Dev

```bash
pnpm install --ignore-scripts
pnpm dev       # http://localhost:5173
pnpm build
```

## Project structure

```
src/
  App.tsx                       # Page switcher (state: page, deliverySelection, prototypeFlow)
  types.ts                      # DeliverySelection, PrototypeFlow, DELIVERY_OPTIONS, PROTOTYPE_FLOWS
  index.css                     # Global styles incl. shared .btn, .btn--primary, .btn--outline
  tokens.css                    # Design tokens (colors, spacing, typography)
  assets.ts                     # Image/icon exports
  pages/
    CheckoutStart.tsx           # Login vs guest choice — entry point for both flows
    DeliveryInfo.tsx            # Flow 1: address form (step 1)
    DeliveryOptions.tsx         # Flow 1: delivery method picker (step 2)
    Flow2DeliveryInfo.tsx       # Flow 2: delivery toggle + address form or inline store search (step 1)
    Flow2StoreConfirmation.tsx  # Flow 2: selected store card + newsletter + continue to payment
    Payment.tsx                 # Shared payment step (final step)
  components/
    Header.tsx                  # Logo, back button, prototype flow switcher
    Footer.tsx                  # Dark/light variant
    InputField.tsx              # Labelled input; supports optional, locked, error, dropdown states
    SelectField.tsx             # Labelled select
    LocationSearchField.tsx     # Address/city/postcode search with filtered dropdown suggestions
    OrderSummary.tsx            # Right-column cart summary
    StorePickerModal.tsx        # Modal for selecting a store; exports STORES array and Store type
    PaymentIcons.tsx            # Payment method icon row
    Divider.tsx                 # Horizontal rule; thick variant available
```

## Checkout flows

### Flow 1 — `current-checkout`
`CheckoutStart` → `DeliveryInfo` → `DeliveryOptions` → `Payment`

### Flow 2 — `new-checkout`
`CheckoutStart` → `Flow2DeliveryInfo` → `Flow2StoreConfirmation` (store only) or `Flow2ShippingOptions` (delivery) → `Payment`

`Flow2DeliveryInfo` shows a delivery/store toggle. Delivery: address form + billing checkbox. Store: inline `LocationSearchField` (50% width); continue button ("Find store") disabled until a location is selected. Clicking "Find store" goes to `Flow2StoreConfirmation`.

`Flow2StoreConfirmation` shows the selected store card with a "Change" button that opens `StorePickerModal`. Continuing goes to `Payment`.

## Components — notes

- **`.btn` / `.btn--primary` / `.btn--outline`**: defined in `index.css`, shared across all pages.
- **`LocationSearchField`**: props are `label`, `placeholder?`, `suggestions: LocationSuggestion[]`, `onSelect`. Dropdown filters by label match; selecting closes it. `LocationSuggestion = { label: string; sublabel: string }`.
- **`StorePickerModal`**: exports `STORES` (3 NYC stores) and `Store` interface so `Flow2StoreConfirmation` can reference them without duplicating data.
- **Autofill button** (`Flow2DeliveryInfo`): fixed-position, floating `@keyframes float-infinity` animation (∞ path), yellow `#ffca05` 19×19 badge with "T". Visible on the delivery step only. Clicking fills the address form with test data.

## Conventions

- Each page owns its CSS file(s); component CSS lives beside the component.
- `src/tokens.css` is the single source of truth for colors, spacing, and type — use CSS variables, not hardcoded values.
- `DeliverySelection` (`'standard' | 'express' | 'store'`) and `DELIVERY_OPTIONS` in `types.ts` are the canonical delivery data.
- This is a prototype — no real API calls, no form validation beyond UI state, no auth.
