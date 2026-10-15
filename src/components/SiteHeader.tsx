"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { nav, site } from "@/content/site";
import { telUrl, whatsappUrl } from "@/lib/contact";
import { Brand } from "./Brand";
import { ArrowRightIcon, CloseIcon, MenuIcon, PhoneIcon, WhatsAppIcon } from "./icons";

export function SiteHeader() {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Routes stay mounted (Activity) under Cache Components, so close the sheet on every navigation.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog?.open) dialog.close();
  }, [pathname]);

  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="hdr">
      <div className="wrap hdr__bar">
        <Link href="/" className="brand">
          <Brand />
        </Link>

        <nav className="nav" aria-label="Principal">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} aria-current={isCurrent(item.href) ? "page" : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hdr__actions">
          <a href={telUrl} className="hdr__phone" data-track="cta_phone" data-track-place="header" aria-label={`Llamar al ${site.phoneDisplay}`}>
            <PhoneIcon />
            <span>{site.phoneDisplay}</span>
          </a>
          <Link href="/contacto" className="btn btn--primary btn--sm" data-track="cta_quote" data-track-place="header">
            Pedir presupuesto
          </Link>
        </div>

        <div className="hdr__mobile">
          <a href={telUrl} className="icon-btn" aria-label={`Llamar al ${site.phoneDisplay}`} data-track="cta_phone" data-track-place="header">
            <PhoneIcon />
          </a>
          <button
            ref={triggerRef}
            type="button"
            className="icon-btn"
            aria-haspopup="dialog"
            aria-controls="menu-sheet"
            onClick={open}
          >
            <MenuIcon />
            <span className="sr-only">Abrir menú</span>
          </button>
        </div>
      </div>

      <dialog
        id="menu-sheet"
        ref={dialogRef}
        className="menu"
        aria-label="Menú"
        onClose={() => triggerRef.current?.focus()}
        onClick={(event) => {
          if ((event.target as HTMLElement).closest("a")) close();
        }}
      >
        <div className="menu__top">
          <Link href="/" className="brand">
            <Brand />
          </Link>
          <button type="button" className="icon-btn" onClick={close} autoFocus>
            <CloseIcon />
            <span className="sr-only">Cerrar menú</span>
          </button>
        </div>
        <nav aria-label="Menú móvil">
          <Link href="/" style={{ ["--i" as string]: 0 }} aria-current={pathname === "/" ? "page" : undefined}>
            Inicio <ArrowRightIcon />
          </Link>
          {nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              style={{ ["--i" as string]: i + 1 }}
              aria-current={isCurrent(item.href) ? "page" : undefined}
            >
              {item.label} <ArrowRightIcon />
            </Link>
          ))}
        </nav>
        <div className="menu__contact">
          <Link href="/contacto" className="btn btn--primary" data-track="cta_quote" data-track-place="menu">
            Pedir presupuesto
          </Link>
          <a href={whatsappUrl()} className="btn btn--whatsapp" target="_blank" rel="noopener" data-track="cta_whatsapp" data-track-place="menu">
            <WhatsAppIcon /> WhatsApp
          </a>
          <a href={telUrl} className="btn btn--ghost" data-track="cta_phone" data-track-place="menu">
            <PhoneIcon /> {site.phoneDisplay}
          </a>
          <p className="small muted">Trabajamos en la {site.area}.</p>
        </div>
      </dialog>
    </header>
  );
}
