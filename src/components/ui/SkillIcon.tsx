import * as SiIcons from "react-icons/si";
import { FaCode } from "react-icons/fa";
import type { IconType } from "react-icons";

const iconMap = SiIcons as unknown as Record<string, IconType>;

export default function SkillIcon({
  name,
  size = 22,
  className,
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const Icon = iconMap[name] || FaCode;
  return <Icon size={size} className={className} />;
}
