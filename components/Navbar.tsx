"use client";

import Image from "next/image";
import Link from "next/link";
import { UserProfile } from "@/types/auth";
import { BagIcon, StoreIcon, ProfileIcon, LogoutIcon } from "./icons/NavIcons";

export type { UserProfile };

interface NavbarProps {
  user?: UserProfile | null;
  onLogout?: () => void;
}

export default function Navbar({ user, onLogout }: NavbarProps) {
  return (
    <header className="mx-auto flex h-20 sm:h-24 max-w-[1440px] items-center justify-between px-4 sm:px-8 lg:px-14">
      {/* Logo Stock.io */}
      <Link href="/" className="flex items-center">
        <Image
          src="/LOGO%20Stock.io.png"
          alt="Stock.io"
          width={260}
          height={55}
          priority
          className="h-auto w-[150px] sm:w-[190px] object-contain invert brightness-0 hover:opacity-90 transition-opacity"
        />
      </Link>

      {/* Ações da Navbar fiéis ao Component Set do Figma (#30:19) */}
      <div className="flex items-center gap-4 sm:gap-6">
        {user ? (
          /* Estado Logado (Figma #30:19 Variantes 4, 5, 6, 7 e #346:3181) */
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Ícone de Sacola / Produtos */}
            <Link
              href="/produtos"
              title="Produtos"
              aria-label="Produtos"
              className="text-white hover:text-[#6A38F3] transition-colors p-1 flex items-center justify-center cursor-pointer"
            >
              <BagIcon />
            </Link>

            {/* Ícone de Loja */}
            <Link
              href="/lojas"
              title="Lojas"
              aria-label="Lojas"
              className="text-white hover:text-[#6A38F3] transition-colors p-1 flex items-center justify-center cursor-pointer"
            >
              <StoreIcon />
            </Link>

            {/* Ícone de Perfil (Figma: Hover em Roxo #6A38F3) */}
            <Link
              href="/perfil"
              title="Meu Perfil"
              aria-label="Perfil do Usuário"
              className="flex items-center gap-2 text-white hover:text-[#6A38F3] transition-colors p-1 cursor-pointer group"
            >
              <ProfileIcon />
              <span className="hidden sm:inline-block text-sm font-semibold text-white group-hover:text-[#6A38F3] transition-colors">
                {user.name || user.username || "Usuário"}
              </span>
            </Link>

            {/* Ícone de Sair / Logout (Figma: Hover em Vermelho #EF4444) */}
            <button
              type="button"
              onClick={onLogout}
              title="Sair"
              aria-label="Sair"
              className="text-white hover:text-[#EF4444] transition-colors p-1 cursor-pointer flex items-center justify-center"
            >
              <LogoutIcon />
            </button>
          </div>
        ) : (
          /* Estado Deslogado (Figma #30:19 Variantes 1, 2, 3 e #21:620) */
          <div className="flex items-center gap-5 sm:gap-7">
            {/* LOGIN: Branco por padrão, Roxo no Hover (Figma Variante 2) */}
            <Link
              href="/login"
              className="text-base sm:text-[17.5px] font-semibold uppercase tracking-wider text-white hover:text-[#6A38F3] transition-colors"
            >
              LOGIN
            </Link>

            {/* CADASTRE-SE: Pílula Roxa com texto branco, Hover Branco com texto roxo (Figma Variante 3) */}
            <Link
              href="/cadastro"
              className="flex h-9 sm:h-[34px] items-center justify-center rounded-full bg-[#6A38F3] px-6 text-sm sm:text-[16px] font-semibold tracking-wide text-white border border-[#6A38F3] shadow-md shadow-[#6A38F3]/30 hover:bg-white hover:text-[#6A38F3] hover:border-white active:scale-95 transition-all"
            >
              CADASTRE-SE
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
