"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { nav, site } from "@/content/site";
import { telUrl, whatsappUrl } from "@/lib/contact";
import { CloseIcon, MenuIcon, PhoneIcon, WhatsAppIcon } from "./icons";

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
    <header className="site-header on-dark">
      <div className="wrap site-header__bar">
        <Link href="/" className="wordmark" aria-label="DecorMG, inicio">
          DecorMG <small>Reformas integrales</small>
        </Link>

        <nav className="site-nav" aria-label="Principal">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="plain-link"
              aria-current={isCurrent(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="site-header__actions">
          <a href={telUrl} className="site-header__phone plain-link" data-track="cta_phone" data-track-place="header">
            {site.phoneDisplay}
          </a>
          <a
            href={whatsappUrl()}
            className="btn btn-primary"
            data-track="cta_whatsapp"
            data-track-place="header"
            target="_blank"
            rel="noopener"
          >
            Pedir presupuesto
          </a>
        </div>

        <div className="site-header__mobile">
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
        className="menu-sheet on-dark"
        aria-label="Menú"
        onClose={() => triggerRef.current?.focus()}
        onClick={(event) => {
          if ((event.target as HTMLElement).closest("a")) close();
        }}
      >
        <div className="menu-sheet__top">
          <Link href="/" className="wordmark">
            DecorMG
          </Link>
          <button type="button" className="icon-btn" onClick={close} autoFocus>
            <CloseIcon />
            <span className="sr-only">Cerrar menú</span>
          </button>
        </div>
        <nav aria-label="Menú móvil">
          <Link href="/" style={{ ["--i" as string]: 0 }} aria-current={pathname === "/" ? "page" : undefined}>
            <span>Inicio</span>
          </Link>
          {nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              style={{ ["--i" as string]: i + 1 }}
              aria-current={isCurrent(item.href) ? "page" : undefined}
            >
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="menu-sheet__contact">
          <a href={whatsappUrl()} className="btn btn-primary" target="_blank" rel="noopener" data-track="cta_whatsapp" data-track-place="menu">
            <WhatsAppIcon /> Escribir por WhatsApp
          </a>
          <a href={telUrl} className="btn btn-secondary" data-track="cta_phone" data-track-place="menu">
            <PhoneIcon /> Llamar al {site.phoneDisplay}
          </a>
          <p className="t-small t-muted">Trabajamos en la {site.area}.</p>
        </div>
      </dialog>
    </header>
  );
}
