import type { LucideIcon } from "lucide-react";

export interface Nav {
  name: string;
  href: string;
}

export interface Experience {
  company: string;
  position: string;
  duration: string;
  description: string;
  previousPosition?: string[];
  techStack: string[];
  website: string;
}

export interface Social {
  name: string;
  href: string;
  icon: LucideIcon;
}
