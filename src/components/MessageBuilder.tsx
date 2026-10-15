"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { WhatsAppIcon } from "@/components/icons";
import { builderTypes } from "@/content/services";
import { site } from "@/content/site";
import { validateBrief, type BriefErrors } from "@/lib/brief-validation";
import { composeBrief, telUrl, whatsappUrl } from "@/lib/contact";
import { track } from "@/lib/track";

type Props = {
  variant: "band" | "full";
  defaultType?: string;
  project?: string;
};

type Status = { kind: "idle" } | { kind: "opened"; url: string } | { kind: "copied" } | { kind: "copy-failed" };

/**
 * Builds the visitor's quote message and hands it to WhatsApp. Nothing is sent to a server:
 * the visitor sends the message from their own WhatsApp, so the UI never claims "enviado".
 */
export function MessageBuilder({ variant, defaultType = "", project }: Props) {
  const uid = useId();
  const [type, setType] = useState(defaultType);
  const [area, setArea] = useState("");
  const [details, setDetails] = useState("");
  const [name, setName] = useState("");
  const [preference, setPreference] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<BriefErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const full = variant === "full";
  const message = composeBrief({
    type,
    area,
    details: full ? details : undefined,
    name: full ? name : undefined,
    preference: full && preference ? preference : undefined,
    project,
  });

  const id = (field: string) => `${uid}-${field}`;
  const errorId = (field: keyof BriefErrors) => (errors[field] ? id(`${field}-error`) : undefined);

  const validate = () => {
    const next = validateBrief({ type, area, details, name, preference, consent }, full ? "full" : "short");
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) {
      track("builder_invalid", { field: first });
      document.getElementById(id(first))?.focus();
      return false;
    }
    return true;
  };

  const openWhatsApp = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
    const url = whatsappUrl(message);
    track("builder_open_whatsapp", { type, variant });
    // "noopener" in the features string makes window.open return null, so detach the opener by hand.
    const win = window.open(url, "_blank");
    if (win) win.opener = null;
    else window.location.href = url;
    setStatus({ kind: "opened", url });
  };

  const copy = async () => {
    if (!validate()) return;
    try {
      await navigator.clipboard.writeText(message);
      track("builder_copy", { type });
      setStatus({ kind: "copied" });
    } catch {
      setStatus({ kind: "copy-failed" });
    }
  };

  const statusText =
    status.kind === "opened"
      ? "Se ha abierto WhatsApp con tu mensaje escrito. Revísalo y pulsa enviar desde allí; DecorMG te responde por ese chat."
      : status.kind === "copied"
        ? "Mensaje copiado. Pégalo en WhatsApp o donde prefieras."
        : status.kind === "copy-failed"
          ? "No se ha podido copiar. Selecciona el texto de la vista previa y cópialo a mano."
          : "";

  if (!full) {
    return (
      <form className="builder" onSubmit={openWhatsApp} noValidate aria-describedby={id("notes")}>
        <div className="builder__bar">
          <div>
            <div className="cell" data-invalid={errors.type ? "true" : undefined}>
              <label htmlFor={id("type")}>Qué quieres reformar</label>
              <select
                id={id("type")}
                value={type}
                onChange={(e) => setType(e.target.value)}
                aria-invalid={errors.type ? true : undefined}
                aria-describedby={errorId("type")}
                required
              >
                <option value="">Elige una opción</option>
                {builderTypes.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            {errors.type ? (
              <p id={id("type-error")} className="builder__error">
                {errors.type}
              </p>
            ) : null}
          </div>
          <div>
            <div className="cell" data-invalid={errors.area ? "true" : undefined}>
              <label htmlFor={id("area")}>Barrio o código postal</label>
              <input
                id={id("area")}
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="Ej.: Aluche o 28047"
                autoComplete="off"
                maxLength={80}
                aria-invalid={errors.area ? true : undefined}
                aria-describedby={errorId("area")}
                required
              />
            </div>
            {errors.area ? (
              <p id={id("area-error")} className="builder__error">
                {errors.area}
              </p>
            ) : null}
          </div>
          <button type="submit" className="builder__submit">
            <WhatsAppIcon /> Abrir WhatsApp
          </button>
        </div>
        <div id={id("notes")} className="builder__notes">
          <p>No hace falta tu dirección completa.</p>
          <p>
            Se abre WhatsApp con el mensaje escrito; lo envías tú.{" "}
            <Link href="/privacidad" className="link">
              Privacidad
            </Link>
          </p>
        </div>
        <div className="builder__preview" aria-live="polite">
          <p className="builder__preview-label">Tu mensaje</p>
          {message}
        </div>
        <p role="status" className="small" style={{ marginTop: 12, minHeight: "1.5em" }}>
          {statusText}{" "}
          {status.kind === "opened" ? (
            <a href={status.url} className="link" target="_blank" rel="noopener">
              Abrir de nuevo
            </a>
          ) : null}
        </p>
        <noscript>
          <p>
            <a href={whatsappUrl()} className="link">
              Escribir por WhatsApp
            </a>{" "}
            o llamar al <a href={telUrl}>{site.phoneDisplay}</a>.
          </p>
        </noscript>
      </form>
    );
  }

  return (
    <form className="form" onSubmit={openWhatsApp} noValidate>
      <div className="field" data-invalid={errors.type ? "true" : undefined}>
        <label htmlFor={id("type")}>Tipo de obra</label>
        <select
          id={id("type")}
          value={type}
          onChange={(e) => setType(e.target.value)}
          aria-invalid={errors.type ? true : undefined}
          aria-describedby={errorId("type")}
          required
        >
          <option value="">Elige una opción</option>
          {builderTypes.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        {errors.type ? <p id={id("type-error")} className="error">{errors.type}</p> : null}
      </div>

      <div className="field" data-invalid={errors.area ? "true" : undefined}>
        <label htmlFor={id("area")}>Barrio o código postal</label>
        <p className="hint" id={id("area-hint")}>
          Aproximado. No hace falta la dirección.
        </p>
        <input
          id={id("area")}
          value={area}
          onChange={(e) => setArea(e.target.value)}
          placeholder="Ej.: Las Águilas o 28044"
          maxLength={80}
          autoComplete="off"
          aria-invalid={errors.area ? true : undefined}
          aria-describedby={[id("area-hint"), errorId("area")].filter(Boolean).join(" ")}
          required
        />
        {errors.area ? <p id={id("area-error")} className="error">{errors.area}</p> : null}
      </div>

      <div className="field" data-invalid={errors.details ? "true" : undefined}>
        <label htmlFor={id("details")}>Qué quieres hacer</label>
        <p className="hint" id={id("details-hint")}>
          Una o dos frases: qué estancia, qué está mal, qué te gustaría.
        </p>
        <textarea
          id={id("details")}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          maxLength={800}
          aria-invalid={errors.details ? true : undefined}
          aria-describedby={[id("details-hint"), errorId("details")].filter(Boolean).join(" ")}
          required
        />
        {errors.details ? <p id={id("details-error")} className="error">{errors.details}</p> : null}
      </div>

      <div className="field" data-invalid={errors.name ? "true" : undefined}>
        <label htmlFor={id("name")}>Tu nombre</label>
        <input
          id={id("name")}
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="given-name"
          maxLength={60}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errorId("name")}
          required
        />
        {errors.name ? <p id={id("name-error")} className="error">{errors.name}</p> : null}
      </div>

      <fieldset className="field" data-invalid={errors.preference ? "true" : undefined} aria-describedby={errorId("preference")} style={{ border: 0, padding: 0, margin: 0 }}>
        <legend>Cómo prefieres que te contacten</legend>
        <div className="radio-row">
          {["WhatsApp", "llamada"].map((option, i) => (
            <label key={option}>
              <input
                id={i === 0 ? id("preference") : undefined}
                type="radio"
                name={id("preference-group")}
                value={option}
                checked={preference === option}
                onChange={() => setPreference(option)}
              />
              {option === "WhatsApp" ? "Por WhatsApp" : "Por teléfono"}
            </label>
          ))}
        </div>
        {errors.preference ? <p id={id("preference-error")} className="error">{errors.preference}</p> : null}
      </fieldset>

      <div className="field" data-invalid={errors.consent ? "true" : undefined}>
        <label className="check" style={{ fontWeight: 400 }}>
          <input
            id={id("consent")}
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errorId("consent")}
          />
          <span>
            He leído la{" "}
            <Link href="/privacidad" className="link">
              información de privacidad
            </Link>
            . Mis datos solo viajan en el mensaje que yo envío por WhatsApp; esta web no los guarda.
          </span>
        </label>
        {errors.consent ? <p id={id("consent-error")} className="error">{errors.consent}</p> : null}
      </div>

      <div>
        <p className="small muted" style={{ marginBottom: 8 }}>
          Vista previa del mensaje
        </p>
        <div className="message-preview" aria-live="polite">
          {message}
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
        <button type="submit" className="btn btn--primary">
          <WhatsAppIcon /> Abrir WhatsApp con este mensaje
        </button>
        <button type="button" className="btn btn--ghost" onClick={copy}>
          Copiar mensaje
        </button>
      </div>

      <p role="status" className="small" style={{ minHeight: "1.5em" }}>
        {statusText}{" "}
        {status.kind === "opened" ? (
          <a href={status.url} className="link" target="_blank" rel="noopener">
            Abrir de nuevo
          </a>
        ) : null}
      </p>

      <noscript>
        <p>
          Sin JavaScript no se puede componer el mensaje.{" "}
          <a href={whatsappUrl()} className="link">
            Escribe directamente por WhatsApp
          </a>{" "}
          o llama al <a href={telUrl}>{site.phoneDisplay}</a>.
        </p>
      </noscript>
    </form>
  );
}
