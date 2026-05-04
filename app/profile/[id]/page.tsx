import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { roleLabels, tagLabels } from "@/components/admin/admin-shell";
import { ProfileEditModal } from "@/components/profile/profile-edit-modal";
import { Container } from "@/components/shared/container";
import { Badge, Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui";
import { getCurrentUser } from "@/lib/auth/server";
import { projectCategoryLabels } from "@/lib/data/onboarding.data";
import { getUserBadges } from "@/lib/services/badges.service";
import { getPublicProfileSnapshotById } from "@/lib/services/profile.service";
import type { ProfileRecord, ProjectRecord } from "@/lib/types/profile";
import { cn } from "@/lib/utils/cn";

type PublicProfilePageProps = {
  params: Promise<{
    id: string;
  }>;
};

type SocialLink = {
  href: string | null;
  label: string;
  value: string | null;
};

const coverPalettes = [
  "from-primary-700 via-secondary-700 to-ink-950",
  "from-accent-700 via-primary-700 to-brand-black",
  "from-highlight-700 via-secondary-800 to-ink-950",
  "from-primary-800 via-accent-800 to-brand-black",
] as const;

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu.test(
    value,
  );
}

function getCoverClassName(id: string) {
  const total = id
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return coverPalettes[total % coverPalettes.length];
}

export async function generateMetadata({
  params,
}: PublicProfilePageProps): Promise<Metadata> {
  const { id } = await params;

  if (!isUuid(id)) {
    return { title: "Profil bulunamadı" };
  }

  const snapshot = await getPublicProfileSnapshotById(id);

  if (!snapshot?.profile) {
    return { title: "Profil bulunamadı" };
  }

  return {
    title: `${snapshot.profile.fullName} Profili`,
    description:
      snapshot.profile.bio ||
      `${snapshot.profile.fullName} Ankara Build Club public profili.`,
  };
}

function ArrowUpRightIcon() {
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
      <path d="M6 14 14 6" />
      <path d="M8 6h6v6" />
    </svg>
  );
}

function BadgeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M12 4.75 14.1 9l4.65.68-3.36 3.28.8 4.64L12 15.42 7.81 17.6l.8-4.64-3.36-3.28L9.9 9 12 4.75Z" />
    </svg>
  );
}

function getInitials(profile: ProfileRecord) {
  const parts = profile.fullName.trim().split(/\s+/u).filter(Boolean);
  return `${parts[0]?.[0] ?? "A"}${parts[1]?.[0] ?? "B"}`.toLocaleUpperCase(
    "tr",
  );
}

function ProfileAvatar({ profile }: { profile: ProfileRecord }) {
  return (
    <div
      className={cn(
        "flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-ink-950 bg-ink-900 text-3xl font-semibold text-white shadow-[0_18px_50px_rgb(0_0_0_/_0.32)]",
        profile.avatarUrl && "bg-cover bg-center text-transparent",
      )}
      style={
        profile.avatarUrl
          ? { backgroundImage: `url(${profile.avatarUrl})` }
          : undefined
      }
      aria-label={`${profile.fullName} profil fotoğrafı`}
    >
      {getInitials(profile)}
    </div>
  );
}

function SocialLinks({ links }: { links: SocialLink[] }) {
  const visibleLinks = links.filter((link) => link.href && link.value);

  if (visibleLinks.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {visibleLinks.map((link) => (
        <Link
          key={link.label}
          href={link.href ?? "#"}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs font-semibold text-ink-100 transition hover:border-accent-300/35 hover:bg-white/[0.08]"
        >
          {link.label}
          <ArrowUpRightIcon />
        </Link>
      ))}
    </div>
  );
}

function ProjectTile({ project }: { project: ProjectRecord }) {
  return (
    <article className="group overflow-hidden rounded-md border border-white/10 bg-white/[0.04] transition hover:border-accent-300/35 hover:bg-white/[0.07]">
      <div
        className={cn(
          "aspect-square bg-cover bg-center p-4",
          !project.imageUrl && "bg-linear-to-br",
          !project.imageUrl && getCoverClassName(project.id),
        )}
        style={
          project.imageUrl
            ? { backgroundImage: `url(${project.imageUrl})` }
            : undefined
        }
      >
        <div className="flex h-full flex-col justify-between rounded-md bg-black/24 p-4 backdrop-blur-[1px]">
          <Badge variant="secondary" className="w-fit bg-white/12 text-white">
            {project.status}
          </Badge>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/66">
              {projectCategoryLabels[project.category]}
            </p>
            <h3 className="mt-2 line-clamp-2 text-xl font-semibold text-white">
              {project.name}
            </h3>
          </div>
        </div>
      </div>
      <div className="space-y-3 p-4">
        <p className="line-clamp-3 text-sm leading-6 text-ink-300">
          {project.description}
        </p>
        {project.technologies ? (
          <p className="line-clamp-1 text-xs text-ink-400">
            {project.technologies}
          </p>
        ) : null}
        {project.url ? (
          <Link
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-300 transition hover:text-accent-200"
          >
            İncele
            <ArrowUpRightIcon />
          </Link>
        ) : null}
      </div>
    </article>
  );
}

