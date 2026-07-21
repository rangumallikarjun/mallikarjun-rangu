import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { AboutContent, HeroContent } from "@/types/content";
import { placeholderAbout, placeholderHero } from "@/lib/data/placeholders";

function subscribeSingleton<T>(
  docId: string,
  fallback: T,
  onData: (data: T) => void
): () => void {
  if (!db) {
    onData(fallback);
    return () => {};
  }

  const ref = doc(db, "content", docId);
  const unsubscribe = onSnapshot(
    ref,
    (snap) => {
      onData(snap.exists() ? (snap.data() as T) : fallback);
    },
    () => onData(fallback)
  );

  return unsubscribe;
}

export function subscribeHero(onData: (data: HeroContent) => void) {
  return subscribeSingleton("hero", placeholderHero, onData);
}

export function subscribeAbout(onData: (data: AboutContent) => void) {
  return subscribeSingleton("about", placeholderAbout, onData);
}

export async function saveHero(data: HeroContent) {
  if (!db) throw new Error("Firebase is not configured.");
  return setDoc(doc(db, "content", "hero"), data);
}

export async function saveAbout(data: AboutContent) {
  if (!db) throw new Error("Firebase is not configured.");
  return setDoc(doc(db, "content", "about"), data);
}
