import type { Project } from "@/types/content";
import { placeholderProjects } from "@/lib/data/placeholders";
import {
  addToCollection,
  deleteFromCollection,
  subscribeOrderedCollection,
  updateInCollection,
} from "@/lib/data/collection";

const COLLECTION = "projects";

export function subscribeProjects(onData: (items: Project[]) => void) {
  return subscribeOrderedCollection<Project>(COLLECTION, placeholderProjects, onData);
}

export function addProject(data: Omit<Project, "id">) {
  return addToCollection(COLLECTION, data);
}

export function updateProject(id: string, data: Partial<Project>) {
  return updateInCollection<Project>(COLLECTION, id, data);
}

export function deleteProject(id: string) {
  return deleteFromCollection(COLLECTION, id);
}
