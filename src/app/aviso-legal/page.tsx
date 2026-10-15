import type { Metadata } from "next";
import { PageHead } from "@/components/PageHead";
import { Pending } from "@/components/Pending";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Aviso legal",
  alternates: { canonical: "/aviso-legal" },
};

export default function LegalNoticePage() {
  return (
    <>
      <PageHead
        title="Aviso legal"
        crumbs={[{ name: "Aviso legal", path: "/aviso-legal" }]}
        lead={<p>Plantilla para revisión del responsable del sitio. Los datos marcados como pendientes debe aportarlos DecorMG.</p>}
      />
      <section className="sec" style={{ paddingTop: 56 }}>
        <div className="wrap">
          <div className="legal">
            <h2>Estado de esta web</h2>
            <p>
              Esta web es una propuesta preparada para DecorMG y pendiente de su aprobación. Mientras no se apruebe no es
              la web oficial de la empresa ni está indexada en buscadores.
            </p>

            <h2>Titular del sitio</h2>
            <ul>
              <li>
                Nombre comercial: {site.name} Reformas Integrales
              </li>
              <li>
                Razón social o nombre del titular: <Pending>razón social</Pending>
              </li>
              <li>
                NIF/CIF: <Pending>NIF o CIF</Pending>
              </li>
              <li>
                Domicilio: <Pending>{`domicilio fiscal (la ficha de Google indica ${site.address.street}, ${site.address.postalCode} ${site.address.city})`}</Pending>
              </li>
              <li>
                Teléfono: {site.phoneDisplay}
              </li>
              <li>
                Correo electrónico: <Pending>email de contacto</Pending>
              </li>
              <li>
                Datos registrales, si es sociedad: <Pending>Registro Mercantil, tomo, folio, hoja</Pending>
              </li>
            </ul>

            <h2>Objeto</h2>
            <p>
              El sitio informa de los servicios de reforma de {site.name} y facilita el contacto para pedir presupuesto.
              No se venden productos ni se realizan pagos a través de esta web.
            </p>

            <h2>Propiedad intelectual</h2>
            <p>
              Las fotografías de obras proceden de los canales públicos de {site.name} (Instagram, ficha de Google y perfil
              de Cronoshare). Algunas de la ficha de Google las subieron clientes de {site.name}, no la empresa. Su uso en
              esta web está <Pending>autorización escrita de DecorMG para fotos y logotipo, y de los clientes autores de las
              fotos subidas a la ficha de Google</Pending>.
              Las opiniones citadas son extractos literales de opiniones públicas en Google y su publicación requiere
              permiso.
            </p>

            <h2>Enlaces externos</h2>
            <p>
              La web enlaza con WhatsApp, Google Maps, Instagram y Cronoshare. Esos servicios tienen sus propias
              condiciones y políticas de privacidad.
            </p>

            <h2>Legislación aplicable</h2>
            <p>
              <Pending>cláusula de legislación y jurisdicción revisada por el asesor de DecorMG</Pending>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
