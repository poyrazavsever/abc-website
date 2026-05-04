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

export const onboardingProfileSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Ad soyad en az 2 karakter olmalı.")
    .max(80, "Ad soyad 80 karakterden uzun olamaz."),
  city: z
    .string()
    .trim()
    .refine((value) => cityValues.includes(value), {
      message: "Türkiye içindeki bir şehir seçin.",
    }),
  role: z.enum(builderRoleValues, {
    message: "Genel ünvanınızı seçin.",
  }),
});

export const onboardingDetailsSchema = z.object({
  bio: z
    .string()
    .trim()
    .min(20, "Bio en az 20 karakter olmalı.")
    .max(500, "Bio 500 karakterden uzun olamaz."),
  githubUsername: z
    .string()
    .trim()
    .max(39, "GitHub kullanıcı adı 39 karakterden uzun olamaz.")
    .refine(
      (value) => value.length === 0 || githubUsernameRegex.test(value),
      "Geçerli bir GitHub kullanıcı adı girin.",
    ),
  linkedinUsername: z
    .string()
    .trim()
    .max(100, "LinkedIn kullanıcı adı 100 karakterden uzun olamaz.")
    .refine(
      (value) => value.length === 0 || linkedinUsernameRegex.test(value),
      "Geçerli bir LinkedIn kullanıcı adı girin.",
    ),
  instagramUsername: z
    .string()
    .trim()
    .max(30, "Instagram kullanıcı adı 30 karakterden uzun olamaz.")
    .refine(
      (value) => value.length === 0 || instagramUsernameRegex.test(value),
      "Geçerli bir Instagram kullanıcı adı girin.",
    ),
});

export const profileEditSchema = onboardingProfileSchema.merge(
  onboardingDetailsSchema,
);

export const onboardingProjectItemSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Proje adı en az 2 karakter olmalı.")
    .max(80, "Proje adı 80 karakterden uzun olamaz."),
  description: z
    .string()
    .trim()
    .min(10, "Proje açıklaması en az 10 karakter olmalı.")
    .max(500, "Proje açıklaması 500 karakterden uzun olamaz."),
  category: z.enum(projectCategoryValues, {
    message: "Proje kategorisini seçin.",
  }),
  url: z
    .string()
    .trim()
    .max(200, "Proje bağlantısı 200 karakterden uzun olamaz.")
    .refine((value) => {
      if (value.length === 0) {
        return true;
      }

      try {
        const url = new URL(value);
        return url.protocol === "http:" || url.protocol === "https:";
      } catch {
        return false;
      }
    }, "Geçerli bir bağlantı girin."),
});

export const onboardingProjectsSchema = z
  .object({
    hasProjects: z.enum(["yes", "no"], {
      message: "Lütfen proje durumunuzu seçin.",
    }),
    project: z.object({
      name: z.string().trim(),
      description: z.string().trim(),
      category: z.enum(projectCategoryValues, {
        message: "Proje kategorisini seçin.",
      }),
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
