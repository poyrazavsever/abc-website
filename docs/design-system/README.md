# ABC Site Design System Draft

Durum: Draft v0.1
Amac: Birden fazla gelistiricinin ayni UI dilini kullanmasini saglayan ortak, olceklenebilir ve test edilebilir bir sistem tanimlamak.

## 1) Problem Tanimi

Ekip buyudukce asagidaki sorunlar artar:

- Ayni UI parcasi farkli dosyalarda farkli sekilde yazilir.
- Button, badge, input gibi atomik parcalarda variant ve state tutarsizliklari olusur.
- Tasarim kararlari bireysel kalir, ortak bir sozluk olusmaz.
- UI degisikliklerinin etkisi olculemez hale gelir.

Bu dokumanin hedefi, bu sorunlari teknik bir design system kurgusuyla cozmektir.

## 2) Hedefler

- Ortak atomik UI kutuphanesi olusturmak.
- Tum urun yuzeylerinde tutarli gorunum ve davranis saglamak.
- Theme tokenlari ve semantic class kullanimini standartlastirmak.
- Gelistirici, tasarimci ve urun ekibi icin ortak dil olusturmak.
- Faz 1 ihtiyaclarini hizli ve guvenli sekilde teslim etmek.

## 3) Hedef Disi Konular

- Bu dokuman Figma dosyasi yerine gecmez; teknik uygulama sozlesmesidir.
- Bu dokuman anlik olarak tum domain componentlerini kodlamayi hedeflemez.
- Bu dokuman urun metinlerinin son halini belirlemez.

## 4) Temel Ilkeler

- Reusability first: Ayni islev icin tekrar component yazilmaz.
- Composition over duplication: Molecule ve organism seviyesinde birlestirme tercih edilir.
- Accessible by default: Klavye, odak, kontrast ve semantik HTML zorunlu.
- Predictable API: Prop isimleri, variant mantigi ve event davranislari tutarli olur.
- Theme-driven UI: Renk ve spacing kararlarinda token bazli ilerlenir.
- Server-first architecture: Next.js tarafinda client component sadece gerektiginde kullanilir.

## 5) Proje Icinde Konum

Onerilen klasorleme:

```text
docs/
  design-system/
    README.md
    component-template.md (opsiyonel)

components/
  ui/
    button.tsx
    badge.tsx
    input.tsx
    textarea.tsx
    select.tsx
    checkbox.tsx
    radio.tsx
    switch.tsx
    chip.tsx
    avatar.tsx
    icon.tsx
    spinner.tsx
    skeleton.tsx
    divider.tsx
    tooltip.tsx

  shared/
  layout/
  marketing/
  auth/
  ...
```

Kurallar:

- Atomik ve tamamen tekrar kullanilabilir componentler `components/ui/` altinda olur.
- Domain odakli componentler (`components/marketing`, `components/events` gibi) `components/ui` primitive'lerini kullanir.
- `components/ui` altindaki componentler domain business logic bilmez.

## 6) Token Sistemi

Bu proje icin token kullanimi zorunludur.

### 6.1 Renk

- Sadece `app/globals.css` icindeki `@theme` tokenlari kullanilir.
- Semantic utility classlar tercih edilir: `bg-primary`, `text-primary`, `border-primary`, `bg-secondary`, `text-success`, `bg-surface`, `text-text`.
- Raw hex degerleri component icinde kullanilmaz.
- `text-[var(--...)]` gibi arbitrary variable utility kullanimi default olarak yasaktir.

### 6.2 Tipografi

Her component asagidaki olcege hizalanir:

- Display: Marketing hero ve major section basliklari
- Heading: h1, h2, h3
- Body: varsayilan metinler
- Label: form label, nav item, chip/badge
- Caption: ikincil aciklama metinleri

Tipografi API'si net olur:

- Font size
- Font weight
- Line height
- Letter spacing (sadece gerekli oldugunda)

### 6.3 Spacing

- Tek spacing scale kullanilir.
- Ic bosluk ve dis bosluklar rastgele verilmez.
- Component icinde spacing literal yazmak yerine utility scale kullanilir.

### 6.4 Radius ve Shadow

- Radius seviyeleri: sm, md, lg, xl (token bazli)
- Shadow seviyeleri: xs, sm, md, lg (token bazli)
- Her component state bazli ayni shadow davranisini izler.

### 6.5 Motion

- Micro motionlar anlamli olmali, dekoratif olmamali.
- Preferred durations:
  - quick: 120-180ms
  - standard: 200-280ms
  - slow: 320-420ms
- `prefers-reduced-motion` saygilanir.

## 7) Component Katmanlari

### 7.1 Atoms (Ortak Primitive Katmani)

Minimum hedef atomlar:

- Button
- IconButton
- Badge
- Chip
- Input
- Textarea
- Select
- Checkbox
- Radio
- Switch
- Avatar
- Divider
- Spinner
- Skeleton
- Tooltip

Atomlar icin ortak kurallar:

- Style variant + size variant zorunlu.
- Disabled state tutarli olur.
- Focus ring her atomda erisilebilir sekilde tanimlanir.
- Icon destekleyen atomlar icon-only modunda da erisilebilir olmalidir (`aria-label`).

### 7.2 Molecules

Ornek:

- FormField (label + help text + error + control)
- SearchInput (input + icon + clear action)
- CardHeader
- EmptyState
- Pagination

