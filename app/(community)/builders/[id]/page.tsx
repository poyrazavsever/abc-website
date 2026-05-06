import Link from "next/link";

import { roleLabels, tagLabels } from "@/components/admin/admin-shell";
import { Grainient } from "@/components/marketing/grainient";
import { Avatar, Badge } from "@/components/ui";
import { getUserBadges } from "@/lib/services/badges.service";
import { getPublicBuilderProfile } from "@/lib/services/builders.service";
import { categoryLabels, statusLabels } from "@/components/projects/project-card";
import { Container } from "@/components/shared/container";

type BuilderProfilePageProps = {
  params: Promise<{
    id: string;
  }>;
};

function getSafeProjectUrl(url: string) {
  return url.startsWith("http") ? url : `https://${url}`;
}

export default async function BuilderProfilePage({
  params,
}: BuilderProfilePageProps) {
  const { id } = await params;
  const builderData = await getPublicBuilderProfile(id);
  const { profile, projects = [], badgeCount, isSeriousBuilder } = builderData || {};
  const badges = await getUserBadges(id);

  if (!profile) {
    return (
      <main className="relative left-1/2 -mb-10 -mt-28 min-h-screen w-screen -translate-x-1/2 overflow-hidden bg-brand-black text-white">
        <div className="absolute inset-0 -z-30">
          <Grainient
            color1="var(--color-accent-500)"
            color2="var(--color-secondary-500)"
            color3="var(--color-primary-950)"
            timeSpeed={0.22}
            colorBalance={-0.16}
            warpStrength={1.12}
            warpFrequency={4.9}
            warpSpeed={1.8}
            warpAmplitude={56}
            blendAngle={12}
            blendSoftness={0.05}
            rotationAmount={420}
            noiseScale={1.9}
            grainAmount={0.09}
            grainScale={1.8}
            grainAnimated={false}
            contrast={1.42}
            gamma={1}
            saturation={0.98}
            centerX={0}
            centerY={0.02}
            zoom={0.94}
          />
        </div>
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.16),transparent_24%),linear-gradient(135deg,rgba(20,12,35,0.72),rgba(0,0,0,0.92))]" />
        <div className="absolute left-[-8rem] top-24 -z-10 h-72 w-72 rounded-full bg-accent/18 blur-3xl" />
        <div className="absolute bottom-12 right-[-6rem] -z-10 h-80 w-80 rounded-full bg-secondary/20 blur-3xl" />

        <Container className="relative flex min-h-[calc(100vh-7rem)] items-center justify-center py-18">
          <section className="relative w-full max-w-2xl">
            <div className="absolute inset-x-10 top-8 h-28 rounded-full bg-white/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/14 bg-[linear-gradient(180deg,rgba(13,13,14,0.92),rgba(31,18,53,0.9))] p-8 text-center shadow-[0_30px_90px_rgba(0,0,0,0.34)] backdrop-blur-xl sm:p-10">
              <div className="space-y-4">
                <div className="inline-flex rounded-full border border-white/10 bg-white/6 px-4 py-1 text-xs font-semibold tracking-[0.18em] text-white/58">
                  Builder Profile
                </div>
                <h1 className="text-2xl font-semibold text-white sm:text-3xl">
                  Builder not found
                </h1>
                <p className="mx-auto max-w-xl text-sm leading-7 text-white/64 sm:text-base">
                  This public builder profile does not exist or is currently unavailable.
                </p>
              </div>
            </div>
          </section>
        </Container>
      </main>
    );
  }

  return (
    <main className="relative left-1/2 -mb-10 -mt-28 min-h-screen w-screen -translate-x-1/2 overflow-hidden bg-brand-black text-white">
      <div className="absolute inset-0 -z-30">
        <Grainient
          color1="var(--color-accent-500)"
          color2="var(--color-secondary-500)"
          color3="var(--color-primary-950)"
          timeSpeed={0.22}
          colorBalance={-0.16}
          warpStrength={1.12}
          warpFrequency={4.9}
          warpSpeed={1.8}
          warpAmplitude={56}
          blendAngle={12}
          blendSoftness={0.05}
          rotationAmount={420}
          noiseScale={1.9}
          grainAmount={0.09}
          grainScale={1.8}
          grainAnimated={false}
          contrast={1.42}
          gamma={1}
          saturation={0.98}
          centerX={0}
          centerY={0.02}
          zoom={0.94}
        />
      </div>
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.16),transparent_24%),linear-gradient(135deg,rgba(20,12,35,0.72),rgba(0,0,0,0.92))]" />
      <div className="absolute left-[-8rem] top-24 -z-10 h-72 w-72 rounded-full bg-accent/18 blur-3xl" />
      <div className="absolute bottom-12 right-[-6rem] -z-10 h-80 w-80 rounded-full bg-secondary/20 blur-3xl" />

      <Container className="relative py-14 sm:py-18 lg:py-24">
        <section className="relative mx-auto w-full max-w-6xl">
          <div className="absolute inset-x-16 top-10 h-32 rounded-full bg-white/10 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/14 bg-[linear-gradient(180deg,rgba(13,13,14,0.92),rgba(31,18,53,0.9))] shadow-[0_30px_90px_rgba(0,0,0,0.34)] backdrop-blur-xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_20%)]" />
            <div className="relative space-y-8 px-6 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
              <section className="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.95fr)] lg:items-start">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="inline-flex rounded-full border border-white/10 bg-white/6 px-4 py-1 text-xs font-semibold tracking-[0.18em] text-white/58">
                      Builder Profile
                    </div>
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                      <Avatar
                        alt={profile.fullName}
                        size="xl"
                        className="h-20 w-20 border-white/14 bg-white/8 text-2xl text-white sm:h-24 sm:w-24"
                      />
                      <div className="min-w-0 space-y-4">
                        <div className="space-y-2">
                          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                            {profile.fullName}
                          </h1>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-white/52">
                            <span>{profile.city || "Location not shared"}</span>
                            <span className="h-1 w-1 rounded-full bg-white/28" />
                            <span>{roleLabels[profile.role as keyof typeof roleLabels]}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Badge variant="info" className="border-white/10 bg-white/8 text-white">
                            {roleLabels[profile.role as keyof typeof roleLabels]}
                          </Badge>
                          {profile.activeTag ? (
                            <Badge className="border-white/10 bg-white/6 text-white/78">
                              {tagLabels[profile.activeTag as keyof typeof tagLabels]}
                            </Badge>
                          ) : null}
                          <Badge className="border-white/10 bg-white/6 text-white/78">
                            {badgeCount} badges
                          </Badge>
                          <Badge className="border-white/10 bg-white/6 text-white/78">
                            {projects.length} projects
                          </Badge>
                          {isSeriousBuilder ? (
                            <Badge variant="success" className="border-white/10 bg-emerald-400/14 text-emerald-100">
                              Serious Builder
                            </Badge>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="max-w-3xl space-y-4">
                    <p className="text-sm leading-7 text-white/72 sm:text-base">
                      {profile.bio?.trim().length
                        ? profile.bio
                        : "This builder has not added a public bio yet, but is already part of the community directory."}
                    </p>

                    <div className="flex flex-wrap gap-3">
                      {profile.linkedinUrl ? (
                        <Link
                          href={profile.linkedinUrl}
                          target="_blank"
                          className="inline-flex items-center rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/12"
                        >
                          Open LinkedIn
                        </Link>
                      ) : null}
                      <Link
                        href="/projects"
                        className="inline-flex items-center rounded-full border border-white/10 bg-transparent px-4 py-2 text-sm font-semibold text-white/72 transition hover:border-white/18 hover:bg-white/8 hover:text-white"
                      >
                        Browse projects
                      </Link>
                    </div>
                  </div>
                </div>

                <aside className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/6 p-5">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/42">
                      Projects
                    </p>
                    <p className="mt-2 text-3xl font-semibold text-white">{projects.length}</p>
                    <p className="mt-2 text-sm leading-6 text-white/56">
                      Publicly listed products, MVPs, and experiments.
                    </p>
                  </div>
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/6 p-5">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/42">
                      Badges
                    </p>
                    <p className="mt-2 text-3xl font-semibold text-white">{badgeCount}</p>
                    <p className="mt-2 text-sm leading-6 text-white/56">
                      Community milestones and contributions earned so far.
                    </p>
                  </div>
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/6 p-5">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/42">
                      Intent
                    </p>
                    <p className="mt-2 text-lg font-semibold text-white">
                      {profile.activeTag
                        ? tagLabels[profile.activeTag as keyof typeof tagLabels]
                        : "Open to connect"}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-white/56">
                      A quick signal for collaboration style and current focus.
                    </p>
                  </div>
                </aside>
              </section>

              <section className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
                <div className="rounded-[1.75rem] border border-white/10 bg-black/16 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.16)] sm:p-6">
                  <div className="mb-5 flex items-end justify-between gap-4">
                    <div className="space-y-2">
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/42">
                        Current Build Stack
                      </p>
                      <h2 className="text-2xl font-semibold text-white">Projects</h2>
                    </div>
                    <p className="text-sm text-white/46">{projects.length} listed</p>
                  </div>

                  {projects.length > 0 ? (
                    <div className="space-y-4">
                      {projects.map((project) => (
                        <article
                          key={project.id}
                          className="rounded-[1.35rem] border border-white/8 bg-white/[0.04] p-5 transition hover:border-white/14 hover:bg-white/[0.06]"
                        >
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div className="min-w-0 space-y-2">
                              <div className="flex flex-wrap gap-2">
                                <Badge className="border-white/10 bg-white/8 text-white">
                                  {statusLabels[project.status] ?? project.status}
                                </Badge>
                                <Badge className="border-white/10 bg-white/6 text-white/72">
                                  {categoryLabels[project.category] ?? project.category}
                                </Badge>
                              </div>
                              <h3 className="text-lg font-semibold text-white">{project.name}</h3>
                            </div>
                            {project.url ? (
                              <Link
                                href={getSafeProjectUrl(project.url)}
                                target="_blank"
                                className="text-sm font-medium text-accent-300 transition hover:text-accent-200"
                              >
                                Visit project
                              </Link>
                            ) : null}
                          </div>
                          <p className="mt-3 text-sm leading-7 text-white/64">
                            {project.description}
                          </p>
                        </article>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-[1.4rem] border border-dashed border-white/12 bg-white/[0.03] px-6 py-12 text-center">
                      <p className="text-lg font-semibold text-white">No projects added yet</p>
                      <p className="mt-3 text-sm leading-6 text-white/58">
                        This builder has not published any public projects yet.
                      </p>
                    </div>
                  )}
                </div>

                <div className="rounded-[1.75rem] border border-white/10 bg-black/16 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.16)] sm:p-6">
                  <div className="mb-5 flex items-end justify-between gap-4">
                    <div className="space-y-2">
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/42">
                        Recognition
                      </p>
                      <h2 className="text-2xl font-semibold text-white">Badges</h2>
                    </div>
                    <p className="text-sm text-white/46">{badges.length} earned</p>
                  </div>

                  {badges.length > 0 ? (
                    <div className="grid gap-4">
                      {badges.map((userBadge) => (
                        <article
                          key={userBadge.id}
                          className="flex items-center gap-4 rounded-[1.3rem] border border-white/8 bg-white/[0.04] p-4"
                        >
                          {userBadge.badge.icon_url ? (
                            <img
                              src={userBadge.badge.icon_url}
                              alt={userBadge.badge.name}
                              className="h-12 w-12 rounded-full object-contain ring-1 ring-white/10"
                            />
                          ) : (
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/8 text-white">
                              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                                />
                              </svg>
                            </div>
                          )}
                          <div className="min-w-0">
                            <h3 className="text-sm font-semibold text-white">{userBadge.badge.name}</h3>
                            <p className="mt-1 line-clamp-2 text-xs leading-5 text-white/58">
                              {userBadge.badge.description}
                            </p>
                          </div>
                        </article>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-[1.4rem] border border-dashed border-white/12 bg-white/[0.03] px-6 py-12 text-center">
                      <p className="text-lg font-semibold text-white">No badges yet</p>
                      <p className="mt-3 text-sm leading-6 text-white/58">
                        Community achievements will appear here as they are unlocked.
                      </p>
                    </div>
                  )}
                </div>
              </section>
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}
