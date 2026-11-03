"use client";

import Image from "next/image";
import Link from "next/link";

export interface UserProfile {
  name?: string;
  email?: string;
  username?: string;
}

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
              <svg
                width="26"
                height="26"
                viewBox="0 0 36 36"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M26.1562 11.25V10.4062C26.1546 8.27853 25.3225 6.23549 23.837 4.71211C22.3516 3.18873 20.3302 2.30533 18.2032 2.25H17.7968C15.6698 2.30533 13.6484 3.18873 12.163 4.71211C10.6775 6.23549 9.84541 8.27853 9.84375 10.4062V11.25H3.65625C3.58166 11.25 3.51012 11.2796 3.45738 11.3324C3.40463 11.3851 3.375 11.4567 3.375 11.5312V32.625C3.375 32.9234 3.49353 33.2095 3.7045 33.4205C3.91548 33.6315 4.20163 33.75 4.5 33.75H31.5C31.7984 33.75 32.0845 33.6315 32.2955 33.4205C32.5065 33.2095 32.625 32.9234 32.625 32.625V11.5312C32.625 11.4567 32.5954 11.3851 32.5426 11.3324C32.4899 11.2796 32.4183 11.25 32.3438 11.25H26.1562ZM23.3438 11.25H12.6562V10.4766C12.6562 7.53469 15.0054 5.09344 17.9473 5.0625C18.6532 5.05628 19.3535 5.18987 20.0076 5.45557C20.6616 5.72126 21.2567 6.1138 21.7583 6.61056C22.26 7.10732 22.6584 7.69847 22.9305 8.34992C23.2026 9.00138 23.343 9.70025 23.3438 10.4062V11.25Z" />
              </svg>
            </Link>

            {/* Ícone de Loja */}
            <Link
              href="/lojas"
              title="Lojas"
              aria-label="Lojas"
              className="text-white hover:text-[#6A38F3] transition-colors p-1 flex items-center justify-center cursor-pointer"
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 38 38"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.5 4.75C9.27965 4.75001 9.06365 4.81132 8.87616 4.92709C8.68867 5.04285 8.53709 5.2085 8.43837 5.4055L4.87587 12.5305C4.79311 12.6956 4.75001 12.8778 4.75 13.0625V20.1875C4.75 20.5024 4.87511 20.8045 5.09781 21.0272C5.32051 21.2499 5.62256 21.375 5.9375 21.375H7.125V33.25H9.5V21.375H13.0625V32.0625C13.0625 32.3774 13.1876 32.6795 13.4103 32.9022C13.633 33.1249 13.9351 33.25 14.25 33.25H29.6875C30.0024 33.25 30.3045 33.1249 30.5272 32.9022C30.7499 32.6795 30.875 32.3774 30.875 32.0625V21.375H32.0625C32.3774 21.375 32.6795 21.2499 32.9022 21.0272C33.1249 20.8045 33.25 20.5024 33.25 20.1875V13.0625C33.25 12.8778 33.2069 12.6956 33.1241 12.5305L29.5616 5.4055C29.4629 5.2085 29.3113 5.04285 29.1238 4.92709C28.9363 4.81132 28.7203 4.75001 28.5 4.75H9.5ZM15.4375 30.875V21.375H28.5V30.875H15.4375ZM14.25 14.25H11.875V19H14.25V14.25ZM17.8125 14.25H20.1875V19H17.8125V14.25ZM26.125 14.25H23.75V19H26.125V14.25Z"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
            </Link>

            {/* Ícone de Perfil (Figma: Hover em Roxo #6A38F3) */}
            <Link
              href="/perfil"
              title="Meu Perfil"
              aria-label="Perfil do Usuário"
              className="flex items-center gap-2 text-white hover:text-[#6A38F3] transition-colors p-1 cursor-pointer group"
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 35 35"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M22.7395 4.41465C21.4092 2.97842 19.5512 2.1875 17.5004 2.1875C15.4387 2.1875 13.5745 2.97363 12.2504 4.40098C10.9119 5.84404 10.2598 7.80527 10.4129 9.92305C10.7164 14.1012 13.8958 17.5 17.5004 17.5C21.105 17.5 24.2789 14.1019 24.5872 9.92441C24.7424 7.82578 24.0861 5.86865 22.7395 4.41465ZM29.5316 32.8125H5.46914C5.15419 32.8166 4.84228 32.7504 4.55611 32.6188C4.26994 32.4872 4.01671 32.2935 3.81484 32.0517C3.37051 31.5205 3.19141 30.7952 3.32402 30.0617C3.90098 26.8611 5.70156 24.1726 8.53164 22.2852C11.0459 20.6097 14.2308 19.6875 17.5004 19.6875C20.77 19.6875 23.9549 20.6104 26.4691 22.2852C29.2992 24.1719 31.0998 26.8604 31.6768 30.061C31.8094 30.7945 31.6303 31.5198 31.1859 32.051C30.9841 32.2929 30.7309 32.4868 30.4448 32.6185C30.1586 32.7502 29.8467 32.8165 29.5316 32.8125Z" />
              </svg>
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
              <svg
                width="24"
                height="24"
                viewBox="0 0 35 35"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8.75 3.75C7.42392 3.75 6.15215 4.27678 5.21447 5.21447C4.27678 6.15215 3.75 7.42392 3.75 8.75V26.25C3.75 27.5761 4.27678 28.8479 5.21447 29.7855C6.15215 30.7232 7.42392 31.25 8.75 31.25H21.25C21.5815 31.25 21.8995 31.1183 22.1339 30.8839C22.3683 30.6495 22.5 30.3315 22.5 30C22.5 29.6685 22.3683 29.3505 22.1339 29.1161C21.8995 28.8817 21.5815 28.75 21.25 28.75H8.75C8.08696 28.75 7.45107 28.4866 6.98223 28.0178C6.51339 27.5489 6.25 26.913 6.25 26.25V8.75C6.25 8.08696 6.51339 7.45107 6.98223 6.98223C7.45107 6.51339 8.08696 6.25 8.75 6.25H21.25C21.5815 6.25 21.8995 6.1183 22.1339 5.88388C22.3683 5.64946 22.5 5.33152 22.5 5C22.5 4.66848 22.3683 4.35054 22.1339 4.11612C21.8995 3.8817 21.5815 3.75 21.25 3.75H8.75ZM25.2588 9.74125C25.1434 9.62186 25.0055 9.52663 24.853 9.46112C24.7005 9.39561 24.5365 9.36113 24.3705 9.35969C24.2045 9.35824 24.0399 9.38987 23.8863 9.45272C23.7327 9.51557 23.5931 9.60839 23.4758 9.72576C23.3584 9.84312 23.2656 9.98269 23.2027 10.1363C23.1399 10.2899 23.1082 10.4545 23.1097 10.6205C23.1111 10.7865 23.1456 10.9505 23.2111 11.103C23.2766 11.2555 23.3719 11.3934 23.4912 11.5087L28.2325 16.25H12.5C12.1685 16.25 11.8505 16.3817 11.6161 16.6161C11.3817 16.8505 11.25 17.1685 11.25 17.5C11.25 17.8315 11.3817 18.1495 11.6161 18.3839C11.8505 18.6183 12.1685 18.75 12.5 18.75H28.2325L23.4912 23.4912C23.2636 23.727 23.1376 24.0428 23.1404 24.3705C23.1433 24.6982 23.2747 25.0118 23.5065 25.2435C23.7382 25.4753 24.0518 25.6067 24.3795 25.6096C24.7072 25.6124 25.023 25.4864 25.2588 25.2588L32.1338 18.3837C32.3681 18.1493 32.4997 17.8315 32.4997 17.5C32.4997 17.1685 32.3681 16.8507 32.1338 16.6163L25.2588 9.74125Z" />
              </svg>
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
