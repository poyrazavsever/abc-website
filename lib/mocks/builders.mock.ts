import type { BuilderRole, BuilderTag } from "@/lib/types/admin";

export type PublicBuilderProfile = {
  id: string;
  fullName: string;
  role: BuilderRole;
  city: string;
  activeTag: BuilderTag | null;
  bio: string;
  linkedinUrl: string | null;
  publicEmail: string | null;
  badgeCount: number;
  projectCount: number;
  isSeriousBuilder: boolean;
  createdAt: string;
};

export const publicBuilderMocks: PublicBuilderProfile[] = [
  {
    id: "builder-1",
    fullName: "Ayse Demir",
    role: "developer",
    city: "Ankara",
    activeTag: "cofounder_looking",
    bio: "Yapay zeka destekli urunler gelistiren ve teknik co-founder arayan full-stack builder.",
    linkedinUrl: "https://www.linkedin.com/in/ayse-demir",
    publicEmail: "ayse@example.com",
    badgeCount: 6,
    projectCount: 2,
    isSeriousBuilder: true,
    createdAt: "2026-04-10T12:00:00.000Z",
  },
  {
    id: "builder-2",
    fullName: "Mert Kaya",
    role: "sales",
    city: "Ankara",
    activeTag: "idea_looking",
    bio: "B2B satis ve growth tarafinda guclu, erken asama urunlerle pazar testi yapmayi seviyor.",
    linkedinUrl: "https://www.linkedin.com/in/mert-kaya",
    publicEmail: "mert@example.com",
    badgeCount: 2,
    projectCount: 1,
    isSeriousBuilder: false,
    createdAt: "2026-04-12T12:00:00.000Z",
  },
  {
    id: "builder-4",
    fullName: "Ece Yilmaz",
    role: "product",
    city: "Ankara",
    activeTag: "team_complete",
    bio: "Product ve operasyonu bir arada yuruten, ekip ritmini hizli kuran urun odakli builder.",
    linkedinUrl: "https://www.linkedin.com/in/ece-yilmaz",
    publicEmail: "ece@example.com",
    badgeCount: 4,
    projectCount: 1,
    isSeriousBuilder: true,
    createdAt: "2026-04-14T12:00:00.000Z",
  },
];
