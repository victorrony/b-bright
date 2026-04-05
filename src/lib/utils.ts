import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Divide um título em 2 partes usando "|" como separador.
 * Ex: "A DECADE | OF TRANSFORMATION" → ["A DECADE", "OF TRANSFORMATION"]
 * Se não tiver "|", divide ao meio automaticamente.
 */
export function splitTitle(title: string | undefined | null): [string, string] {
  if (!title) return ["", ""];
  if (title.includes(",")) {
    const [a, b] = title.split(",").map((s) => s.trim());
    return [a ?? "", b ?? ""];
  }
  const parts = title.split(" ");
  const mid = Math.ceil(parts.length / 2);
  return [parts.slice(0, mid).join(" "), parts.slice(mid).join(" ")];
}
