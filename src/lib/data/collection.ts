import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  type DocumentData,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

/** Shared realtime-list pattern for the `skills`, `experience`, and `projects` collections. */
export function subscribeOrderedCollection<T>(
  collectionName: string,
  fallback: T[],
  onData: (items: T[]) => void
): () => void {
  if (!db) {
    onData(fallback);
    return () => {};
  }

  const q = query(collection(db, collectionName), orderBy("order", "asc"));
  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      if (snapshot.empty) {
        onData(fallback);
        return;
      }
      const items = snapshot.docs.map(
        (d) => ({ id: d.id, ...d.data() } as T)
      );
      onData(items);
    },
    () => onData(fallback)
  );

  return unsubscribe;
}

export async function addToCollection<T extends object>(
  collectionName: string,
  data: T
) {
  if (!db) throw new Error("Firebase is not configured.");
  return addDoc(collection(db, collectionName), data as DocumentData);
}

export async function updateInCollection<T extends object>(
  collectionName: string,
  id: string,
  data: Partial<T>
) {
  if (!db) throw new Error("Firebase is not configured.");
  return updateDoc(doc(db, collectionName, id), data as DocumentData);
}

export async function deleteFromCollection(collectionName: string, id: string) {
  if (!db) throw new Error("Firebase is not configured.");
  return deleteDoc(doc(db, collectionName, id));
}
