import type { Metadata } from "next";

import { Container } from "@/components/shared/container";
import { SecondaryWordmark } from "@/components/shared/secondary-wordmark";
import { LinkButton } from "@/components/ui/link-button";

const LUMA_CALENDAR_ID = "cal-7VDaKLe8HABNOFw";
const LUMA_CALENDAR_URL = `https://lu.ma/embed/calendar/${LUMA_CALENDAR_ID}/events`;
const LUMA_PUBLIC_URL = "https://luma.com/ankarabuildclub";

const eventSignals = [
  {
    value: "2h",
    label: "Deep focus block",
    detail:
      "Plan yapmayı uzatmadan flow'a girmek ve bir işi gerçekten ilerletmek için yeterli pencere.",
  },
  {
    value: "1 day",
    label: "Shipping window",
    detail:
      "Niyetin karara, kararın çıktıya dönüşmesi için kısa ama ciddi bir zaman kutusu.",
  },
  {
    value: "Live",
    label: "Builder room",
    detail:
      "Gerçek ürün, prototip ve yarım kalmış işlerle gelen insanlarla aynı odada çalışma ritmi.",
  },
] as const;

const eventFormats = [
  {
    step: "01",
    title: "Deep Work",
    rhythm: "Sessiz odak + sonrasında doğal bağlantı",
    description:
      "Önce neyi bitireceğini ilan edersin, sonra dikkatini gerçekten koruyabildiğin uzun bir blok açılır. Günün görünür kazanımı, yalnızca masada oturmak değil, işi ilerletmektir.",
    bullets: [
      "Kısa hedef deklarasyonu ile başlar.",
      "Kesintisiz çalışma bloğu boyunca oda üretime döner.",
      "Son bölüm konuşma, feedback ve proje eşleşmeleri için açılır.",
    ],
  },
  {
    step: "02",
    title: "Build Sprint",
    rhythm: "Enerji yüksek, iterasyon hızlı",
    description:
      "Daha kolektif ve daha yoğun format. Amaç fikir konuşmak değil, gün içinde daha fazla deneme yapmak ve somut bir ara çıktı üretmektir.",
    bullets: [
      "Küçük ekipler hızla organize olur.",
      "Feedback döngüsü üretimin içine gömülür.",
      "Günün sonunda demo verilebilecek kadar yaklaşılır.",
    ],
  },
  {
    step: "03",
    title: "Ship Day",
    rhythm: "Teslim tarihi belli, bahane alanı dar",
    description:
      "Mükemmel olması gerekmez ama gün bitmeden laptop dışına çıkmış olması gerekir. Formatın amacı baskı yaratmak değil, görünür ilerlemeyi zorlamaktır.",
    bullets: [
      "Ne ship edeceğin baştan netleşir.",
      "Zaman baskısı kararları hızlandırır.",
      "Kapanış demoları görünür bir ilerleme kanıtı üretir.",
    ],
  },
] as const;

const eventFlow = [
  {
    label: "Before you join",
    text: "Laptopunu, net bir hedefini ve çalışmanı görünür kılma isteğini getir.",
  },
  {
    label: "In the room",
    text: "Bazı günler sessiz odak, bazı günler demo, bazı günler hızlı ekipli üretim öne çıkar.",
  },
  {
    label: "What stays constant",
    text: "Ortak kural değişmez: gün bittiğinde elle tutulur bir ilerleme gösterebilmek.",
  },
] as const;

const roomPrinciples = [
  "Yarım kalmış bir feature, prototip, landing page veya ürün problemiyle gel.",
  "Sonsuz seçenek tartışmak yerine zaman kutusunu net karar almak için kullan.",
  "Çıktı hâlâ pürüzlü olsa bile gün sonunda neyin değiştiğini paylaş.",
  "Asıl sosyal katmanı, iş görünür olduktan sonra gelen feedback ve tanışıklıkta bul.",
] as const;

export const metadata: Metadata = {
  title: "Etkinlikler",
  description:
    "Ankara Build Club etkinlik ritmi, formatları ve güncel Luma takvimi.",
};

