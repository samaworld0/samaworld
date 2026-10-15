-- ============================================================
-- حماية قاعدة بيانات سما (Supabase) — شغّله مرة وحدة
-- Supabase → SQL Editor → الصق الكود كله → Run
-- آمن لو شغّلته أكثر من مرة، وما يمسح أي بيانات.
--
-- النتيجة:
--   • الزوار: يقدرون يقرؤون الدعوات والإعدادات فقط (حتى الموقع يشتغل)
--   • المسجّل دخول (أنت): يقدر يضيف ويعدل ويحذف ويرفع ملفات
-- ============================================================

-- 1) جدول الدعوات
alter table public.invitations enable row level security;

drop policy if exists "invitations_public_read"  on public.invitations;
drop policy if exists "invitations_admin_insert" on public.invitations;
drop policy if exists "invitations_admin_update" on public.invitations;
drop policy if exists "invitations_admin_delete" on public.invitations;

create policy "invitations_public_read"  on public.invitations
  for select to anon, authenticated using (true);
create policy "invitations_admin_insert" on public.invitations
  for insert to authenticated with check (true);
create policy "invitations_admin_update" on public.invitations
  for update to authenticated using (true) with check (true);
create policy "invitations_admin_delete" on public.invitations
  for delete to authenticated using (true);

-- 2) جدول إعدادات الواجهة
alter table public.site_settings enable row level security;

drop policy if exists "site_settings_public_read"  on public.site_settings;
drop policy if exists "site_settings_admin_insert" on public.site_settings;
drop policy if exists "site_settings_admin_update" on public.site_settings;
drop policy if exists "site_settings_admin_delete" on public.site_settings;

create policy "site_settings_public_read"  on public.site_settings
  for select to anon, authenticated using (true);
create policy "site_settings_admin_insert" on public.site_settings
  for insert to authenticated with check (true);
create policy "site_settings_admin_update" on public.site_settings
  for update to authenticated using (true) with check (true);
create policy "site_settings_admin_delete" on public.site_settings
  for delete to authenticated using (true);

-- 3) ملفات الصور/الفيديو/الموسيقى (bucket: invitation-media)
-- القراءة تبقى عامة لأن الـ bucket عام. الرفع والتعديل والحذف للمسجّل فقط.
drop policy if exists "media_admin_insert" on storage.objects;
drop policy if exists "media_admin_update" on storage.objects;
drop policy if exists "media_admin_delete" on storage.objects;

create policy "media_admin_insert" on storage.objects
  for insert to authenticated with check (bucket_id = 'invitation-media');
create policy "media_admin_update" on storage.objects
  for update to authenticated
  using (bucket_id = 'invitation-media') with check (bucket_id = 'invitation-media');
create policy "media_admin_delete" on storage.objects
  for delete to authenticated using (bucket_id = 'invitation-media');

-- ============================================================
-- مهم بعد التشغيل (من واجهة Supabase، مو من SQL):
--   Authentication → Sign In / Providers → عطّل "Allow new users to sign up"
--   حتى ما يقدر أحد يسوي حساب ويصير "مسجّل دخول" ويكتب ببياناتك.
-- ============================================================