Kural:

- Molecule componentler sadece atomlardan olusur.
- Domain text ve data modeli molecule icine gomulmez.

### 7.3 Organisms

Ornek:

- Navbar
- Footer
- EventCardGrid
- ProfileSummaryPanel

Kural:

- Organism katmani domaine bagli olabilir.
- Ama gorunum primitive'lerini `components/ui` katmanindan alir.

## 8) Button Spec (Taslak)

### 8.1 Variantlar

- primary
- secondary
- outline
- ghost
- danger
- link

### 8.2 Boyutlar

- sm
- md
- lg

### 8.3 Desteklenen Durumlar

- default
- hover
- active
- focus-visible
- disabled
- loading

### 8.4 API Taslagi

```ts
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  | "link";

export type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
```

### 8.5 Davranis Kurallari

- `loading=true` iken click event ignore edilir.
- `disabled` gorunumu ile `aria-disabled` davranisi tutarli olur.
- Icon-only button'da gorunen text yerine `aria-label` zorunludur.

## 9) Badge Spec (Taslak)

### 9.1 Variantlar

- neutral
- primary
- secondary
- success
- warning
- danger
- info

### 9.2 Boyutlar

- sm
- md

### 9.3 Kullanim Kurallari

- Badge bir aksiyon componenti degildir.
- Tiklanabilir ihtiyac varsa `Chip` veya `FilterChip` kullanilir.
- Uzun metin badge icinde truncate edilmez; metin kisa tutulur.

## 10) Form Primitive Standartlari

Tum form primitive'leri icin:

- Label zorunlu veya `aria-label` zorunlu.
- Error state tek bir pattern ile render edilir.
- Help text, error text ve success text semantik olarak ayrisir.
- Disabled, readOnly, required davranislari net olur.
- Input boyutlari ve border/focus davranisi tum form alanlarinda ayni olur.

## 11) Accessibility (A11y) Checklist

Her UI component su kontrollerden gecmelidir:

- Klavye ile erisim (Tab, Shift+Tab, Enter, Space, Escape)
- `focus-visible` belirgin
- Kontrast oranlari WCAG AA hedefini saglar
- Role/aria kullanimi semantik HTML ile uyumlu
- Screen reader sirasinda anlamli adlandirma
- Motion reduction destegi

## 12) Icerik ve Dil Standartlari

- Component textleri hardcode edilmez; disaridan prop ile gelebilir.
- Turkish/English gibi coklu dil ihtiyacina hazir API tercih edilir.
- Placeholder metinler urun dil rehberi ile uyumlu olur.

## 13) Test Stratejisi

### 13.1 Unit + Interaction

- Variant rendering testleri
- Disabled/loading state testleri
- Keyboard interaction testleri
- A11y smoke testleri

### 13.2 Visual Regression (Opsiyonel ama onerilir)

- Critical atomlar icin snapshot veya visual baseline tutulur.
- Degisiklikte beklenmeyen stil kaymalari erken yakalanir.

## 14) Dokumantasyon Standarti

Her component icin su basliklar yazilir:

- Amac
- Ne zaman kullanilir
- Ne zaman kullanilmaz
- API (props)
- Variant ve size matrisi
- Accessibility notlari
- Ornek kullanim

## 15) Katki ve Review Akisi

PR acmadan once minimum checklist:

- Yeni component mevcut bir ihtiyaci tekrar etmiyor.
- Variant, size ve state'ler tamam.
- A11y kontrolu yapildi.
- Dokuman guncellendi.
- Domaine ozel text veya is kurali atom katmanina sizmadi.

Review sirasinda bakilacaklar:

- API sadeligi
- Naming tutarliligi
- Token uyumu
- Backward compatibility

## 16) Versionlama ve Yonetisim

- Baslangic: internal semver benzeri surumleme (v0.x)
- Breaking degisiklikte migration notu zorunlu
- Changelog disiplini: Added / Changed / Deprecated / Removed / Fixed

## 17) Fazlara Gore Uygulama Plani

### Faz 1 (hemen)

- Button, IconButton, Badge
- Input, Textarea, Select
- Checkbox, Switch, Radio
- Spinner, Skeleton, Divider
- FormField molecule

### Faz 2

- Table primitive'leri
- Tabs, Accordion, Command palette benzeri advanced componentler
- Empty state ailesi

### Faz 3

- Data visualization wrapper primitive'leri
- Dashboard pattern componentleri
- Daha kapsamli interaction patternleri

## 18) Definition of Done (Component)

Bir UI component "tamam" sayilmasi icin:

- API final ve type-safe
- Tum variant/size/state senaryolari calisir
- A11y checklist gecer
- Dokuman ve ornek kullanim mevcut
- En az temel testler yazilmis
- En az bir domain ekranda gercek kullanimla dogrulanmis

## 19) Kisa Uygulama Rehberi (Baslangic)

1. `components/ui` altina Button ve Badge ile basla.
2. Variant ve size matrisini sabitle.
3. Navbar, auth formu ve kartlarda bu primitive'lere gec.
4. Domain componentlerinde inline style kararlarini atom katmanina cek.
5. Her yeni primitive icin bu dokumani referans al.

---

Bu dokuman living document olarak ele alinmali, ekip buyudukce ve urun ihtiyaclari degistikce duzenli revize edilmelidir.
