import { redirect } from "next/navigation";

type BuilderProfileRedirectPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function BuilderProfileRedirectPage({
  params,
}: BuilderProfileRedirectPageProps) {
  const { id } = await params;
  redirect(`/profile/${id}`);
}
