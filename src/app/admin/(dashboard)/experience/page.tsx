"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaArrowDown, FaArrowUp, FaPlus, FaTrash } from "react-icons/fa";
import {
  subscribeExperience,
  addExperience,
  updateExperience,
  deleteExperience,
} from "@/lib/data/experience";
import { placeholderExperience } from "@/lib/data/placeholders";
import { getErrorMessage } from "@/lib/errors";
import type { ExperienceItem } from "@/types/content";
import { PageHeader, Card } from "@/components/admin/Card";
import { Field, Input, Textarea } from "@/components/admin/FormField";

const EMPTY = { company: "", role: "", startDate: "", endDate: "Present", description: "" };

export default function AdminExperiencePage() {
  const [items, setItems] = useState<ExperienceItem[]>(placeholderExperience);
  const [form, setForm] = useState(EMPTY);
  const [adding, setAdding] = useState(false);

  useEffect(() => subscribeExperience(setItems), []);

  async function handleAdd() {
    if (!form.company.trim() || !form.role.trim()) return;
    setAdding(true);
    try {
      await addExperience({ ...form, order: items.length });
      setForm(EMPTY);
      toast.success("Experience added");
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setAdding(false);
    }
  }

  async function handleUpdate(item: ExperienceItem, patch: Partial<ExperienceItem>) {
    try {
      await updateExperience(item.id, patch);
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  }

  async function handleMove(index: number, direction: -1 | 1) {
    const target = items[index + direction];
    const current = items[index];
    if (!target) return;
    await Promise.all([
      updateExperience(current.id, { order: target.order }),
      updateExperience(target.id, { order: current.order }),
    ]).catch((err) => toast.error(getErrorMessage(err)));
  }

  async function handleDelete(id: string) {
    try {
      await deleteExperience(id);
      toast.success("Experience removed");
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  }

  return (
    <div className="max-w-3xl">
      <PageHeader title="Experience" description="Your career timeline." />

      <Card title="Add Experience" className="mb-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Company">
            <Input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
          </Field>
          <Field label="Role">
            <Input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
          </Field>
          <Field label="Start Date">
            <Input
              value={form.startDate}
              onChange={(e) => setForm({ ...form, startDate: e.target.value })}
              placeholder="2023"
            />
          </Field>
          <Field label="End Date">
            <Input
              value={form.endDate}
              onChange={(e) => setForm({ ...form, endDate: e.target.value })}
              placeholder="Present"
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Description">
              <Textarea
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </Field>
          </div>
        </div>
        <button
          onClick={handleAdd}
          disabled={adding}
          className="mt-4 flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 disabled:opacity-60"
        >
          <FaPlus size={12} /> Add Experience
        </button>
      </Card>

      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={item.id} className="glass rounded-xl p-5">
            <div className="mb-3 grid gap-3 sm:grid-cols-2">
              <input
                defaultValue={item.role}
                onBlur={(e) => handleUpdate(item, { role: e.target.value })}
                className="bg-transparent text-sm font-semibold outline-none"
              />
              <input
                defaultValue={item.company}
                onBlur={(e) => handleUpdate(item, { company: e.target.value })}
                className="bg-transparent text-sm text-secondary outline-none"
              />
              <input
                defaultValue={item.startDate}
                onBlur={(e) => handleUpdate(item, { startDate: e.target.value })}
                className="w-24 bg-transparent text-xs text-muted outline-none"
              />
              <input
                defaultValue={item.endDate}
                onBlur={(e) => handleUpdate(item, { endDate: e.target.value })}
                className="w-24 bg-transparent text-xs text-muted outline-none"
              />
            </div>
            <textarea
              defaultValue={item.description}
              onBlur={(e) => handleUpdate(item, { description: e.target.value })}
              rows={2}
              className="w-full resize-none bg-transparent text-sm text-muted outline-none"
            />
            <div className="mt-2 flex items-center justify-end gap-1">
              <button
                onClick={() => handleMove(i, -1)}
                disabled={i === 0}
                className="rounded p-1.5 text-muted hover:text-white disabled:opacity-30"
              >
                <FaArrowUp size={12} />
              </button>
              <button
                onClick={() => handleMove(i, 1)}
                disabled={i === items.length - 1}
                className="rounded p-1.5 text-muted hover:text-white disabled:opacity-30"
              >
                <FaArrowDown size={12} />
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="rounded p-1.5 text-muted hover:text-accent"
              >
                <FaTrash size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
