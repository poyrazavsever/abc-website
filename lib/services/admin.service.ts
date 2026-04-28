import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import { adminMockDataset } from "@/lib/mocks/admin.mock";
import type {
  AdminBadge,
  AdminBuilder,
  AdminContentItem,
  AdminDataset,
  AdminOperation,
  AdminOverview,
  BuilderMatch,
  BuilderRole,
  BuilderTag,
  SeriousBuilderApplication,
  SeriousBuilderApplicationStatus,
} from "@/lib/types/admin";

let adminSupabaseClient: SupabaseClient | null | undefined;

function getAdminSupabaseClient() {
  if (adminSupabaseClient !== undefined) {
    return adminSupabaseClient;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    adminSupabaseClient = null;
    return adminSupabaseClient;
  }

  adminSupabaseClient = createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
    },
  });

  return adminSupabaseClient;
}

function canUseAdminMockData() {
  return process.env.NODE_ENV !== "production" || process.env.ADMIN_DEMO_MODE === "true";
}

function asString(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function asBoolean(value: unknown, fallback = false) {
  return typeof value === "boolean" ? value : fallback;
}

function asNumber(value: unknown, fallback = 0) {
  return typeof value === "number" ? value : fallback;
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
}

function mapContentItem(row: unknown): AdminContentItem {
  const record = asRecord(row);

  return {
    id: asString(record.id),
    title: asString(record.title, "Başlıksız içerik"),
    type: asString(record.type, "report") as AdminContentItem["type"],
    status: asString(record.status, "draft") as AdminContentItem["status"],
    ownerName: asString(record.owner_name, "Admin"),
    updatedAt: asString(record.updated_at, ""),
    summary: asString(record.summary),
    reportUrl: asString(record.report_url) || undefined,
  };
}

function mapMatch(row: unknown): BuilderMatch {
  const record = asRecord(row);

  return {
    id: asString(record.id),
    firstBuilderId: asString(record.first_builder_id),
    firstBuilderName: asString(record.first_builder_name, "İsimsiz builder"),
    secondBuilderId: asString(record.second_builder_id),
    secondBuilderName: asString(record.second_builder_name, "İsimsiz builder"),
    status: asString(record.status, "active") as BuilderMatch["status"],
    matchedAt: asString(record.matched_at),
    matchedBy: asString(record.matched_by, "Admin"),
    note: asString(record.note),
  };
}

function mapBuilder(row: unknown): AdminBuilder {
  const record = asRecord(row);

  return {
    id: asString(record.id),
    fullName: asString(record.full_name, "İsimsiz builder"),
    email: asString(record.email),
    role: asString(record.role, "other") as BuilderRole,
    city: asString(record.city, "Belirtilmedi"),
    activeTag: asString(record.active_tag, "just_building") as BuilderTag,
    isBanned: asBoolean(record.is_banned),
    isSeriousBuilder: asBoolean(record.is_serious_builder),
    badgeCount: asNumber(record.badge_count),
    projectCount: asNumber(record.project_count),
    lastActiveAt: asString(record.last_active_at),
    banReason: asString(record.ban_reason) || undefined,
  };
}

function mapBadge(row: unknown): AdminBadge {
  const record = asRecord(row);

  return {
    id: asString(record.id),
    name: asString(record.name, "İsimsiz rozet"),
    trigger: asString(record.trigger),
    assignmentCount: asNumber(record.assignment_count),
    isManual: asBoolean(record.is_manual),
    status: asString(record.status, "draft") as AdminBadge["status"],
  };
}

function mapApplication(row: unknown): SeriousBuilderApplication {
  const record = asRecord(row);

  return {
    id: asString(record.id),
    builderId: asString(record.builder_id),
    builderName: asString(record.builder_name, "İsimsiz builder"),
    role: asString(record.role, "other") as BuilderRole,
    activeTag: asString(record.active_tag, "just_building") as BuilderTag,
    motivation: asString(record.motivation),
    expectation: asString(record.expectation),
    weeklyAvailability: asString(record.weekly_availability),
    status: asString(record.status, "pending") as SeriousBuilderApplicationStatus,
    submittedAt: asString(record.submitted_at),
  };
}

function mapOperation(row: unknown): AdminOperation {
  const record = asRecord(row);

  return {
    id: asString(record.id),
    name: asString(record.name, "Operasyon"),
    description: asString(record.description),
    status: asString(record.status, "queued") as AdminOperation["status"],
    lastRunAt: asString(record.last_run_at),
    owner: asString(record.owner, "admin"),
  };
}

async function selectRows(table: string) {
  const client = getAdminSupabaseClient();

  if (!client) {
    return null;
  }

  const { data, error } = await client.from(table).select("*");

  if (error) {
    return null;
  }

  return data;
}

export async function getAdminDataset(): Promise<AdminDataset> {
  const [
    contentRows,
    builderRows,
    badgeRows,
    applicationRows,
    operationRows,
    matchRows,
  ] = await Promise.all([
    selectRows("admin_content_items"),
    selectRows("admin_builders"),
    selectRows("badges"), // Use new badges table
    selectRows("serious_builder_applications"),
    selectRows("admin_operations"),
    selectRows("builder_matches"),
  ]);

  if (
    !contentRows ||
    !builderRows ||
    !badgeRows ||
    !applicationRows ||
    !operationRows ||
    !matchRows
  ) {
    if (canUseAdminMockData()) {
      return adminMockDataset;
    }

    throw new Error("Admin dataset is unavailable.");
  }

  const builders = builderRows.map(mapBuilder);
  const matches = matchRows.map(mapMatch);
  const applications = applicationRows.map(mapApplication);
  const operations = operationRows.map(mapOperation);
  const overview: AdminOverview = {
    metrics: [
      {
        label: "Bekleyen başvuru",
        value: String(
          applications.filter((application) => application.status === "pending").length,
        ),
        hint: "Ciddi builder havuzu için karar bekliyor",
      },
      {
        label: "Aktif builder",
        value: String(
          builders.filter((builder) => !builder.isBanned).length,
        ),
        hint: "Banlı olmayan tamamlanmış profiller",
      },
      {
        label: "Ciddi builder",
        value: String(
          builders.filter(
            (builder) => builder.isSeriousBuilder && !builder.isBanned,
          ).length,
        ),
        hint: "Eşleşme havuzundaki aktif builder sayısı",
      },
      {
        label: "Aktif eşleşme",
        value: String(matches.filter((match) => match.status === "active").length),
        hint: "Şu anda devam eden ciddi builder eşleşmeleri",
      },
    ],
    recentApplications: applications.filter(
      (application) => application.status === "pending",
    ),
    operations,
  };

  return {
    overview,
    contentItems: contentRows
      .map(mapContentItem)
      .filter((item) => item.type === "report"),
    builders,
    badges: badgeRows.map(mapBadge),
    applications,
    operations,
    matches,
  };
}

export async function setBuilderBanStatus(input: {
  builderId: string;
  isBanned: boolean;
  reason?: string;
}) {
  const client = getAdminSupabaseClient();

  if (!client) {
    return { ok: canUseAdminMockData(), mode: "demo" as const };
  }

  const { error } = await client
    .from("admin_builders")
    .update({
      is_banned: input.isBanned,
      ban_reason: input.reason ?? null,
    })
    .eq("id", input.builderId);

  return { ok: !error, mode: "supabase" as const, error: error?.message };
}

export async function setSeriousBuilderStatus(input: {
  builderId: string;
  isSeriousBuilder: boolean;
}) {
  const client = getAdminSupabaseClient();

  if (!client) {
    return { ok: canUseAdminMockData(), mode: "demo" as const };
  }

  const { error } = await client
    .from("admin_builders")
    .update({
      is_serious_builder: input.isSeriousBuilder,
    })
    .eq("id", input.builderId);

  return { ok: !error, mode: "supabase" as const, error: error?.message };
}

export async function decideSeriousBuilderApplication(input: {
  applicationId: string;
  builderId: string;
  status: "approved" | "rejected";
}) {
  const client = getAdminSupabaseClient();

  if (!client) {
    return { ok: canUseAdminMockData(), mode: "demo" as const };
  }

  const { error: applicationError } = await client
    .from("serious_builder_applications")
    .update({
      status: input.status,
    })
    .eq("id", input.applicationId);

  if (applicationError) {
    return {
      ok: false,
      mode: "supabase" as const,
      error: applicationError.message,
    };
  }

  if (input.status === "approved") {
    const { error: builderError } = await client
      .from("admin_builders")
      .update({
        is_serious_builder: true,
      })
      .eq("id", input.builderId);

    return {
      ok: !builderError,
      mode: "supabase" as const,
      error: builderError?.message,
    };
  }

  return { ok: true, mode: "supabase" as const };
}

export async function createManualBuilderMatch(input: {
  firstBuilderId: string;
  secondBuilderId: string;
  note: string;
  matchedBy: string;
}) {
  const client = getAdminSupabaseClient();

  if (!client) {
    return { ok: canUseAdminMockData(), mode: "demo" as const };
  }

  const { error } = await client.from("builder_matches").insert({
    first_builder_id: input.firstBuilderId,
    second_builder_id: input.secondBuilderId,
    status: "active",
    matched_at: new Date().toISOString(),
    matched_by: input.matchedBy,
    note: input.note,
  });

  return { ok: !error, mode: "supabase" as const, error: error?.message };
}
