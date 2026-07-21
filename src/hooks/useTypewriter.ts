"use client";

import { useEffect, useState } from "react";

export function useTypewriter(words: string[], speed = 70, pause = 1600) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (words.length === 0) return;
    const currentWord = words[wordIndex % words.length];

    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text === currentWord) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      timeout = setTimeout(() => {
        setDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
      }, speed);
    } else {
      timeout = setTimeout(
        () => {
          setText((t) =>
            deleting
              ? currentWord.slice(0, t.length - 1)
              : currentWord.slice(0, t.length + 1)
          );
        },
        deleting ? speed / 2 : speed
      );
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words, speed, pause]);

  return text;
}
