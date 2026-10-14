import { site } from "@/content/site";

export const DEFAULT_WHATSAPP_TEXT = "Hola, quiero pedir presupuesto para una reforma.";

export function whatsappUrl(text: string = DEFAULT_WHATSAPP_TEXT) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export const telUrl = `tel:${site.phoneE164}`;

export type BriefInput = {
  type: string;
  area: string;
  details?: string;
  name?: string;
  preference?: string;
  project?: string;
};

/** The message the visitor sends. Kept short and in the visitor's voice. */
export function composeBrief({ type, area, details, name, preference, project }: BriefInput) {
  const lines = [
    name?.trim() ? `Hola, soy ${name.trim()}. Quiero pedir presupuesto.` : "Hola, quiero pedir presupuesto.",
    `Tipo de obra: ${type || "sin decidir"}`,
    `Zona: ${area.trim() || "sin indicar"}`,
  ];
  if (project) lines.push(`He visto en vuestra web: ${project}`);
  if (details?.trim()) lines.push(`Detalles: ${details.trim()}`);
  if (preference) lines.push(`Prefiero que me contactéis por ${preference}.`);
  return lines.join("\n");
}
