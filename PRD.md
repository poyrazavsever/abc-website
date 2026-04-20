# PRD: Ankara Build Club — Resmi Web Sitesi

**Versiyon:** 1.0  
**Tarih:** Nisan 2026  
**Yazar:** Mustafa Kara
**Durum:** Taslak

---

## 1. Ürün Özeti

Ankara Build Club'ın hem mevcut üyelerine yönelik bir üye platformu hem de yeni kişileri topluluğa çeken bir marketing yüzeyi olacak resmi web sitesi.

---

## 2. Hedef Kitle

| Segment | Profil | Hedef |
|---|---|---|
| Mevcut ABC üyeleri | Deep work / Build Sprint katılımcıları | Topluluğu tanıtmak, profil yönetmek, eşleşmek |
| Potansiyel yeni üyeler | Ankara'daki builder adayları | Topluluğu keşfetmek, kayıt olmak |
| Sponsor / Partner | fal.ai, Mistral gibi firmalar | Projeleri ve topluluk büyüklüğünü görmek |
| Admin | ABC yönetim ekibi | İçerik yönetimi, üye onayı, analitik |

---

## 3. Kullanıcı Hikayeleri

### 3.1 Yeni Ziyaretçi
- Siteye geldiğimde ABC'nin ne olduğunu 10 saniyede anlayabilirim
- Projeler ve builder profillerine bakarak topluluğun seviyesini değerlendirebilirim
- Kayıt olduğumda konum, unvan ve LinkedIn bilgilerimi girerek sistemdeki yerime kavuşurum

### 3.2 Mevcut Üye
- Profilime gidince kaç Deep Work'e, kaç Build Sprint'e katıldığımı görürüm
- Rozetlerimi profilimde gösterebilir, paylaşabilirim
- "Co-founder arıyorum" veya "Fikir aşamasındayım" etiketimi güncelleyebilirim
- Bir etkinliğe gitmeden önce kimin geleceğini önceden görebilirim
- linkedin post tamplate'i indirip linkedin hesabında paylaşabilir

### 3.3 Builder Eşleşme
- Admin onayından geçersem ciddi builder havuzuna girerim
- Sistem beni başka bir ciddi builderla ikili eşleştirir
- Eşleşme bildirimini alırım

### 3.4 Admin
- Ciddi builder başvurularını inceleyebilirim, red yada kabul edebilirim
- Tüm etkinlik ve proje içeriklerini yönetebilirim
- Analitik dashboard'u görebilirim

---

## 4. Özellik Listesi

### 4.1 Genel Site & Marketing Yüzeyi

**F-01 — Landing Page**  
ABC'yi anlatan hero section, upcoming event kartı, öne çıkan projeler, üye sayacı. Call-to-action: "Topluluğa Katıl."

**F-02 — Gizli Easter Egg Kutusu**  
Site içinde görsel olarak gizlenmiş küçük bir kutu/element. Bulanı tebrik eden ve küçük bir sürpriz (özel rozet vesaire) veren bir modal açılır. Kutunun yeri admin panelinden değiştirilebilir.

---

### 4.2 Üye Kaydı & Onboarding

**F-03 — Kayıt Akışı**  
Çok adımlı onboarding:

1. E-posta & şifre(oauth kullanmayalım,insaların luma hesaplarındaki mailli ile girmesine teşfik edilebilir placeholder ile (luma kullanıyorsanız o mailiniz ile giriniz gibisinden))
2. Ad / Soyad

burdan sonra onbordingte yapalım

 Konum (şehir bazlı — ilerleyen etkinlik önerisi için kullanılır)
 Genel Unvan (Yazılımcı, Tasarımcı, Salesman, Ürün, Öğrenci, Diğer)
 Bio
 LinkedIn URL
 E-posta (opsiyonel — farklı bir e-posta göstermek isteyenler için)
 Proje var mı? → Evet ise "Proje Ekle" formu (isim, açıklama, kategori, URL opsiyonel)

**F-04 — Profil Sayfası**  
Her üyenin public profil sayfası:
- Ad, unvan,LinkedIn
- Rozetler (görsel, sıralı)
- Etkinlik katılım geçmişi
- Aktif etiket: `Co-founder arıyorum` / `Fikir arıyorum` / `Takım tamamlandı` / `Sadece build ediyorum`
- Projeleri

---

### 4.3 Badge Sistemi

**F-05 — Otomatik Rozet Kazanımı**  
Rozetler yalnızca görsel/profil amaçlıdır, herhangi bir erişim kilidi açmaz.

