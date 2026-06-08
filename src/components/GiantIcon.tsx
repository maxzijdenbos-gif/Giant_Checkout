/**
 * Giant official icon set — sourced from Giant_Icons/Icons/.
 *
 * ALL icons used in the prototype must come from this file.
 * Do NOT create custom SVGs for UI icons.
 *
 * If you need an icon that is not listed here, ask Max to provide
 * the SVG from the Giant_Icons folder and add it as a new export below.
 *
 * Icons use `currentColor` so you can tint them with the CSS `color` property.
 * The `size` prop sets both width and height (icons are always square).
 */

interface IconProps {
  size?: number
  className?: string
  style?: React.CSSProperties
  'aria-hidden'?: true
}

// ── 16 px ─────────────────────────────────────────────────────────────────

export function ArrowLeft16({ size = 16, className, style, 'aria-hidden': h }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style} aria-hidden={h}>
      <path d="M5.18915 8.99999H14.2334V6.99999H5.18915L8.07804 3H5.61097L1.99986 7.99999L5.61097 13H8.07804L5.18915 8.99999Z" fill="currentColor"/>
    </svg>
  )
}

export function ArrowRight16({ size = 16, className, style, 'aria-hidden': h }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style} aria-hidden={h}>
      <path d="M11.0442 9H2V7H11.0442L8.15536 3.00001H10.6224L14.2335 8L10.6224 13H8.15536L11.0442 9Z" fill="currentColor"/>
    </svg>
  )
}

export function Check16({ size = 16, className, style, 'aria-hidden': h }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style} aria-hidden={h}>
      <path d="M3 7L6.5 10.5L12.5 4" stroke="currentColor" strokeWidth="2"/>
    </svg>
  )
}

export function Check24({ size = 24, className, style, 'aria-hidden': h }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style} aria-hidden={h}>
      <path d="M5 11.6154C7.01428 13.7182 8.14361 14.8972 10.1579 17L19 7" stroke="currentColor" strokeWidth="2"/>
    </svg>
  )
}

export function ChevronLeft16({ size = 16, className, style, 'aria-hidden': h }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style} aria-hidden={h}>
      <path d="M10 3L6 8L10 13" stroke="currentColor" strokeWidth="2"/>
    </svg>
  )
}

export function ChevronDown16({ size = 16, className, style, 'aria-hidden': h }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style} aria-hidden={h}>
      <path d="M13 6L8 10L3 6" stroke="currentColor" strokeWidth="2"/>
    </svg>
  )
}

export function ChevronRight16({ size = 16, className, style, 'aria-hidden': h }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style} aria-hidden={h}>
      <path d="M6 3L10 8L6 13" stroke="currentColor" strokeWidth="2"/>
    </svg>
  )
}

export function Close16({ size = 16, className, style, 'aria-hidden': h }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style} aria-hidden={h}>
      <path fillRule="evenodd" clipRule="evenodd" d="M11.5359 12.9498L3.05063 4.46448L4.46484 3.05026L12.9502 11.5356L11.5359 12.9498Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M3.05067 11.5355L11.536 3.05023L12.9502 4.46445L4.46488 12.9498L3.05067 11.5355Z" fill="currentColor"/>
    </svg>
  )
}

export function Edit16({ size = 16, className, style, 'aria-hidden': h }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style} aria-hidden={h}>
      <path d="M15.4141 5L6.41309 14.0078L2 13.998V9.5957L2.29199 9.30273L11 0.584961L15.4141 5ZM4 10.4229V12.002L5.58691 12.0059L12.5859 5L11 3.41406L4 10.4229Z" fill="currentColor"/>
    </svg>
  )
}

export function Info16({ size = 16, className, style, 'aria-hidden': h }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style} aria-hidden={h}>
      <path d="M8 1C11.866 1 15 4.13401 15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1ZM8 2.5C4.96243 2.5 2.5 4.96243 2.5 8C2.5 11.0376 4.96243 13.5 8 13.5C11.0376 13.5 13.5 11.0376 13.5 8C13.5 4.96243 11.0376 2.5 8 2.5ZM9 12H7V7H9V12ZM8 4C8.55228 4 9 4.44772 9 5C9 5.55228 8.55228 6 8 6C7.44772 6 7 5.55228 7 5C7 4.44772 7.44772 4 8 4Z" fill="currentColor"/>
    </svg>
  )
}