export default function EventsPage() {
  return (
    <div className="bg-brand-black text-brand-white">
      <section className="relative isolate min-h-screen overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_14%,rgba(131,28,145,0.42),transparent_26%),radial-gradient(circle_at_84%_20%,rgba(255,112,191,0.18),transparent_22%),radial-gradient(circle_at_50%_88%,rgba(70,44,125,0.36),transparent_34%),linear-gradient(180deg,rgba(12,8,22,0.72),rgba(0,0,0,0.96))]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/24 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-brand-black via-brand-black/80 to-transparent" />

        <Container className="relative z-10 flex min-h-screen flex-col justify-center py-24 sm:py-28">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(22rem,0.85fr)] lg:items-center">
            <div className="max-w-4xl space-y-8">
              <p className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-ink-200 backdrop-blur-md">
                Events Calendar
              </p>

              <div className="space-y-5">
                <h1 className="max-w-4xl text-4xl font-semibold leading-[0.94] tracking-tight text-brand-white md:text-5xl lg:text-6xl">
                  Ankara Build Club etkinlikleri, yalnızca buluşmak için değil{" "}
                  <SecondaryWordmark className="px-[0.03em] text-[1.02em]">
                    ship etmek
                  </SecondaryWordmark>{" "}
                  için tasarlanır.
                </h1>
                <p className="max-w-2xl text-sm leading-8 text-ink-200 md:text-base">
                  Bu sayfa pasif bir meetup takvimi değil. Her oturum daha derin
                  odaklanmak, daha hızlı iterasyon yapmak ya da doğru insanlarla
                  aynı masada gerçek bir ilerleme üretmek için kurgulanır.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {eventSignals.map((signal) => (
                  <div
                    key={signal.label}
                    className="rounded-[1.45rem] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm"
                  >
                    <p className="text-2xl font-semibold tracking-[-0.05em] text-accent-300">
                      {signal.value}
                    </p>
                    <p className="mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/48">
                      {signal.label}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-white/72">
                      {signal.detail}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col items-start gap-4 sm:flex-row">
                <LinkButton
                  href={LUMA_PUBLIC_URL}
                  target="_blank"
                  rel="noreferrer"
                  size="lg"
                  className="h-auto px-8 py-3 text-base text-brand-white shadow-[0_18px_48px_rgba(93,56,255,0.34)] hover:shadow-[0_24px_56px_rgba(93,56,255,0.42)]"
                >
                  Luma Takvimini Aç
                </LinkButton>
                <LinkButton
                  href="#calendar"
                  size="lg"
                  variant="ghost"
                  className="h-auto border-white/14 bg-white/[0.08] px-8 py-3 text-base text-brand-white hover:bg-white/[0.12]"
                >
                  Takvime Git
                </LinkButton>
              </div>
            </div>

            <aside className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-sm sm:p-7">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(162,91,255,0.16),transparent_30%),radial-gradient(circle_at_bottom_center,rgba(255,112,191,0.12),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.06),transparent_42%)]" />
              <div className="pointer-events-none absolute inset-x-10 bottom-0 h-px bg-linear-to-r from-transparent via-primary-200/45 to-transparent" />

              <div className="relative space-y-6">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/44">
                    Before you join
                  </p>
                  <h2 className="text-2xl font-semibold tracking-[-0.04em] text-white">
                    Odaya yalnızca vakit doldurmaya değil, görünür ilerlemeye gel.
                  </h2>
                </div>

                <div className="space-y-3">
                  {eventFlow.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-[1.25rem] border border-white/10 bg-brand-black/40 p-4"
                    >
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-accent-300">
                        {item.label}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-white/76">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(131,28,145,0.18),transparent_26%),radial-gradient(circle_at_80%_30%,rgba(255,112,191,0.12),transparent_24%)]" />

        <Container width="wide" className="relative">
          <div className="space-y-10">
            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-300">
                Etkinlik Yapısı
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-brand-white sm:text-4xl">
                Topluluğun ritmi, farklı formatların birlikte çalışmasıyla kurulur.
              </h2>
              <p className="text-sm leading-7 text-ink-300 sm:text-base">
                Her format başka bir ihtiyaca hizmet eder: odak, hız, teslim ve
                ortak görünürlük. Sponsor sayfasındaki ritim dili burada doğrudan
                etkinliğin kendisine dönüyor.
              </p>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              {eventFormats.map((format) => (
                <article
                  key={format.title}
                  className="group relative overflow-hidden rounded-[1.75rem] border border-white/8 bg-white/[0.03] p-6 shadow-[0_18px_44px_rgba(0,0,0,0.22)]"
                >
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))]" />
                  <div className="pointer-events-none absolute right-5 top-5 h-20 w-20 rounded-full border border-secondary-500/20 bg-secondary-500/8 blur-md transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="relative space-y-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-3">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--color-secondary-500),var(--color-accent-500))] text-xs font-semibold text-white">
                          {format.step}
                        </span>
                        <div>
                          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/45">
                            {format.rhythm}
                          </p>
                          <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">
                            {format.title}
                          </h3>
                        </div>
                      </div>

                      <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-accent-300">
                        Builder format
                      </span>
                    </div>

                    <p className="text-sm leading-7 text-white/72 sm:text-base">
                      {format.description}
                    </p>

                    <div className="grid gap-3">
                      {format.bullets.map((bullet) => (
                        <div
                          key={bullet}
                          className="rounded-[1.2rem] border border-white/8 bg-brand-black/24 p-4 text-sm leading-6 text-white/72"
                        >
                          {bullet}
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-4 sm:py-6">
        <Container width="wide">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
            <div className="rounded-[1.8rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.025))] p-6 text-white shadow-[0_18px_44px_rgba(0,0,0,0.22)] sm:p-7">
              <div className="max-w-2xl space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-300">
                  Room energy
                </p>
                <h2 className="text-3xl font-semibold tracking-tight text-white">
                  Günün hissi genelde küçük konuşmadan çok gerçek çalışmaya döner.
                </h2>
                <p className="text-sm leading-7 text-white/70 sm:text-base">
                  Amaç insanları bir araya getirmekten fazlası. İş görünür hale
                  geldikçe konuşmalar güçlenir, feedback daha faydalı olur ve
                  topluluk daha doğal kurulur.
                </p>
              </div>
            </div>

            <div className="rounded-[1.8rem] border border-white/8 bg-[linear-gradient(180deg,rgba(17,17,17,0.98),rgba(70,44,125,0.92),rgba(131,28,145,0.86))] p-6 text-white shadow-[0_24px_64px_rgba(0,0,0,0.24)] sm:p-7">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/48">
                Quick note
              </p>
              <p className="mt-3 text-sm leading-6 text-white/78">
                Uzun süredir tek başına çalışıyorsan, bu sayfa büyük ihtimalle işi
                saklamayı bırakıp odaya getirmen gerektiğini söylüyor.
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {roomPrinciples.map((item) => (
              <div
                key={item}
                className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 text-white/78"
              >
                {item}
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section
        id="calendar"
        className="relative overflow-hidden py-16 sm:py-20"
      >
        <Container width="wide">
          <div className="overflow-hidden rounded-[1.9rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.025))] text-white shadow-[0_18px_44px_rgba(0,0,0,0.22)]">
            <div className="flex flex-col gap-4 border-b border-white/8 bg-black/18 px-5 py-5 sm:px-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-300">
                  Live calendar
                </p>
                <h2 className="text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">
                  Güncel oturumları doğrudan Luma üzerinden takip et.
                </h2>
                <p className="text-sm leading-6 text-white/70 sm:text-base">
                  Kayıt akışı, tarih değişiklikleri ve etkinlik detayları burada
                  senkron kalır; en güncel takvim için en kısa yol bu embed.
                </p>
              </div>

              <LinkButton
                href={LUMA_PUBLIC_URL}
                target="_blank"
                rel="noreferrer"
                variant="outline"
              >
                Luma sayfasını aç
              </LinkButton>
            </div>

            <div className="bg-transparent p-2 sm:p-3">
              <div className="overflow-hidden rounded-[1.4rem] border border-white/8 bg-white">
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
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
