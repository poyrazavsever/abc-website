import { publicBuilderMocks } from "@/lib/mocks/builders.mock";

export async function getPublicBuilderProfile(id: string) {
  return publicBuilderMocks.find((builder) => builder.id === id) ?? null;
}
