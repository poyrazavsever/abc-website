import { z } from "zod";

import type { BuilderRole } from "@/lib/types/admin";
import type { ProjectCategory } from "@/lib/types/profile";
import {
  builderRoleOptions,
  projectCategoryOptions,
  turkiyeCityOptions,
} from "@/lib/data/onboarding.data";

const builderRoleValues = builderRoleOptions.map((option) => option.value) as [
  BuilderRole,
  ...BuilderRole[],
];

const projectCategoryValues = projectCategoryOptions.map(
  (option) => option.value,
) as [ProjectCategory, ...ProjectCategory[]];

const cityValues = turkiyeCityOptions.map((option) => option.value);

const githubUsernameRegex =
  /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,37}[A-Za-z0-9])?$/u;
const linkedinUsernameRegex = /^[A-Za-z0-9][A-Za-z0-9-]{1,98}[A-Za-z0-9]$/u;
const instagramUsernameRegex = /^[A-Za-z0-9._]{1,30}$/u;

export function normalizeProjectUrl(value: string) {
  const trimmedValue = value.trim();

  if (trimmedValue.length === 0) {
    return "";
  }

  if (/^https?:\/\//iu.test(trimmedValue)) {
    return trimmedValue;
  }

  return `https://${trimmedValue}`;
}

function isValidProjectUrl(value: string) {
  const normalizedUrl = normalizeProjectUrl(value);

  if (normalizedUrl.length === 0) {
    return true;
  }

  try {
    const url = new URL(normalizedUrl);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export const onboardingProfileSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters.")
    .max(80, "Full name cannot exceed 80 characters."),
  city: z
    .string()
    .trim()
    .refine((value) => cityValues.includes(value), {
      message: "Select a city in Turkey.",
    }),
  role: z.enum(builderRoleValues, {
    message: "Select your role.",
  }),
});

export const onboardingDetailsSchema = z.object({
  bio: z
    .string()
    .trim()
    .min(20, "Bio must be at least 20 characters.")
    .max(500, "Bio cannot exceed 500 characters."),
  githubUsername: z
    .string()
    .trim()
    .max(39, "GitHub username cannot exceed 39 characters.")
    .refine(
      (value) => value.length === 0 || githubUsernameRegex.test(value),
      "Enter a valid GitHub username.",
    ),
  linkedinUsername: z
    .string()
    .trim()
    .max(100, "LinkedIn username cannot exceed 100 characters.")
    .refine(
      (value) => value.length === 0 || linkedinUsernameRegex.test(value),
      "Enter a valid LinkedIn username.",
    ),
  instagramUsername: z
    .string()
    .trim()
    .max(30, "Instagram username cannot exceed 30 characters.")
    .refine(
      (value) => value.length === 0 || instagramUsernameRegex.test(value),
      "Enter a valid Instagram username.",
    ),
});

export const profileEditSchema = onboardingProfileSchema.merge(
  onboardingDetailsSchema,
);

export const onboardingProjectItemSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Project name must be at least 2 characters.")
    .max(80, "Project name cannot exceed 80 characters."),
  description: z
    .string()
    .trim()
    .min(10, "Project description must be at least 10 characters.")
    .max(150, "Project description cannot exceed 150 characters."),
  category: z.enum(projectCategoryValues, {
    message: "Select a project category.",
  }),
  url: z
    .string()
    .trim()
    .max(200, "Project URL cannot exceed 200 characters.")
    .refine(isValidProjectUrl, "Enter a valid URL."),
  technologies: z
    .string()
    .trim()
    .max(160, "Technologies cannot exceed 160 characters.")
    .optional(),
});

export const quickProjectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Project name must be at least 2 characters.")
    .max(80, "Project name cannot exceed 80 characters."),
  url: z
    .string()
    .trim()
    .min(1, "Project URL is required.")
    .max(200, "Project URL cannot exceed 200 characters.")
    .refine(isValidProjectUrl, "Enter a valid website URL."),
  technologies: z
    .string()
    .trim()
    .max(160, "Technologies cannot exceed 160 characters.")
    .optional(),
  description: z
    .string()
    .trim()
    .min(10, "Short description must be at least 10 characters.")
    .max(150, "Short description cannot exceed 150 characters."),
});

export const onboardingProjectsSchema = z
  .object({
    hasProjects: z.enum(["yes", "no"], {
      message: "Please select your project status.",
    }),
    project: z.object({
      name: z.string().trim(),
      description: z.string().trim(),
      category: z.enum(projectCategoryValues, {
        message: "Select a project category.",
      }),
      technologies: z.string().trim().optional(),
      url: z.string().trim(),
    }),
  })
  .superRefine((values, context) => {
    if (values.hasProjects === "no") {
      return;
    }

    const parsedProject = onboardingProjectItemSchema.safeParse(values.project);

    if (!parsedProject.success) {
      for (const issue of parsedProject.error.issues) {
        context.addIssue({
          ...issue,
          path: ["project", ...issue.path],
        });
      }
    }
  });

export type OnboardingProfileFormValues = z.infer<
  typeof onboardingProfileSchema
>;
export type OnboardingDetailsFormValues = z.infer<
  typeof onboardingDetailsSchema
>;
export type OnboardingProjectItemFormValues = z.infer<
  typeof onboardingProjectItemSchema
>;
export type OnboardingProjectsFormValues = z.infer<
  typeof onboardingProjectsSchema
>;
export type ProfileEditFormValues = z.infer<typeof profileEditSchema>;
export type QuickProjectFormValues = z.infer<typeof quickProjectSchema>;