Katılım verisi **Luma API üzerinden otomatik** cekilir — admin manuel isaret yapmaz. Sistem etkinlik bitisinden sonra Luma'dan attendance datasini senkronize eder, eslesen uyelere rozet atar.

**Luma to Rozet akisi:**
1. Etkinlik Luma'da olusturulur, ABC uyesinin Luma e-postasi ile sitedeki e-postasi eslestirilir
2. Luma API `/v1/event/get-guests` endpoint'i ile katilim verisi cekilir
3. Etkinlik tipine gore (Deep Work / Build Sprint) ilgili sayac guncellenir
4. Esik asilirsa rozet otomatik atanir

| Rozet | Tetikleyici | Luma Veri Kaynagi |
|---|---|---|
| 5x Builder | 5 Deep Work | kumutatif sayac |
| 10x Builder | 10 Deep Work | kumulatif sayac |
| Sprint Veteran | 5 Build Sprint | kumulatif sayac |
| Connector | Co-founder eslesmesi tamamlandi | platform ici tetikleyici |
| Easter Hunter | Easter egg bulundu | platform ici tetikleyici |
| Core Builder | Ozel — admin atar | manuel |

Rozetler admin panelinden manuel de eklenebilir. Luma hesabi olmayan uyeler icin fallback: admin tek seferlik toplu ice aktarma yapabilir.

---
### Sponsor sayfası 
Sponsorlara atabileceğimiz bir sayfa



### 4.4 Etkinlik Sistemi

**F-06 — Etkinlik Listesi & Detay Sayfası**  
Etkinlik verisi doğrudan **Luma API'dan çekilir** — websiteye ayrıca manuel veri girilmez. Luma, source of truth olarak kalır.

Luma'dan çekilen alanlar: isim, tarih, konum, kapasite, açıklama, cover görseli, kayıt URL'si, katılımcı sayısı. Sitede her etkinlik kartı bu veriyle otomatik güncellenir. "Kayıt Ol" butonu kullanıcıyı Luma sayfasına yönlendirir.

**F-08 bağlantısı:** Etkinlik bitişinden sonra Luma attendance verisi çekilerek hem rozet tetiklenir hem de etkinlik sonrası öneri sistemi (F-08) aktive edilir — tüm akış otomatik, admin müdahalesi gerekmez.

**F-07 — Konum Bazlı Katılımcı Tahmini**  
Etkinlik detay sayfasında, etkinliğin yapılacağı ilçe ile eşleşen üyeler listelenir (konum bilgisine göre). onlara mail atılır(mail service pahalı gelirse sadece gösterebiliriz),

**F-08 — Etkinlik Sonrası Builder Önerisi**  
Etkinlik tarihinden 7 gün sonra otomatik tetiklenen sistem:
- Etkinliğe katılan üyelere e-posta / bildirim gönderilir

**F-08-1 — Etkinlik öncesi Builder istatistiği**  
Etkinlik tarihinden 3 gün önce otomatik tetiklenen sistem:
- Etkinliğe katılan üyelerin rolleri dağılımı gösterilir mail atılır.


---

### 4.5 Projeler Dizini

**F-09 — Projeler Sayfası**  
Tüm üye projelerinin listelendiği, filtrelenebilir sayfa.

Filtreler:
- Kategori (AI, SaaS, Mobile, Sosyal Etki, Diğer)
- Durum (Fikir, MVP, Canlı, Pivot, kapalı)
- Üye sayısı (Solo, Takım)
- Tarih (En yeni, En eski)
- fotoğraf ve link

Her proje kartında: isim, açıklama, kurucu(lar), kategori, durum, URL (varsa).

---

### 4.6 Builder Dizini

**F-10 — Builder'lar Sayfası**  
Tüm üyelerin listelendiği, filtrelenebilir sayfa.

Filtreler:
- Unvan (Yazılımcı, Tasarımcı, Salesman, Ürün )
- bio
- Etiket (Co-founder arıyorum, Fikir arıyorum vs.)
- Konum (şehir)
- Rozet sayısı (Aktiflik göstergesi olarak)

---

### 4.7 Ciddi Builder Eşleştirme

**F-11 — Başvuru**  
Üye profil sayfasından "Ciddi Builder Eşleşmesine Başvur" butonu. Kısa form: motivasyon (max 280 karakter), beklenti, haftalık müsaitlik.

**F-12 — Admin Onayı**  
Admin panelinde başvurular listelenir. Admin onaylarsa kişi "Ciddi Builder" havuzuna girer.

