"use client";

import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaUpload } from "react-icons/fa";
import { uploadImage } from "@/lib/storage";
import { getErrorMessage } from "@/lib/errors";

export default function ImageUploader({
  value,
  onChange,
  folder,
}: {
  value?: string;
  onChange: (url: string) => void;
  folder: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file, folder);
      onChange(url);
      toast.success("Image uploaded");
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-white/5">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className="h-full w-full object-cover" />
        ) : (
          <FaUpload className="text-muted" size={16} />
        )}
      </div>
      <div className="flex-1 space-y-2">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white transition-colors hover:border-primary/50 disabled:opacity-60"
        >
          {uploading ? "Uploading..." : "Upload Image"}
        </button>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-muted">or paste a URL:</span>
          <input
            type="text"
            defaultValue={value}
            onBlur={(e) => e.target.value.trim() && onChange(e.target.value.trim())}
            placeholder="https://..."
            className="w-full max-w-xs rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs outline-none transition-colors focus:border-primary/60"
          />
        </div>
      </div>
    </div>
  );
}
