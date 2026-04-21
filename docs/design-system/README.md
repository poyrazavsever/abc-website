# ABC Site Ortak UI Tasarim Dili

Bu dosya, tum componentlerin ayni gorunur dili kullanmasi icin tek kaynaktir.
Amac: farkli ekip uyeleri ayni renk, shadow, radius, spacing ve tarz ile component gelistirsin.

## 1) Zorunlu Kurallar

- Tum UI componentleri ortak primitive katmanini kullanir: `components/ui/`.
- Domain componentleri (`components/marketing`, `components/events` vb.) kendi stil sistemini uretmez.
- Stil kararlarinda tek kaynak `app/globals.css` icindeki `@theme` tokenlaridir.

## 2) Renk Dili

- Semantic class kullan: `bg-primary`, `text-primary`, `bg-secondary`, `bg-surface`, `text-text`, `border-border`.
- Component icinde raw hex kullanma.
- `text-var-token` benzeri keyfi variable utility kullanimindan kacinin.

## 3) Yuzey, Radius ve Shadow

- Kart/panel yuzeyi: `bg-surface`.
- Ikinci seviye yuzey: `bg-surface-muted`.
- Border dili: `border-border`.
- Radius seviyeleri tutarli olur: `rounded-md` veya `rounded-lg`.
- Shadow dili tutarli olur: hafif yuzeyde `shadow-xs`, oncelikli yuzeyde `shadow-sm`.

## 4) Tipografi ve Spacing

- Baslik, govde ve label stilleri projedeki mevcut utility olcegine uyar.
- Component ici spacing rastgele verilmez; tutarli utility olcegi kullanilir (`px-`, `py-`, `gap-`).
- Ayni tur componentler ayni yukseklik ve ic bosluk ritmini korur.

## 5) Etkilesim ve Durumlar

- Her etkilesimli componentte su durumlar net olmalidir: default, hover, active, disabled, focus-visible.
- Focus gorunurlugu zorunludur; klavye kullanicisi odagi net gormelidir.
- Hareket/animasyon kisa ve anlamli olmali; dikkat dagitici olmamalidir.

## 6) Kullanim Prensibi

- Yeni bir ekran gelistirirken once mevcut `components/ui` primitive'lerine bak.
- Ihtiyac karsilanmiyorsa primitive'i genislet, ayni isi yapan yeni stil componenti yazma.
- Button, badge, input gibi atomik parcalar proje genelinde tek implementasyon olmalidir.

## 7) Kisa Kontrol Listesi

Bir component merge edilmeden once:

- Ortak token dili kullaniliyor mu?
- Renk/radius/shadow mevcut sistemle tutarli mi?
- Focus ve disabled durumlari var mi?
- Benzer bir component zaten var mi?

## 8) Faz 1 Foundation Primitive Seti

Bu set, tum ekranlarda ortak kullanilacak minimum UI katmanidir.

- Button
- IconButton
- LinkButton
- Card (+ Header/Content/Footer/Title/Description)
- Badge
- Avatar
- Divider
- SectionHeader

## 9) UI-Kit V1 Component Matrisi

Bu repo icin v1 kit, primitives + forms + feedback + overlay setini kapsar.

### Primitives

- Container
- Button
- IconButton
- LinkButton
- Card
- Badge
- Avatar
- Divider
- SectionHeader

### Form Altyapisi

- Label
- Field
- FieldHint
- FieldError

### Text / Entry

- Input
- Textarea
- Select

### Choice Controls

- Checkbox
- RadioGroup + RadioItem
- Switch

### Feedback

- Alert
- Spinner
- Skeleton
- Progress
- EmptyState

### Overlay / Interaction

- Dialog
- Sheet
- Tabs

## 10) API ve Davranis Kurallari

- Tum public UI componentleri `components/ui/index.ts` uzerinden export edilir.
- Button-benzeri componentlerde ortak prop dili korunur: `variant`, `size`, `loading`, `disabled`, `className`.
- Form inputlari native HTML wrapper'idir; custom data layer veya schema adapter'i tasimaz.
- `Field`, label / description / error baglarini ve `aria-describedby` zincirini yonetir.
- `Select` custom dropdown degildir; styled native `select` olarak kalir.
- `Checkbox` ve `Switch` kendi label/description duzenini tasir; `onCheckedChange` ile sade API sunar.
- `RadioGroup`, `Tabs`, `Dialog` ve `Sheet` controlled veya uncontrolled kullanilabilir.
- Overlay componentlerinde minimum davranis seti zorunludur: focus alma, `Escape` ile kapanma, focus return, scroll lock.
- `Toast` ayri bir UI componenti olarak kopyalanmaz; mevcut toaster altyapisi kullanilir.

## 11) State ve Accessibility Kontrolu

- Her interaktif component `focus-visible` durumu tasimalidir.
- Disabled state sadece gorunur degil, davranissal olarak da bloke edilmelidir.
- Error state, sadece renk degisikligi degil `aria-invalid` ve yardimci metin baglantisi ile sunulmalidir.
- `Dialog` ve `Sheet` icinde klavye odagi overlay disina kacmamalidir.
- `Tabs` icinde ok tuslari, `Home` ve `End` ile gezinme desteklenmelidir.

## 12) Faz 1 Uygulama Notlari

- Bu primitive'ler `components/ui/` altinda tutulur.
- Landing ve auth/onboarding layoutlari once bu primitive'lere gecirilir.
- Primitive disinda ayni isi yapan yeni class tabanli local component uretilmez.
- Variant ve state dili tum componentlerde tutarli kalir.

## 13) Faz 1 Kabul Kriteri

- Foundation primitive setinin tamami olusmus olmali.
- Her primitive icin default/hover/active/disabled/focus-visible davranisi olmali.
- Token disi stil (raw hex, keyfi variable utility) olmamali.
- En az iki farkli ekran grubunda primitive kullanimina gecilmis olmali.

Bu kadar. Bu dosya ortak tasarim dilinin tek kaynagi olarak kullanilir.