**F-13 — İkili Eşleştirme**  
Admin panelinden veya haftada bir otomatik tetikleyiciyle: havuzdaki eşleşmemiş iki builder eşleştirilir. Eşleşme kriteri: farklı unvan (Yazılımcı ↔ Salesman gibi tamamlayıcı skill), farklı aktif etiket (ikisi de "Co-founder arıyorum" olamaz). Her iki kullanıcıya e-posta bildirimi gönderilir, "Bağlantıyı Kabul Et" linki ile.

---

### 4.8 RAG Chatbot

**F-14 — ABC Bilgi Chatbotu**  
Site üzerinde sağ alt köşede chatbot ikonu. Yanıtladığı konular:

- ABC nedir, nasıl katılınır
- Etkinlik programları ve lokasyonlar
- Deep Work / Build Sprint nedir
- Sponsorluk ve iş birliği
- Sık sorulan sorular

Bilgi tabanı: ABC hakkında derlenen Markdown dokümanlar (FAQ, etkinlik geçmişi, kural ve değerler). Admin panelinden yeni doküman eklenebilir / güncellenebilir. Chatbot genel web araması yapmaz, yalnızca ABC dokümanlarına dayanır.

---

### 4.9 Admin Paneli

**F-15 — İçerik Yönetimi**  
Etkinlik içeriği oluşturma/düzenleme/silme, builder profillerini görme ve düzenleme.

**F-16 — Rozet & Eşleştirme Yönetimi**  
Manuel rozet atama, ciddi builder başvurularını onaylama/reddetme, eşleştirme tetikleme, eşleşme geçmişi görüntüleme.

**F-17 — Chatbot Doküman Yönetimi**  
RAG için kullanılan dokümanları yükleme, güncelleme, silme.

**F-18 — Easter Egg Yönetimi**  
Kutunun sitedeki konumunu değiştirme, sürpriz içeriğini güncelleme, kaç kişinin bulduğunu görme.

**F-19 — Analitik**  
Hotdog veya Mixpanel entegrasyonu:
- Sayfa bazlı ziyaret ve dönüşüm
- Kayıt ve onboarding tamamlanma oranı
- En çok görüntülenen profiller ve projeler
- Etkinlik katılım oranları
- Easter egg bulma oranı
- Chatbot kullanım istatistikleri

---

### 4.10 LinkedIn Post Generator

**F-20 — LinkedIn Kart & Post Üreteci**  
Üyenin profilinden tek tıkla erişebildiği, görsel kart + LinkedIn post metni üreten araç. Fotoğraf yüklenmez — ABC marka kimliğiyle tasarlanmış şablonlar üzerinden çalışır.

**Şablonlar:**

| Şablon | Hedef Mesaj |
|---|---|
| Co-founder arıyorum | Teknik / iş geliştirme ortağı arayanlar için |
| Ekip kuruyorum | Belirli bir role (tasarım, satış vb.) adam arayanlar için |
| Fikir aşamasındayım | Fikri olan, konuşmak ve test etmek isteyenler için |
| Ürün launch ettim | MVP veya canlıya alma duyurusu yapanlar için |
| Build Sprint'teydim | Etkinlik sonrası build-in-public paylaşımı |
| Özel | Kullanıcı kendi başlık ve metnini yazar |

**Kullanıcı akışı:**
1. Profil sayfasından "LinkedIn Kartı Oluştur" butonuna tıklar
2. Şablonu seçer
3. Ad, unvan ve varsa özel metni düzenler
4. Kart renk temasını seçer (ABC brand palette içinden)
5. Görsel önizlemede kartı görür
6. "Görseli İndir" (PNG) ve "Metni Kopyala" butonları ile LinkedIn'e hazır içeriği alır

**Teknik notlar:**
- Kart render: Canvas API veya html2canvas ile PNG export
- Post metni: şablona göre otomatik üretilir, kullanıcı düzenleyebilir
- Renk paleti: ABC brand renklerine kilitli (serbest renk seçimi yok)
- Ad ve unvan bilgisi profil verisinden otomatik doldurulur, kullanıcı override edebilir
- Admin panelinden yeni şablon eklenebilir, mevcut şablonların metni güncellenebilir


---


## 5. Teknik Gereksinimler

### 5.1 Önerilen Stack
next.js 

### 5.2 Auth
supabase

---

## 6. Özellik Önceliklendirmesi

### 6.1 RICE Skoru

RICE = **(Reach × Impact × Confidence) / Effort**

**Skor aralıkları:**

| Parametre | Ölçek |
|---|---|
| Reach | Aylık kaç üyeyi etkiler (kişi sayısı tahmini) |
| Impact | 1 = Minimal, 2 = Düşük, 3 = Orta, 4 = Yüksek, 5 = Kritik |
| Confidence | % olarak (ekip bu tahmine ne kadar güveniyor) |
| Effort | Kişi-hafta (1 geliştirici varsayımıyla) |

