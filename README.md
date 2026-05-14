# ABC Site
    a
Ankara Build Club resmi web sitesi ve üye platformu.

Bu repo, PRD'de tanimlanan Faz 1 -> Faz 3 kapsamini destekleyecek sekilde Next.js tabanli bir mimari iskeletle baslatilmistir.

## Proje Kapsami

- Marketing yuzu: landing, topluluk vitrini, etkinlik ve proje görünürlugu
- Uye platformu: auth, onboarding, profil, rozet, dizinler
- Admin paneli: içerik ve operasyon yönetimi
- Entegrasyonlar: Luma, email, analytics, gelecekte RAG/LLM

Detayli urun gereksinimleri icin `PRD.md` dosyasina bakiniz.

## Teknik Stack

- Next.js `16.2.4` (App Router)
- React `19`
- TypeScript (strict)
- Tailwind CSS `v4`
- Supabase (Auth + Postgres)

## Kritik Not: Next.js 16

Bu repo klasik Next.js varsayimlariyla ele alinmamalidir.

- Kod degisikligi öncesi `AGENTS.md` okunmalidir.
- Next.js tarafinda ilgili konu icin `node_modules/next/dist/docs/` altindaki dokumanlar kontrol edilmelidir.

## Klasor Yapisi

Asagidaki yapi, PRD modullerini ayrık ve olceklenebilir sekilde organize eder:

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
			page.tsx
			[eventId]/
				page.tsx
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
	supabase/
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
public/
	brand/
	badges/
	icons/
```

## Layout Foundation Durumu

- `max-w-7xl` odakli container primitive aktif.
- Global provider ve ozellestirilmis react-hot-toast mekanizmasi aktif.
- Navbar ve footer data dosyalarindan yönetilir.
- Mega dropdown paneli `w-screen` acilir; içerik container sinirinda kalir.
- Navbar/Footer sadece `(marketing)` ve `(community)` layoutlarinda render edilir.
- `components/ui` altinda Faz 1 foundation primitive seti oluşturuldu ve ilk ekranlara entegrasyon baslatildi.

Detayli plan icin `docs/architecture/structure-plan.md` dosyasina bakiniz.

## Faz Bazli Yol Haritasi

1. Faz 1 (MVP)
   Landing, auth/onboarding, profile, events, badges, projects directory, builders directory, temel admin

2. Faz 2 (Community)
   Konum bazli akillar, serious builder matching, LinkedIn generator, analytics

3. Faz 3 (Intelligence)
   RAG chatbot, easter egg gelismis yönetim, ileri admin panelleri

## Agent Rule Seti

Bu repoda AI coding agent yonergeleri git ile versiyonlanir.

- `AGENTS.md`: global guardrails ve kritik uyarilar
- `CLAUDE.md`: Claude giriş dosyasi
- `.github/copilot-instructions.md`: Copilot ve coding agent repository kurallari

Kural dosyalarini birlikte okuyup degisiklik yapıniz.

## Gelistirme Ortami

1. Bagimliliklari kurun:

```bash
npm install
```

2. Gelistirme sunucusunu baslatin:

```bash
npm run dev
```

3. Lint çalıştırın:

```bash
npm run lint
```

## Ortam Degiskenleri

Supabase ve entegrasyonlar icin asagidaki degiskenler planlanmistir:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_EMAIL_ALLOWLIST`
- `LUMA_API_KEY`
- `LUMA_CALENDAR_ID`
- `LUMA_WEBHOOK_SECRET`
- `EMAIL_PROVIDER_API_KEY`
- `ANALYTICS_WRITE_KEY`
- `LLM_API_KEY`

Not: `.env*` dosyalari `.gitignore` kapsamindadır. Secret değerler repoya commit edilmez.
Production admin ekranlari icin `ADMIN_EMAIL_ALLOWLIST` zorunludur. Supabase
tablolari hazir olmayan izole demolarda mock admin datasini acmak icin
`ADMIN_DEMO_MODE=true` kullanilabilir.

## Scriptler

- `npm run dev`: local gelistirme
- `npm run build`: production build
- `npm run start`: production çalıştırma
- `npm run lint`: lint kontrolu

## Kaynak Dosyalar

- `PRD.md`: urun gereksinimleri ve fazlar
- `docs/architecture/structure-plan.md`: yapisal plan
- `.github/copilot-instructions.md`: coding agent kurallari
