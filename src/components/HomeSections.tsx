import { useEffect, useRef } from "react"
import Reveal from "./Reveal"
import { EditableText } from "../editor/LiveEditor"
import {
  DoorIcon,
  ClockIcon,
  CheckBadgeIcon,
  MapPinIcon,
  MusicIcon,
  ChatIcon,
  PaletteIcon,
  SendIcon,
  WhatsAppIcon,
} from "./icons"

// شريط رفيع ذهبي أعلى الصفحة يتحرك مع التمرير.
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const el = document.documentElement
      const max = el.scrollHeight - el.clientHeight
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div
      aria-hidden
      className="fixed top-0 inset-x-0 h-[3px] z-50 pointer-events-none"
    >
      <div
        ref={barRef}
        className="h-full origin-right"
        style={{
          transform: "scaleX(0)",
          background:
            "linear-gradient(90deg, var(--color-gold-300), var(--color-rose-300), var(--color-sage-400))",
        }}
      />
    </div>
  )
}

const features = [
  { icon: DoorIcon, label: "فتح باب بأنميشن" },
  { icon: MusicIcon, label: "موسيقى خلفية" },
  { icon: ClockIcon, label: "عداد تنازلي" },
  { icon: MapPinIcon, label: "الموقع على الخريطة" },
  { icon: CheckBadgeIcon, label: "تأكيد الحضور" },
]

// شريط مميزات صغير تحت الـ Hero.
export function FeatureStrip() {
  return (
    <section className="px-4 sm:px-6 pb-6 sm:pb-10">
      <Reveal
        className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-2.5 sm:gap-3"
        duration={700}
      >
        {features.map(({ icon: Icon, label }) => (
          <span
            key={label}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-4 py-2 text-xs sm:text-sm font-bold text-warm-700 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-gold-300 hover:text-gold-700"
          >
            <span className="text-gold-500">
              <Icon size={16} />
            </span>
            {label}
          </span>
        ))}
      </Reveal>
    </section>
  )
}

const steps = [
  {
    icon: PaletteIcon,
    title: "اختر التصميم",
    text: "تصفّح القوالب وعاين الدعوة كاملة بالأنميشن والموسيقى.",
    tint: "var(--color-rose-100)",
    tone: "var(--color-rose-500)",
  },
  {
    icon: SendIcon,
    title: "أرسل بياناتك",
    text: "ابعث لنا الأسماء والموعد والمكان عبر واتساب وإحنا نجهزها.",
    tint: "var(--color-gold-100)",
    tone: "var(--color-gold-600)",
  },
  {
    icon: ChatIcon,
    title: "شارك الرابط",
    text: "رابط واحد ترسله لكل المدعوين، وتأكيد الحضور يوصلك مباشرة.",
    tint: "var(--color-sage-200)",
    tone: "var(--color-sage-600)",
  },
]

// قسم "كيف تشتغل" — 3 خطوات.
export function HowItWorks() {
  return (
    <section className="relative px-4 sm:px-6 py-16 sm:py-24">
      <div className="max-w-5xl mx-auto">
        <Reveal className="text-center mb-10 sm:mb-14">
          <EditableText
            id="how-badge"
            as="span"
            className="inline-block rounded-full bg-sage-100 px-4 py-1.5 text-xs sm:text-sm font-bold text-sage-600"
          >
            بكل بساطة
          </EditableText>
          <EditableText
            id="how-heading"
            as="h2"
            className="mt-4 text-2xl sm:text-4xl font-bold font-display text-warm-900"
          >
            كيف تجهّز دعوتك؟
          </EditableText>
        </Reveal>

        <div className="relative grid gap-5 sm:gap-6 sm:grid-cols-3">
          {/* خط يربط الخطوات (للشاشات الكبيرة) */}
          <div
            aria-hidden
            className="hidden sm:block absolute top-[3.1rem] inset-x-[16%] h-px origin-right"
            style={{
              background:
                "repeating-linear-gradient(90deg, var(--color-gold-300) 0 6px, transparent 6px 14px)",
              animation: "draw-line 1.4s ease-out both",
            }}
          />
          {steps.map(({ icon: Icon, title, text, tint, tone }, i) => (
            <Reveal key={title} delay={i * 140}>
              <div className="soft-card relative h-full rounded-3xl px-6 pt-8 pb-7 text-center">
                <div
                  className="relative mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{ background: tint, color: tone }}
                >
                  <Icon size={26} />
                  <span
                    className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold shadow"
                    style={{ color: tone }}
                  >
                    {i + 1}
                  </span>
                </div>
                <EditableText
                  id={`how-step-${i + 1}-title`}
                  as="h3"
                  className="text-lg font-bold text-warm-900"
                >
                  {title}
                </EditableText>
                <EditableText
                  id={`how-step-${i + 1}-text`}
                  as="p"
                  className="mt-2 text-sm leading-relaxed text-warm-700"
                >
                  {text}
                </EditableText>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// شريط دعوة للتواصل قبل الفوتر.
export function CtaBand({ whatsappNumber }: { whatsappNumber: string }) {
  const msg = encodeURIComponent(
    "السلام عليكم، أود الاستفسار عن الدعوات الإلكترونية",
  )
  return (
    <section className="px-4 sm:px-6 pb-16 sm:pb-24">
      <Reveal className="max-w-4xl mx-auto">
        <div
          className="relative overflow-hidden rounded-[2rem] px-6 py-12 sm:py-16 text-center shadow-xl"
          style={{
            background:
              "linear-gradient(135deg, var(--color-warm-800) 0%, #3a2616 55%, #2a1a0e 100%)",
          }}
        >
          <div
            aria-hidden
            className="aurora-blob aurora-a w-64 h-64 -top-24 -left-16"
            style={{ background: "var(--color-gold-400)", opacity: 0.28 }}
          />
          <div
            aria-hidden
            className="aurora-blob aurora-b w-64 h-64 -bottom-28 -right-10"
            style={{ background: "var(--color-rose-400)", opacity: 0.22 }}
          />
          <EditableText
            id="cta-heading"
            as="h2"
            className="relative text-2xl sm:text-4xl font-bold font-display text-cream-50"
          >
            جاهز تجهّز دعوتك؟
          </EditableText>
          <EditableText
            id="cta-text"
            as="p"
            className="relative mt-3 mx-auto max-w-md text-sm sm:text-base text-cream-200/80 leading-relaxed"
          >
            كلمنا على واتساب وخلّينا نحوّل مناسبتك لدعوة تُنسى.
          </EditableText>
          <a
            href={`https://wa.me/${whatsappNumber}?text=${msg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="relative btn-sheen mt-8 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-sm sm:text-base font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            <WhatsAppIcon size={18} />
            ابدأ الآن عبر واتساب
          </a>
        </div>
      </Reveal>
    </section>
  )
}