export function Location16({ size = 16, className, style, 'aria-hidden': h }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style} aria-hidden={h}>
      <circle cx="8" cy="7" r="2" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M8 3C5.79086 3 4 4.79086 4 7C4 7.43515 4.21319 8.09935 4.66372 8.94461C5.09815 9.75965 5.68912 10.6268 6.29794 11.4328C6.50775 11.7106 6.71784 11.9786 6.92189 12.2321L5.58571 13.7592C5.3025 13.4138 5.00254 13.0361 4.70206 12.6383C4.06088 11.7894 3.40185 10.8292 2.89878 9.88534C2.41181 8.97172 2 7.94556 2 7C2 3.68629 4.68629 1 8 1C11.3137 1 14 3.68629 14 7C14 7.94556 13.5882 8.97172 13.1012 9.88534C12.5981 10.8292 11.9391 11.7894 11.2979 12.6383C10.654 13.4908 10.0124 14.2514 9.53294 14.7978C9.47064 14.8688 9.41101 14.9363 9.35438 15H8H6.8L7.99478 13.5065L8 13.5125L8.02956 13.4788C8.48764 12.9567 9.09603 12.2351 9.70206 11.4328C10.3109 10.6268 10.9019 9.75965 11.3363 8.94461C11.7868 8.09935 12 7.43515 12 7C12 4.79086 10.2091 3 8 3Z" fill="currentColor"/>
    </svg>
  )
}

export function Search16({ size = 16, className, style, 'aria-hidden': h }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style} aria-hidden={h}>
      <path fillRule="evenodd" clipRule="evenodd" d="M6.67681 2.51381C8.97596 2.51381 10.8398 4.37764 10.8398 6.67679C10.8398 8.97594 8.97596 10.8398 6.67681 10.8398C4.37766 10.8398 2.51383 8.97594 2.51383 6.67679C2.51383 4.37764 4.37766 2.51381 6.67681 2.51381ZM12.3536 6.67679C12.3536 3.54159 9.81201 1 6.67681 1C3.5416 1 1.00002 3.54159 1.00002 6.67679C1.00002 9.81199 3.5416 12.3536 6.67681 12.3536C9.81201 12.3536 12.3536 9.81199 12.3536 6.67679Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M13.7018 14.9596L10.1318 11.3895L12.7282 11.3895L15 13.6614L13.7018 14.9596Z" fill="currentColor"/>
    </svg>
  )
}

// ── 24 px ─────────────────────────────────────────────────────────────────

export function ArrowRight24({ size = 24, className, style, 'aria-hidden': h }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style} aria-hidden={h}>
      <path d="M17.75 13L3 13V11L17.75 11L13.25 5.00001H15.75L21 12L15.75 19L13.25 19L17.75 13Z" fill="currentColor"/>
    </svg>
  )
}

export function ChevronRight24({ size = 24, className, style, 'aria-hidden': h }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style} aria-hidden={h}>
      <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="2"/>
    </svg>
  )
}

export function ChevronDown24({ size = 24, className, style, 'aria-hidden': h }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style} aria-hidden={h}>
      <path d="M19 9L12 15L5 9" stroke="currentColor" strokeWidth="2"/>
    </svg>
  )
}

export function Close24({ size = 24, className, style, 'aria-hidden': h }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style} aria-hidden={h}>
      <path fillRule="evenodd" clipRule="evenodd" d="M16.9493 18.364L5.63559 7.05026L7.0498 5.63605L18.3635 16.9498L16.9493 18.364Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M5.63634 16.9498L16.95 5.63605L18.3643 7.05026L7.05055 18.364L5.63634 16.9498Z" fill="currentColor"/>
    </svg>
  )
}

export function Comment24({ size = 24, className, style, 'aria-hidden': h }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style} aria-hidden={h}>
      <path fillRule="evenodd" clipRule="evenodd" d="M3 4H17L13.5 6H5V15H8V18.865L12.6379 15H19V4H21V17H13.362L6 23.135V17H3V4Z" fill="currentColor"/>
    </svg>
  )
}

export function Edit24({ size = 24, className, style, 'aria-hidden': h }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style} aria-hidden={h}>
      <path fillRule="evenodd" clipRule="evenodd" d="M16.3761 2.15579L22.033 7.81264L10.3035 19.5421L4.79547 19.3933L4.6466 13.8853L16.3761 2.15579ZM16.3761 4.98422L6.66911 14.6912L6.74355 17.4452L9.49754 17.5196L19.2045 7.81264L16.3761 4.98422Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M17.4368 8.8733L18.4974 9.93396L17.0832 11.3482L13.5477 7.81264L17.4368 8.8733Z" fill="currentColor"/>
    </svg>
  )
}