| # | Özellik | Reach | Impact | Confidence | Effort (kişi-hafta) | RICE Skoru |
|---|---|---|---|---|---|---|
| F-01 | Landing Page | 500 | 5 | 95% | 1 | **2375** |
| F-03 | Kayıt & Onboarding | 500 | 5 | 90% | 2 | **1125** |
| F-04 | Profil Sayfası | 200 | 4 | 90% | 2 | **360** |
| F-06 | Etkinlik Listesi & Detay | 400 | 4 | 90% | 1.5 | **960** |
| F-09 | Projeler Dizini | 300 | 3 | 85% | 1 | **765** |
| F-10 | Builder Dizini | 300 | 3 | 85% | 1 | **765** |
| F-05 | Badge Sistemi | 200 | 3 | 80% | 1.5 | **320** |
| F-15 | Admin — İçerik Yönetimi | 5 | 5 | 95% | 2 | **11.9** → normalize: **238** |
| F-19 | Analitik | 5 | 4 | 85% | 1 | **17** → normalize: **170** |
| F-20 | LinkedIn Post Generator | 200 | 4 | 85% | 1.5 | **453** |
| F-07 | Konum Bazlı Katılımcı | 150 | 3 | 70% | 1 | **315** |
| F-08 | Etkinlik Sonrası Öneri | 100 | 4 | 70% | 2 | **140** |
| F-11 | Ciddi Builder Başvurusu | 50 | 5 | 75% | 1 | **187.5** |
| F-12 | Admin Onay (Builder) | 5 | 5 | 80% | 0.5 | **40** → normalize: **200** |
| F-13 | İkili Eşleştirme | 50 | 5 | 70% | 2 | **87.5** |
| F-16 | Rozet & Eşleştirme Yönetimi | 5 | 4 | 80% | 1 | **16** → normalize: **160** |
| F-14 | RAG Chatbot | 300 | 3 | 60% | 4 | **135** |
| F-17 | Chatbot Doküman Yönetimi | 5 | 3 | 70% | 1 | **10.5** → normalize: **105** |
| F-02 | Easter Egg | 200 | 2 | 65% | 1.5 | **173** |
| F-18 | Easter Egg Yönetimi | 5 | 2 | 70% | 0.5 | **14** → normalize: **70** |

> **Not:** Admin/internal özellikler (Reach = 5 admin kullanıcı) ham RICE'da küçük görünür ama operasyonel zorunluluk taşır; bunlar MoSCoW'da ayrıca değerlendirilir.

---

### 6.2 RICE Sıralaması (Yüksekten Düşüğe)

| Sıra | # | Özellik | RICE Skoru | Faz |
|---|---|---|---|---|
| 1 | F-01 | Landing Page | 2375 | Faz 1 |
| 2 | F-03 | Kayıt & Onboarding | 1125 | Faz 1 |
| 3 | F-06 | Etkinlik Listesi & Detay | 960 | Faz 1 |
| 4 | F-09 | Projeler Dizini | 765 | Faz 1 |
| 5 | F-10 | Builder Dizini | 765 | Faz 1 |
| 6 | F-04 | Profil Sayfası | 360 | Faz 1 |
| 7 | F-07 | Konum Bazlı Katılımcı | 315 | Faz 2 |
| 8 | F-05 | Badge Sistemi | 320 | Faz 1 |
| 8b | F-20 | LinkedIn Post Generator | 453 | Faz 2 |
| 9 | F-15 | Admin — İçerik Yönetimi | 238* | Faz 1 |
| 10 | F-12 | Admin Builder Onayı | 200* | Faz 2 |
| 11 | F-11 | Ciddi Builder Başvurusu | 188 | Faz 2 |
| 12 | F-19 | Analitik | 170* | Faz 2 |
| 13 | F-16 | Rozet & Eşleştirme Yönetimi | 160* | Faz 2 |
| 14 | F-08 | Etkinlik Sonrası Öneri | 140 | Faz 2 |
| 15 | F-14 | RAG Chatbot | 135 | Faz 3 |
| 16 | F-13 | İkili Eşleştirme | 88 | Faz 2 |
| 17 | F-02 | Easter Egg | 173 | Faz 3 |
| 18 | F-17 | Chatbot Doküman Yönetimi | 105 | Faz 3 |
| 19 | F-18 | Easter Egg Yönetimi | 70* | Faz 3 |

