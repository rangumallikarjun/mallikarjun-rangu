import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/lib/firebase";

export async function uploadImage(file: File, path: string): Promise<string> {
  if (!storage) throw new Error("Firebase is not configured.");
  const fileRef = ref(storage, `${path}/${Date.now()}-${file.name}`);

  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error("Upload timed out.")), 20000)
  );

  await Promise.race([uploadBytes(fileRef, file), timeout]);
  return getDownloadURL(fileRef);
}