export function Location24({ size = 24, className, style, 'aria-hidden': h }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style} aria-hidden={h}>
      <path d="M13.3906 10.375C13.3906 11.2034 12.7191 11.875 11.8906 11.875C11.0622 11.875 10.3906 11.2034 10.3906 10.375C10.3906 9.54657 11.0622 8.875 11.8906 8.875C12.7191 8.875 13.3906 9.54657 13.3906 10.375Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M8.14791 4.60543C10.4258 3.13152 13.3565 3.13152 15.6344 4.60543C18.9868 6.77465 19.7993 11.3302 17.4035 14.5247L16.6818 15.4869L12.672 20.4991H10.2804L15.1005 14.2619L15.8035 13.3247C17.5039 11.0574 16.9272 7.82415 14.5479 6.28457C12.9312 5.23848 10.8511 5.23848 9.23441 6.28457C6.85506 7.82415 6.2784 11.0574 7.97881 13.3247L8.68177 14.2619L10.8911 16.875L9.61169 18.4606L7.10051 15.4869L6.37881 14.5247C3.98299 11.3302 4.79548 6.77465 8.14791 4.60543Z" fill="currentColor"/>
    </svg>
  )
}

export function Lock24({ size = 24, className, style, 'aria-hidden': h }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style} aria-hidden={h}>
      <path d="M14 15C14 16.1046 13.1046 17 12 17C10.8954 17 10 16.1046 10 15C10 13.8954 10.8954 13 12 13C13.1046 13 14 13.8954 14 15Z" fill="currentColor"/>
      <path d="M12 1C14.7614 1 17 3.23858 17 6V8H18C19.1046 8 20 8.89543 20 10H6V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V13L20 11V18C20 20.2091 18.2091 22 16 22H8C5.85996 22 4.11211 20.3194 4.00488 18.2061L4 18V10C4 8.89543 4.89543 8 6 8H7V6C7 3.23858 9.23858 1 12 1ZM12 3C10.3431 3 9 4.34315 9 6V8H15V6C15 4.34315 13.6569 3 12 3Z" fill="currentColor"/>
    </svg>
  )
}

export function Store24({ size = 24, className, style, 'aria-hidden': h }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style} aria-hidden={h}>
      <path fillRule="evenodd" clipRule="evenodd" d="M3 4H17L13.5 6H5V18H19V4H21V20H3V4Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M15.5 19H13.5V13.5H10.5V19H8.5V11.5H15.5V19Z" fill="currentColor"/>
    </svg>
  )
}

export function Tag24({ size = 24, className, style, 'aria-hidden': h }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style} aria-hidden={h}>
      <path d="M21.8004 11.9016C22.18 12.2939 22.1747 12.9181 21.7887 13.3041L13.3034 21.7894C12.9174 22.1751 12.2938 22.18 11.9016 21.8004L2.4054 12.608C2.18904 12.3985 2.07876 12.1022 2.10501 11.8022L2.81212 3.72155C2.85442 3.23811 3.23811 2.85442 3.72155 2.81212L11.8022 2.10501C12.1022 2.07876 12.3985 2.18904 12.608 2.4054L21.8004 11.9016ZM4.73111 4.73042L4.13864 11.5018L12.5852 19.6791L19.6798 12.5846L11.5025 4.13795L4.73111 4.73042Z" fill="currentColor"/>
      <circle cx="9.10101" cy="9.1012" r="2" fill="currentColor"/>
    </svg>
  )
}

// ── 32 px ─────────────────────────────────────────────────────────────────

