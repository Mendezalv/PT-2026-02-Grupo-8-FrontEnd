"use client";

import Image from "next/image";
import Link from "next/link";
import { League_Spartan } from "next/font/google";
import { useState, useEffect } from "react";

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

interface UserProfile {
  name?: string;
  email?: string;
  username?: string;
}

export default function HomePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    try {
      const token = localStorage.getItem("stockio_token");
      const storedUser = localStorage.getItem("stockio_user");
      if (token && storedUser) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUser(JSON.parse(storedUser));
      }
    } catch {
      // Ignora erro de acesso a localStorage
    }
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem("stockio_token");
      localStorage.removeItem("stockio_user");
    } catch {
      // noop
    }
    setUser(null);
  };

  // 8 Categorias Oficiais do Figma (Home - Deslogado #21:498)
  const categorias = [
    { id: "mercado", nome: "Mercado", icon: "/icons/cat_mercado.svg" },
    { id: "farmacia", nome: "Farmácia", icon: "/icons/cat_farmacia.svg" },
    { id: "beleza", nome: "Beleza", icon: "/icons/cat_beleza.svg" },
    { id: "moda", nome: "Moda", icon: "/icons/cat_moda.svg" },
    { id: "eletronicos", nome: "Eletrônicos", icon: "/icons/cat_eletronicos.svg" },
    { id: "jogos", nome: "Jogos", icon: "/icons/cat_jogos.svg" },
    { id: "brinquedos", nome: "Brinquedos", icon: "/icons/cat_brinquedos.svg" },
    { id: "casa", nome: "Casa", icon: "/icons/cat_casa.svg" },
  ];

  // Lojas Parceiras do Carrossel do Figma (#75:3004)
  const lojasParceiras = [
    { nome: "CJR", segmento: "mercado", cor: "#0A2540" },
    { nome: "Rare Beauty", segmento: "beleza", cor: "#FDF4EE" },
    { nome: "The Croc Brew", segmento: "mercado", cor: "#EBF1FF" },
    { nome: "Mini Reno", segmento: "casa", cor: "#262626" },
    { nome: "amoca", segmento: "moda", cor: "#FFFFFF" },
    { nome: "Repiit", segmento: "eletrônicos", cor: "#FFFFFF" },
    { nome: "Creamy", segmento: "beleza", cor: "#0055B8" },
  ];

  // Vitrine de Produtos Oficiais do Figma
  const produtos = [
    {
      id: 1,
      titulo: "Brownie Meio Amargo",
      subtitulo: "80g com ganache cremosa",
      preco: "R$ 8,00",
      loja: "CJR",
      badgeCor: "bg-[#0A2540] text-white",
      tag: "Mais Vendido",
    },
    {
      id: 2,
      titulo: "Brownie Tradicional",
      subtitulo: "80g chocolate ao leite belga",
      preco: "R$ 8,00",
      loja: "CJR",
      badgeCor: "bg-[#0A2540] text-white",
      tag: "Destaque",
    },
    {
      id: 3,
      titulo: "Castanhas e Nozes Nobres",
      subtitulo: "Mix selecionado crocante 200g",
      preco: "R$ 22,50",
      loja: "d'carts baskets",
      badgeCor: "bg-[#D97706] text-white",
      tag: "Artesanal",
    },
    {
      id: 4,
      titulo: "Bananas Prata Selecionadas",
      subtitulo: "Cacho fresco da estação (kg)",
      preco: "R$ 7,90",
      loja: "MAU MAR",
      badgeCor: "bg-[#047857] text-white",
      tag: "Orgânico",
    },
    {
      id: 5,
      titulo: "Limão Siciliano Fresco",
      subtitulo: "Frutas selecionadas tipo exportação (kg)",
      preco: "R$ 9,50",
      loja: "MAU MAR",
      badgeCor: "bg-[#047857] text-white",
      tag: "Fresco",
    },
  ];

  return (
    <div
      className={`${leagueSpartan.className} min-h-screen bg-[#F6F3E4] text-[#171918] flex flex-col justify-between`}
    >
      {/* 1. Header Superior & Hero Banner Preto (Figma Home #21:498) */}
      <section className="w-full bg-[#000000] text-white">
        {/* Navbar */}
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

          {/* Ações da Navbar fiéis ao Figma (Deslogado #21:498 vs Logado #346:3063) */}
          <div className="flex items-center gap-4 sm:gap-6">
            {user ? (
              <div className="flex items-center gap-5 sm:gap-7">
                {/* Ícones de Sacola, Loja, Perfil e Sair (Figma Home Logado #346:3063) */}
                <button
                  type="button"
                  title="Produtos"
                  aria-label="Produtos"
                  className="hover:scale-110 transition-transform cursor-pointer"
                >
                  <Image
                    src="/icons/icon_bag.svg"
                    alt="Produtos"
                    width={26}
                    height={26}
                    className="invert brightness-0"
                  />
                </button>
                <button
                  type="button"
                  title="Lojas"
                  aria-label="Lojas"
                  className="hover:scale-110 transition-transform cursor-pointer"
                >
                  <Image
                    src="/icons/icon_store.svg"
                    alt="Lojas"
                    width={26}
                    height={26}
                    className="invert brightness-0"
                  />
                </button>
                <div className="flex items-center gap-2">
                  <Image
                    src="/icons/icon_person.svg"
                    alt="Perfil"
                    width={26}
                    height={26}
                    className="invert brightness-0"
                  />
                  <span className="hidden sm:inline-block text-sm font-semibold text-white">
                    {user.name || user.username || "Usuário"}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  title="Sair"
                  aria-label="Sair"
                  className="hover:scale-110 transition-transform cursor-pointer p-1"
                >
                  <Image
                    src="/icons/icon_exit.svg"
                    alt="Sair"
                    width={24}
                    height={24}
                    className="invert brightness-0"
                  />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-5 sm:gap-7">
                <Link
                  href="/login"
                  className="text-base sm:text-[17.5px] font-semibold uppercase tracking-wider text-white hover:text-[#6A38F3] transition-colors"
                >
                  LOGIN
                </Link>
                <Link
                  href="/cadastro"
                  className="flex h-9 sm:h-[34px] items-center justify-center rounded-full bg-[#6A38F3] px-6 text-sm sm:text-[16px] font-semibold tracking-wide text-white shadow-md shadow-[#6A38F3]/30 hover:bg-[#582ad6] active:scale-95 transition-all"
                >
                  CADASTRE-SE
                </Link>
              </div>
            )}
          </div>
        </header>

        {/* Hero Banner Content */}
        <div className="mx-auto flex max-w-[1440px] flex-col lg:flex-row items-center justify-between px-4 sm:px-8 lg:px-14 pt-4 pb-0 overflow-hidden">
          {/* Título Principal do Figma */}
          <div className="max-w-2xl py-8 sm:py-12 lg:py-16 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-semibold leading-[1.08] tracking-tight text-white">
              Do CAOS à organização,
              <br />
              <span className="text-white">em alguns cliques</span>
            </h1>
            <p className="mt-4 text-lg sm:text-xl font-light text-[#F6F3E4]/70 max-w-lg mx-auto lg:mx-0">
              A plataforma integrada para conectar pequenas lojas, clientes e controle de inventário sem complicação.
            </p>
          </div>

          {/* Mascote Oficial do Hero do Figma (hero_mascote.png) */}
          <div className="relative w-[300px] sm:w-[380px] lg:w-[480px] h-[280px] sm:h-[360px] lg:h-[440px] flex items-end justify-center self-end">
            <Image
              src="/icons/hero_mascote.png"
              alt="Mascote Stock.io"
              fill
              priority
              className="object-contain object-bottom select-none pointer-events-none"
            />
          </div>
        </div>
      </section>

      {/* 2. Barra de Busca Oficial do Figma */}
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 -mt-6 sm:-mt-7 relative z-20">
        <div className="max-w-[720px] mx-auto">
          <div className="relative w-full shadow-lg rounded-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Procurar por..."
              aria-label="Buscar produtos ou lojas"
              className="h-[52px] sm:h-[56px] w-full rounded-full bg-white px-8 pr-14 text-lg sm:text-xl font-light text-[#171918] placeholder:text-[#858585] outline-none border border-[#171918]/10 focus:border-[#6A38F3] focus:ring-2 focus:ring-[#6A38F3]/20 transition-all"
            />
            <button
              type="button"
              aria-label="Pesquisar"
              className="absolute right-5 top-1/2 -translate-y-1/2 p-1.5 text-[#858585] hover:text-[#6A38F3] transition-colors cursor-pointer"
            >
              <Image
                src="/icons/icon_search.svg"
                alt="Pesquisar"
                width={22}
                height={22}
              />
            </button>
          </div>
        </div>
      </section>

      {/* 3. Seção "Categoria" (8 Ícones Vetoriais Oficiais do Figma) */}
      <section className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-14 pt-10 sm:pt-14 pb-8">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#171918] mb-6 sm:mb-8">
          Categoria
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {categorias.map((cat) => (
            <div
              key={cat.id}
              className="flex flex-col items-center justify-center h-[130px] sm:h-[145px] rounded-[28px] sm:rounded-[32px] bg-white border border-[#171918]/10 hover:border-[#6A38F3] hover:shadow-md transition-all cursor-pointer group p-3"
            >
              <div className="h-12 w-12 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Image
                  src={cat.icon}
                  alt={cat.nome}
                  width={42}
                  height={42}
                  className="object-contain"
                />
              </div>
              <span className="text-base sm:text-lg font-medium text-[#171918] group-hover:text-[#6A38F3] transition-colors text-center">
                {cat.nome}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Carrossel de Lojas Parceiras do Figma (#75:3004) */}
      <section className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-14 py-4 sm:py-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl sm:text-2xl font-semibold text-[#171918]">
            Lojas Parceiras em Destaque
          </h3>
        </div>

        <div className="flex items-center gap-6 overflow-x-auto pb-4 pt-2 scrollbar-none">
          {lojasParceiras.map((loja, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer group"
            >
              <div
                style={{ backgroundColor: loja.cor }}
                className="h-20 w-20 sm:h-24 sm:w-24 rounded-full border border-[#171918]/15 flex items-center justify-center shadow-sm group-hover:scale-105 group-hover:border-[#6A38F3] transition-all p-3 text-center"
              >
                <span
                  className={`text-xs sm:text-sm font-bold ${
                    loja.cor === "#0A2540" || loja.cor === "#262626" || loja.cor === "#0055B8"
                      ? "text-white"
                      : "text-[#171918]"
                  }`}
                >
                  {loja.nome}
                </span>
              </div>
              <span className="text-sm font-medium text-[#171918] group-hover:text-[#6A38F3] transition-colors">
                {loja.nome}
              </span>
              <span className="text-xs font-light text-[#6A38F3]">
                {loja.segmento}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Seção "Produtos em Mercado" (Vitrine com Itens do Figma) */}
      <section className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-14 pt-4 pb-14 sm:pb-20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#171918]">
            Produtos em <span className="text-[#6A38F3]">Mercado</span>
          </h2>
          <Link
            href="/produtos"
            className="text-base sm:text-lg font-medium text-[#6A38F3] hover:underline"
          >
            ver mais
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {produtos.map((prod) => (
            <div
              key={prod.id}
              className="flex flex-col justify-between rounded-3xl bg-white border border-[#171918]/10 p-5 shadow-sm hover:border-[#6A38F3]/50 hover:shadow-lg transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`inline-block text-[11px] font-semibold px-2.5 py-1 rounded-full ${prod.badgeCor}`}
                  >
                    {prod.loja}
                  </span>
                  <span className="text-[11px] font-medium text-[#858585] bg-[#F6F3E4] px-2 py-0.5 rounded-full">
                    {prod.tag}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-[#171918] group-hover:text-[#6A38F3] transition-colors line-clamp-1">
                  {prod.titulo}
                </h3>
                <p className="text-xs sm:text-sm font-light text-[#858585] mt-1">
                  {prod.subtitulo}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#171918]/10 flex items-center justify-between">
                <span className="text-xl font-bold text-[#171918]">
                  {prod.preco}
                </span>
                <button
                  type="button"
                  className="h-8 rounded-full bg-[#6A38F3] px-3.5 text-xs font-semibold text-white shadow-sm hover:bg-[#582ad6] active:scale-95 transition-all cursor-pointer"
                >
                  Ver Detalhes
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Rodapé Padrão Stock.io */}
      <footer className="w-full border-t border-[#171918]/10 bg-[#171918] text-[#F6F3E4] py-8">
        <div className="mx-auto flex max-w-[1440px] flex-col sm:flex-row items-center justify-between px-4 sm:px-8 lg:px-14 gap-4">
          <div className="flex items-center gap-3">
            <Image
              src="/LOGO%20Stock.io.png"
              alt="Stock.io"
              width={140}
              height={30}
              className="h-auto w-[120px] invert brightness-0"
            />
            <span className="text-xs font-light text-white/60">
              © 2026 Processo Trainee CJR - Grupo 8
            </span>
          </div>

          <div className="flex items-center gap-6 text-sm font-light text-white/80">
            <Link href="/" className="hover:text-white transition-colors">
              Início
            </Link>
            <Link href="/login" className="hover:text-white transition-colors">
              Login
            </Link>
            <Link href="/cadastro" className="hover:text-white transition-colors">
              Cadastro
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
