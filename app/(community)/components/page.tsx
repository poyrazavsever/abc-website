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
        description="A simple demo area for seeing all core UI kit pieces on a single page."
        actions={
          <Button onClick={() => appToast.success("Toast helper is active")}>
            Show Toast
          </Button>
        }
      />

      <ShowcaseSection
        title="Actions"
        description="Button family and core interaction actions."
      >
        <div className="flex flex-wrap gap-3">
          <Button>Primary</Button>
          <Button leadingIcon={<DemoIcon />}>Builder Flow</Button>
          <Button href="/events" variant="outline">
            Link CTA
          </Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button loading>Loading</Button>
          <IconButton icon={<DemoIcon />} label="Favorite" />
          <LinkButton href="/events" variant="ghost">
            Events
          </LinkButton>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Identity"
        description="Core visual carriers such as badges, avatars, cards, and dividers."
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
            <CardTitle>Card Title</CardTitle>
            <CardDescription>
              Reusable card composition example.
            </CardDescription>
          </CardHeader>
          <CardContent>
            This card is used to demonstrate shared UI-kit surface rules.
          </CardContent>
          <CardFooter>
            <Button size="sm">Action</Button>
          </CardFooter>
        </Card>
      </ShowcaseSection>

      <ShowcaseSection
        title="Forms"
        description="Field, text input, and selection controls."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <Field
            label="Full Name"
            description="Basic text input wrapper."
            required
          >
            <Input placeholder="Mustafa Kara" />
          </Field>

          <Field
            label="Role"
            description="Native select appearance."
          >
            <Select defaultValue="developer">
              <option value="developer">Developer</option>
              <option value="designer">Designer</option>
              <option value="product">Product</option>
            </Select>
          </Field>

          <Field
            label="Bio"
            description="Multiline input."
          >
            <Textarea placeholder="Briefly describe what you build..." />
          </Field>

          <Field
            label="LinkedIn"
            description="Error state example."
            error="Enter a valid profile URL."
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
            label="I accept the community agreement"
            description="Checkbox control example."
            onCheckedChange={setCheckboxValue}
          />

          <Switch
            checked={switchValue}
            label="Enable notifications"
            description="Switch control example."
            onCheckedChange={setSwitchValue}
          />

          <RadioGroup
            value={radioValue}
            onValueChange={setRadioValue}
          >
            <RadioItem
              value="design"
              label="Design"
              description="UI and visual language."
            />
            <RadioItem
              value="product"
              label="Product"
              description="Strategy and scope."
            />
          </RadioGroup>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Feedback"
        description="Status messages, empty states, and loading indicators."
      >
        <Alert variant="info" icon={<DemoIcon />}>
          <AlertTitle>Info</AlertTitle>
          <AlertDescription>
            An alert structure that could be used here when event sync completes.
          </AlertDescription>
        </Alert>

        <div className="flex flex-wrap items-center gap-4">
          <Spinner />
          <Skeleton className="h-10 w-40" />
          <Skeleton variant="circle" className="h-10 w-10" />
        </div>

        <Progress label="Onboarding progress" showValue value={66} />

        <EmptyState
          title="No project yet"
          description="This empty state can be used until the user adds their first project."
          actions={<Button size="sm">Add Project</Button>}
          icon={<DemoIcon />}
        />
      </ShowcaseSection>

      <ShowcaseSection
        title="Overlays"
        description="Interaction components such as dialog, sheet, and tabs."
      >
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => setDialogOpen(true)}>Open Dialog</Button>
          <Button variant="outline" onClick={() => setSheetOpen(true)}>
            Open Sheet
          </Button>
        </div>

        <Tabs defaultValue="dialog">
          <TabsList>
            <TabsTrigger value="dialog">Dialog</TabsTrigger>
            <TabsTrigger value="sheet">Sheet</TabsTrigger>
            <TabsTrigger value="tabs">Tabs</TabsTrigger>
          </TabsList>
          <TabsContent value="dialog">
            The dialog modal demonstrates focus management and overlay close behavior.
          </TabsContent>
          <TabsContent value="sheet">
            The sheet panel is used for right-side drawer patterns.
          </TabsContent>
          <TabsContent value="tabs">
            Tabs triggers and content sections work in both controlled and uncontrolled modes.
          </TabsContent>
        </Tabs>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogHeader>
            <DialogTitle>Dialog Showcase</DialogTitle>
            <DialogDescription>
              This area exists to demonstrate modal layout and close behavior.
            </DialogDescription>
          </DialogHeader>
          <DialogBody>
            Forms or confirmation flows can be placed inside the dialog.
          </DialogBody>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setDialogOpen(false)}>
              Close
            </Button>
            <Button onClick={() => setDialogOpen(false)}>Done</Button>
          </DialogFooter>
        </Dialog>

        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetHeader>
            <SheetTitle>Sheet Showcase</SheetTitle>
            <SheetDescription>
              This panel is used to test the drawer pattern.
            </SheetDescription>
          </SheetHeader>
          <SheetBody className="space-y-4">
            <Field label="Search">
              <Input placeholder="Search builder..." />
            </Field>
            <Field label="Note">
              <Textarea placeholder="A short note..." rows={3} />
            </Field>
          </SheetBody>
          <SheetFooter>
            <Button variant="outline" onClick={() => setSheetOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setSheetOpen(false)}>Save</Button>
          </SheetFooter>
        </Sheet>
      </ShowcaseSection>
    </div>
  );
}
