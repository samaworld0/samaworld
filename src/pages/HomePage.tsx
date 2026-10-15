import { useState } from "react"
import { Invitation, SiteSettings, CustomFont } from "../lib/types"
import { WhatsAppIcon, EyeIcon, SparkleIcon } from "../components/icons"
import Reveal from "../components/Reveal"
import Footer from "../components/Footer"
import {
  ScrollProgress,
  FeatureStrip,
  HowItWorks,
  CtaBand,
} from "../components/HomeSections"
import {
  EditModeProvider,
  DeselectSurface,
  EditableText,
  EditableBackground,
  EditableButton,
  EditPanel,
  BackgroundsMenu,
  TextStyle,
} from "../editor/LiveEditor"

const categories = [
  { id: "all", label: "الكل" },
  { id: "wedding", label: "زفاف" },
  { id: "engagement", label: "خطوبة" },
  { id: "baby", label: "مولود" },
  { id: "graduation", label: "تخرج" },
  { id: "birthday", label: "عيد ميلاد" },
]

function InvitationCard({
  inv,
  onPreview,
}: {
  inv: Invitation
  onPreview: (inv: Invitation) => void
}) {
  const ac = inv.accentColor
  const bg = `linear-gradient(180deg, ${inv.gradient[0]} 0%, ${inv.gradient[1]} 100%)`
  const cover = inv.coverImage || inv.heroBg

  return (
    <article className="group">
      <button
        type="button"
        onClick={() => onPreview(inv)}
        aria-label={`معاينة ${inv.title.split("—")[0]?.trim()}`}
        className="relative block w-full overflow-hidden rounded-2xl cursor-pointer shadow-md ring-1 ring-black/5 transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]"
        style={{ aspectRatio: "3/4" }}
      >
        <div
          className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
          style={
            cover
              ? {
                  backgroundImage: `url("${cover}")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : { background: bg }
          }
        />

        {/* تدرج خفيف أسفل الكرت */}
        <div
          className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.55), transparent)",
          }}
        />

        {inv.tag && (
          <span
            className="absolute top-3 right-3 rounded-full px-3 py-1 text-[11px] sm:text-xs font-bold shadow"
            style={{ background: ac, color: "#1a0a00" }}
          >
            {inv.tag}
          </span>
        )}

        <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          <span
            className="flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold"
            style={{ background: ac, color: "#1a0a00" }}
          >
            <EyeIcon size={16} />
            معاينة كاملة
          </span>
        </div>
      </button>

      <div className="mt-3 sm:mt-4 text-right" dir="rtl">
        <h3 className="text-sm sm:text-base font-bold text-foreground line-clamp-1">
          {inv.title.split("—")[0]?.trim()}
        </h3>
        <button
          type="button"
          onClick={() => onPreview(inv)}
          className="w-full mt-2 sm:mt-3 flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold border border-border transition hover:bg-accent/10 hover:border-accent"
        >
          <EyeIcon size={15} />
          معاينة الدعوة
        </button>
      </div>
    </article>
  )
}

function WhatsAppContactButton({
  numberIraq,
  numberSaudi,
  message,
}: {
  numberIraq: string
  numberSaudi: string
  message: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-[#25D366] text-white"
      >
        <WhatsAppIcon size={16} />
        <span>تواصل</span>
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
          <div
            className="absolute left-0 mt-2 z-50 w-48 rounded-xl border border-border bg-background shadow-lg overflow-hidden"
            dir="rtl"
          >
            <a
              href={`https://wa.me/${numberIraq}?text=${message}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-4 py-3 text-sm font-bold hover:bg-accent/10 transition"
            >
              <WhatsAppIcon size={16} />
              <span>واتساب — العراق</span>
            </a>
            <a
              href={`https://wa.me/${numberSaudi}?text=${message}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-4 py-3 text-sm font-bold border-t border-border hover:bg-accent/10 transition"
            >
              <WhatsAppIcon size={16} />
              <span>واتساب — السعودية</span>
            </a>
          </div>
        </>
      )}
    </div>
  )
}

function TopHero({
  siteSettings,
  onShowTemplates,
}: {
  siteSettings: SiteSettings
  onShowTemplates: () => void
}) {
  const floatingDots = [
    { top: "10%", right: "50%", size: 9, color: "var(--color-rose-300)", delay: 0 },
    { top: "18%", right: "8%", size: 7, color: "var(--color-gold-400)", delay: 1.4 },
    { top: "48%", right: "3%", size: 6, color: "var(--color-rose-400)", delay: 0.6 },
    { top: "6%", left: "6%", size: 8, color: "var(--color-rose-400)", delay: 2 },
    { top: "60%", left: "9%", size: 7, color: "var(--color-gold-300)", delay: 1 },
  ]

  return (
    <section className="relative isolate overflow-hidden py-20 sm:py-28">
      {/* خلفية "شفق" هادئة: كتل ألوان ناعمة تتحرك ببطء */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div
          className="aurora-blob aurora-a w-[22rem] h-[22rem] -top-20 right-[8%]"
          style={{ background: "var(--color-rose-200)" }}
        />
        <div
          className="aurora-blob aurora-b w-[26rem] h-[26rem] top-24 -left-24"
          style={{ background: "var(--color-sage-300)" }}
        />
        <div
          className="aurora-blob aurora-c w-[20rem] h-[20rem] top-[45%] right-[-4rem]"
          style={{ background: "var(--color-gold-200)" }}
        />
      </div>

      {/* خلفية منقّطة خفيفة + توهج علوي دافئ */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(rgba(180,130,40,0.14) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 20%, black 40%, transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 20%, black 40%, transparent 90%)",
        }}
      />

      {floatingDots.map((dot, i) => (
        <span
          key={i}
          className="hidden sm:block absolute rounded-full animate-float"
          style={{
            top: dot.top,
            right: (dot as any).right,
            left: (dot as any).left,
            width: dot.size,
            height: dot.size,
            background: dot.color,
            animationDelay: `${dot.delay}s`,
          }}
        />
      ))}

      <div className="max-w-4xl mx-auto px-6 text-center">
        <Reveal duration={600}>
          <EditableText
            id="top-hero-badge"
            as="span"
            className="inline-flex items-center gap-2 rounded-full border border-gold-200 bg-gold-50 px-4 py-1.5 text-xs sm:text-sm font-bold text-gold-700"
          >
            {siteSettings.topHeroBadge}
          </EditableText>
        </Reveal>

        <Reveal duration={700} delay={100}>
          <h1 className="mt-6 font-display font-bold leading-[1.3] text-3xl sm:text-5xl text-warm-900">
            <EditableText id="top-hero-title-before" as="span">
              {siteSettings.topHeroTitleBefore}
            </EditableText>{" "}
            <EditableText
              id="top-hero-title-accent"
              as="span"
              className="shimmer-text"
            >
              {siteSettings.topHeroTitleAccent}
            </EditableText>
            <br />
            <EditableText id="top-hero-title-after" as="span">
              {siteSettings.topHeroTitleAfter}
            </EditableText>
          </h1>
        </Reveal>

        <Reveal duration={700} delay={200}>
          <EditableText
            id="top-hero-subtitle"
            as="p"
            className="mt-6 max-w-xl mx-auto text-base sm:text-lg text-warm-700 leading-relaxed"
          >
            {siteSettings.topHeroSubtitle}
          </EditableText>
        </Reveal>

        <Reveal duration={700} delay={300}>
          <EditableButton
            id="top-hero-button"
            onClick={onShowTemplates}
            className="mt-8 inline-flex items-center gap-2 btn-gold btn-sheen text-white font-bold px-7 py-3.5 rounded-full text-sm sm:text-base"
          >
            <SparkleIcon size={16} />
            {siteSettings.topHeroButtonText}
          </EditableButton>
        </Reveal>

        <Reveal duration={800} delay={400} className="mt-16">
          <div className="flex items-center justify-center gap-4 sm:gap-6">
            {/* بطاقة 1: مغلّف بختم شمعي — أو صورة مرفوعة من إعدادات الواجهة */}
            <div
              className="w-24 sm:w-32 aspect-[3/5] rounded-2xl shadow-xl -rotate-6 animate-float flex items-center justify-center overflow-hidden"
              style={
                siteSettings.heroCard1Image
                  ? {
                      backgroundImage: `url("${siteSettings.heroCard1Image}")`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      border: "1px solid var(--color-gold-200)",
                    }
                  : {
                      background:
                        "linear-gradient(160deg, var(--color-cream-100) 0%, var(--color-gold-100) 100%)",
                      border: "1px solid var(--color-gold-200)",
                    }
              }
            >
              {!siteSettings.heroCard1Image && (
                <div
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold text-white shadow-md"
                  style={{ background: "var(--color-rose-500)" }}
                >
                  س و ن
                </div>
              )}
            </div>

            {/* بطاقة 2: قالب "وصال" — باب الفرح الذهبي — أو صورة مرفوعة */}
            <div
              className="w-28 sm:w-36 aspect-[3/5] rounded-2xl shadow-2xl animate-float [animation-duration:7s] flex flex-col items-center justify-center gap-2 relative z-10 overflow-hidden"
              style={
                siteSettings.heroCard2Image
                  ? {
                      backgroundImage: `url("${siteSettings.heroCard2Image}")`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      border: "1px solid var(--color-gold-500)",
                    }
                  : {
                      background:
                        "linear-gradient(160deg, #1a0a00 0%, #2d1200 60%, #1a0a00 100%)",
                      border: "1px solid var(--color-gold-500)",
                    }
              }
            >
              {!siteSettings.heroCard2Image && (
                <>
                  <div
                    className="w-10 h-14 sm:w-12 sm:h-16 rounded-t-full flex items-center justify-center text-gold-300 text-[10px] font-bold"
                    style={{ border: "2px solid var(--color-gold-400)" }}
                  >
                    و ل
                  </div>
                  <span className="text-[9px] sm:text-[10px] text-gold-300 font-bold">
                    وصال
                  </span>
                </>
              )}
            </div>

            {/* بطاقة 3: قالب زهور — أو صورة مرفوعة */}
            <div
              className="w-24 sm:w-32 aspect-[3/5] rounded-2xl shadow-xl rotate-6 animate-float-delay flex flex-col items-center justify-center gap-1.5 overflow-hidden"
              style={
                siteSettings.heroCard3Image
                  ? {
                      backgroundImage: `url("${siteSettings.heroCard3Image}")`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      border: "1px solid var(--color-rose-200)",
                    }
                  : {
                      background:
                        "linear-gradient(160deg, var(--color-rose-50) 0%, var(--color-cream-200) 100%)",
                      border: "1px solid var(--color-rose-200)",
                    }
              }
            >
              {!siteSettings.heroCard3Image && (
                <>
                  <span className="text-lg sm:text-xl">🌸</span>
                  <span className="text-[9px] sm:text-[10px] text-rose-600 font-bold">
                    لمسة
                  </span>
                </>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// الواجهة الرئيسية للموقع: الشريط العلوي + شبكة عرض الدعوات مع الفلترة
// حسب التصنيف. هذا الملف مستقل تماماً ويستقبل بياناته عبر props من App.tsx
//
// وضع "التصميم المباشر" (editable=true) — نفس فكرة DesignPanel الخاصة
// بالدعوات بالضبط، بس هذي المرة لعناصر الواجهة الرئيسية نفسها (الشريط
// العلوي والقسم الرئيسي). يُفعّل من HomePageDesignPanel.tsx فقط؛ بالعرض
// العادي للزوّار editable=false دايماً والتخصيصات المحفوظة (homeTextStyles)
// تنعرض تلقائياً بدون أي تحكم إضافي.
export default function HomePage({
  invitations,
  siteSettings,
  onPreview,
  editable = false,
  onStylesChange,
  customFonts = [],
}: {
  invitations: Invitation[]
  siteSettings: SiteSettings
  onPreview: (inv: Invitation) => void
  editable?: boolean
  onStylesChange?: (styles: Record<string, TextStyle>) => void
  customFonts?: CustomFont[]
}) {
  const [activeCategory, setActiveCategory] = useState("all")

  // الدعوات الخاصة (isPrivate) ما تنعرض بشبكة الدعوات بالصفحة الرئيسية،
  // توصل بس لمن عنده رابط المعاينة المباشر (?preview=ID).
  const publiclyListedInvitations = invitations.filter((inv) => !inv.isPrivate)

  const filtered =
    activeCategory === "all"
      ? publiclyListedInvitations
      : publiclyListedInvitations.filter(
          (inv) => inv.category === activeCategory,
        )

  // نعرض بس التصنيفات اللي فيها دعوات فعلاً (+ "الكل").
  const availableCategories = categories.filter(
    (c) =>
      c.id === "all" ||
      publiclyListedInvitations.some((inv) => inv.category === c.id),
  )

  const generalMsg = encodeURIComponent(
    "السلام عليكم، أود الاستفسار عن الدعوات الإلكترونية",
  )

  const scrollToTemplates = () => {
    document
      .getElementById("templates-grid")
      ?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <EditModeProvider
      editable={editable}
      initialStyles={siteSettings.homeTextStyles || {}}
      onStylesChange={onStylesChange}
      customFonts={customFonts}
    >
      <DeselectSurface>
        <div
          className="min-h-screen bg-background"
          dir="rtl"
          style={{ fontFamily: "var(--font-body)" }}
        >
          <EditableBackground
            id="bg-nav"
            className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl"
          >
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
              <Reveal className="flex items-center gap-3" duration={600}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center bg-accent text-[#2C1810] overflow-hidden shrink-0">
                  {siteSettings.logoImageUrl ? (
                    <img
                      src={siteSettings.logoImageUrl}
                      alt={siteSettings.siteName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    siteSettings.logoIcon
                  )}
                </div>
                <div>
                  <EditableText
                    id="site-name"
                    as="p"
                    className="text-lg font-bold leading-none"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {siteSettings.siteName}
                  </EditableText>
                  <EditableText
                    id="site-name-en"
                    as="p"
                    className="text-[10px] text-muted-foreground"
                  >
                    {siteSettings.siteNameEn}
                  </EditableText>
                </div>
              </Reveal>
              <Reveal
                className="flex items-center gap-2"
                duration={600}
                delay={100}
              >
                <WhatsAppContactButton
                  numberIraq={siteSettings.whatsappNumberIraq}
                  numberSaudi={siteSettings.whatsappNumberSaudi}
                  message={generalMsg}
                />
              </Reveal>
            </div>
          </EditableBackground>

          {!editable && <ScrollProgress />}

          <EditableBackground id="bg-hero-section">
            <TopHero
              siteSettings={siteSettings}
              onShowTemplates={scrollToTemplates}
            />
          </EditableBackground>

          <FeatureStrip />

          <EditableBackground
            id="bg-templates-section"
            className="block"
          >
            <section id="templates-grid" className="max-w-7xl mx-auto px-3 sm:px-6 py-10 sm:py-24">
              <Reveal className="text-center mb-8 sm:mb-16" as="div">
                <EditableText
                  id="templates-heading"
                  as="h2"
                  className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {siteSettings.heroTitle}
                </EditableText>
              </Reveal>

              {availableCategories.length > 2 && (
                <div
                  className="flex flex-wrap items-center justify-center gap-2 mb-8 sm:mb-12"
                  role="tablist"
                  aria-label="تصنيف الدعوات"
                >
                  {availableCategories.map((cat) => {
                    const active = cat.id === activeCategory
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold border transition ${
                          active
                            ? "bg-[#D4AF37] border-[#D4AF37] text-[#1a0a00] shadow"
                            : "border-border text-foreground hover:bg-accent/10"
                        }`}
                      >
                        {cat.label}
                      </button>
                    )
                  })}
                </div>
              )}

              {filtered.length === 0 && (
                <p className="text-center text-muted-foreground py-16">
                  ما فيه دعوات بهذا التصنيف حالياً.
                </p>
              )}

              <div className="flex flex-wrap justify-center gap-x-3 gap-y-6 sm:gap-x-8 sm:gap-y-12">
                {filtered.map((inv, index) => (
                  <Reveal
                    key={inv.id}
                    delay={(index % 4) * 90}
                    className="w-[calc(50%-0.375rem)] sm:w-60 lg:w-64 xl:w-72"
                  >
                    <InvitationCard
                      inv={inv}
                      onPreview={editable ? () => {} : onPreview}
                    />
                  </Reveal>
                ))}
              </div>
            </section>
          </EditableBackground>

          <HowItWorks />
          <CtaBand whatsappNumber={siteSettings.whatsappNumberIraq} />

          <Footer siteSettings={siteSettings} onShowTemplates={scrollToTemplates} />
        </div>
      </DeselectSurface>
      {editable && <EditPanel />}
      {editable && (
        <BackgroundsMenu
          sections={[
            { id: "bg-nav", label: "خلفية الشريط العلوي" },
            { id: "bg-hero-section", label: "خلفية القسم الرئيسي (Hero)" },
            { id: "bg-templates-section", label: "خلفية قسم عرض التصاميم" },
          ]}
        />
      )}
    </EditModeProvider>
  )
}
