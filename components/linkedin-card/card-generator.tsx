"use client";

import React, { useRef, useState, useCallback } from "react";
import { toPng } from "html-to-image";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Select, Label, Badge } from "@/components/ui";
import { CardRenderer, type CardTemplate } from "./card-renderer";
import type { ProfileRecord } from "@/lib/types/profile";
import { roleLabels, tagLabels } from "@/components/admin/admin-shell";
import { toast } from "@/lib/utils/toast";

type CardGeneratorProps = {
  profile: ProfileRecord;
};

export function CardGenerator({ profile }: CardGeneratorProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [template, setTemplate] = useState<CardTemplate>("vibrant");
  const [isDownloading, setIsDownloading] = useState(false);

  const role = roleLabels[profile.role] || "Builder";
  const tag = profile.activeTag ? tagLabels[profile.activeTag] : "Build ediyorum";

  const suggestedText = `Selamlar! 👋\n\nAnkara Build Club (ABC) topluluğuna katıldım. Şu anda ${role} olarak yer alıyorum ve "${tag}" durumundayım. \n\nToplulukta harika işler başarmayı ve yeni insanlarla tanışmayı sabırsızlıkla bekliyorum!\n\n#AnkaraBuildClub #Builder`;

  const handleDownload = useCallback(async () => {
    if (!cardRef.current) return;
    
    try {
      setIsDownloading(true);
      const dataUrl = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 2 });
      const link = document.createElement("a");
      link.download = `abc-linkedin-${profile.fullName.replace(/\s+/g, '-').toLowerCase()}.png`;
      link.href = dataUrl;
      link.click();
      toast.success("Görsel başarıyla indirildi.");
    } catch (err) {
      console.error(err);
      toast.error("Görsel indirilirken bir hata oluştu.");
    } finally {
      setIsDownloading(false);
    }
  }, [profile.fullName]);

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(suggestedText);
      toast.success("Metin panoya kopyalandı.");
    } catch (err) {
      toast.error("Metin kopyalanamadı.");
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Canlı Önizleme</CardTitle>
            <CardDescription>
              LinkedIn için üretilen görseliniz. Görsel boyutları 1200x630 (LinkedIn standardı) olarak ayarlanmıştır.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Önizleme Konteyneri - Görüntüde küçültülmüş, ama DOM'da gerçek boyutunda gizli rendering yapmayacağız. CSS scale kullanarak gerçek boyutta render edip UI'a sığdıracağız. */}
            <div className="relative w-full overflow-hidden rounded-lg border border-border bg-surface-muted" style={{ aspectRatio: "1200/630" }}>
              <div 
                className="absolute origin-top-left" 
                style={{ 
                  transform: `scale(var(--scale-factor))`,
                  width: '1200px',
                  height: '630px',
                }}
                ref={(node) => {
                  if (node && node.parentElement) {
                    const scale = node.parentElement.clientWidth / 1200;
                    node.style.setProperty('--scale-factor', scale.toString());
                  }
                }}
              >
                <CardRenderer ref={cardRef} profile={profile} template={template} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Ayarlar</CardTitle>
            <CardDescription>Kartınızın görünümünü özelleştirin.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="template">Şablon Seçimi</Label>
              <Select 
                id="template"
                value={template} 
                onChange={(e) => setTemplate(e.target.value as CardTemplate)}
                className="w-full"
              >
                <option value="vibrant">Canlı (Vibrant)</option>
                <option value="minimal">Minimal (Açık Tema)</option>
                <option value="dark">Koyu (Dark Tema)</option>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Profil Bilgileriniz</Label>
              <div className="flex flex-wrap gap-2 pt-1">
                <Badge variant="info">{role}</Badge>
                <Badge variant="primary">{tag}</Badge>
                <Badge variant="secondary">{profile.city}</Badge>
              </div>
              <p className="text-xs text-text-soft pt-2">
                Bilgilerinizi Profil sayfasından güncelleyebilirsiniz.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Paylaşım Metni</CardTitle>
            <CardDescription>Bu metni kopyalayıp gönderinize yapıştırabilirsiniz.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md border border-border bg-surface-muted p-4 text-sm text-text-soft whitespace-pre-wrap">
              {suggestedText}
            </div>
            
            <div className="flex flex-col gap-3">
              <Button onClick={handleCopyText} variant="outline" className="w-full">
                Metni Kopyala
              </Button>
              <Button onClick={handleDownload} loading={isDownloading} className="w-full">
                Görseli İndir (PNG)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
