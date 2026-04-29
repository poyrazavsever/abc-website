import { builderRoleLabels, builderRoleOptions } from "@/lib/data/onboarding.data";
import type { BuilderTag } from "@/lib/types/admin";

type TagOption<T extends string> = {
  value: T;
  label: string;
};

export { builderRoleLabels, builderRoleOptions };

export const builderTagOptions: ReadonlyArray<TagOption<BuilderTag>> = [
  { value: "cofounder_looking", label: "Co-founder ariyor" },
  { value: "idea_looking", label: "Fikir ariyor" },
  { value: "team_complete", label: "Takim tamamlandi" },
  { value: "just_building", label: "Sadece build ediyor" },
] as const;

export const builderTagLabels = Object.fromEntries(
  builderTagOptions.map((option) => [option.value, option.label]),
) as Record<BuilderTag, string>;
