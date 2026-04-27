export const partnerContactEmail = "hello@ankarabuildclub.com";
export const partnerContactHref =
  "mailto:hello@ankarabuildclub.com?subject=Ankara%20Build%20Club%20partnerlik%20gorusmesi";

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
    title: "Ankara'daki builder ritmine dogrudan temas eden is birlikleri kurun.",
    description:
      "Ankara Build Club; builder'lari, operatorleri ve urun odakli ekipleri ayni ritimde bulusturan bir topluluk alani kurar. Sponsor ve partnerlik gorusmelerinde paylasilabilecek bu sayfa, toplulugun nasil calistigini ve nasil deger urettigini hizlica anlatir.",
    highlights: [
      "Ankara merkezli fiziksel topluluk",
      "Etkinlik ve build ritmi odakli",
      "Uretim ve gorunurluk eksenli ortakliklar",
    ],
    primaryCtaLabel: "Partnerlik maili baslat",
    secondaryCtaLabel: "Etkinlik yapisini incele",
    asideTitle: "Bu sayfa kimler icin uygun",
    asideDescription:
      "Dis paydasin toplulugu anlamasini ve hizli aksiyon alabilmesini kolaylastiran net bir ozet.",
    asideItems: [
      "Etkinlik partnerligi degerlendiren markalar",
      "Builder'lara arac, kredi veya altyapi destegi sunan ekipler",
      "Toplulukla ortak icerik, rapor veya program kurgulamak isteyen kurumlar",
    ],
  },
  community: {
    eyebrow: "Topluluk Ozeti",
    heading: "ABC, bir networking vitrini degil; birlikte uretmeye dayali bir calisma zemini.",
    description:
      "Toplulugun temel degeri; insanlari yalnizca bir araya getirmek degil, birlikte bir sey cikarmaya zorlayan ritimler kurmaktir. Bu ritim sponsor icin daha anlamli temas, daha gercek geri bildirim ve daha dogal gorunurluk saglar.",
    proofItems: [
      {
        title: "Builder odagi",
        description:
          "Toplulukta urun, kod, tasarim, growth ve operasyon tarafinda aktif ureten insanlar bir araya gelir.",
      },
      {
        title: "Ankara'da fiziksel ritim",
        description:
          "Yerel bulusmalar, duzenli geri donus ve tekrar eden etkinlikler sayesinde iliski tek seferlik kalmaz.",
      },
      {
        title: "Uretim gorunurlugu",
        description:
          "Etkinlikler yalnizca bulusma degil; demo, ship, feedback ve build-in-public anlari uretir.",
      },
      {
        title: "Partner icin net temas alani",
        description:
          "Arac destegi, etkinlik partnerligi veya ortak icerik gibi modeller toplulugun dogal akisina gomulebilir.",
      },
    ],
  },
  programs: {
    eyebrow: "Etkinlik Yapisi",
    heading: "Toplulugun ritmi farkli formatlarin birlikte calismasiyla kurulur.",
    description:
      "Her format farkli bir ihtiyaca hizmet eder: odaklanma, hizli uretim, cikti paylasimi ve topluluk ici geri bildirim. Partnerlik modelleri bu yapilarin her birine farkli sekilde yerlestirilebilir.",
    items: [
      {
        name: "Deep Work",
        rhythm: "Duzenli tekrar eden odak seansi",
        format:
          "Katilimcilar gun icin hedefini netlestirir, ardindan kesintisiz uretim ve sonrasinda kisa networking akisi gelir.",
        outcome:
          "Odakli calisma, birbirinin isine tanik olma ve topluluk ici sureklilik.",
        partnerValue:
          "Arac denemesi, kredi destegi veya builder enablement mesajlari icin dogal bir temas zemini sunar.",
      },
      {
        name: "Build Sprint",
        rhythm: "Daha yuksek enerji ve ekipli uretim formati",
        format:
          "Builder'lar bir araya gelir, hizli iterasyonlar yapar, gun icinde egitim ve paylasimlarla ciktiya yaklasir.",
        outcome:
          "Prototipler, MVP ilerlemesi, demo anlari ve daha guclu ekip ici baglar.",
        partnerValue:
          "Etkinlik partnerligi, teknik altyapi destegi ve urun deneyimini gorunur kilan entegrasyonlar icin uygundur.",
      },
      {
        name: "Ship Day",
        rhythm: "Tek gunluk cikti odakli teslim ritmi",
        format:
          "Katilimci ne ship edecegini bastan ilan eder ve gun sonunda ciktisini yayinlar ya da demo eder.",
        outcome:
          "Net teslim tarihi, somut cikti ve paylasilabilir build hikayeleri.",
        partnerValue:
          "Demo gunu, icerik ortakligi ve partner markanin build anina temas ettigi gorunurluk noktasi olusturur.",
      },
    ],
  },
  showcase: {
    eyebrow: "Proje Vitrini",
    heading: "Toplulukta gorunen deger, tek tip bir urunden degil; farkli cikti turlerinin birikiminden gelir.",
    description:
      "Bu alan gercek proje verisi ya da sponsor logosu yerine, Ankara Build Club icinde sikca ureen build kategorilerini anlatir. Amac sahte bir portfolio gostermek degil, toplulugun uretim karakterini anlatmaktir.",
    noteTitle: "Not",
    noteDescription:
      "Buradaki basliklar dogrudan referans proje listesi degil; toplulukta ureen is tiplerini ve paylasilabilir build alanlarini anlatan kuratorlu orneklerdir.",
    items: [
      {
        title: "AI araclari ve otomasyon akislari",
        description:
          "Kucuk ekiplerin daha hizli calismasini saglayan otomasyonlar, workflow yardimcilari ve deneysel AI urunleri.",
        outputs: ["MVP akislari", "ic araclar", "deneysel entegrasyonlar"],
      },
      {
        title: "SaaS ve operator urunleri",
        description:
          "Gercek bir problemi dar kapsamda cozmeye odakli dashboard, panel, workflow ve operasyon urunleri.",
        outputs: ["yonetim panelleri", "niche SaaS fikirleri", "servis katmanlari"],
      },
      {
        title: "Launch ve growth deneyleri",
        description:
          "Landing page, positioning, onboarding ve ilk kullanici geri bildirimi eksenli testler.",
        outputs: [
          "landing iterasyonlari",
          "go-to-market denemeleri",
          "copy testleri",
        ],
      },
      {
        title: "Topluluk ici build ciktilari",
        description:
          "Etkinliklerde paylasilan demo'lar, ship edilen kucuk feature'lar ve birlikte yapilan geri bildirim turlari.",
        outputs: ["demo anlari", "feedback turlari", "build-in-public paylasimlari"],
      },
    ],
  },
  partnership: {
    eyebrow: "Is Birligi Modelleri",
    heading: "Partnerlik, toplulugun akisina uydugunda daha anlamli hale gelir.",
    description:
      "Ankara Build Club icinde en iyi sonuc veren modeller, toplulugun ritmine eklemlenen ve builder'a dogrudan fayda sunan modellerdir. Yuzeysel branding yerine, gercek temas ve kullanim ureten ortakliklari tercih ediyoruz.",
    models: [
      {
        title: "Etkinlik partnerligi",
        summary:
          "Belirli bir Deep Work, Build Sprint veya Ship Day formatini destekleyen gorunur ortaklik modeli.",
        fit:
          "Etkinlikte varlik gostermek, dogrudan topluluga temas etmek ve ilgili bir baglamda konumlanmak isteyen ekipler icin.",
      },
      {
        title: "Builder enablement destegi",
        summary:
          "Toplulugun daha iyi build etmesini saglayan egitim, mentorluk, office hour veya kaynak destegi modeli.",
        fit:
          "Topluluga yalnizca logo degil, calismayi hizlandiran uzmanlik veya surec destegi sunmak isteyen partnerler icin.",
      },
      {
        title: "Tool / kredi / altyapi destegi",
        summary:
          "Builder'larin gercekten kullanabilecegi yazilim, API kredisi, altyapi, dataset veya araca erisim modeli.",
        fit:
          "Urunun dogrudan builder workflow'una girdigi, deneme ve kullanima dayali daha derin temas arayan partnerler icin.",
      },
      {
        title: "Icerik / rapor / topluluk is birligi",
        summary:
          "Topluluktan dogan gozlem ve uretim anlatilarini birlikte paketleyen rapor, icerik ya da ozel program modeli.",
        fit:
          "Ankara'daki build kulturunu daha iyi anlamak, anlatmak veya ozel bir topluluk hikayesi uretmek isteyen kurumlar icin.",
      },
    ],
    contactFlow: [
      {
        step: "01",
        title: "Kisa tanitim maili",
        description:
          "Ne yapmak istediginizi, hangi formatla ilgilendiginizi ve topluluga ne tur bir fayda sunabileceginizi kisa bir mail ile iletin.",
      },
      {
        step: "02",
        title: "Ihtiyac uyumu gorusmesi",
        description:
          "Toplulugun ritmi, etkinlik yapisi ve sizin beklentiniz arasinda gercek bir uyum var mi diye birlikte bakilir.",
      },
      {
        step: "03",
        title: "Ozel partnerlik plani ve geri donus",
        description:
          "Uygun format netlesirse kapsam, zamanlama, gorunurluk ve sorumluluklar iceren net bir partnerlik plani olusturulur.",
      },
    ],
    closingTitle: "Ankara Build Club ile anlamli bir partnerlik baslatmak istiyorsaniz bize yazin.",
    closingDescription:
      "Icerikten etkinlige, altyapidan builder enablement'a kadar farkli modelleri birlikte kurgulayabiliriz. Ilk adim icin kisa bir tanitim maili yeterli.",
    responseWindow: "Hafta ici 24 saat icinde geri donus",
  },
};
