"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { subscribeAbout, saveAbout } from "@/lib/data/content";
import { getErrorMessage } from "@/lib/errors";
import { PageHeader, Card } from "@/components/admin/Card";
import { Field, Textarea } from "@/components/admin/FormField";

export default function AdminAboutPage() {
  const [bioText, setBioText] = useState("");
  const [highlightsText, setHighlightsText] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(
    () =>
      subscribeAbout((data) => {
        setBioText((data.bio || []).join("\n\n"));
        setHighlightsText((data.highlights || []).join("\n"));
      }),
    []
  );

  async function handleSave() {
    setSaving(true);
    try {
      await saveAbout({
        bio: bioText.split("\n\n").map((p) => p.trim()).filter(Boolean),
        highlights: highlightsText.split("\n").map((h) => h.trim()).filter(Boolean),
      });
      toast.success("About section updated");
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-2xl">
      <PageHeader title="About Section" description="Your story, in your words." />

      <Card>
        <div className="space-y-5">
          <Field label="Bio (separate paragraphs with a blank line)">
            <Textarea rows={8} value={bioText} onChange={(e) => setBioText(e.target.value)} />
          </Field>

          <Field label="Highlights (one per line)">
            <Textarea
              rows={4}
              value={highlightsText}
              onChange={(e) => setHighlightsText(e.target.value)}
            />
          </Field>

          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </Card>
    </div>
  );
}
