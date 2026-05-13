import { imgAmex, imgDinersClub, imgDiscover, imgElo, imgMastercard, imgVisa, imgUnionPay } from '../assets'
import './PaymentIcons.css'

const METHODS = [
  { src: imgAmex,       alt: 'American Express' },
  { src: imgDinersClub, alt: 'Diners Club' },
  { src: imgDiscover,   alt: 'Discover' },
  { src: imgElo,        alt: 'Elo' },
  { src: imgMastercard, alt: 'Mastercard' },
  { src: imgVisa,       alt: 'Visa' },
  { src: imgUnionPay,   alt: 'UnionPay' },
]

export default function PaymentIcons() {
  return (
    <div className="payment-icons">
      {METHODS.map(m => (
        <div key={m.alt} className="payment-icon">
          <img src={m.src} alt={m.alt} />
        </div>
      ))}
    </div>
  )
}
