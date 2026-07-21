"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaArrowDown, FaArrowUp, FaPlus, FaTrash } from "react-icons/fa";
import { subscribeSkills, addSkill, updateSkill, deleteSkill } from "@/lib/data/skills";
import { placeholderSkills } from "@/lib/data/placeholders";
import { getErrorMessage } from "@/lib/errors";
import type { Skill } from "@/types/content";
import { PageHeader, Card } from "@/components/admin/Card";
import { Field, Input } from "@/components/admin/FormField";
import SkillIcon from "@/components/ui/SkillIcon";

const EMPTY = { name: "", category: "Frontend", icon: "SiReact", proficiency: 80 };

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>(placeholderSkills);
  const [form, setForm] = useState(EMPTY);
  const [adding, setAdding] = useState(false);

  useEffect(() => subscribeSkills(setSkills), []);

  async function handleAdd() {
    if (!form.name.trim()) return;
    setAdding(true);
    try {
      await addSkill({ ...form, order: skills.length });
      setForm(EMPTY);
      toast.success("Skill added");
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setAdding(false);
    }
  }

  async function handleUpdate(skill: Skill, patch: Partial<Skill>) {
    try {
      await updateSkill(skill.id, patch);
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  }

  async function handleMove(index: number, direction: -1 | 1) {
    const target = skills[index + direction];
    const current = skills[index];
    if (!target) return;
    await Promise.all([
      updateSkill(current.id, { order: target.order }),
      updateSkill(target.id, { order: current.order }),
    ]).catch((err) => toast.error(getErrorMessage(err)));
  }

  async function handleDelete(id: string) {
    try {
      await deleteSkill(id);
      toast.success("Skill removed");
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  }

  return (
    <div className="max-w-3xl">
      <PageHeader title="Skills" description="Technologies grouped by category." />

      <Card title="Add a Skill" className="mb-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Name">
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </Field>
          <Field label="Category">
            <Input
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              placeholder="Frontend, Backend, Cloud, Tools..."
            />
          </Field>
          <Field label="Icon (react-icons/si name)">
            <Input
              value={form.icon}
              onChange={(e) => setForm({ ...form, icon: e.target.value })}
              placeholder="SiReact, SiNextdotjs, SiDocker..."
            />
          </Field>
          <Field label={`Proficiency (${form.proficiency}%)`}>
            <input
              type="range"
              min={0}
              max={100}
              value={form.proficiency}
              onChange={(e) => setForm({ ...form, proficiency: Number(e.target.value) })}
              className="w-full accent-primary"
            />
          </Field>
        </div>
        <button
          onClick={handleAdd}
          disabled={adding}
          className="mt-4 flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 disabled:opacity-60"
        >
          <FaPlus size={12} /> Add Skill
        </button>
      </Card>

      <div className="space-y-3">
        {skills.map((skill, i) => (
          <div key={skill.id} className="glass flex items-center gap-4 rounded-xl p-4">
            <SkillIcon name={skill.icon} className="shrink-0 text-secondary" />

            <input
              defaultValue={skill.name}
              onBlur={(e) => handleUpdate(skill, { name: e.target.value })}
              className="w-32 shrink-0 bg-transparent text-sm font-medium outline-none"
            />
            <input
              defaultValue={skill.category}
              onBlur={(e) => handleUpdate(skill, { category: e.target.value })}
              className="w-28 shrink-0 bg-transparent text-xs text-muted outline-none"
            />
            <input
              defaultValue={skill.icon}
              onBlur={(e) => handleUpdate(skill, { icon: e.target.value })}
              className="w-32 shrink-0 bg-transparent text-xs text-muted outline-none"
            />

            <div className="flex flex-1 items-center gap-2">
              <input
                type="range"
                min={0}
                max={100}
                defaultValue={skill.proficiency}
                onMouseUp={(e) =>
                  handleUpdate(skill, { proficiency: Number(e.currentTarget.value) })
                }
                className="w-full accent-primary"
              />
              <span className="w-10 shrink-0 text-right text-xs text-muted">
                {skill.proficiency}%
              </span>
            </div>

            <div className="flex shrink-0 items-center gap-1">
              <button
                onClick={() => handleMove(i, -1)}
                disabled={i === 0}
                className="rounded p-1.5 text-muted hover:text-white disabled:opacity-30"
              >
                <FaArrowUp size={12} />
              </button>
              <button
                onClick={() => handleMove(i, 1)}
                disabled={i === skills.length - 1}
                className="rounded p-1.5 text-muted hover:text-white disabled:opacity-30"
              >
                <FaArrowDown size={12} />
              </button>
              <button
                onClick={() => handleDelete(skill.id)}
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
