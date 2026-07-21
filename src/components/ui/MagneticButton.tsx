"use client";

import { motion } from "framer-motion";
import { useRef, useState, type ReactNode, type MouseEvent } from "react";

export default function MagneticButton({
  children,
  className,
  onClick,
  href,
  target,
  type = "button",
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  type?: "button" | "submit";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.35;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.35;
    setPos({ x, y });
  }

  function handleMouseLeave() {
    setPos({ x: 0, y: 0 });
  }

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 12, mass: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target={target} rel={target ? "noopener noreferrer" : undefined}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className="inline-block">
      {content}
    </button>
  );
}
