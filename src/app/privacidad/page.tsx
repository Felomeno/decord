import type { Metadata } from "next";
import { PageHead } from "@/components/PageHead";
import { Pending } from "@/components/Pending";

export const metadata: Metadata = {
  title: "Privacidad",
  alternates: { canonical: "/privacidad" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHead
        title="Información de privacidad"
        crumbs={[{ name: "Privacidad", path: "/privacidad" }]}
        lead={<p>Plantilla basada en cómo funciona esta web hoy. Debe revisarla el responsable del tratamiento antes de publicar.</p>}
      />
      <section className="bg-paper" style={{ paddingBottom: "var(--section)" }}>
        <div className="wrap">
          <div className="legal">
            <h2>Qué datos recoge esta web</h2>
            <p>
              Ninguno en sus servidores. El formulario de presupuesto solo compone un mensaje en tu navegador y abre
              WhatsApp con ese texto. Tú decides si lo envías. Esta web no guarda, no envía por correo y no registra lo que
              escribes.
            </p>

            <h2>Qué datos recibe DecorMG</h2>
            <p>
              Si envías el mensaje por WhatsApp o llamas, DecorMG recibe lo que tú le cuentes: tipo de obra, zona
              aproximada, descripción, tu nombre y tu número de teléfono. Solo te pedimos lo necesario para preparar un
              presupuesto; no hace falta tu dirección completa en el primer contacto.
            </p>

            <h2>Responsable del tratamiento</h2>
            <ul>
              <li>
                Responsable: <Pending>razón social y NIF de DecorMG</Pending>
              </li>
              <li>
                Contacto para ejercer derechos: <Pending>email o dirección postal</Pending>
              </li>
            </ul>

            <h2>Finalidad y base legal</h2>
            <p>
              Atender tu solicitud de presupuesto y comunicarte con él. Base legal: la aplicación de medidas
              precontractuales a petición tuya. <Pending>validación de la base legal por el asesor de DecorMG</Pending>
            </p>

            <h2>Conservación</h2>
            <p>
              <Pending>plazo de conservación de los mensajes y presupuestos</Pending>
            </p>

            <h2>WhatsApp</h2>
            <p>
              Al usar WhatsApp, el mensaje se gestiona también conforme a la política de privacidad de WhatsApp (Meta).
              Si prefieres no usarlo, puedes llamar por teléfono.
            </p>

            <h2>Tus derechos</h2>
            <p>
              Puedes pedir acceso, rectificación, supresión, oposición, limitación y portabilidad de tus datos, y
              reclamar ante la Agencia Española de Protección de Datos (aepd.es).
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
