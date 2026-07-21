import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { ContactMessage } from "@/types/content";

const COLLECTION = "messages";

export async function submitMessage(data: {
  name: string;
  email: string;
  message: string;
}) {
  if (!db) throw new Error("Firebase is not configured.");
  return addDoc(collection(db, COLLECTION), {
    ...data,
    createdAt: Date.now(),
    read: false,
  });
}

export function subscribeMessages(onData: (items: ContactMessage[]) => void) {
  if (!db) {
    onData([]);
    return () => {};
  }

  const q = query(collection(db, COLLECTION), orderBy("createdAt", "desc"));
  return onSnapshot(
    q,
    (snapshot) => {
      onData(
        snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as ContactMessage))
      );
    },
    () => onData([])
  );
}

export async function markMessageRead(id: string, read: boolean) {
  if (!db) throw new Error("Firebase is not configured.");
  return updateDoc(doc(db, COLLECTION, id), { read });
}

export async function deleteMessage(id: string) {
  if (!db) throw new Error("Firebase is not configured.");
  return deleteDoc(doc(db, COLLECTION, id));
}
