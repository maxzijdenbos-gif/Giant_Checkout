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
  App.tsx                  # Page switcher (state: page, deliverySelection, prototypeFlow)
  types.ts                 # DeliverySelection, PrototypeFlow, DELIVERY_OPTIONS, PROTOTYPE_FLOWS
  tokens.css               # Design tokens (colors, spacing, typography)
  assets.ts                # Image/icon exports
  pages/
    CheckoutStart.tsx      # Login vs guest choice — entry point for both flows
    DeliveryInfo.tsx        # Flow 1: address form (step 1)
    DeliveryOptions.tsx     # Flow 1: delivery method picker (step 2)
    Flow2DeliveryInfo.tsx   # Flow 2: combined delivery method + address (step 1)
    Payment.tsx             # Shared payment step (final step)
  components/
    Header.tsx              # Logo, back button, prototype flow switcher
    Footer.tsx              # Dark/light variant
    InputField.tsx          # Labelled input; supports optional, locked, error states
    OrderSummary.tsx        # Right-column cart summary
    StorePickerModal.tsx    # Modal shown when "pick up in store" is selected (Flow 2)
    PaymentIcons.tsx        # Payment method icon row
    Divider.tsx             # Horizontal rule; thick variant available
```

## Checkout flows

### Flow 1 — `current-checkout`
`CheckoutStart` → `DeliveryInfo` (address) → `DeliveryOptions` (standard / express / store) → `Payment`

### Flow 2 — `new-checkout`
`CheckoutStart` → `Flow2DeliveryInfo` (delivery toggle + address or store picker) → `Payment`

Both flows share `CheckoutStart` and `Payment`. The active flow is stored in `App.tsx` as `prototypeFlow: PrototypeFlow` and passed down via `prototypeSwitcherProps`.

## Conventions

- Each page owns its CSS file(s); component CSS lives beside the component.
- `src/tokens.css` is the single source of truth for colors, spacing, and type — use CSS variables, not hardcoded values.
- `DeliverySelection` (`'standard' | 'express' | 'store'`) and `DELIVERY_OPTIONS` in `types.ts` are the canonical delivery data.
- This is a prototype — no real API calls, no form validation beyond UI state, no auth.
