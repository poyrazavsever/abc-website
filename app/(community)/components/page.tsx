"use client";

import { useState } from "react";

import { appToast } from "@/lib/utils/toast";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Avatar,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Dialog,
  DialogBody,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Divider,
  EmptyState,
  Field,
  IconButton,
  Input,
  LinkButton,
  Progress,
  RadioGroup,
  RadioItem,
  SectionHeader,
  Select,
  Sheet,
  SheetBody,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  Skeleton,
  Spinner,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
} from "@/components/ui";

function DemoIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current" aria-hidden="true">
      <path d="M10 2.5 12.32 7.18l5.18.75-3.75 3.65.89 5.17L10 14.32 5.36 16.75l.89-5.17L2.5 7.93l5.18-.75z" />
    </svg>
  );
}

type ShowcaseSectionProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

function ShowcaseSection({
  title,
  description,
  children,
}: ShowcaseSectionProps) {
  return (
    <section className="space-y-5">
      <SectionHeader heading={title} description={description} />
      <Card>
        <CardContent className="space-y-6">{children}</CardContent>
      </Card>
    </section>
  );
}

export default function ComponentsShowcasePage() {
  const [checkboxValue, setCheckboxValue] = useState(true);
  const [switchValue, setSwitchValue] = useState(false);
  const [radioValue, setRadioValue] = useState("design");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <div className="space-y-10">
      <SectionHeader
        eyebrow="UI Kit"
        heading="Components Showcase"
        description="Tüm temel UI-kit parçalarını tek sayfada görmek için sade bir demo alanı."
        actions={
          <Button onClick={() => appToast.success("Toast helper aktif")}>
            Toast Goster
          </Button>
        }
      />

      <ShowcaseSection
        title="Actions"
        description="Buton ailesi ve temel etkileşim aksiyonları."
      >
        <div className="flex flex-wrap gap-3">
          <Button>Primary</Button>
          <Button leadingIcon={<DemoIcon />}>Builder Flow</Button>
          <Button href="/events" variant="outline">
            Href CTA
          </Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button loading>Loading</Button>
          <IconButton icon={<DemoIcon />} label="Favori" />
          <LinkButton href="/events" variant="ghost">
            Etkinlikler
          </LinkButton>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Identity"
        description="Rozet, avatar, kart ve ayirici gibi temel gorsel tasiyicilar."
      >
        <div className="flex flex-wrap items-center gap-4">
          <Avatar alt="Ankara Build Club" fallback="AB" />
          <Avatar alt="Builder One" size="lg" fallback="BO" />
          <Badge>Default</Badge>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
        </div>

        <Divider />

        <Card surface="muted">
          <CardHeader>
            <CardTitle>Card Basligi</CardTitle>
            <CardDescription>
              Reusable card composition ornegi.
            </CardDescription>
          </CardHeader>
          <CardContent>
            Bu kart, ortak UI-kit yuzey kurallarini göstermek icin kullaniliyor.
          </CardContent>
          <CardFooter>
            <Button size="sm">Aksiyon</Button>
          </CardFooter>
        </Card>
      </ShowcaseSection>

      <ShowcaseSection
        title="Forms"
        description="Field, text inputlari ve secim kontrolleri."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <Field
            label="Ad Soyad"
            description="Temel text input wrapper."
            required
          >
            <Input placeholder="Mustafa Kara" />
          </Field>

          <Field
            label="Rol"
            description="Native select gorunumu."
          >
            <Select defaultValue="developer">
              <option value="developer">Yazilimci</option>
              <option value="designer">Tasarimci</option>
              <option value="product">Urun</option>
            </Select>
          </Field>

          <Field
            label="Bio"
            description="Cok satirli alan."
          >
            <Textarea placeholder="Ne ürettiğini kısaca anlat..." />
          </Field>

          <Field
            label="LinkedIn"
            description="Error state ornegi."
            error="Geçerli bir profil URL'si gir."
            invalid
          >
            <Input
              type="url"
              placeholder="https://linkedin.com/in/..."
              invalid
            />
          </Field>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          <Checkbox
            checked={checkboxValue}
            label="Topluluk sozlesmesini kabul ediyorum"
            description="Checkbox kontrol ornegi."
            onCheckedChange={setCheckboxValue}
          />

          <Switch
            checked={switchValue}
            label="Bildirimleri ac"
            description="Switch kontrol ornegi."
            onCheckedChange={setSwitchValue}
          />

          <RadioGroup
            value={radioValue}
            onValueChange={setRadioValue}
          >
            <RadioItem
              value="design"
              label="Tasarim"
              description="UI ve gorsel dil."
            />
            <RadioItem
              value="product"
              label="Urun"
              description="Strateji ve kapsam."
            />
          </RadioGroup>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Feedback"
        description="Durum mesajlari, bos ekranlar ve yuklenme göstergeleri."
      >
        <Alert variant="info" icon={<DemoIcon />}>
          <AlertTitle>Bilgilendirme</AlertTitle>
          <AlertDescription>
            Event sync tamamlandığında burada kullanılabilecek bir alert yapısı.
          </AlertDescription>
        </Alert>

        <div className="flex flex-wrap items-center gap-4">
          <Spinner />
          <Skeleton className="h-10 w-40" />
          <Skeleton variant="circle" className="h-10 w-10" />
        </div>

        <Progress label="Onboarding ilerlemesi" showValue value={66} />

        <EmptyState
          title="Henuz proje yok"
          description="Kullanici ilk projesini ekleyene kadar bu bos durum kullanilabilir."
          actions={<Button size="sm">Proje Ekle</Button>}
          icon={<DemoIcon />}
        />
      </ShowcaseSection>

      <ShowcaseSection
        title="Overlays"
        description="Dialog, sheet ve tabs gibi interaction componentleri."
      >
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => setDialogOpen(true)}>Dialog Ac</Button>
          <Button variant="outline" onClick={() => setSheetOpen(true)}>
            Sheet Ac
          </Button>
        </div>

        <Tabs defaultValue="dialog">
          <TabsList>
            <TabsTrigger value="dialog">Dialog</TabsTrigger>
            <TabsTrigger value="sheet">Sheet</TabsTrigger>
            <TabsTrigger value="tabs">Tabs</TabsTrigger>
          </TabsList>
          <TabsContent value="dialog">
            Dialog modali, odak yönetimi ve overlay kapama davranisini gösterir.
          </TabsContent>
          <TabsContent value="sheet">
            Sheet paneli, sagdan acilan drawer ihtiyaclari icin kullanilir.
          </TabsContent>
          <TabsContent value="tabs">
            Tabs trigger ve content parcaciklari controlled veya uncontrolled çalışir.
          </TabsContent>
        </Tabs>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogHeader>
            <DialogTitle>Dialog Showcase</DialogTitle>
            <DialogDescription>
              Bu alan, modal ic yapisini ve close davranisini göstermek icin var.
            </DialogDescription>
          </DialogHeader>
          <DialogBody>
            Dialog icerigine form veya onay akislari yerlestirilebilir.
          </DialogBody>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setDialogOpen(false)}>
              Kapat
            </Button>
            <Button onClick={() => setDialogOpen(false)}>Tamam</Button>
          </DialogFooter>
        </Dialog>

        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetHeader>
            <SheetTitle>Sheet Showcase</SheetTitle>
            <SheetDescription>
              Bu panel, drawer pattern&apos;ini test etmek icin kullaniliyor.
            </SheetDescription>
          </SheetHeader>
          <SheetBody className="space-y-4">
            <Field label="Arama">
              <Input placeholder="Builder ara..." />
            </Field>
            <Field label="Not">
              <Textarea placeholder="Kisa bir not..." rows={3} />
            </Field>
          </SheetBody>
          <SheetFooter>
            <Button variant="outline" onClick={() => setSheetOpen(false)}>
              Vazgec
            </Button>
            <Button onClick={() => setSheetOpen(false)}>Kaydet</Button>
          </SheetFooter>
        </Sheet>
      </ShowcaseSection>
    </div>
  );
}
