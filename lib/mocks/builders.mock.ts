import type { BuilderRole, BuilderTag } from "@/lib/types/admin";

export type PublicBuilderProfile = {
  id: string;
  fullName: string;
  role: BuilderRole;
  city: string;
  activeTag: BuilderTag;
  isSeriousBuilder: boolean;
  badgeCount: number;
  projectCount: number;
};

export const publicBuilderMocks: PublicBuilderProfile[] = [
  {
    id: "builder-1",
    fullName: "Ayşe Demir",
    role: "developer",
    city: "Ankara",
    activeTag: "cofounder_looking",
    isSeriousBuilder: true,
    badgeCount: 6,
    projectCount: 2,
  },
  {
    id: "builder-2",
    fullName: "Mert Kaya",
    role: "sales",
    city: "Ankara",
    activeTag: "idea_looking",
    isSeriousBuilder: false,
    badgeCount: 2,
    projectCount: 1,
  },
  {
    id: "builder-4",
    fullName: "Ece Yılmaz",
    role: "product",
    city: "Ankara",
    activeTag: "cofounder_looking",
    isSeriousBuilder: true,
    badgeCount: 4,
    projectCount: 1,
  },
];
