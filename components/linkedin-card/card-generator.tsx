"use client";

import { useCallback, useRef, useState } from "react";
import { toPng } from "html-to-image";

import { CardRenderer, type CardTemplate } from "@/components/linkedin-card/card-renderer";
import { roleLabels, tagLabels } from "@/components/admin/admin-shell";
import type { ProfileRecord } from "@/lib/types/profile";
import { appToast as toast } from "@/lib/utils/toast";

type CardGeneratorProps = {
  profile: ProfileRecord;
};

const templateOptions: Array<{ label: string; value: CardTemplate }> = [
  { label: "Dark", value: "dark" },
  { label: "Minimal", value: "minimal" },
  { label: "Accent", value: "vibrant" },
];

export function CardGenerator({ profile }: CardGeneratorProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [template, setTemplate] = useState<CardTemplate>("dark");
  const [isDownloading, setIsDownloading] = useState(false);

  const role = roleLabels[profile.role] || "Builder";
  const tag = profile.activeTag ? tagLabels[profile.activeTag] : "Build ediyorum";
  const suggestedText = [
    "Ankara Build Club topluluğuna katıldım.",
    "",
    `${role} olarak üretmeye devam ediyorum. Durumum: ${tag}.`,
    "",
    "#AnkaraBuildClub #Builder",
  ].join("\n");

  const handleDownload = useCallback(async () => {
    if (!cardRef.current) {
      return;
    }

    try {
      setIsDownloading(true);
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
      });
      const link = document.createElement("a");
      link.download = `abc-linkedin-${profile.fullName
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

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_17rem]">
      <div className="min-w-0">
        <div className="relative aspect-[1200/630] w-full overflow-hidden rounded-md border border-white/10 bg-black">
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
            <CardRenderer ref={cardRef} profile={profile} template={template} />
          </div>
        </div>
      </div>

      <aside className="space-y-5">
        <div className="space-y-2">
          <p className="text-xs font-medium text-white/56">Şablon</p>
          <div className="grid gap-2">
            {templateOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                className="flex h-10 items-center justify-between rounded-md border border-white/10 px-3 text-sm text-white/72 transition hover:border-white/24 hover:text-white data-[active=true]:border-white/40 data-[active=true]:text-white"
                data-active={template === option.value}
                onClick={() => setTemplate(option.value)}
              >
                {option.label}
                {template === option.value ? <span className="text-white/42">Seçili</span> : null}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-md border border-white/10 p-3">
          <p className="text-xs font-medium text-white/56">Profil</p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full border border-white/10 px-2 py-1 text-white/72">
              {role}
            </span>
            <span className="rounded-full border border-white/10 px-2 py-1 text-white/72">
              {profile.city}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium text-white/56">Paylaşım metni</p>
          <div className="max-h-40 overflow-y-auto rounded-md border border-white/10 p-3 text-xs leading-5 text-white/62 whitespace-pre-wrap">
            {suggestedText}
          </div>
        </div>

        <div className="grid gap-2">
          <button
            type="button"
            className="h-10 rounded-md border border-white/12 px-4 text-sm font-medium text-white/78 transition hover:border-white/28 hover:text-white"
            onClick={handleCopyText}
          >
            Metni Kopyala
          </button>
          <button
            type="button"
            className="h-10 rounded-md border border-white bg-white px-4 text-sm font-semibold text-black transition hover:bg-white/88 disabled:pointer-events-none disabled:opacity-60"
            disabled={isDownloading}
            onClick={handleDownload}
          >
            {isDownloading ? "İndiriliyor..." : "PNG İndir"}
          </button>
        </div>
      </aside>
    </div>
  );
}
