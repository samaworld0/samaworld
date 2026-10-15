import { lazy, Suspense, useState, useEffect } from "react"
import { Invitation } from "./lib/types"
import { defaultSiteSettings } from "./lib/data"
import { loadInvitations, loadSiteSettings } from "./lib/backend"
import HomePage from "./pages/HomePage"

// صفحات ثقيلة تنحمّل بس لما تنطلب (لوحة التحكم + صفحة الدعوة الكاملة)،
// حتى الصفحة الرئيسية تفتح أسرع للزوار.
const AdminPanel = lazy(() => import("./admin/AdminPanel"))
const InvitationFullView = lazy(() => import("./pages/InvitationView"))

function LoadingScreen() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#fefcf8" }}
      dir="rtl"
    >
      <div className="flex flex-col items-center gap-3">
        <div
          className="w-9 h-9 rounded-full border-2 border-[#D4AF37] border-t-transparent animate-spin"
          aria-hidden
        />
        <span className="text-sm text-[#8a7561]">...جارٍ التحميل</span>
      </div>
    </div>
  )
}

// App.tsx مسؤول فقط عن التوجيه (routing) بين:
// 1) لوحة التحكم (?admin=1)
// 2) عرض دعوة كاملة (?preview=ID)
// 3) الواجهة الرئيسية (HomePage) — بملفها المستقل src/HomePage.tsx
export default function App() {
  // نبدأ بـ null (مو seedInvitations) حتى ما نعرض بيانات وهمية/تجريبية
  // ولو للحظة وحدة قبل ما توصل بيانات Supabase الحقيقية — بدل الفلاش
  // (ظهور بيانات مختلفة ثم استبدالها ببياناتك الفعلية). null = لسه
  // التحميل الأول ما خلص.
  const [allInvitations, setAllInvitations] = useState<Invitation[] | null>(
    null,
  )
  const [siteSettings, setSiteSettings] = useState(defaultSiteSettings)

  useEffect(() => {
    loadInvitations().then(setAllInvitations)
    loadSiteSettings().then(setSiteSettings)
  }, [])

  // اسم الموقع بتبويب المتصفح (title) وأيقونة التبويب (favicon) — نحدّثهم
  // تلقائياً من إعدادات الموقع (لوحة التحكم → إعدادات الواجهة). لو رفعت
  // صورة شعار (logoImageUrl) نستخدمها كأيقونة مباشرة، وإلا نولّد أيقونة
  // بسيطة من الإيموجي/الرمز النصي (logoIcon) بدالها.
  useEffect(() => {
    document.title = siteSettings.siteName
      ? `${siteSettings.siteName} | للدعوات الإلكترونية`
      : "سما | للدعوات الإلكترونية"

    let iconHref = siteSettings.logoImageUrl || ""
    if (!iconHref) {
      const icon = siteSettings.logoIcon || "🌸"
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><text x="50%" y="54%" font-size="46" text-anchor="middle" dominant-baseline="middle">${icon}</text></svg>`
      iconHref = `data:image/svg+xml,${encodeURIComponent(svg)}`
    }

    let link = document.querySelector<HTMLLinkElement>("link[rel='icon']")
    if (!link) {
      link = document.createElement("link")
      link.rel = "icon"
      document.head.appendChild(link)
    }
    link.href = iconHref
  }, [siteSettings.siteName, siteSettings.logoIcon, siteSettings.logoImageUrl])

  const urlParams = new URLSearchParams(window.location.search)
  const previewId = urlParams.get("preview")
  const previewInv = allInvitations?.find(
    (inv) => inv.id.toString() === previewId,
  )
  const skipIntro = urlParams.get("skipIntro") === "1"
  const isAdmin = urlParams.get("admin") === "1"

  const handlePreview = (inv: Invitation) => {
    window.location.href = `${window.location.pathname}?preview=${inv.id}`
  }

  // لسه ما وصلت بيانات Supabase الحقيقية (أول تحميل) — نعرض شاشة تحميل
  // بسيطة بدل ما نعرض بيانات وهمية مؤقتة.
  if (allInvitations === null) return <LoadingScreen />

  if (isAdmin) {
    return (
      <Suspense fallback={<LoadingScreen />}>
        <AdminPanel
          invitations={allInvitations}
          onRefresh={() => loadInvitations().then(setAllInvitations)}
          siteSettings={siteSettings}
          onSiteSettingsRefresh={() => loadSiteSettings().then(setSiteSettings)}
        />
      </Suspense>
    )
  }

  if (previewInv) {
    return (
      <Suspense fallback={<LoadingScreen />}>
        <InvitationFullView
          inv={previewInv}
          onClose={() => {
            window.location.href = window.location.pathname
          }}
          customFonts={siteSettings.customFonts}
          skipIntro={skipIntro}
        />
      </Suspense>
    )
  }

  return (
    <HomePage
      invitations={allInvitations}
      siteSettings={siteSettings}
      onPreview={handlePreview}
    />
  )
}
