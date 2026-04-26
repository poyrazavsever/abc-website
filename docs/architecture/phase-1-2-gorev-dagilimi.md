# Faz 1 ve Faz 2 Feature Bazlı Görev Planı

Bu doküman, işleri teknik katmanlara bölmek yerine doğrudan sayfa ve feature bazlı tanımlar.

Temel yaklaşım:
- Her issue tek başına anlamlı bir feature olmalı
- Aynı issue içinde UI, servis, veri modeli, entegrasyon ve son bağlama tamamlanmalı
- "Önce UI hazırla, sonra servis yaz, sonra bağla" gibi parçalı iş akışı yerine, iş uçtan uca kapatılmalı
- Issue başlıklarında kişi adı, faz adı veya teknik alt görev kırılımı yer almamalı

## Feature Bazlı Issue Listesi

#### Issue 01
Title: Landing page ve topluluk vitrini deneyimini tamamla

Desc: Ana sayfayı, PRD'deki marketing hedeflerini karşılayacak şekilde uçtan uca tamamla. Hero alanı, yaklaşan etkinlik bölümü, öne çıkan projeler alanı, topluluk sayacı, net CTA akışları ve Ankara Build Club'ın ne olduğunu ilk bakışta anlatan içerik yapısı bu işin içinde olmalı. Sayfa sadece görsel olarak tamamlanmış olmamalı; gerçek veriyle beslenebilecek yapıda hazırlanmalı ve gerektiği yerde ilgili servis bağlantıları da kurulmalı. Kullanıcı ana sayfaya geldiğinde hem topluluğu anlamalı hem de kayıt veya etkinlik akışına rahatça geçebilmelidir.

#### Issue 02
Title: Giriş, kayıt ve oturum yönetimi akışını tamamla

Desc: Kullanıcının kayıt olabildiği, giriş yapabildiği, oturumunun güvenli biçimde yönetildiği ve çıkış yapabildiği auth deneyimini uçtan uca tamamla. `login` ve `register` ekranları, form doğrulamaları, hata ve loading durumları, başarılı giriş sonrası yönlendirme, session kontrolü ve korumalı sayfalara erişim mantığı bu işin parçası olmalı. İş bittiğinde auth tarafı sadece tasarım olarak değil, gerçek kullanıcı akışını çalıştıracak seviyede hazır olmalıdır.

#### Issue 03
Title: Çok adımlı onboarding akışını tamamla

Desc: Kayıt sonrası kullanıcının profilini tamamladığı onboarding sürecini uçtan uca hazırla. Ad-soyad, konum, genel unvan, bio, LinkedIn URL, görünür e-posta ve proje ekleme akışı bu feature içinde yer almalı. Arayüz adım adım ilerlemeli, eksik veri ve doğrulama durumları anlaşılır olmalı ve girilen bilgiler doğrudan kalıcı veri katmanına yazılabilmeli. İş tamamlandığında onboarding sadece form ekranı değil, çalışan bir profil tamamlama akışı haline gelmelidir.

#### Issue 04
Title: Public profil ve kullanıcı profil yönetimi deneyimini tamamla

Desc: Hem topluluğa açık public profil sayfasını hem de kullanıcının kendi profilini yönettiği `dashboard/profile` deneyimini tamamla. Profil özeti, unvan, LinkedIn bilgisi, bio, aktif etiketler, rozetler, etkinlik katılım geçmişi ve projeler tek bir bütünlüklü kullanıcı deneyimi olarak ele alınmalı. Gerekli veri okuma ve güncelleme akışları bağlanmalı, profil ekranı statik vitrin olmaktan çıkıp gerçek kullanıcı verisiyle çalışan bir modüle dönüşmelidir.

#### Issue 05
Title: Etkinlikler modülünü Luma entegrasyonu ile tamamla

Desc: Etkinlik listeleme ve etkinlik detay sayfalarını, veri kaynağı Luma olacak şekilde uçtan uca tamamla. Etkinlik kartları, tarih, konum, kapasite, açıklama, cover görseli, kayıt bağlantısı ve detay sayfası deneyimi bu işin içinde olmalı. Kullanıcı etkinlikleri görüntüleyebilmeli, ilgili etkinliğe tıklayabilmeli ve Luma kayıt akışına geçebilmelidir. Bu feature tamamlandığında event modülü hem arayüz hem veri akışı açısından çalışır durumda olmalıdır.

#### Issue 06
Title: Rozet sistemi ve etkinlik katılımına bağlı rozet kazanım akışını tamamla

Desc: Kullanıcıların etkinlik katılımına göre rozet kazanabildiği sistemi uçtan uca geliştir. Luma attendance verisinin sisteme alınması, katılım sayaçlarının güncellenmesi, rozet eşiklerinin kontrol edilmesi ve profil üzerinde rozetlerin doğru şekilde gösterilmesi bu işin kapsamındadır. Gerekiyorsa admin tarafından manuel rozet atama desteği de aynı feature içinde ele alınmalı. İş bittiğinde rozet sistemi hem veri tarafında hem kullanıcı tarafında görünür ve çalışır olmalıdır.

#### Issue 07
Title: Projeler dizini ve kullanıcı proje yönetimi modülünü tamamla

