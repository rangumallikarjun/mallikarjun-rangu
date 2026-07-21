"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaArrowDown, FaArrowUp, FaPlus, FaTrash } from "react-icons/fa";
import { subscribeProjects, addProject, updateProject, deleteProject } from "@/lib/data/projects";
import { placeholderProjects } from "@/lib/data/placeholders";
import { getErrorMessage } from "@/lib/errors";
import type { Project } from "@/types/content";
import { PageHeader, Card } from "@/components/admin/Card";
import { Field, Input, Textarea } from "@/components/admin/FormField";
import ImageUploader from "@/components/admin/ImageUploader";

const EMPTY = {
  title: "",
  description: "",
  techStack: "",
  imageUrl: "",
  liveUrl: "",
  githubUrl: "",
  featured: false,
};

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(placeholderProjects);
  const [form, setForm] = useState(EMPTY);
  const [adding, setAdding] = useState(false);

  useEffect(() => subscribeProjects(setProjects), []);

  async function handleAdd() {
    if (!form.title.trim()) return;
    setAdding(true);
    try {
      await addProject({
        title: form.title,
        description: form.description,
        techStack: form.techStack.split(",").map((t) => t.trim()).filter(Boolean),
        imageUrl: form.imageUrl,
        liveUrl: form.liveUrl,
        githubUrl: form.githubUrl,
        featured: form.featured,
        order: projects.length,
      });
      setForm(EMPTY);
      toast.success("Project added");
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setAdding(false);
    }
  }

  async function handleUpdate(project: Project, patch: Partial<Project>) {
    try {
      await updateProject(project.id, patch);
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  }

  async function handleMove(index: number, direction: -1 | 1) {
    const target = projects[index + direction];
    const current = projects[index];
    if (!target) return;
    await Promise.all([
      updateProject(current.id, { order: target.order }),
      updateProject(target.id, { order: current.order }),
    ]).catch((err) => toast.error(getErrorMessage(err)));
  }

  async function handleDelete(id: string) {
    try {
      await deleteProject(id);
      toast.success("Project removed");
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  }

  return (
    <div className="max-w-3xl">
      <PageHeader title="Projects" description="Showcase your best work." />

      <Card title="Add Project" className="mb-6">
        <div className="space-y-4">
          <Field label="Title">
            <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </Field>
          <Field label="Description">
            <Textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </Field>
          <Field label="Tech Stack (comma separated)">
            <Input
              value={form.techStack}
              onChange={(e) => setForm({ ...form, techStack: e.target.value })}
              placeholder="React, Node.js, MongoDB"
            />
          </Field>
          <Field label="Project Image">
            <ImageUploader
              value={form.imageUrl}
              folder="projects"
              onChange={(url) => setForm({ ...form, imageUrl: url })}
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Live URL">
              <Input
                value={form.liveUrl}
                onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
              />
            </Field>
            <Field label="GitHub URL">
              <Input
                value={form.githubUrl}
                onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
              />
            </Field>
          </div>
          <label className="flex items-center gap-2 text-sm text-muted">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              className="accent-primary"
            />
            Featured project
          </label>
        </div>
        <button
          onClick={handleAdd}
          disabled={adding}
          className="mt-4 flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 disabled:opacity-60"
        >
          <FaPlus size={12} /> Add Project
        </button>
      </Card>

      <div className="space-y-4">
        {projects.map((project, i) => (
          <div key={project.id} className="glass rounded-xl p-5">
            <div className="mb-3 flex items-start gap-4">
              <ImageUploader
                value={project.imageUrl}
                folder="projects"
                onChange={(url) => handleUpdate(project, { imageUrl: url })}
              />
              <div className="flex-1 space-y-2">
                <input
                  defaultValue={project.title}
                  onBlur={(e) => handleUpdate(project, { title: e.target.value })}
                  className="w-full bg-transparent text-sm font-semibold outline-none"
                />
                <textarea
                  defaultValue={project.description}
                  onBlur={(e) => handleUpdate(project, { description: e.target.value })}
                  rows={2}
                  className="w-full resize-none bg-transparent text-sm text-muted outline-none"
                />
                <input
                  defaultValue={project.techStack.join(", ")}
                  onBlur={(e) =>
                    handleUpdate(project, {
                      techStack: e.target.value.split(",").map((t) => t.trim()).filter(Boolean),
                    })
                  }
                  className="w-full bg-transparent text-xs text-muted outline-none"
                />
                <div className="grid gap-2 sm:grid-cols-2">
                  <input
                    defaultValue={project.liveUrl}
                    onBlur={(e) => handleUpdate(project, { liveUrl: e.target.value })}
                    placeholder="Live URL"
                    className="bg-transparent text-xs text-muted outline-none"
                  />
                  <input
                    defaultValue={project.githubUrl}
                    onBlur={(e) => handleUpdate(project, { githubUrl: e.target.value })}
                    placeholder="GitHub URL"
                    className="bg-transparent text-xs text-muted outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs text-muted">
                <input
                  type="checkbox"
                  checked={project.featured}
                  onChange={(e) => handleUpdate(project, { featured: e.target.checked })}
                  className="accent-primary"
                />
                Featured
              </label>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleMove(i, -1)}
                  disabled={i === 0}
                  className="rounded p-1.5 text-muted hover:text-white disabled:opacity-30"
                >
                  <FaArrowUp size={12} />
                </button>
                <button
                  onClick={() => handleMove(i, 1)}
                  disabled={i === projects.length - 1}
                  className="rounded p-1.5 text-muted hover:text-white disabled:opacity-30"
                >
                  <FaArrowDown size={12} />
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="rounded p-1.5 text-muted hover:text-accent"
                >
                  <FaTrash size={12} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
