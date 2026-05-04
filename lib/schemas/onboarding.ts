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

function isLinkedInUrl(value: string) {
  try {
    const url = new URL(value);
    return /^([a-z0-9-]+\.)?linkedin\.com$/i.test(url.hostname);
  } catch {
    return false;
  }
}

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
    message: "Genel unvanınızı seçin.",
  }),
});

export const onboardingDetailsSchema = z.object({
  bio: z
    .string()
    .trim()
    .min(20, "Bio en az 20 karakter olmalı.")
    .max(500, "Bio 500 karakterden uzun olamaz."),
  linkedinUrl: z
    .string()
    .trim()
    .max(200, "LinkedIn bağlantısı 200 karakterden uzun olamaz.")
    .refine((value) => value.length === 0 || isLinkedInUrl(value), {
      message: "Geçerli bir LinkedIn profili bağlantısı girin.",
    }),
  publicEmail: z
    .string()
    .trim()
    .max(120, "Görünür e-posta 120 karakterden uzun olamaz.")
    .refine(
      (value) =>
        value.length === 0 ||
        z.email({ message: "Geçerli bir e-posta adresi girin." }).safeParse(
          value,
        ).success,
      {
        message: "Geçerli bir e-posta adresi girin.",
      },
    ),
});

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
    projects: z.array(onboardingProjectItemSchema),
  })
  .superRefine((values, context) => {
    if (values.hasProjects === "yes" && values.projects.length === 0) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["projects"],
        message: "En az bir proje ekleyin ya da proje seçimini değiştirin.",
      });
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
