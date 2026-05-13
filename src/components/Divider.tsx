import './Divider.css'

interface DividerProps {
  thick?: boolean
}

export default function Divider({ thick }: DividerProps) {
  return <div className={`divider${thick ? ' divider--thick' : ''}`} />
}
