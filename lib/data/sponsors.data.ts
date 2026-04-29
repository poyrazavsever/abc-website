export const partnerContactEmail = "hello@ankarabuildclub.com";
export const partnerContactHref =
  "mailto:hello@ankarabuildclub.com?subject=Ankara%20Build%20Club%20partnerlik%20g%C3%B6r%C3%BC%C5%9Fmesi";

type SponsorHero = {
  eyebrow: string;
  title: string;
  description: string;
  highlights: string[];
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  asideTitle: string;
  asideDescription: string;
  asideItems: string[];
};

type SponsorProofItem = {
  title: string;
  description: string;
};

type SponsorProgramItem = {
  name: string;
  rhythm: string;
  format: string;
  outcome: string;
  partnerValue: string;
};

type SponsorShowcaseItem = {
  title: string;
  description: string;
  outputs: string[];
};

type SponsorModelItem = {
  title: string;
  summary: string;
  fit: string;
};

type SponsorContactStep = {
  step: string;
  title: string;
  description: string;
};

type SponsorsPageData = {
  hero: SponsorHero;
  community: {
    eyebrow: string;
    heading: string;
    description: string;
    proofItems: SponsorProofItem[];
  };
  programs: {
    eyebrow: string;
    heading: string;
    description: string;
    items: SponsorProgramItem[];
  };
  showcase: {
    eyebrow: string;
    heading: string;
    description: string;
    noteTitle: string;
    noteDescription: string;
    items: SponsorShowcaseItem[];
  };
  partnership: {
    eyebrow: string;
    heading: string;
    description: string;
    models: SponsorModelItem[];
    contactFlow: SponsorContactStep[];
    closingTitle: string;
    closingDescription: string;
    responseWindow: string;
  };
};