export default async function PublicProfilePage({
  params,
}: PublicProfilePageProps) {
  const { id } = await params;

  if (!isUuid(id)) {
    notFound();
  }

  const [snapshot, currentUser, badges] = await Promise.all([
    getPublicProfileSnapshotById(id),
    getCurrentUser(),
    getUserBadges(id),
  ]);

  if (!snapshot?.profile) {
    notFound();
  }

  const { profile, projects } = snapshot;
  const isOwnProfile = currentUser?.id === profile.id;

  if (!profile.onboardingCompleted && !isOwnProfile) {
    notFound();
  }

  const socials: SocialLink[] = [
    { label: "GitHub", href: profile.githubUrl, value: profile.githubUsername },
    {
      label: "LinkedIn",
      href: profile.linkedinUrl,
      value: profile.linkedinUsername ?? profile.linkedinUrl,
    },
    {
      label: "Instagram",
      href: profile.instagramUrl,
      value: profile.instagramUsername,
    },
  ];

  return (
    <div className="bg-ink-950 pt-24 text-white">
      <Container width="default" className="pb-16">
        <section className="overflow-hidden rounded-lg border border-white/10 bg-ink-900/72 shadow-[0_28px_80px_rgb(0_0_0_/_0.28)]">
          <div
            className={cn(
              "h-44 bg-linear-to-br sm:h-56",
              getCoverClassName(profile.id),
            )}
          />

          <div className="px-5 pb-6 sm:px-8 sm:pb-8">
            <div className="-mt-14 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <ProfileAvatar profile={profile} />
              {isOwnProfile ? (
                <Suspense fallback={null}>
                  <ProfileEditModal profile={profile} />
                </Suspense>
              ) : null}
            </div>

            <div className="mt-5 max-w-3xl space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="info">{roleLabels[profile.role]}</Badge>
                {profile.activeTag ? (
                  <Badge>{tagLabels[profile.activeTag]}</Badge>
                ) : null}
                <Badge variant="secondary">{profile.city}</Badge>
              </div>

              <div className="space-y-2">
                <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  {profile.fullName}
                </h1>
                <p className="max-w-2xl text-sm leading-7 text-ink-300 sm:text-base">
                  {profile.bio || "Bu builder henüz bio eklemedi."}
                </p>
              </div>

              <SocialLinks links={socials} />
            </div>
          </div>
        </section>

        <Tabs defaultValue="projects" className="mt-6">
          <TabsList className="w-full justify-center rounded-lg border-white/10 bg-ink-900/72 p-1">
            <TabsTrigger
              value="projects"
              className="flex-1 rounded-md text-ink-300 data-[state=active]:bg-white data-[state=active]:text-brand-black"
            >
              Projeler
            </TabsTrigger>
            <TabsTrigger
              value="badges"
              className="flex-1 rounded-md text-ink-300 data-[state=active]:bg-white data-[state=active]:text-brand-black"
            >
              Rozetler
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects">
            {projects.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                  <ProjectTile key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-white/12 bg-white/[0.04] p-10 text-center text-sm text-ink-300">
                Henüz sergilenen bir proje yok.
              </div>
            )}
          </TabsContent>

          <TabsContent value="badges">
            {badges.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {badges.map((userBadge) => (
                  <article
                    key={userBadge.id}
                    className="flex gap-4 rounded-md border border-white/10 bg-white/[0.04] p-4"
                  >
                    <span
                      className={cn(
                        "flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/[0.05] text-accent-300",
                        userBadge.badge.icon_url &&
                          "bg-cover bg-center text-transparent",
                      )}
                      style={
                        userBadge.badge.icon_url
                          ? {
                              backgroundImage: `url(${userBadge.badge.icon_url})`,
                            }
                          : undefined
                      }
                    >
                      <BadgeIcon />
                    </span>
                    <div className="space-y-1">
                      <h3 className="text-sm font-semibold text-white">
                        {userBadge.badge.name}
                      </h3>
                      <p className="line-clamp-3 text-xs leading-6 text-ink-300">
                        {userBadge.badge.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-white/12 bg-white/[0.04] p-10 text-center text-sm text-ink-300">
                Henüz kazanılmış bir rozet yok.
              </div>
            )}
          </TabsContent>
        </Tabs>
      </Container>
    </div>
  );
}
