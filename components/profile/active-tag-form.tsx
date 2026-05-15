"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { updateActiveTagAction } from "@/app/dashboard/profile/actions";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Label, Select } from "@/components/ui";
import { tagLabels } from "@/components/admin/admin-shell";
import type { BuilderTag } from "@/lib/types/admin";
import { appToast as toast } from "@/lib/utils/toast";

type ActiveTagFormProps = {
  currentTag: BuilderTag | null;
};

export function ActiveTagForm({ currentTag }: ActiveTagFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedTag, setSelectedTag] = useState<BuilderTag | "">(() => currentTag ?? "");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    const result = await updateActiveTagAction(selectedTag === "" ? null : (selectedTag as BuilderTag));
    setLoading(false);

    if (result.status === "error") {
      toast.error(result.message ?? "Something went wrong.");
    } else {
      toast.success("Tag updated.");
      router.refresh();
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Tag</CardTitle>
        <CardDescription>
          Improve your chances of matching with other members by sharing your current status or what you&apos;re looking for.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex items-end gap-4">
          <div className="flex-1 space-y-2">
            <Label htmlFor="active-tag">Your status</Label>
            <Select
              id="active-tag"
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value as BuilderTag | "")}
              disabled={loading}
              className="w-full"
            >
              <option value="">Not specified</option>
              {Object.entries(tagLabels).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </Select>
          </div>
          <Button type="submit" disabled={loading || selectedTag === (currentTag ?? "")}>
            {loading ? "Saving..." : "Update"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
