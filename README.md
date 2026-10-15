# سما — دعوات إلكترونية

## هيكل المشروع
- `src/App.tsx` — التوجيه (الرئيسية / ?preview=ID / ?admin=1)
- `src/pages/` — HomePage (الرئيسية) و InvitationView (عرض الدعوة)
- `src/admin/` — لوحة التحكم ولوحات التصميم المباشر (تتحمل عند الطلب فقط)
- `src/lib/` — backend.ts (Supabase + Google Sheets، بدون تعديل) و types و data
- `src/editor/` — LiveEditor (محرر التصميم المباشر)
- `src/components/` — Footer و Reveal و icons
- `src/legacy/` — قوالب قديمة غير مستخدمة

## التشغيل
npm install && npm run dev   |   npm run build

## لوحة التحكم
ما عاد فيه زر ظاهر للزوار. افتحها يدوياً: `رابط-موقعك/?admin=1`

## الأمان
شغّل `supabase-security.sql` مرة وحدة بـ Supabase SQL Editor، وعطّل تسجيل المستخدمين الجدد (Allow new users to sign up).
