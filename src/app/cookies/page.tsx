import type { Metadata } from "next";
import { PageHead } from "@/components/PageHead";

export const metadata: Metadata = {
  title: "Cookies",
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <>
      <PageHead
        title="Cookies"
        crumbs={[{ name: "Cookies", path: "/cookies" }]}
        lead={<p>Esta web no instala cookies propias ni de terceros, por eso no muestra un aviso de cookies.</p>}
      />
      <section className="bg-paper" style={{ paddingBottom: "var(--section)" }}>
        <div className="wrap">
          <div className="legal">
            <h2>Situación actual</h2>
            <p>
              No hay analítica, publicidad, mapas incrustados ni vídeos de terceros cargados en la página. Las fuentes
              tipográficas se sirven desde el propio dominio. Los enlaces a WhatsApp, Instagram o Google Maps solo
              llevan a esos servicios si haces clic.
            </p>
            <h2>Si en el futuro se añade analítica</h2>
            <p>
              Si DecorMG decide medir visitas con una herramienta que use cookies, esta página se actualizará y se pedirá
              tu consentimiento antes de activarlas.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
