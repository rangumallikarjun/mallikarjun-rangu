"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { subscribeHero, saveHero } from "@/lib/data/content";
import { placeholderHero } from "@/lib/data/placeholders";
import { getErrorMessage } from "@/lib/errors";
import type { HeroContent } from "@/types/content";
import { PageHeader, Card } from "@/components/admin/Card";
import { Field, Input, Textarea } from "@/components/admin/FormField";
import ImageUploader from "@/components/admin/ImageUploader";

export default function AdminHeroPage() {
  const [hero, setHero] = useState<HeroContent>(placeholderHero);
  const [rolesText, setRolesText] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(
    () =>
      subscribeHero((data) => {
        setHero(data);
        setRolesText((data.roles || []).join("\n"));
      }),
    []
  );

  async function handleSave() {
    setSaving(true);
    try {
      const payload: HeroContent = {
        ...hero,
        roles: rolesText.split("\n").map((r) => r.trim()).filter(Boolean),
      };
      await saveHero(payload);
      toast.success("Hero section updated");
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-2xl">
      <PageHeader title="Hero Section" description="The first thing visitors see." />

      <Card>
        <div className="space-y-5">
          <Field label="Full Name">
            <Input
              value={hero.name}
              onChange={(e) => setHero({ ...hero, name: e.target.value })}
            />
          </Field>

          <Field label="Rotating Roles (one per line)">
            <Textarea
              rows={4}
              value={rolesText}
              onChange={(e) => setRolesText(e.target.value)}
            />
          </Field>

          <Field label="Tagline">
            <Textarea
              rows={3}
              value={hero.tagline}
              onChange={(e) => setHero({ ...hero, tagline: e.target.value })}
            />
          </Field>

          <Field label="Avatar Image">
            <ImageUploader
              value={hero.avatarUrl}
              folder="hero"
              onChange={(url) => setHero({ ...hero, avatarUrl: url })}
            />
          </Field>

          <Field label="Resume URL">
            <Input
              value={hero.resumeUrl ?? ""}
              onChange={(e) => setHero({ ...hero, resumeUrl: e.target.value })}
              placeholder="https://..."
            />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="GitHub URL">
              <Input
                value={hero.social?.github ?? ""}
                onChange={(e) =>
                  setHero({ ...hero, social: { ...hero.social, github: e.target.value } })
                }
              />
            </Field>
            <Field label="LinkedIn URL">
              <Input
                value={hero.social?.linkedin ?? ""}
                onChange={(e) =>
                  setHero({ ...hero, social: { ...hero.social, linkedin: e.target.value } })
                }
              />
            </Field>
            <Field label="Twitter/X URL">
              <Input
                value={hero.social?.twitter ?? ""}
                onChange={(e) =>
                  setHero({ ...hero, social: { ...hero.social, twitter: e.target.value } })
                }
              />
            </Field>
            <Field label="Email (mailto:)">
              <Input
                value={hero.social?.email ?? ""}
                onChange={(e) =>
                  setHero({ ...hero, social: { ...hero.social, email: e.target.value } })
                }
              />
            </Field>
          </div>

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
