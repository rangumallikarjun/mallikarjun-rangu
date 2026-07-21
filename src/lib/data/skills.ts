import type { Skill } from "@/types/content";
import { placeholderSkills } from "@/lib/data/placeholders";
import {
  addToCollection,
  deleteFromCollection,
  subscribeOrderedCollection,
  updateInCollection,
} from "@/lib/data/collection";

const COLLECTION = "skills";

export function subscribeSkills(onData: (items: Skill[]) => void) {
  return subscribeOrderedCollection<Skill>(COLLECTION, placeholderSkills, onData);
}

export function addSkill(data: Omit<Skill, "id">) {
  return addToCollection(COLLECTION, data);
}

export function updateSkill(id: string, data: Partial<Skill>) {
  return updateInCollection<Skill>(COLLECTION, id, data);
}

export function deleteSkill(id: string) {
  return deleteFromCollection(COLLECTION, id);
}
