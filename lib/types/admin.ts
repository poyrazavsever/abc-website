export type AdminStatus = "draft" | "published" | "archived";

export type AdminContentType = "report";

export type BuilderTag =
  | "cofounder_looking"
  | "idea_looking"
  | "team_complete"
  | "just_building";

export type BuilderRole =
  | "developer"
  | "designer"
  | "sales"
  | "product"
  | "student"
  | "other";

export type SeriousBuilderApplicationStatus =
  | "pending"
  | "approved"
  | "rejected";

export type OperationStatus = "queued" | "running" | "completed" | "failed";

export type AdminMetric = {
  label: string;
  value: string;
  hint: string;
};

export type AdminContentItem = {
  id: string;
  title: string;
  type: AdminContentType;
  status: AdminStatus;
  ownerName: string;
  updatedAt: string;
  summary: string;
  reportUrl?: string;
};

export type AdminBuilder = {
  id: string;
  fullName: string;
  email: string;
  role: BuilderRole;
  city: string;
  activeTag: BuilderTag;
  isBanned: boolean;
  isSeriousBuilder: boolean;
  badgeCount: number;
  projectCount: number;
  lastActiveAt: string;
  banReason?: string;
};

export type AdminBadge = {
  id: string;
  name: string;
  trigger: string;
  assignmentCount: number;
  isManual: boolean;
  status: AdminStatus;
};

export type SeriousBuilderApplication = {
  id: string;
  builderId: string;
  builderName: string;
  role: BuilderRole;
  activeTag: BuilderTag;
  motivation: string;
  expectation: string;
  weeklyAvailability: string;
  status: SeriousBuilderApplicationStatus;
  submittedAt: string;
};

export type AdminOperation = {
  id: string;
  name: string;
  description: string;
  status: OperationStatus;
  lastRunAt: string;
  owner: string;
};

export type BuilderMatchStatus = "active" | "completed" | "cancelled";

export type BuilderMatch = {
  id: string;
  firstBuilderId: string;
  firstBuilderName: string;
  secondBuilderId: string;
  secondBuilderName: string;
  status: BuilderMatchStatus;
  matchedAt: string;
  matchedBy: string;
  note: string;
};

export type AdminOverview = {
  metrics: AdminMetric[];
  recentApplications: SeriousBuilderApplication[];
  operations: AdminOperation[];
};

export type AdminDataset = {
  overview: AdminOverview;
  contentItems: AdminContentItem[];
  builders: AdminBuilder[];
  badges: AdminBadge[];
  applications: SeriousBuilderApplication[];
  operations: AdminOperation[];
  matches: BuilderMatch[];
};