*Admin özelliklerinde normalize edilmiş skor kullanılmıştır.

---

### 6.3 MoSCoW

#### Must Have (MVP — Faz 1)
Ürün kullanılamaz olmadan bunlar tamamlanmalı.

| # | Özellik | Gerekçe |
|---|---|---|
| F-01 | Landing Page | Gelen herkes buraya düşer; dönüşümün başlangıç noktası |
| F-03 | Kayıt & Onboarding | Platforma giriş kapısı, sıfır kullanıcı olmadan hiçbir şey çalışmaz |
| F-04 | Profil Sayfası | Kimlik katmanı; rozet, proje, etiket hepsinin evi |
| F-05 | Badge Sistemi | Mevcut üye retention'ının temel motivasyon aracı |
| F-06 | Etkinlik Listesi & Detay | ABC'nin ana aktivitesi; olmadan platform içeriksiz kalır |
| F-09 | Projeler Dizini | Sponsorlara ve yeni üyelere topluluğun üretkenliğini kanıtlar |
| F-10 | Builder Dizini | Hem yeni üye keşfi hem mevcut üye networking'i için kritik |
| F-15 | Admin — İçerik Yönetimi | İçerik yönetilemezse platform işletilemez |

#### Should Have (Faz 2)
Ürün değerini önemli ölçüde artırır; MVP sonrası ilk hedef bunlar.

| # | Özellik | Gerekçe |
|---|---|---|
| F-07 | Konum Bazlı Katılımcı Tahmini | Etkinliğe gitmeden kimin geleceğini görmek katılımı artırır |
| F-08 | Etkinlik Sonrası Builder Önerisi | Networking'i otomatikleştiren, retention'ı güçlendiren özellik |
| F-11 | Ciddi Builder Başvurusu | ABC'nin en güçlü değer önerisi; solo founder sorununa çözüm |
| F-12 | Admin Builder Onayı | F-11 olmadan çalışmaz, bağımlı özellik |
| F-13 | İkili Eşleştirme | F-11 ve F-12 olmadan çalışmaz, bağımlı özellik |
| F-16 | Rozet & Eşleştirme Yönetimi | Admin operasyonu için gerekli |
| F-19 | Analitik | Ürün kararlarını veri ile almak için zorunlu |
| F-20 | LinkedIn Post Generator | ABC görünürlüğünü organik büyütür; üye paylaşımı yeni üye çeker |

#### Could Have (Faz 3)
Güzel olur ama MVP ve community features'a engel değil.

| # | Özellik | Gerekçe |
|---|---|---|
| F-02 | Easter Egg | Viral potansiyeli var ama temel fonksiyon değil |
| F-14 | RAG Chatbot | SSS yükünü azaltır; Faz 1-2 tamamlanmadan doküman tabanı oluşmaz |
| F-17 | Chatbot Doküman Yönetimi | F-14 bağımlısı |
| F-18 | Easter Egg Yönetimi | F-02 bağımlısı |

#### Won't Have (Bu Versiyon)
Kapsam dışı, ileride değerlendirilebilir.

- Mobil uygulama (web responsive yeterli)
- Gerçek zamanlı in-app chat / mesajlaşma
- Ödeme / sponsorluk sistemi
- Çok dilli destek (TR/EN karar bekliyor)

---

## 7. Tasarım Prensipleri

- ABC renk dili ve brand identity'ye uygun (mevcut Canva iş akışlarıyla tutarlı)
- Mobil uyumlu (responsive)
- Easter egg için: merak uyandıran ama göze batmayan bir gizleme

---

## 8. Başarı Metrikleri

| Metrik | Hedef (1 ay) |
|---|---|
| Kayıtlı üye sayısı | Mevcut ABC üyelerinin %80'i |
| Onboarding tamamlama oranı | >%70 |
| Aylık aktif üye (profil güncelleyen) | >%30 |
| Ciddi builder eşleşme sayısı | Ayda min 4 eşleşme |
| Easter egg bulma | Aylık ziyaretçilerin %5'i |

---


## 10. Faz Planı

**Faz 1 — Core Platform (2 gün)**  
Landing page, kayıt/onboarding, profil, badge sistemi, etkinlik listesi, projeler dizini, builder dizini, admin temel içerik yönetimi.

**Faz 2 — Community Features (2 gün)**  
Konum bazlı katılımcı tahmini, etkinlik sonrası öneri sistemi, ciddi builder eşleştirme, analitik.

**Faz 3 — Intelligence Layer (gerek yok)**  
RAG chatbot, chatbot doküman yönetimi, easter egg, gelişmiş admin analitikleri.
