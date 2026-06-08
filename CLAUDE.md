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

## Icons — IMPORTANT

**All UI icons must come from `src/components/GiantIcon.tsx`.** Do not create custom SVGs for icons.

The source SVGs live in `Giant_Icons/Icons/<Name>/<size>.svg` (at the project root) and are mirrored into `src/icons/` for Vite bundling. The icon components in `GiantIcon.tsx` inline the SVG paths and expose them as React components with a `size` prop and `currentColor` support.

### Available icons

| Export | Size | Usage |
|--------|------|-------|
| `ArrowLeft16` | 16 | (unused — replaced by ChevronLeft16) |
| `ArrowRight16` | 16 | Continue / place order buttons |
| `ArrowRight24` | 24 | Large continue buttons |
| `Check16` | 16 | Checkboxes, benefits list |
| `Check24` | 24 | Large checkmarks |
| `ChevronDown16` | 16 | Select dropdowns |
| `ChevronDown24` | 24 | Coupon expand in OrderSummary |
| `ChevronLeft16` | 16 | Back navigation (Header) |
| `ChevronRight16` | 16 | Payment option rows |
| `ChevronRight24` | 24 | Coupon submit button |
| `Close16` | 16 | Modal close, clear input |
| `Close24` | 24 | Larger close buttons |
| `Comment24` | 24 | Customer support link in Header |
| `Delivery32` | 32 | Delivery method toggle + cards |
| `ReturnProduct32` | 32 | Return policy USP in OrderSummary |
| `Edit16` | 16 | Small edit buttons |
| `Edit24` | 24 | Collapsed-step edit button |
| `Info16` | 16 | Tooltip / info indicator |
| `Location16` | 16 | Location pin (search field, modal) |
| `Location24` | 24 | Larger location pin |
| `Lock24` | 24 | Locked input field, Stripe Link |
| `Search16` | 16 | Store picker modal search |
| `Store24` | 24 | Store cards in modal |
| `Store32` | 32 | Delivery method toggle |
| `Tag24` | 24 | Coupon / add coupon button |

### Adding a new icon

1. Ask Max to provide the SVG file from the `Giant_Icons/` folder.
2. Copy the file into `src/icons/<Name>/<size>.svg`.
3. Add a new export to `src/components/GiantIcon.tsx`, replacing all `fill="#181616"` and `stroke="#181616"` with `currentColor`.
4. Update this table.

**Never** use Figma CDN URLs, third-party icon libraries, or hand-drawn SVGs for UI icons.

### What is NOT in GiantIcon.tsx

Payment *brand logos* (Visa, Mastercard, etc.) and the Giant wordmark logo are brand assets, not UI icons — they live in `src/assets/figma/` and are exported from `src/assets.ts`.

## Project structure

```
Giant_Icons/                      # Giant's official icon set (source of truth — do not delete)
  Icons/<Name>/<size>.svg

src/
  App.tsx                         # Page switcher (state: page, deliverySelection, prototypeFlow)
  types.ts                        # DeliverySelection, PrototypeFlow, DELIVERY_OPTIONS, PROTOTYPE_FLOWS
  index.css                       # Global styles incl. shared .btn, .btn--primary, .btn--outline
  tokens.css                      # Design tokens (colors, spacing, typography)
  assets.ts                       # Brand/product image exports (NOT icons — see GiantIcon.tsx)
  icons/                          # Copy of Giant_Icons/Icons/ for Vite bundling
  assets/figma/                   # Static images committed to repo (logo, payment brands, products)
  components/
    GiantIcon.tsx                 # ALL UI icons — import from here, nowhere else
    Header.tsx                    # Logo, back button, prototype flow switcher
    Footer.tsx                    # Dark/light variant
    InputField.tsx                # Labelled input; supports optional, locked, error states
    SelectField.tsx               # Labelled select
    LocationSearchField.tsx       # Address/city/postcode search via Nominatim, filtered dropdown
    OrderSummary.tsx              # Right-column cart summary
    StorePickerModal.tsx          # Modal for selecting a store from real OSM dealer data
    PaymentIcons.tsx              # Payment brand logo row
    Divider.tsx                   # Horizontal rule; thick variant available
  pages/
    CheckoutStart.tsx             # Login vs guest choice — entry point for both flows
    DeliveryInfo.tsx              # Flow 1: address form (step 1)
    DeliveryOptions.tsx           # Flow 1: delivery method picker (step 2)
    Flow2DeliveryInfo.tsx         # Flow 2: delivery toggle + address form or store search (step 1)
    Flow2ShippingOptions.tsx      # Flow 2: shipping method selection (delivery path)
    Flow2StoreConfirmation.tsx    # Flow 2: selected store card + newsletter (store path)
    Flow2Payment.tsx              # Flow 2: payment step
    Payment.tsx                  # Flow 1: payment step
```

## Checkout flows

### Flow 1 — `current-checkout`
`CheckoutStart` → `DeliveryInfo` → `DeliveryOptions` → `Payment`

### Flow 2 — `new-checkout`
`CheckoutStart` → `Flow2DeliveryInfo` → `Flow2StoreConfirmation` (store only) or `Flow2ShippingOptions` (delivery) → `Flow2Payment`

`Flow2DeliveryInfo` shows a delivery/store toggle. Delivery: address form + billing checkbox. Store: inline `LocationSearchField` (50% width); "Find closest store near me" button disabled until a location is selected. Clicking it fetches nearby bicycle dealers via the Overpass API (OpenStreetMap) and navigates to `Flow2StoreConfirmation`.

`Flow2StoreConfirmation` shows the selected store card with a "Change" button that opens `StorePickerModal` with real dealer data. Continuing goes to `Flow2Payment`.

## Components — notes

- **`.btn` / `.btn--primary` / `.btn--outline`**: defined in `index.css`, shared across all pages.
- **`LocationSearchField`**: fetches Nominatim (OpenStreetMap) internally; debounced 350 ms. Props: `label`, `placeholder?`, `onSelect: (s: LocationSuggestion | null) => void`. Returns `lat`/`lon` on select for downstream dealer lookup.
- **`StorePickerModal`**: accepts `dealers: GiantDealer[]`, `selectedId: number`, `onClose`, `onSelect`. Real dealer data comes from Overpass API via `giantDealers.ts`.
- **`GiantDealer`** interface and `fetchDealersSortedByDistance()` live in `src/giantDealers.ts`. Uses Overpass API — no API key required, CORS supported.
- **Autofill button** (`Flow2DeliveryInfo`): fixed-position, floating animation, yellow badge. Visible on delivery step only. Clicking fills the address form with test data.

## Conventions

- Each page owns its CSS file(s); component CSS lives beside the component.
- `src/tokens.css` is the single source of truth for colors, spacing, and type — use CSS variables, not hardcoded values.
- `DeliverySelection` (`'standard' | 'express' | 'store'`) and `DELIVERY_OPTIONS` in `types.ts` are the canonical delivery data.
- This is a prototype — no real API calls for payment/auth, no form validation beyond UI state.
