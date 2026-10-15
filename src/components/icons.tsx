export function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="4.4" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17.6" cy="6.4" r="1.15" fill="currentColor" />
    </svg>
  )
}

export function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.6 2h-3.2v13.4a2.9 2.9 0 1 1-2.05-2.77V9.4a6.1 6.1 0 1 0 5.25 6.05V8.75a7.8 7.8 0 0 0 4.6 1.48V7.1a4.55 4.55 0 0 1-4.6-4.55V2z" />
    </svg>
  )
}

// أيقونة وردة زخرفية — تُستخدم كأيقونة افتراضية بدل رمز نصي ("✿")، بلون
// موحّد مع بقية النص (fill="currentColor") حتى تنلوّن تلقائياً من لوحة
// التصميم المباشر (لون النص العادي)، وحجمها بوحدة "em" حتى تكبر/تصغر مع
// خاصية حجم الخط بنفس اللوحة.
export function RoseIcon({ size = "1em" }: { size?: number | string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ display: "inline-block", verticalAlign: "-0.15em" }}
    >
      <path d="M12 2C10 2 8.5 3.5 8.5 5.5c0 1.1.5 2.08 1.28 2.74C7.9 9.02 6.5 10.9 6.5 13c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5c0-2.1-1.4-3.98-3.28-4.76C15 7.58 15.5 6.6 15.5 5.5 15.5 3.5 14 2 12 2zm0 2c.83 0 1.5.67 1.5 1.5S12.83 7 12 7s-1.5-.67-1.5-1.5S11.17 4 12 4zm0 6.5c1.93 0 3.5 1.57 3.5 3.5s-1.57 3.5-3.5 3.5-3.5-1.57-3.5-3.5 1.57-3.5 3.5-3.5z" />
      <path d="M12 18.5c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1z" />
    </svg>
  )
}

export function EyeIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  )
}

export function SparkleIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2l1.9 6.1L20 10l-6.1 1.9L12 18l-1.9-6.1L4 10l6.1-1.9L12 2Zm7 12l.9 2.6L22.5 17.5l-2.6.9L19 21l-.9-2.6-2.6-.9 2.6-.9L19 14Z" />
    </svg>
  )
}

type IconProps = { size?: number }
const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
})

export function DoorIcon({ size = 22 }: IconProps) {
  return (
    <svg {...base(size)}>
      <path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" />
      <path d="M3 21h18" />
      <circle cx="14.5" cy="12.5" r=".8" fill="currentColor" />
    </svg>
  )
}
export function ClockIcon({ size = 22 }: IconProps) {
  return (
    <svg {...base(size)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  )
}
export function CheckBadgeIcon({ size = 22 }: IconProps) {
  return (
    <svg {...base(size)}>
      <path d="M12 3l2.2 1.6 2.7-.1.9 2.6 2.2 1.6-.8 2.6.8 2.6-2.2 1.6-.9 2.6-2.7-.1L12 21l-2.2-1.6-2.7.1-.9-2.6-2.2-1.6.8-2.6-.8-2.6 2.2-1.6.9-2.6 2.7.1L12 3z" />
      <path d="M8.5 12.2l2.4 2.4 4.6-4.8" />
    </svg>
  )
}
export function MapPinIcon({ size = 22 }: IconProps) {
  return (
    <svg {...base(size)}>
      <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  )
}
export function MusicIcon({ size = 22 }: IconProps) {
  return (
    <svg {...base(size)}>
      <path d="M9 18V5l11-2v13" />
      <circle cx="6.5" cy="18" r="2.5" />
      <circle cx="17.5" cy="16" r="2.5" />
    </svg>
  )
}
export function ChatIcon({ size = 22 }: IconProps) {
  return (
    <svg {...base(size)}>
      <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />
      <path d="M8.5 11h7M8.5 14h4" />
    </svg>
  )
}
export function PaletteIcon({ size = 22 }: IconProps) {
  return (
    <svg {...base(size)}>
      <path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.8-.8 1.8-1.7 0-1.3-1-1.6-1-2.7 0-.9.7-1.6 1.7-1.6H17a4 4 0 0 0 4-4C21 6.6 17 3 12 3z" />
      <circle cx="7.5" cy="11" r="1" fill="currentColor" />
      <circle cx="10" cy="7.5" r="1" fill="currentColor" />
      <circle cx="14.5" cy="7.5" r="1" fill="currentColor" />
    </svg>
  )
}
export function SendIcon({ size = 22 }: IconProps) {
  return (
    <svg {...base(size)}>
      <path d="M21 3L10 14" />
      <path d="M21 3l-7 18-4-7-7-4 18-7z" />
    </svg>
  )
}
