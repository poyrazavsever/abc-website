import type {
  OnboardingStep,
  ProjectCategory,
} from "@/lib/types/profile";
import type { BuilderRole } from "@/lib/types/admin";

type Option<T extends string> = {
  value: T;
  label: string;
  description?: string;
};

export const onboardingSteps: ReadonlyArray<{
  description: string;
  heading: string;
  id: OnboardingStep;
  label: string;
}> = [
  {
    id: "profile",
    label: "Profile",
    heading: "Create your profile",
    description:
      "Your photo, location, and role define how you appear across the community.",
  },
  {
    id: "details",
    label: "Details",
    heading: "Tell us about yourself",
    description:
      "Your bio and social handles help the right people discover you in the community.",
  },
  {
    id: "project",
    label: "Project",
    heading: "Add your project",
    description:
      "Add your first project now, or come back and complete this step later.",
  },
] as const;

export const builderRoleOptions: ReadonlyArray<Option<BuilderRole>> = [
  { value: "developer", label: "Developer" },
  { value: "designer", label: "Designer" },
  { value: "sales", label: "Sales" },
  { value: "product", label: "Product" },
  { value: "student", label: "Student" },
  { value: "other", label: "Other" },
] as const;

export const builderRoleLabels = Object.fromEntries(
  builderRoleOptions.map((option) => [option.value, option.label]),
) as Record<BuilderRole, string>;

export const projectCategoryOptions: ReadonlyArray<Option<ProjectCategory>> = [
  { value: "ai", label: "AI" },
  { value: "saas", label: "SaaS" },
  { value: "mobile", label: "Mobile" },
  { value: "social_impact", label: "Social Impact" },
  { value: "other", label: "Other" },
] as const;

export const projectCategoryLabels = Object.fromEntries(
  projectCategoryOptions.map((option) => [option.value, option.label]),
) as Record<ProjectCategory, string>;

export const projectIntentOptions: ReadonlyArray<Option<"yes" | "no">> = [
  {
    value: "no",
    label: "I don't have a project to add right now",
    description: "You can finish your profile and add a project later.",
  },
  {
    value: "yes",
    label: "I want to add my project",
    description: "Adding a project helps show the community what you're building.",
  },
] as const;

export const turkiyeCityOptions: ReadonlyArray<Option<string>> = [
  { value: "Ankara", label: "Ankara" },
  { value: "Tashkent", label: "Tashkent" },
  { value: "Helsinki", label: "Helsinki" },
] as const;
