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

Bu kadar. Bu dosya ortak tasarim dilinin tek kaynagi olarak kullanilir.