export function Delivery32({ size = 32, className, style, 'aria-hidden': h }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style} aria-hidden={h}>
      <path fillRule="evenodd" clipRule="evenodd" d="M20 11H26.499L30 18V23H26.8262C26.4141 24.1647 25.3059 25 24 25C22.6941 25 21.5859 24.1647 21.1738 23H13.8262C13.4141 24.1647 12.3059 25 11 25C9.69415 25 8.58594 24.1647 8.17383 23H4.5V15H6.5V21H8.17383C8.58594 19.8353 9.69415 19 11 19C12.3059 19 13.4141 19.8353 13.8262 21H18V9H4.5V7H20V11ZM11 21C10.4477 21 10 21.4477 10 22C10 22.5523 10.4477 23 11 23C11.5523 23 12 22.5523 12 22C12 21.4477 11.5523 21 11 21ZM24 21C23.4477 21 23 21.4477 23 22C23 22.5523 23.4477 23 24 23C24.5523 23 25 22.5523 25 22C25 21.4477 24.5523 21 24 21ZM20 21H21.1738C21.5859 19.8353 22.6941 19 24 19C25.3059 19 26.4141 19.8353 26.8262 21H28V18.5L25.3643 13H20V21Z" fill="currentColor"/>
      <path d="M7.70703 13H1L4.5 11H7.70703V13Z" fill="currentColor"/>
    </svg>
  )
}

export function ReturnProduct32({ size = 32, className, style, 'aria-hidden': h }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style} aria-hidden={h}>
      <path d="M6.8877 9.83691C5.69628 11.5947 5.00001 13.7145 5 16C5.00003 22.0751 9.92489 27 16 27C17.3025 27 18.5506 26.7721 19.709 26.3574L19.125 25.3457L23.75 25.418L21.4375 29.4229L20.7109 28.1191C19.2495 28.6876 17.6604 29 16 29C8.82032 29 3.00003 23.1797 3 16C3.00001 13.3018 3.82351 10.7924 5.23242 8.71387L6.8877 9.83691Z" fill="currentColor"/>
      <path d="M11.2861 3.87598C12.7574 3.30333 14.3532 3 16.0273 3C23.2377 3 29 8.82902 29 16.0039C29 18.6985 28.2001 21.183 26.7891 23.2646L25.1328 22.1416C26.3222 20.3868 27 18.2931 27 16.0039C27 9.92396 22.1235 5 16.0273 5C14.7049 5 13.4497 5.22199 12.2871 5.6377L12.874 6.6543L8.25 6.58203L10.5625 2.57715L11.2861 3.87598Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M23 16H22V22H10V16H9V10H23V16ZM12 20H20V16H12V20ZM11 14H21V12H11V14Z" fill="currentColor"/>
    </svg>
  )
}

export function Home32({ size = 32, className, style, 'aria-hidden': h }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style} aria-hidden={h}>
      <path fillRule="evenodd" clipRule="evenodd" d="M27 10.2949V26H5V10.2949L16 2.55469L27 10.2949ZM7 11.333V24H12V17H20V24H25V11.333L16 5L7 11.333ZM14 24H18V19H14V24Z" fill="currentColor"/>
    </svg>
  )
}

export function Store32({ size = 32, className, style, 'aria-hidden': h }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style} aria-hidden={h}>
      <path fillRule="evenodd" clipRule="evenodd" d="M27 26H8.5L12 24V15.9316H19.9785V24H25.0215L25.0059 12.6631C24.5468 12.8795 24.0354 13 23.5 13C22.5457 13 21.6517 12.6063 21.0059 11.9541C20.3645 12.6061 19.4713 13 18.5 13C17.5457 13 16.6517 12.6063 16.0059 11.9541C15.3645 12.6061 14.4713 13 13.5 13C12.5457 13 11.6517 12.6063 11.0059 11.9541C10.3645 12.6061 9.47126 13 8.5 13C7.96242 13 7.4444 12.874 6.97852 12.6484V26H5V6H27V26ZM13.9785 24H18V18H13.9785V24ZM7 9.5C7 10.3975 7.60254 11 8.5 11C9.32197 11 9.91284 10.4943 10.0068 9.71973C10.0024 9.6472 10 9.57395 10 9.5V8H6.98828L7 9.5ZM12 9.5C12 10.3975 12.6025 11 13.5 11C14.322 11 14.9128 10.4943 15.0068 9.71973C15.0024 9.6472 15 9.57395 15 9.5V8H12V9.5ZM17 9.5C17 10.3975 17.6025 11 18.5 11C19.322 11 19.9128 10.4943 20.0068 9.71973C20.0024 9.6472 20 9.57395 20 9.5V8H17V9.5ZM22 9.5C22 10.3975 22.6025 11 23.5 11C24.3081 11 24.893 10.5112 25.002 9.75879L25 8H22V9.5Z" fill="currentColor"/>
    </svg>
  )
}
