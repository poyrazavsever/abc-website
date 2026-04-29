import type { Metadata } from "next";

import { SponsorsHero } from "@/components/marketing/sponsors-hero";
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
      <SponsorsHero
        hero={hero}
        primaryHref={partnerContactHref}
        secondaryHref="/events"
      />

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
