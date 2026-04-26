# ABC Site Structure Plan

Bu dokuman PRD kapsamini Next.js tabanli bir klasor mimarisine ve uygulama sirasina doker.

## Kararlar

- Stack: Next.js 16.2.4, React 19, TypeScript strict, Tailwind v4
- Auth + Data: Supabase (Auth + Postgres)
- Klasor seviyesi: kok dizin yapisi korunur, `src/` altina tasinmaz
- Agent rules: `AGENTS.md`, `CLAUDE.md`, `.github/copilot-instructions.md`

## Ozellik-Modul Eslesmesi

| Modul              | Ozellikler               | Not                                    |
| ------------------ | ------------------------ | -------------------------------------- |
| Marketing          | F-01, F-02               | Landing + easter egg girdileri         |
| Auth & Onboarding  | F-03                     | Kayit, profil tamamlama                |
| Profiles           | F-04                     | Public profil, etiketler, gecmis       |
| Badges             | F-05                     | Luma attendance tetiklemeli rozetler   |
| Events             | F-06, F-07, F-08, F-08-1 | Luma source of truth                   |
| Projects           | F-09                     | Filtreli proje dizini                  |
| Builders           | F-10                     | Filtreli uye dizini                    |
| Matching           | F-11, F-12, F-13         | Basvuru, onay, eslestirme              |
| Chatbot            | F-14, F-17               | RAG ve dokuman yonetimi                |
| Admin              | F-15, F-16, F-18, F-19   | Operasyon, analitik, manuel kontroller |
| LinkedIn Generator | F-20                     | Kart + metin uretimi                   |

## Hedef Klasor Agaci

```text
app/
  (marketing)/
    layout.tsx
    page.tsx
  (auth)/
    layout.tsx
    login/
    register/
  (onboarding)/
    layout.tsx
    profile/
    project/
  (community)/
    layout.tsx
    components/
      page.tsx
    events/
    builders/
    projects/
  dashboard/
    profile/
    my-projects/
    linkedin-card/
    matching/
  admin/
    content/
    builders/
    badges/
    matching/
    analytics/
    chatbot/
    easter-egg/
  api/
    events/sync/
    badges/sync-luma/
    matching/pair/
    analytics/events/
    webhooks/luma/

components/
  layout/
    navbar.tsx
    navbar-mega-menu.tsx
    navbar-mobile.tsx
    footer.tsx
  shared/
    container.tsx
    providers.tsx
    toaster.tsx
  ui/
    alert.tsx
    avatar.tsx
    badge.tsx
    button.tsx
    card.tsx
    checkbox.tsx
    control.ts
    dialog.tsx
    divider.tsx
    empty-state.tsx
    field.tsx
    icon-button.tsx
    index.ts
    input.tsx
    internal/
      overlay.tsx
      use-controllable-state.ts
    label.tsx
    link-button.tsx
    progress.tsx
    radio-group.tsx
    section-header.tsx
    select.tsx
    sheet.tsx
    skeleton.tsx
    spinner.tsx
    switch.tsx
    tabs.tsx
    textarea.tsx
  marketing/
  auth/
  profile/
  events/
    event-card.tsx
    event-cover.tsx
    event-empty-state.tsx
  projects/
  builders/
  matching/
  linkedin/
  chatbot/
  admin/
  easter-egg/

lib/
  config/
    toast.config.ts
  data/
    navigation.data.ts
    footer.data.ts
  mocks/
    admin.mock.ts
    builders.mock.ts
  supabase/
    client.ts
    server.ts
  auth/
    admin.ts
  services/
    events.service.ts
  integrations/
    luma/
      client.ts
      index.ts
    email/
    analytics/
    llm/
  schemas/
  types/
  utils/

config/
docs/
  architecture/
  design-system/
public/
  brand/
  badges/
  icons/
```

## Layout Foundation Durumu (Baslatildi)

- `components/shared/container.tsx` ile `max-w-7xl` standart container primitive aktif.
- `components/shared/providers.tsx` + `components/shared/toaster.tsx` ile global toaster mount edildi.
- `lib/config/toast.config.ts` ve `lib/utils/toast.ts` ile semantic toast varyant kurallari tanimlandi.
- `components/layout/*` altinda data-driven navbar/footer ve mega menu shell uygulamasi baslatildi.
- `(marketing)` ve `(community)` layoutlarinda navbar/footer shell aktif; `(auth)` ve `(onboarding)` sade layout kullanir.
- `components/ui/*` altinda Faz 1 foundation primitive seti baslatildi ve ilk layout entegrasyonlari acildi.

## Faz Bazli Uygulama Sirasi

1. Temel altyapi: route iskeleti, lib katmanlari, config iskeleti
2. Auth + onboarding: Supabase auth, profil cekirdegi
3. Events read path: Luma veri cekimi, event list/detail
4. Badge engine base: attendance sayac ve rozet atama kurallari
5. Projeler ve builder dizinleri
6. Admin temel operasyonlar
7. Faz 2: matching, LinkedIn generator, analytics
8. Faz 3: chatbot, easter egg gelismis yonetim

## Domain Varliklari

- users
- profiles
- projects
- events
- event_attendance
- badges
- user_badges
- serious_builder_applications
- builder_matches
- notifications
- linkedin_templates
- chatbot_documents
- easter_egg_config
- analytics_events

## Entegrasyon Sinirlari

- Luma: `lib/integrations/luma/`
- Email: `lib/integrations/email/`
- Analytics: `lib/integrations/analytics/`
- LLM/RAG: `lib/integrations/llm/`

## Dokuman Bakimi

- Klasor yapisi degisirse bu dosya ve README birlikte guncellenir.
- Faz onceligi degisirse Faz bazli uygulama sirasi revize edilir.
