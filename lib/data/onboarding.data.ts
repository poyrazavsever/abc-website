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
  { value: "Adana", label: "Adana" },
  { value: "Adıyaman", label: "Adıyaman" },
  { value: "Afyonkarahisar", label: "Afyonkarahisar" },
  { value: "Ağrı", label: "Ağrı" },
  { value: "Aksaray", label: "Aksaray" },
  { value: "Amasya", label: "Amasya" },
  { value: "Ankara", label: "Ankara" },
  { value: "Antalya", label: "Antalya" },
  { value: "Ardahan", label: "Ardahan" },
  { value: "Artvin", label: "Artvin" },
  { value: "Aydın", label: "Aydın" },
  { value: "Balıkesir", label: "Balıkesir" },
  { value: "Bartın", label: "Bartın" },
  { value: "Batman", label: "Batman" },
  { value: "Bayburt", label: "Bayburt" },
  { value: "Bilecik", label: "Bilecik" },
  { value: "Bingöl", label: "Bingöl" },
  { value: "Bitlis", label: "Bitlis" },
  { value: "Bolu", label: "Bolu" },
  { value: "Burdur", label: "Burdur" },
  { value: "Bursa", label: "Bursa" },
  { value: "Çanakkale", label: "Çanakkale" },
  { value: "Çankırı", label: "Çankırı" },
  { value: "Çorum", label: "Çorum" },
  { value: "Denizli", label: "Denizli" },
  { value: "Diyarbakır", label: "Diyarbakır" },
  { value: "Düzce", label: "Düzce" },
  { value: "Edirne", label: "Edirne" },
  { value: "Elazığ", label: "Elazığ" },
  { value: "Erzincan", label: "Erzincan" },
  { value: "Erzurum", label: "Erzurum" },
  { value: "Eskişehir", label: "Eskişehir" },
  { value: "Gaziantep", label: "Gaziantep" },
  { value: "Giresun", label: "Giresun" },
  { value: "Gümüşhane", label: "Gümüşhane" },
  { value: "Hakkari", label: "Hakkari" },
  { value: "Hatay", label: "Hatay" },
  { value: "Iğdır", label: "Iğdır" },
  { value: "Isparta", label: "Isparta" },
  { value: "İstanbul", label: "İstanbul" },
  { value: "İzmir", label: "İzmir" },
  { value: "Kahramanmaraş", label: "Kahramanmaraş" },
  { value: "Karabük", label: "Karabük" },
  { value: "Karaman", label: "Karaman" },
  { value: "Kars", label: "Kars" },
  { value: "Kastamonu", label: "Kastamonu" },
  { value: "Kayseri", label: "Kayseri" },
  { value: "Kırıkkale", label: "Kırıkkale" },
  { value: "Kırklareli", label: "Kırklareli" },
  { value: "Kırşehir", label: "Kırşehir" },
  { value: "Kilis", label: "Kilis" },
  { value: "Kocaeli", label: "Kocaeli" },
  { value: "Konya", label: "Konya" },
  { value: "Kütahya", label: "Kütahya" },
  { value: "Malatya", label: "Malatya" },
  { value: "Manisa", label: "Manisa" },
  { value: "Mardin", label: "Mardin" },
  { value: "Mersin", label: "Mersin" },
  { value: "Muğla", label: "Muğla" },
  { value: "Muş", label: "Muş" },
  { value: "Nevşehir", label: "Nevşehir" },
  { value: "Niğde", label: "Niğde" },
  { value: "Ordu", label: "Ordu" },
  { value: "Osmaniye", label: "Osmaniye" },
  { value: "Rize", label: "Rize" },
  { value: "Sakarya", label: "Sakarya" },
  { value: "Samsun", label: "Samsun" },
  { value: "Şanlıurfa", label: "Şanlıurfa" },
  { value: "Siirt", label: "Siirt" },
  { value: "Sinop", label: "Sinop" },
  { value: "Şırnak", label: "Şırnak" },
  { value: "Sivas", label: "Sivas" },
  { value: "Tekirdağ", label: "Tekirdağ" },
  { value: "Tokat", label: "Tokat" },
  { value: "Trabzon", label: "Trabzon" },
  { value: "Tunceli", label: "Tunceli" },
  { value: "Uşak", label: "Uşak" },
  { value: "Van", label: "Van" },
  { value: "Yalova", label: "Yalova" },
  { value: "Yozgat", label: "Yozgat" },
  { value: "Zonguldak", label: "Zonguldak" },
] as const;
