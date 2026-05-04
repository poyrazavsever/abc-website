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
    label: "Profil",
    heading: "Temel profilinizi oluşturun",
    description:
      "Ad soyad, şehir ve genel unvan bilgileri topluluk içindeki temel kimliğinizi belirler.",
  },
  {
    id: "details",
    label: "Detaylar",
    heading: "Kendinizi kısaca anlatın",
    description:
      "Bio, LinkedIn ve görünür e-posta alanları topluluk eşleşmelerini daha anlamlı hale getirir.",
  },
  {
    id: "project",
    label: "Projeler",
    heading: "Ürettiğiniz işleri ekleyin",
    description:
      "Projeler opsiyoneldir; eklerseniz topluluk sizin ne ürettiğinizi daha hızlı anlar.",
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

export const projectIntentOptions: ReadonlyArray<
  Option<"yes" | "no">
> = [
  {
    value: "no",
    label: "Su anda ekleyecek projem yok",
    description: "Profili tamamlayıp daha sonra proje ekleyebilirsiniz.",
  },
  {
    value: "yes",
    label: "Projelerimi eklemek istiyorum",
    description:
      "Bir veya birden fazla proje ekleyerek topluluğa ne ürettiğinizi gösterebilirsiniz.",
  },
] as const;

export const turkiyeCityOptions: ReadonlyArray<Option<string>> = [
  { value: "Adana", label: "Adana" },
  { value: "Adiyaman", label: "Adiyaman" },
  { value: "Afyonkarahisar", label: "Afyonkarahisar" },
  { value: "Agri", label: "Agri" },
  { value: "Aksaray", label: "Aksaray" },
  { value: "Amasya", label: "Amasya" },
  { value: "Ankara", label: "Ankara" },
  { value: "Antalya", label: "Antalya" },
  { value: "Ardahan", label: "Ardahan" },
  { value: "Artvin", label: "Artvin" },
  { value: "Aydin", label: "Aydin" },
  { value: "Balikesir", label: "Balikesir" },
  { value: "Bartin", label: "Bartin" },
  { value: "Batman", label: "Batman" },
  { value: "Bayburt", label: "Bayburt" },
  { value: "Bilecik", label: "Bilecik" },
  { value: "Bingol", label: "Bingol" },
  { value: "Bitlis", label: "Bitlis" },
  { value: "Bolu", label: "Bolu" },
  { value: "Burdur", label: "Burdur" },
  { value: "Bursa", label: "Bursa" },
  { value: "Canakkale", label: "Canakkale" },
  { value: "Cankiri", label: "Cankiri" },
  { value: "Corum", label: "Corum" },
  { value: "Denizli", label: "Denizli" },
  { value: "Diyarbakir", label: "Diyarbakir" },
  { value: "Duzce", label: "Duzce" },
  { value: "Edirne", label: "Edirne" },
  { value: "Elazig", label: "Elazig" },
  { value: "Erzincan", label: "Erzincan" },
  { value: "Erzurum", label: "Erzurum" },
  { value: "Eskişehir", label: "Eskişehir" },
  { value: "Gaziantep", label: "Gaziantep" },
  { value: "Giresun", label: "Giresun" },
  { value: "Gumushane", label: "Gumushane" },
  { value: "Hakkari", label: "Hakkari" },
  { value: "Hatay", label: "Hatay" },
  { value: "Igdir", label: "Igdir" },
  { value: "Isparta", label: "Isparta" },
  { value: "Istanbul", label: "Istanbul" },
  { value: "Izmir", label: "Izmir" },
  { value: "Kahramanmaras", label: "Kahramanmaras" },
  { value: "Karabuk", label: "Karabuk" },
  { value: "Karaman", label: "Karaman" },
  { value: "Kars", label: "Kars" },
  { value: "Kastamonu", label: "Kastamonu" },
  { value: "Kayseri", label: "Kayseri" },
  { value: "Kirikkale", label: "Kirikkale" },
  { value: "Kirklareli", label: "Kirklareli" },
  { value: "Kirşehir", label: "Kirşehir" },
  { value: "Kilis", label: "Kilis" },
  { value: "Kocaeli", label: "Kocaeli" },
  { value: "Konya", label: "Konya" },
  { value: "Kutahya", label: "Kutahya" },
  { value: "Malatya", label: "Malatya" },
  { value: "Manisa", label: "Manisa" },
  { value: "Mardin", label: "Mardin" },
  { value: "Mersin", label: "Mersin" },
  { value: "Mugla", label: "Mugla" },
  { value: "Mus", label: "Mus" },
  { value: "Nevşehir", label: "Nevşehir" },
  { value: "Nigde", label: "Nigde" },
  { value: "Ordu", label: "Ordu" },
  { value: "Osmaniye", label: "Osmaniye" },
  { value: "Rize", label: "Rize" },
  { value: "Sakarya", label: "Sakarya" },
  { value: "Samsun", label: "Samsun" },
  { value: "Sanliurfa", label: "Sanliurfa" },
  { value: "Siirt", label: "Siirt" },
  { value: "Sinop", label: "Sinop" },
  { value: "Sirnak", label: "Sirnak" },
  { value: "Sivas", label: "Sivas" },
  { value: "Tekirdag", label: "Tekirdag" },
  { value: "Tokat", label: "Tokat" },
  { value: "Trabzon", label: "Trabzon" },
  { value: "Tunceli", label: "Tunceli" },
  { value: "Usak", label: "Usak" },
  { value: "Van", label: "Van" },
  { value: "Yalova", label: "Yalova" },
  { value: "Yozgat", label: "Yozgat" },
  { value: "Zonguldak", label: "Zonguldak" },
] as const;
