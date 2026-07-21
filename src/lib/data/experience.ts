import type { ExperienceItem } from "@/types/content";
import { placeholderExperience } from "@/lib/data/placeholders";
import {
  addToCollection,
  deleteFromCollection,
  subscribeOrderedCollection,
  updateInCollection,
} from "@/lib/data/collection";

const COLLECTION = "experience";

export function subscribeExperience(onData: (items: ExperienceItem[]) => void) {
  return subscribeOrderedCollection<ExperienceItem>(
    COLLECTION,
    placeholderExperience,
    onData
  );
}

export function addExperience(data: Omit<ExperienceItem, "id">) {
  return addToCollection(COLLECTION, data);
}

export function updateExperience(id: string, data: Partial<ExperienceItem>) {
  return updateInCollection<ExperienceItem>(COLLECTION, id, data);
}

export function deleteExperience(id: string) {
  return deleteFromCollection(COLLECTION, id);
}
