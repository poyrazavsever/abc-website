# Component Specification Template

Bu sablon, her yeni UI component icin doldurulacak standart kayittir.

## 1) Metadata

- Component adi:
- Katman: Atom / Molecule / Organism
- Surum:
- Sorumlu ekip:
- Durum: Draft / Ready / Deprecated

## 2) Problem ve Amac

- Hangi ihtiyaci cozer?
- Hangi tekrarli UI problemini ortadan kaldirir?
- Basari olcutu nedir?

## 3) Kullanim Kapsami

### Ne zaman kullanilir?

-

### Ne zaman kullanilmaz?

-

## 4) API Sozlesmesi

### Props Tablosu

| Prop | Tip | Zorunlu | Varsayilan | Aciklama |
| ---- | --- | ------- | ---------- | -------- |
|      |     |         |            |          |

### Eventler

- onClick:
- onChange:
- onOpenChange:

### Ref Davranisi

- forwardRef var mi?
- Hangi elemente referans veriliyor?

## 5) Variant ve Size Matrisi

### Variantlar

- primary
- secondary
- outline
- ghost
- danger
- custom (gerekirse)

### Size

- sm
- md
- lg

### Desteklenen Durumlar

- default
- hover
- active
- focus-visible
- disabled
- loading
- error (uygunsa)

## 6) Accessibility

- Semantik element dogru mu?
- Klavye ile tam erisim var mi?
- Focus gorunur mu?
- Aria ozellikleri gerekli durumda tanimli mi?
- Screen reader icin okunabilir mi?
- Reduced motion senaryosu test edildi mi?

## 7) Tasarim Kurallari

- Hangi tokenlar kullaniliyor?
- Hangi class isimleri standarda bagli?
- Forbidden pattern var mi? (raw hex, inline style vb.)

## 8) Ornek Kullanimlar

### Basic

```tsx
// ornek kullanim
```

### Advanced

```tsx
// icon, loading, disabled, fullWidth vb.
```

## 9) Test Plani

### Unit

-

### Interaction

-

### A11y

-

### Visual Regression (opsiyonel)

-

## 10) Breaking Change Notlari

- Geriye donuk uyumluluk etkilendi mi?
- Migration adimlari neler?

## 11) Domain Baglantilari

- Hangi ekranlarda kullanilacak?
- Hangi eski componentlerin yerine gececek?

## 12) Definition of Done

- API final
- Variant/size/state tamam
- A11y kontrol gecti
- Dokuman tamam
- Testler yazildi
- En az bir gercek ekranda kullanildi
