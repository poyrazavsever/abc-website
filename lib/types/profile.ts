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
  linkedinUrl: string | null;
  publicEmail: string | null;
  activeTag: BuilderTag | null;
  onboardingCompleted: boolean;
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
