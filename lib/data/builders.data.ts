import { builderRoleLabels, builderRoleOptions } from "@/lib/data/onboarding.data";
import type { BuilderTag } from "@/lib/types/admin";

type TagOption<T extends string> = {
  value: T;
  label: string;
};

export { builderRoleLabels, builderRoleOptions };

export const builderTagOptions: ReadonlyArray<TagOption<BuilderTag>> = [
  { value: "cofounder_looking", label: "Looking for Co-founder" },
  { value: "idea_looking", label: "Looking for Ideas" },
  { value: "team_complete", label: "Team Complete" },
  { value: "just_building", label: "Just Building" },
] as const;

export const builderTagLabels = Object.fromEntries(
  builderTagOptions.map((option) => [option.value, option.label]),
) as Record<BuilderTag, string>;
