"use client";

import { useCallback, useRef, useState } from "react";
import { toPng } from "html-to-image";

import {
  CardRenderer,
  colorThemeLabels,
  contentTemplateLabels,
  getContentMessage,
  type CardColorTheme,
  type CardContentTemplate,
} from "@/components/linkedin-card/card-renderer";
import { roleLabels, tagLabels } from "@/components/admin/admin-shell";
import type { ProfileRecord } from "@/lib/types/profile";
import { appToast as toast } from "@/lib/utils/toast";

type CardGeneratorProps = {
  profile: ProfileRecord;
};

const colorThemeOptions: Array<{ label: string; value: CardColorTheme }> = (
  Object.entries(colorThemeLabels) as Array<[CardColorTheme, string]>
).map(([value, label]) => ({ label, value }));

const contentTemplateOptions: Array<{
  label: string;
  value: CardContentTemplate;
}> = (
  Object.entries(contentTemplateLabels) as Array<
    [CardContentTemplate, string]
  >
).map(([value, label]) => ({ label, value }));

function buildSuggestedText(
  profile: ProfileRecord,
  contentTemplate: CardContentTemplate,
) {
  const role = roleLabels[profile.role] || "Builder";
  const tag = profile.activeTag
    ? tagLabels[profile.activeTag]
    : "Build ediyorum";

  const lines: Record<CardContentTemplate, string[]> = {
    default: [
      "Ship In topluluğuna katıldım 🚀",
      "",
      `${role} olarak üretmeye devam ediyorum. Durumum: ${tag}.`,
      "",
      "#ShipIn #Builder",
    ],
    cofounder: [
      "Ship In üzerinden co-founder arıyorum 🤝",
      "",
      `${role} olarak bir proje üzerinde çalışıyorum ve doğru ortağı bulmak istiyorum.`,
      "",
      "İlgilenen varsa DM'den ulaşabilir!",
      "",
      "#ShipIn #CoFounder #Builder",
    ],
    team: [
      "Ekibimi kuruyorum! 🛠️",
      "",
      `${role} olarak Ship In topluluğunda aktif olarak ekip arkadaşı arıyorum.`,
      "",
      "Birlikte bir şeyler inşa etmek isteyen herkese açığım.",
      "",
      "#ShipIn #Team #Builder",
    ],
    idea: [
      "Fikir aşamasındayım ve konuşmak istiyorum 💡",
      "",
      "Ship In topluluğunda fikrimi test ediyorum. Geri bildirim ve sohbet her zaman kıymetli.",
      "",
      "#ShipIn #Idea #Builder",
    ],
    launch: [
      "Ürünümü yayına aldım! 🎉",
      "",
      `Ship In topluluğuyla birlikte geliştirdiğim projeyi launch ettim. Build in public devam ediyor.`,
      "",
      "#ShipIn #Launch #BuildInPublic",
    ],
    sprint: [
      "Ship In Build Sprint'ine katıldım 🏃",
      "",
      "Yoğun bir sprint sonrası somut ilerleme kaydettim. Toplulukla birlikte üretmek başka oluyor.",
      "",
      "#ShipIn #BuildSprint #Builder",
    ],
  };

  return lines[contentTemplate].join("\n");
}

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */

function DownloadIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M10 3.5v10" />
      <path d="m6.5 10 3.5 3.5 3.5-3.5" />
      <path d="M4.5 16.5h11" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M6.5 6.5V4.25A1.25 1.25 0 0 1 7.75 3h8A1.25 1.25 0 0 1 17 4.25v8a1.25 1.25 0 0 1-1.25 1.25H13.5" />
      <path d="M12.25 6.5h-8A1.25 1.25 0 0 0 3 7.75v8A1.25 1.25 0 0 0 4.25 17h8a1.25 1.25 0 0 0 1.25-1.25v-8A1.25 1.25 0 0 0 12.25 6.5Z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function CardGenerator({ profile }: CardGeneratorProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [colorTheme, setColorTheme] = useState<CardColorTheme>("dark");
  const [contentTemplate, setContentTemplate] =
    useState<CardContentTemplate>("default");
  const [isDownloading, setIsDownloading] = useState(false);
  const [editedText, setEditedText] = useState<string | null>(null);

  const suggestedText =
    editedText ?? buildSuggestedText(profile, contentTemplate);

  const role = roleLabels[profile.role] || "Builder";

  const handleDownload = useCallback(async () => {
    if (!cardRef.current) {
      return;
    }

    try {
      setIsDownloading(true);
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        fetchRequestInit: { mode: "cors" },
      });
      const link = document.createElement("a");
      link.download = `shipin-card-${profile.fullName
        .replace(/\s+/g, "-")
        .toLocaleLowerCase("tr")}.png`;
      link.href = dataUrl;
      link.click();
      toast.success("Görsel indirildi.");
    } catch {
      toast.error("Görsel indirilirken bir hata oluştu.");
    } finally {
      setIsDownloading(false);
    }
  }, [profile.fullName]);

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(suggestedText);
      toast.success("Metin panoya kopyalandı.");
    } catch {
      toast.error("Metin kopyalanamadı.");
    }
  };

  const handleContentTemplateChange = (template: CardContentTemplate) => {
    setContentTemplate(template);
    setEditedText(null);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_18rem]">
      {/* Preview */}
      <div className="min-w-0">
        <div className="relative aspect-[1200/630] w-full overflow-hidden rounded-lg border border-white/10 bg-black shadow-[0_12px_40px_rgb(0_0_0_/_0.5)]">
          <div
            className="absolute left-0 top-0 h-[630px] w-[1200px] origin-top-left"
            style={{
              transform: "scale(var(--card-scale, 0.4))",
            }}
            ref={(node) => {
              if (!node?.parentElement) {
                return;
              }

              const scale = node.parentElement.clientWidth / 1200;
              node.style.setProperty("--card-scale", scale.toString());
            }}
          >
            <CardRenderer
              ref={cardRef}
              profile={profile}
              colorTheme={colorTheme}
              contentTemplate={contentTemplate}
            />
          </div>
        </div>
      </div>

      {/* Sidebar controls */}
      <aside className="space-y-5">
        {/* Profile summary */}
        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-3">
            {profile.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profile.avatarUrl}
                alt={profile.fullName}
                className="h-10 w-10 rounded-full object-cover ring-2 ring-white/12"
              />
            ) : (
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.08] text-sm font-semibold text-white/80 ring-2 ring-white/12">
                {profile.fullName
                  .split(/\s+/u)
                  .map((p) => p[0])
                  .join("")
                  .slice(0, 2)
                  .toLocaleUpperCase("tr")}
              </span>
            )}
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                {profile.fullName}
              </p>
              <p className="truncate text-xs text-white/48">
                {role} · {profile.city}
              </p>
            </div>
          </div>
        </div>

        {/* Color Theme */}
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/56">
            Renk Teması
          </p>
          <div className="grid grid-cols-2 gap-2">
            {colorThemeOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                className="flex h-9 items-center justify-center rounded-md border border-white/10 text-xs font-medium text-white/72 transition hover:border-white/24 hover:text-white data-[active=true]:border-accent-400/50 data-[active=true]:bg-accent-400/10 data-[active=true]:text-white"
                data-active={colorTheme === option.value}
                onClick={() => setColorTheme(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Template */}
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/56">
            Mesaj Şablonu
          </p>
          <div className="grid gap-1.5">
            {contentTemplateOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                className="flex h-9 items-center justify-between rounded-md border border-white/10 px-3 text-xs font-medium text-white/72 transition hover:border-white/24 hover:text-white data-[active=true]:border-accent-400/50 data-[active=true]:bg-accent-400/10 data-[active=true]:text-white"
                data-active={contentTemplate === option.value}
                onClick={() => handleContentTemplateChange(option.value)}
              >
                <span>{option.label}</span>
                {contentTemplate === option.value ? (
                  <span className="text-[10px] text-accent-300/70">✓</span>
                ) : null}
              </button>
            ))}
          </div>
        </div>

        {/* LinkedIn text */}
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/56">
            Paylaşım Metni
          </p>
          <textarea
            className="block w-full resize-none rounded-md border border-white/10 bg-white/[0.04] p-3 text-xs leading-5 text-white/72 outline-none transition placeholder:text-white/28 focus:border-white/24 focus:text-white/88"
            rows={6}
            value={suggestedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
        </div>

        {/* Actions */}
        <div className="grid gap-2">
          <button
            type="button"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-white/12 px-4 text-sm font-medium text-white/78 transition hover:border-white/28 hover:text-white"
            onClick={handleCopyText}
          >
            <CopyIcon />
            Metni Kopyala
          </button>
          <button
            type="button"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-white bg-white px-4 text-sm font-semibold text-black transition hover:bg-white/88 disabled:pointer-events-none disabled:opacity-60"
            disabled={isDownloading}
            onClick={handleDownload}
          >
            <DownloadIcon />
            {isDownloading ? "İndiriliyor..." : "PNG İndir"}
          </button>
        </div>
      </aside>
    </div>
  );
}
