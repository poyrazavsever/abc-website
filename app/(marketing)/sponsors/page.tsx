import type { Metadata } from "next";

import { Grainient } from "@/components/marketing/grainient";
import { Container } from "@/components/shared/container";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Divider,
  LinkButton,
  SectionHeader,
} from "@/components/ui";
import {
  partnerContactEmail,
  partnerContactHref,
  sponsorsPageData,
} from "@/lib/data/sponsors.data";

export const metadata: Metadata = {
  title: "Sponsorlar ve Partnerlik",
  description:
    "Ankara Build Club sponsor ve partner sayfasi. Toplulugun yapisini, etkinlik ritmini ve is birligi modellerini hizlica inceleyin.",
};

export default function SponsorsPage() {
  const { community, hero, partnership, programs, showcase } = sponsorsPageData;

  return (
    <div className="bg-background">
      <section className="relative isolate overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 -z-20">
          <Grainient
            color1="var(--color-accent-500)"
            color2="var(--color-secondary-500)"
            color3="var(--color-primary-950)"
            timeSpeed={0.22}
            colorBalance={-0.18}
            warpStrength={1.1}
            warpFrequency={4.6}
            warpSpeed={1.8}
            warpAmplitude={56}
            blendAngle={0}
            blendSoftness={0.06}
            rotationAmount={420}
            noiseScale={1.8}
            grainAmount={0.08}
            grainScale={2}
            grainAnimated={false}
            contrast={1.45}
            gamma={1}
            saturation={1}
            centerX={0}
            centerY={0}
            zoom={0.92}
          />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/60 via-primary-800/45 to-primary-950/70" />

        <Container className="py-24 sm:py-28 lg:py-32">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1.15fr)_23rem] xl:items-start">
            <div className="space-y-8">
              <div className="space-y-5">
                <p className="inline-flex rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white">
                  {hero.eyebrow}
                </p>
                <div className="max-w-4xl space-y-4">
                  <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
                    {hero.title}
                  </h1>
                  <p className="max-w-3xl text-base leading-7 text-white/90 sm:text-lg sm:leading-8">
                    {hero.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {hero.highlights.map((highlight) => (
                  <Badge
                    key={highlight}
                    className="border-white/20 bg-white/10 text-white"
                  >
                    {highlight}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <LinkButton
                  href={partnerContactHref}
                  variant="outline"
                  className="h-10 border-white/20 bg-surface text-primary hover:bg-surface-soft"
                >
                  {hero.primaryCtaLabel}
                </LinkButton>
                <LinkButton
                  href="/events"
                  variant="ghost"
                  className="h-10 border border-white/30 text-primary-foreground hover:bg-white/10"
                >
                  {hero.secondaryCtaLabel}
                </LinkButton>
              </div>
            </div>

            <Card className="border-white/15 bg-white/10 text-primary-foreground shadow-md backdrop-blur">
              <CardHeader>
                <CardTitle className="text-primary-foreground">
                  {hero.asideTitle}
                </CardTitle>
                <CardDescription className="text-white/80">
                  {hero.asideDescription}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {hero.asideItems.map((item) => (
                  <div
                    key={item}
                    className="rounded-lg border border-white/15 bg-white/10 p-4 text-sm leading-6 text-white/90"
                  >
                    {item}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      <Container className="space-y-16 py-14 sm:space-y-20 sm:py-16 lg:py-20">
        <section className="space-y-8">
          <SectionHeader
            eyebrow={community.eyebrow}
            heading={community.heading}
            description={community.description}
          />

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {community.proofItems.map((item) => (
              <Card key={item.title} elevated={false}>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-4 text-sm leading-6 text-text-muted">
                  {item.description}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Divider />

        <section className="space-y-8">
          <SectionHeader
            eyebrow={programs.eyebrow}
            heading={programs.heading}
            description={programs.description}
          />

          <div className="grid gap-5 xl:grid-cols-3">
            {programs.items.map((item) => (
              <Card key={item.name}>
                <CardHeader className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="primary">{item.name}</Badge>
                    <Badge variant="secondary">{item.rhythm}</Badge>
                  </div>
                  <CardTitle>{item.name}</CardTitle>
                  <CardDescription>{item.format}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1.5">
                    <p className="text-xs font-semibold uppercase tracking-[0.11em] text-text-soft">
                      Beklenen cikti
                    </p>
                    <p className="text-sm leading-6 text-text-muted">
                      {item.outcome}
                    </p>
                  </div>
                  <Divider />
                  <div className="space-y-1.5">
                    <p className="text-xs font-semibold uppercase tracking-[0.11em] text-text-soft">
                      Partner icin alan
                    </p>
                    <p className="text-sm leading-6 text-text-muted">
                      {item.partnerValue}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Divider />

        <section className="space-y-8">
          <SectionHeader
            eyebrow={showcase.eyebrow}
            heading={showcase.heading}
            description={showcase.description}
          />

          <Alert variant="info">
            <AlertTitle>{showcase.noteTitle}</AlertTitle>
            <AlertDescription>{showcase.noteDescription}</AlertDescription>
          </Alert>

          <div className="grid gap-5 lg:grid-cols-2">
            {showcase.items.map((item) => (
              <Card key={item.title} surface="muted">
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {item.outputs.map((output) => (
                      <Badge key={output} variant="info">
                        {output}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Divider />

        <section className="space-y-8">
          <SectionHeader
            eyebrow={partnership.eyebrow}
            heading={partnership.heading}
            description={partnership.description}
          />

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
            <div className="grid gap-5 md:grid-cols-2">
              {partnership.models.map((model) => (
                <Card key={model.title}>
                  <CardHeader>
                    <CardTitle>{model.title}</CardTitle>
                    <CardDescription>{model.summary}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm leading-6 text-text-muted">
                    {model.fit}
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card surface="soft">
              <CardHeader>
                <CardTitle>Iletisim akisi</CardTitle>
                <CardDescription>
                  Ilk temas dogrudan mail ile baslar. Sonrasinda kapsam ve
                  format birlikte netlestirilir.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {partnership.contactFlow.map((step, index) => (
                  <div key={step.step} className="space-y-4">
                    <div className="flex gap-3">
                      <Badge
                        variant="primary"
                        className="mt-0.5 min-w-10 justify-center"
                      >
                        {step.step}
                      </Badge>
                      <div className="space-y-1">
                        <p className="font-semibold text-text">{step.title}</p>
                        <p className="text-sm leading-6 text-text-muted">
                          {step.description}
                        </p>
                      </div>
                    </div>
                    {index < partnership.contactFlow.length - 1 ? (
                      <Divider />
                    ) : null}
                  </div>
                ))}

                <Alert variant="success" className="mt-2">
                  <AlertTitle>Iletisim</AlertTitle>
                  <AlertDescription>
                    {partnerContactEmail} adresine ulasin. Beklenen geri donus
                    suresi: {partnership.responseWindow}.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </section>

        <Card className="overflow-hidden border-primary-100 bg-surface-strong">
          <CardContent className="flex flex-col gap-6 py-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-3">
              <Badge variant="primary">Sonraki adim</Badge>
              <h2 className="text-2xl font-semibold text-text sm:text-3xl">
                {partnership.closingTitle}
              </h2>
              <p className="text-base leading-7 text-text-muted">
                {partnership.closingDescription}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <LinkButton href={partnerContactHref}>
                {hero.primaryCtaLabel}
              </LinkButton>
              <LinkButton href="/events" variant="outline">
                {hero.secondaryCtaLabel}
              </LinkButton>
            </div>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
