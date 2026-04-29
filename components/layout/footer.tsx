import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";

import { Grainient } from "@/components/marketing/grainient";
import { Container } from "@/components/shared/container";
import { footerData } from "@/lib/data/footer.data";
import { navigationData } from "@/lib/data/navigation.data";

const socialIconMap: Record<string, string> = {
  X: "simple-icons:x",
  LinkedIn: "simple-icons:linkedin",
  Instagram: "simple-icons:instagram",
  Luma: "lucide:calendar-days",
};

function getLinkTarget(isExternal?: boolean) {
  if (!isExternal) {
    return {};
  }

  return {
    target: "_blank",
    rel: "noreferrer",
  };
}

export function Footer() {
  const brandImageUrl =
    navigationData.brand.imgUrl?.trim() ??
    navigationData.brand.footerImgUrl?.trim() ??
    navigationData.brand.scrolledImgUrl?.trim() ??
    navigationData.brand.imgUrl?.trim() ??
    "";
  const hasBrandImage = brandImageUrl.length > 0;

  return (
    <footer className="relative w-full overflow-hidden border-t border-white/10 bg-brand-black text-text-inverse">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent"
        aria-hidden="true"
      />

      <Container width="full" className="relative py-12 lg:py-14">
        <div className="grid gap-10 border-b border-white/10 pb-10 xl:grid-cols-[minmax(0,3.1fr)_minmax(0,1.1fr)]">
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-5">
              <Link
                href={navigationData.brand.href}
                className="inline-flex items-center transition-opacity hover:opacity-90"
              >
                {hasBrandImage ? (
                  <Image
                    src={brandImageUrl}
                    alt={footerData.brand.title}
                    width={192}
                    height={48}
                    className="h-10 w-auto"
                  />
                ) : (
                  <span className="text-2xl font-semibold tracking-tight text-white">
                    {footerData.brand.title}
                  </span>
                )}
              </Link>

              <div className="flex items-center gap-2">
                {footerData.socialLinks.map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/6 text-white/72 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
                    aria-label={social.label}
                    title={social.href}
                    {...getLinkTarget(social.external)}
                  >
                    <Icon
                      icon={socialIconMap[social.label] ?? "lucide:link-2"}
                      className="h-4 w-4"
                    />
                  </Link>
                ))}
              </div>
            </div>

            <p className="max-w-3xl text-sm leading-relaxed text-white/68 sm:text-base">
              {footerData.brand.description}
            </p>
          </div>

          <aside className="space-y-5 xl:border-l xl:border-white/10 xl:pl-10">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/45">
              {footerData.contact.title}
            </p>

            <p className="text-sm leading-relaxed text-white/68">
              Reach out directly for brand collaborations, event partnerships,
              and community support packages.
            </p>

            <div className="space-y-2 text-sm text-white/68">
              <p>
                <span className="font-semibold text-white">Email: </span>
                <a
                  href={`mailto:${footerData.contact.email}`}
                  className="transition hover:text-white"
                >
                  {footerData.contact.email}
                </a>
              </p>
              <p>
                <span className="font-semibold text-white">Location: </span>
                {footerData.contact.location}
              </p>
              <p>
                <span className="font-semibold text-white">Response time: </span>
                {footerData.contact.responseWindow}
              </p>
            </div>

            <div className="flex flex-col gap-2.5 pt-1">
              <Link
                href={footerData.contact.cta.href}
                className="inline-flex items-center justify-center rounded-md border border-highlight/30 bg-linear-to-r from-secondary via-highlight to-accent px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
                {...getLinkTarget(footerData.contact.cta.external)}
              >
                {footerData.contact.cta.label}
              </Link>

              <Link
                href={navigationData.cta.href}
                className="inline-flex items-center justify-center rounded-md border border-white/12 bg-white/6 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
              >
                {navigationData.cta.label}
              </Link>
            </div>
          </aside>
        </div>

        <div className="flex flex-col gap-4 pt-6 text-xs text-white/45 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {footerData.bottomLinks.map((link, index) => (
              <Link
                key={`${link.label}-${link.href}-${index}`}
                href={link.href}
                className="transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            <p>{footerData.copyright}</p>
          </div>
        </div>
      </Container>

      <div className="relative isolate overflow-hidden border-t border-white/10 bg-brand-black">
        <div className="absolute inset-0 -z-20">
          <Grainient
            color1="var(--color-accent-500)"
            color2="var(--color-secondary-500)"
            color3="var(--color-primary-950)"
            timeSpeed={0.22}
            colorBalance={-0.14}
            warpStrength={1.08}
            warpFrequency={4.8}
            warpSpeed={1.9}
            warpAmplitude={58}
            blendAngle={8}
            blendSoftness={0.06}
            rotationAmount={420}
            noiseScale={1.9}
            grainAmount={0.08}
            grainScale={1.8}
            grainAnimated={false}
            contrast={1.35}
            gamma={1}
            saturation={0.96}
            centerX={0}
            centerY={0.04}
            zoom={0.92}
          />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/18 via-primary-900/24 to-brand-black/88" />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-brand-black to-transparent" />

        <Container
          width="full"
          className="flex min-h-[10rem] items-end px-4 pt-6 sm:px-6 lg:px-8"
        >
          <p className="w-full select-none text-center text-[clamp(4.5rem,18vw,15rem)] leading-[0.82] font-semibold tracking-[-0.075em] text-white/96">
            shipin
          </p>
        </Container>
      </div>
    </footer>
  );
}
