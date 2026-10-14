// Shared validation for the quote request. Runs in the browser today; the same function is ready
// to be called from a Server Action once an email/CRM integration exists (see README).

export type BriefFields = {
  type: string;
  area: string;
  details: string;
  name: string;
  preference: string;
  consent: boolean;
};

export type BriefErrors = Partial<Record<keyof BriefFields, string>>;

export function validateBrief(fields: Partial<BriefFields>, mode: "short" | "full"): BriefErrors {
  const errors: BriefErrors = {};
  if (!fields.type) errors.type = "Elige el tipo de obra.";
  const area = fields.area?.trim() ?? "";
  if (area.length < 3) errors.area = "Escribe el barrio o el código postal aproximado.";
  if (area.length > 80) errors.area = "Basta con el barrio o el código postal.";
  if (mode === "full") {
    const details = fields.details?.trim() ?? "";
    if (details.length < 10) errors.details = "Cuéntanos en una frase qué quieres hacer.";
    if (details.length > 800) errors.details = "Resume en menos de 800 caracteres; el resto se puede hablar por el chat.";
    if ((fields.name?.trim() ?? "").length < 2) errors.name = "Escribe tu nombre.";
    if (!fields.preference) errors.preference = "Elige cómo prefieres que te contacten.";
    if (!fields.consent) errors.consent = "Necesitamos que aceptes la información de privacidad para continuar.";
  }
  return errors;
}
