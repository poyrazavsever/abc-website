import type { Metadata } from "next";

import { LinkButton } from "@/components/ui/link-button";

const LUMA_CALENDAR_ID = "cal-7VDaKLe8HABNOFw";
const LUMA_CALENDAR_URL = `https://lu.ma/embed/calendar/${LUMA_CALENDAR_ID}/events`;
const LUMA_PUBLIC_URL = "https://luma.com/ankarabuildclub";

export const metadata: Metadata = {
  title: "Etkinlikler",
  description: "Ankara Build Club etkinlik takvimi.",
};

export default function EventsPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-4 border-b border-border pb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">
          Etkinlik takvimi
        </p>
        <div className="max-w-3xl space-y-3">
          <h1 className="text-4xl font-semibold leading-tight text-text sm:text-5xl">
            Ankara Build Club etkinlikleri
          </h1>
          <p className="text-base leading-7 text-text-muted sm:text-lg">
            Takvimi dogrudan Luma uzerinden goruntule. Etkinlik detaylari ve
            kayit akisi embed icinde acilir.
          </p>
        </div>
        <LinkButton
          href={LUMA_PUBLIC_URL}
          target="_blank"
          rel="noreferrer"
          variant="outline"
        >
          Luma&apos;da Ac
        </LinkButton>
      </header>

      <section className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.85fr)] lg:items-start">
        <div className="space-y-10 pt-1">
          <div className="max-w-xl space-y-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              Neden gelmelisin
            </p>
            <div className="space-y-3 text-lg leading-8 text-text-muted sm:text-xl sm:leading-9">
              <p>
                Gri sehirde pazar gunu yalniz calismak istemiyorsan, yeni
                insanlarla tanismak istiyorsan seni bekliyoruz.
              </p>
            </div>
          </div>

          <div className="max-w-2xl space-y-8">
            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-text">Sprint</h2>
              <p className="text-base leading-7 text-text-muted sm:text-lg">
                Sprint, Buildothon gibi dusunebilecegin en buyuk
                etkinliklerimizden biri. Insanlar bir araya gelir, bir seyler
                build eder, beraber uretir ve gun icinde farkli egitimlerle
                hiz kazanir.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-text">Deep Work</h2>
              <div className="space-y-3 text-base leading-7 text-text-muted sm:text-lg">
                <p>Etkinlik 2 bolumden olusuyor.</p>
                <p>
                  Deep Work: baslamadan once herkes o gun neyi bitirecegini
                  kisaca paylasir. Ardindan 2 saat kesintisiz odaklanma.
                </p>
                <p>
                  Networking: isteyen calismaya devam eder, isteyen yeni
                  insanlarla tanisir, projeler konusulur.
                </p>
                <p>Laptopunu ve builder enerjini kap gel.</p>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-text">Ship Day</h2>
              <div className="space-y-3 text-base leading-7 text-text-muted sm:text-lg">
                <p>Bir gun. Bir cikti.</p>
                <p>
                  O gun ne yapacagini soyluyorsun, gunun sonunda publish
                  ediyorsun.
                </p>
                <p>
                  Mukemmel olmasi gerekmiyor. Ama cikmis olmasi gerekiyor.
                </p>
                <p>Landing page, MVP, feature, fikir... Ne olursa olsun.</p>
                <p>
                  Program: kickoff ile ne ship edecegini belirlersin, build
                  asamasinda odakli calisirsin, shipping bolumunde herkes
                  ciktisini paylasir. Ardindan demo, feedback ve sohbet gelir.
                </p>
                <p>
                  Bu bir networking etkinligi degil. Bu, bir seyleri gercekten
                  bitirme gunu.
                </p>
              </div>
            </section>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-border bg-surface shadow-sm">
          <iframe
            src={LUMA_CALENDAR_URL}
            title="Ankara Build Club etkinlik takvimi"
            width="100%"
            height="980"
            frameBorder="0"
            allowFullScreen
            className="block min-h-[980px] w-full bg-surface"
          />
        </div>
      </section>
    </div>
  );
}
