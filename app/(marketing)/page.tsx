import Link from "next/link";

import { Grainient } from "@/components/marketing/grainient";
import { Container } from "@/components/shared/container";

export default function MarketingHomePage() {
  return (
    <section className="relative isolate overflow-hidden bg-primary text-primary-foreground">
      <div className="absolute inset-0 -z-20">
        <Grainient
          color1="#eff5ff"
          color2="#1759c0"
          color3="#0d223f"
          timeSpeed={0.25}
          colorBalance={-0.16}
          warpStrength={1.15}
          warpFrequency={5.0}
          warpSpeed={2.0}
          warpAmplitude={59}
          blendAngle={0.0}
          blendSoftness={0.05}
          rotationAmount={500.0}
          noiseScale={2.0}
          grainAmount={0.1}
          grainScale={2.0}
          grainAnimated={false}
          contrast={1.5}
          gamma={1.0}
          saturation={1.0}
          centerX={0.0}
          centerY={0.0}
          zoom={0.9}
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/55 via-primary-800/40 to-primary-950/65" />

      <Container className="flex min-h-[78vh] items-center py-28 sm:py-32">
        <div className="max-w-3xl space-y-8">
          <p className="inline-flex rounded-full border border-white/35 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
            Ankara Build Club
          </p>

          <div className="space-y-4">
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              Ankara&apos;da builder odakli, birlikte ureten bir topluluk.
            </h1>
            <p className="text-base text-white/90 sm:text-lg">
              Etkinlikler, projeler ve gercek is birlikleriyle build ritmini
              guclendir. Faz 1 platformu ile topluluga katil, profilini tamamla,
              uretilen isi gorunur kil.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/register"
              className="inline-flex items-center rounded-md bg-surface px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-surface-soft"
            >
              Topluluga Katil
            </Link>
            <Link
              href="/events"
              className="inline-flex items-center rounded-md border border-white/40 px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-white/10"
            >
              Etkinlikleri Kesfet
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
