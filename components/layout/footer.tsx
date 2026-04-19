import Link from "next/link";

import { Container } from "@/components/shared/container";
import { footerData } from "@/lib/data/footer.data";

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
  return (
    <footer className="border-t border-border bg-surface-soft">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div className="space-y-4">
            <p className="text-base font-semibold text-text">
              {footerData.brand.title}
            </p>
            <p className="max-w-md text-sm leading-relaxed text-text-muted">
              {footerData.brand.description}
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {footerData.socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-text-muted transition hover:border-primary-200 hover:text-primary"
                  {...getLinkTarget(social.external)}
                >
                  {social.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {footerData.sections.map((section) => (
              <div key={section.title} className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-text-soft">
                  {section.title}
                </p>
                <ul className="space-y-2">
                  {section.links.map((link, index) => (
                    <li
                      key={`${section.title}-${link.label}-${link.href}-${index}`}
                    >
                      <Link
                        href={link.href}
                        className="text-sm text-text-muted transition hover:text-primary"
                        {...getLinkTarget(link.external)}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 text-xs text-text-soft sm:flex-row sm:items-center sm:justify-between">
          <p>{footerData.copyright}</p>
          <div className="flex flex-wrap items-center gap-4">
            {footerData.bottomLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