Desc: Topluluktaki projelerin listelendiği dizin ile kullanıcının kendi projelerini eklediği ve yönettiği akışı tek feature olarak tamamla. Proje kartları, filtreleme, sıralama, proje bilgisi gösterimi ve kullanıcının onboarding veya dashboard üzerinden proje ekleyip güncelleyebilmesi bu kapsamda ele alınmalı. Son durumda projeler hem vitrinde görünmeli hem de kullanıcı tarafından yönetilebilir olmalıdır.

#### Issue 08
Title: Builder dizini deneyimini tamamla

Desc: Tüm üyelerin listelendiği builder dizinini uçtan uca hazırla. Filtreler, unvan bilgisi, etiketler, konum, rozet görünürlüğü ve builder kartları bu işin merkezinde olmalı. Kullanıcı bu sayfadan topluluğu keşfedebilmeli, farklı builder profillerine geçebilmelidir. İş tamamlandığında builder dizini gerçek veriyle çalışan, aranabilir ve filtrelenebilir bir topluluk ekranı haline gelmelidir.

#### Issue 09
Title: Etkinlik detayında konum bazlı katılımcı tahmini ve öneri alanını tamamla

Desc: Etkinlik detay sayfasında, etkinliğin lokasyonu ile üyelerin profil konum bilgisini eşleştirerek öneri veya tahmin üreten alanı uçtan uca tamamla. Bu alanın veri mantığı, arayüzü, boş durumları ve kullanıcıya nasıl açıklanacağı aynı feature içinde ele alınmalı. Amaç, kullanıcıya o etkinlik çevresindeki potansiyel builder kitlesini göstermek ve etkinliği daha anlamlı hale getirmektir.

#### Issue 10
Title: Etkinlik öncesi ve sonrası öneri deneyimini tamamla

Desc: Etkinlikten önce katılımcı rol dağılımını gösterecek ve etkinlikten sonra kullanıcıya builder önerileri sunacak akışı tamamla. Veri üretimi, zamanlamaya bağlı backend mantığı, kullanıcıya gösterilecek alanlar ve gerekiyorsa bildirim/e-posta hazırlığı aynı iş içinde düşünülmeli. Bu feature bittiğinde etkinlikler sadece takvim öğesi değil, topluluk eşleşmesini besleyen aktif bir deneyim haline gelmelidir.

#### Issue 11
Title: Ciddi builder eşleşme modülünü tamamla

Desc: Kullanıcının ciddi builder eşleşmesine başvurabildiği, admin'in başvuruyu değerlendirebildiği ve sistemin uygun kullanıcıları eşleştirebildiği modülü uçtan uca tamamla. Başvuru formu, başvuru durumu, admin onay akışı, eşleştirme mantığı, kullanıcı bilgilendirmesi ve ilgili dashboard/admin ekranları aynı feature içinde bitirilmeli. İş tamamlandığında bu modül gerçek başvuru alabilen ve yönetilebilen bir sistem olmalıdır.

#### Issue 12
Title: LinkedIn kart ve post üretici deneyimini tamamla

Desc: Kullanıcının profil verisini kullanarak LinkedIn için paylaşılabilir kart ve metin üretebildiği aracı uçtan uca hazırla. Şablon seçimi, tema seçimi, canlı önizleme, metni kopyalama, görseli indirme ve gerekiyorsa admin tarafından yönetilen şablon yapısı bu kapsamda yer almalı. Feature tamamlandığında kullanıcı teknik yardım almadan LinkedIn paylaşımını hazırlayabilmelidir.

#### Issue 13
Title: Admin panelinin temel yönetim modüllerini tamamla

Desc: Admin panelinde içerik, builder, rozet ve temel operasyon yönetimi ekranlarını uçtan uca tamamla. Liste ekranları, detay/güncelleme akışları, aksiyon butonları, form yapıları ve ilgili servis bağlantıları aynı feature içinde çözülmeli. Amaç, admin tarafının ayrı ayrı ekran iskeletlerinden oluşması değil; gerçekten kullanılabilir bir yönetim alanına dönüşmesidir.

#### Issue 14
Title: Analytics veri toplama ve admin dashboard deneyimini tamamla

Desc: Kayıt, onboarding tamamlama, profil görüntülenkme, proje görüntülenme, etkinlik tıklama ve benzeri kritik aksiyonları izleyen analytics altyapısını ve bunu gösteren admin dashboard ekranını birlikte tamamla. Event toplama mantığı, veri şeması, dashboard kartları, tablolar veya grafikler tek bir feature olarak ele alınmalı. İş bittiğinde admin tarafı ürünün nasıl kullanıldığını anlamaya yarayan gerçek veriler görebilmelidir.

#### Issue 15
Title: Sponsor ve partner sayfasını tamamla

Desc: Sponsor veya iş birliği görüşmelerinde paylaşılabilecek, topluluğun değerini ve üretimini anlatan sponsor/partner sayfasını hazırla. Bu sayfada topluluk özeti, etkinlik yapısı, proje vitrini, potansiyel iş birliği modeli ve iletişim akışı net şekilde sunulmalı. Sayfa, dış paydaşların Ankara Build Club'ı hızlıca anlamasını ve iletişime geçmesini kolaylaştırmalıdır.

## Notlar

- Her issue tek kişiye atanıp baştan sona kapatılabilecek büyüklükte düşünülmelidir.
- Bir feature'ın UI, servis, veri modeli ve entegrasyonu aynı issue içinde tamamlanmalıdır.
- Faz 1 ve Faz 2 kapsamı bu listeye birlikte yedirilmiştir; issue başlığında ayrıca faz belirtilmez.
