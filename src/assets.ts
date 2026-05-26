// Static asset imports — bundled by Vite, no expiry.
// All files live in src/assets/figma/ and are committed to the repo.
//
// UI ICONS are NOT here — use GiantIcon components from src/components/GiantIcon.tsx.
// If you need a new icon, ask Max to provide the SVG from Giant_Icons/ and add it to GiantIcon.tsx.

// ── Logo ──────────────────────────────────────────
import _imgLogo          from './assets/figma/logo.svg'
export const imgLogo          = _imgLogo          as string

// ── Payment brand logos (Visa, MC, etc.) ──────────
import _imgAmex          from './assets/figma/amex.svg'
import _imgDinersClub    from './assets/figma/diners-club.svg'
import _imgDiscover      from './assets/figma/discover.svg'
import _imgElo           from './assets/figma/elo.svg'
import _imgMastercard    from './assets/figma/mastercard.svg'
import _imgVisa          from './assets/figma/visa.svg'
import _imgUnionPay      from './assets/figma/union-pay.svg'
export const imgAmex          = _imgAmex          as string
export const imgDinersClub    = _imgDinersClub    as string
export const imgDiscover      = _imgDiscover      as string
export const imgElo           = _imgElo           as string
export const imgMastercard    = _imgMastercard    as string
export const imgVisa          = _imgVisa          as string
export const imgUnionPay      = _imgUnionPay      as string

// ── Store map preview ──────────────────────────────
import _imgMapPreview    from './assets/figma/map-preview.png'
export const imgMapPreview    = _imgMapPreview    as string

// ── Autofill test button ───────────────────────────
import _imgAutofill      from './assets/figma/autofill.png'
export const imgAutofill      = _imgAutofill      as string

// ── Product images (order summary) ────────────────
import _imgProductPropel from './assets/figma/product-propel.png'
import _imgProductAnthem from './assets/figma/product-anthem.png'
import _imgProductAurea  from './assets/figma/product-aurea.png'
import _imgProductRevolt from './assets/figma/product-revolt.png'
export const imgProductPropel = _imgProductPropel as string
export const imgProductAnthem = _imgProductAnthem as string
export const imgProductAurea  = _imgProductAurea  as string
export const imgProductRevolt = _imgProductRevolt as string