export const sponsorsPageData: SponsorsPageData = {
  hero: {
    eyebrow: "Sponsor ve Partnerlik",
    title: "Builder Ritmine Doğrudan Temas Eden İş Birlikleri Kurun.",
    description:
      "Shipin, topluluğun üretim karakterini ve ritmini anlamaya dayalı, tek seferlik değil sürekli temas eden iş birlikleri kurmayı tercih ediyoruz. .",
    highlights: [
      "Ankara merkezli fiziksel topluluk",
      "Etkinlik ve build ritmi odaklı",
      "Üretim ve görünürlük eksenli ortaklıklar",
    ],
    primaryCtaLabel: "Partnerlik Maili Başlat",
    secondaryCtaLabel: "Etkinlik Yapısını İncele",
    asideTitle: "Bu sayfa kimler için uygun",
    asideDescription:
      "Dış paydaşın topluluğu anlamasını ve hızlı aksiyon alabilmesini kolaylaştıran net bir özet.",
    asideItems: [
      "Etkinlik partnerliği değerlendiren markalar",
      "Builder'lara araç, kredi veya altyapı desteği sunan ekipler",
      "Toplulukla ortak içerik, rapor veya program kurgulamak isteyen kurumlar",
    ],
  },
  community: {
    eyebrow: "Topluluk Özeti",
    heading:
      "ABC, bir networking vitrini değil; birlikte üretmeye dayalı bir çalışma zemini.",
    description:
      "Topluluğun temel değeri; insanları yalnızca bir araya getirmek değil, birlikte bir şey çıkarmaya zorlayan ritimler kurmaktır. Bu ritim sponsor için daha anlamlı temas, daha gerçek geri bildirim ve daha doğal görünürlük sağlar.",
    proofItems: [
      {
        title: "Builder odağı",
        description:
          "Toplulukta ürün, kod, tasarım, growth ve operasyon tarafında aktif üreten insanlar bir araya gelir.",
      },
      {
        title: "Ankara'da fiziksel ritim",
        description:
          "Yerel buluşmalar, düzenli geri dönüş ve tekrar eden etkinlikler sayesinde ilişki tek seferlik kalmaz.",
      },
      {
        title: "Üretim görünürlüğü",
        description:
          "Etkinlikler yalnızca buluşma değil; demo, ship, feedback ve build-in-public anları üretir.",
      },
      {
        title: "Partner için net temas alanı",
        description:
          "Araç desteği, etkinlik partnerliği veya ortak içerik gibi modeller topluluğun doğal akışına gömülebilir.",
      },
    ],
  },
  programs: {
    eyebrow: "Etkinlik Yapısı",
    heading: "Topluluğun ritmi farklı formatların birlikte çalışmasıyla kurulur.",
    description:
      "Her format farklı bir ihtiyaca hizmet eder: odaklanma, hızlı üretim, çıktı paylaşımı ve topluluk içi geri bildirim. Partnerlik modelleri bu yapıların her birine farklı şekilde yerleştirilebilir.",
    items: [
      {
        name: "Deep Work",
        rhythm: "Düzenli tekrar eden odak seansı",
        format:
          "Katılımcılar gün için hedefini netleştirir, ardından kesintisiz üretim ve sonrasında kısa networking akışı gelir.",
        outcome:
          "Odaklı çalışma, birbirinin işine tanık olma ve topluluk içi süreklilik.",
        partnerValue:
          "Araç denemesi, kredi desteği veya builder enablement mesajları için doğal bir temas zemini sunar.",
      },
      {
        name: "Build Sprint",
        rhythm: "Daha yüksek enerji ve ekipli üretim formatı",
        format:
          "Builder'lar bir araya gelir, hızlı iterasyonlar yapar, gün içinde eğitim ve paylaşımlarla çıktıya yaklaşır.",
        outcome:
          "Prototipler, MVP ilerlemesi, demo anları ve daha güçlü ekip içi bağlar.",
        partnerValue:
          "Etkinlik partnerliği, teknik altyapı desteği ve ürün deneyimini görünür kılan entegrasyonlar için uygundur.",
      },
      {
        name: "Ship Day",
        rhythm: "Tek günlük çıktı odaklı teslim ritmi",
        format:
          "Katılımcı ne ship edeceğini baştan ilan eder ve gün sonunda çıktısını yayınlar ya da demo eder.",
        outcome:
          "Net teslim tarihi, somut çıktı ve paylaşılabilir build hikayeleri.",
        partnerValue:
          "Demo günü, içerik ortaklığı ve partner markanın build anına temas ettiği görünürlük noktası oluşturur.",
      },
    ],
  },
  showcase: {
    eyebrow: "Proje Vitrini",
    heading:
      "Toplulukta görünen değer, tek tip bir üründen değil; farklı çıktı türlerinin birikiminden gelir.",
    description:
      "Bu alan gerçek proje verisi ya da sponsor logosu yerine, Ankara Build Club içinde sıkça üretilen build kategorilerini anlatır. Amaç sahte bir portfolyo göstermek değil, topluluğun üretim karakterini anlatmaktır.",
    noteTitle: "Not",
    noteDescription:
      "Buradaki başlıklar doğrudan referans proje listesi değil; toplulukta üretilen iş tiplerini ve paylaşılabilir build alanlarını anlatan küratörlü örneklerdir.",
    items: [
      {
        title: "AI araçları ve otomasyon akışları",
        description:
          "Küçük ekiplerin daha hızlı çalışmasını sağlayan otomasyonlar, workflow yardımcıları ve deneysel AI ürünleri.",
        outputs: ["MVP akışları", "iç araçlar", "deneysel entegrasyonlar"],
      },
      {
        title: "SaaS ve operatör ürünleri",
        description:
          "Gerçek bir problemi dar kapsamda çözmeye odaklı dashboard, panel, workflow ve operasyon ürünleri.",
        outputs: ["yönetim panelleri", "niş SaaS fikirleri", "servis katmanları"],
      },
      {
        title: "Launch ve growth deneyleri",
        description:
          "Landing page, positioning, onboarding ve ilk kullanıcı geri bildirimi eksenli testler.",
        outputs: [
          "landing iterasyonları",
          "go-to-market denemeleri",
          "copy testleri",
        ],
      },
      {
        title: "Topluluk içi build çıktıları",
        description:
          "Etkinliklerde paylaşılan demo'lar, ship edilen küçük feature'lar ve birlikte yapılan geri bildirim turları.",
        outputs: ["demo anları", "feedback turları", "build-in-public paylaşımları"],
      },
    ],
  },
  partnership: {
    eyebrow: "İş Birliği Modelleri",
    heading: "Partnerlik, topluluğun akışına uyduğunda daha anlamlı hale gelir.",
    description:
      "Ankara Build Club içinde en iyi sonuç veren modeller, topluluğun ritmine eklemlenen ve builder'a doğrudan fayda sunan modellerdir. Yüzeysel branding yerine, gerçek temas ve kullanım üreten ortaklıkları tercih ediyoruz.",
    models: [
      {
        title: "Etkinlik partnerliği",
        summary:
          "Belirli bir Deep Work, Build Sprint veya Ship Day formatını destekleyen görünür ortaklık modeli.",
        fit:
          "Etkinlikte varlık göstermek, doğrudan topluluğa temas etmek ve ilgili bir bağlamda konumlanmak isteyen ekipler için.",
      },
      {
        title: "Builder enablement desteği",
        summary:
          "Topluluğun daha iyi build etmesini sağlayan eğitim, mentorluk, office hour veya kaynak desteği modeli.",
        fit:
          "Topluluğa yalnızca logo değil, çalışmayı hızlandıran uzmanlık veya süreç desteği sunmak isteyen partnerler için.",
      },
      {
        title: "Tool / kredi / altyapı desteği",
        summary:
          "Builder'ların gerçekten kullanabileceği yazılım, API kredisi, altyapı, dataset veya araca erişim modeli.",
        fit:
          "Ürünün doğrudan builder workflow'una girdiği, deneme ve kullanıma dayalı daha derin temas arayan partnerler için.",
      },
      {
        title: "İçerik / rapor / topluluk iş birliği",
        summary:
          "Topluluktan doğan gözlem ve üretim anlatılarını birlikte paketleyen rapor, içerik ya da özel program modeli.",
        fit:
          "Ankara'daki build kültürünü daha iyi anlamak, anlatmak veya özel bir topluluk hikayesi üretmek isteyen kurumlar için.",
      },
    ],
    contactFlow: [
      {
        step: "01",
        title: "Kısa tanıtım maili",
        description:
          "Ne yapmak istediğinizi, hangi formatla ilgilendiğinizi ve topluluğa ne tür bir fayda sunabileceğinizi kısa bir mail ile iletin.",
      },
      {
        step: "02",
        title: "İhtiyaç uyumu görüşmesi",
        description:
          "Topluluğun ritmi, etkinlik yapısı ve sizin beklentiniz arasında gerçek bir uyum var mı diye birlikte bakılır.",
      },
      {
        step: "03",
        title: "Özel partnerlik planı ve geri dönüş",
        description:
          "Uygun format netleşirse kapsam, zamanlama, görünürlük ve sorumluluklar içeren net bir partnerlik planı oluşturulur.",
      },
    ],
    closingTitle:
      "Ankara Build Club ile anlamlı bir partnerlik başlatmak istiyorsanız bize yazın.",
    closingDescription:
      "İçerikten etkinliğe, altyapıdan builder enablement'a kadar farklı modelleri birlikte kurgulayabiliriz. İlk adım için kısa bir tanıtım maili yeterli.",
    responseWindow: "Hafta içi 24 saat içinde geri dönüş",
  },
};
