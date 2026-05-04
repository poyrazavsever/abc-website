import type { User } from "@supabase/supabase-js";

import type { BuilderRole, BuilderTag } from "@/lib/types/admin";

export type ProjectCategory =
  | "ai"
  | "saas"
  | "mobile"
  | "social_impact"
  | "other";

export type ProjectStatus = "idea" | "mvp" | "live" | "pivot" | "closed";

export type OnboardingStep = "profile" | "details" | "project";

export type ProjectIntent = "yes" | "no";

export type ProfileRecord = {
  id: string;
  fullName: string;
  city: string;
  role: BuilderRole;
  bio: string;
  avatarPath: string | null;
  avatarUrl: string | null;
  githubUsername: string | null;
  githubUrl: string | null;
  linkedinUsername: string | null;
  linkedinUrl: string | null;
  instagramUsername: string | null;
  instagramUrl: string | null;
  publicEmail: string | null;
  activeTag: BuilderTag | null;
  onboardingStep: string;
  onboardingCompleted: boolean;
  onboardingCompletedAt: string | null;
  projectOnboardingSkipped: boolean;
  eventAttendanceCount: number;
  createdAt: string;
  updatedAt: string;
};

export type ProjectRecord = {
  id: string;
  ownerId: string;
  name: string;
  description: string;
  category: ProjectCategory;
  url: string | null;
  technologies: string | null;
  imagePath: string | null;
  imageUrl: string | null;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
};

export type ProjectWithOwner = ProjectRecord & {
  owner: {
    fullName: string;
    role: BuilderRole;
  };
};

export type OnboardingProjectInput = {
  name: string;
  description: string;
  category: ProjectCategory;
  url: string;
  technologies?: string;
};

export type OnboardingState = {
  user: User;
  profile: ProfileRecord;
  projects: ProjectRecord[];
  nextStep: OnboardingStep | null;
  isComplete: boolean;
};

export type OnboardingActionState = {
  status: "idle" | "error";
  message: string | null;
  fieldErrors?: Record<string, string>;
};
