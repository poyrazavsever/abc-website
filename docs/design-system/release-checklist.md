# Design System Release Checklist

Bu checklist, design system degisikliklerinin guvenli sekilde yayinlanmasi icin kullanilir.

## 1) Scope Kontrolu

- Bu release hangi componentleri etkiliyor?
- Breaking degisiklik var mi?
- Hangi domain ekranlari risk altinda?

## 2) Kod Kalitesi

- TypeScript strict uyumu tam mi?
- Lint hatasi yok mu?
- Gereksiz tekrar veya dead code var mi?

## 3) UI Tutarliligi

- Token kullanimi kurala uygun mu?
- Variant ve size davranislari tutarli mi?
- Dark mode/light mode politikasiyla uyumlu mu? (proje kararina gore)

## 4) Accessibility

- Klavye navigasyonu test edildi mi?
- Focus-visible net mi?
- Aria label/role semantic olarak dogru mu?
- Kontrast kontrolu yapildi mi?

## 5) Testler

- Unit testler gecti
- Interaction testler gecti
- A11y smoke testler gecti
- Visual regression (varsa) gecti

## 6) Dokumantasyon

- README guncellendi mi?
- Component spec guncellendi mi?
- Breaking change varsa migration notu eklendi mi?
- Changelog satiri eklendi mi?

## 7) Onay Akisi

- Design review onayi
- Frontend review onayi
- Product review (gerekiyorsa)

## 8) Yayina Alma

- Release notu yayinlandi
- Etkilenen ekranlarda smoke test yapildi
- Geri donus plani hazir

## 9) Post-Release

- Hata takibi 24-48 saat izlendi
- Gelen geri bildirimler issue olarak acildi
- Gereken hotfix planlandi
