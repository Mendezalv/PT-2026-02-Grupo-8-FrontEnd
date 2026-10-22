"use client";

import Image from "next/image";
import Link from "next/link";
import { League_Spartan } from "next/font/google";
import { useState } from "react";

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
  const [user, setUser] = useState<UserProfile | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const token = localStorage.getItem("stockio_token");
      const storedUser = localStorage.getItem("stockio_user");
      if (token && storedUser) {
        return JSON.parse(storedUser);
      }
    } catch {
      // Ignora erro
    }
    return null;
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<"todos" | "produtos" | "lojas">("todos");

  const handleLogout = () => {
    try {
      localStorage.removeItem("stockio_token");
      localStorage.removeItem("stockio_user");
    } catch {
      // noop
    }
    setUser(null);
  };

  // Categorias mock para navegação rápida (RF19, RF20, US12, US13)
  const categorias = [
    { id: 1, nome: "Tecnologia", icone: "💻" },
    { id: 2, nome: "Moda & Vestuário", icone: "👕" },
    { id: 3, nome: "Alimentos & Bebidas", icone: "☕" },
    { id: 4, nome: "Papelaria & Escritório", icone: "📚" },
    { id: 5, nome: "Serviços & Consultoria", icone: "💼" },
  ];

  // Vitrine em destaque (RF24, RF25, US10, US11)
  const destaques = [
    {
      tipo: "loja",
      titulo: "Cafeteria Central",
      subtitulo: "Cafés especiais, grãos selecionados e lanches artesanais",
      tag: "Loja Parceira",
      badge: "⭐ 4.9",
    },
    {
      tipo: "produto",
      titulo: "Café Especial Torrado 250g",
      subtitulo: "R$ 38,00 | Estoque disponível: 24 un.",
      tag: "Mais Vendido",
      badge: "⭐ 5.0",
    },
    {
      tipo: "loja",
      titulo: "CJR Tech Store",
      subtitulo: "Eletrônicos, periféricos e soluções corporativas",
      tag: "Loja Parceira",
      badge: "⭐ 4.8",
    },
    {
      tipo: "produto",
      titulo: "Mousepad Ergonômico Gamer",
      subtitulo: "R$ 49,90 | Estoque disponível: 15 un.",
      tag: "Lançamento",
      badge: "⭐ 4.7",
    },
  ];

  return (
    <div className={`${leagueSpartan.className} min-h-screen bg-[#F6F3E4] text-[#171918] flex flex-col justify-between`}>
      {/* Navbar Superior (RF16, RF17, RF19, RF42, RF43, US11, US34, US35) */}
      <header className="sticky top-0 z-40 w-full border-b border-[#171918]/10 bg-[#F6F3E4]/90 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-4 sm:px-8 lg:px-14">
          {/* Logo Stock.io */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/LOGO%20Stock.io.png"
              alt="Stock.io"
              width={220}
              height={45}
              priority
              className="h-auto w-[160px] sm:w-[200px] object-contain"
            />
          </Link>

          {/* Barra de Busca (RF24) */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar lojas, produtos e categorias..."
                className="h-11 w-full rounded-full bg-white/80 border border-[#171918]/15 px-5 pl-11 text-base outline-none transition-all focus:border-[#6A38F3] focus:ring-2 focus:ring-[#6A38F3]/20"
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#858585]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Ações / Autenticação */}
          <div className="flex items-center gap-3 sm:gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex flex-col text-right">
                  <span className="text-sm font-semibold text-[#171918]">
                    {user.name || user.username || user.email}
                  </span>
                  <span className="text-xs text-[#858585]">{user.email}</span>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="h-10 rounded-full border border-red-500/30 bg-red-50 px-4 text-sm font-semibold text-red-600 transition-colors hover:bg-red-100 cursor-pointer"
                >
                  Sair
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 sm:gap-3">
                <Link
                  href="/login"
                  className="flex h-10 items-center justify-center rounded-full px-4 sm:px-6 text-base font-semibold text-[#171918] transition-colors hover:text-[#6A38F3]"
                >
                  Entrar
                </Link>
                <Link
                  href="/cadastro"
                  className="flex h-10 items-center justify-center rounded-full bg-[#6A38F3] px-5 sm:px-7 text-base font-semibold text-white shadow-md shadow-[#6A38F3]/25 transition-all hover:bg-[#582ad6] active:scale-95"
                >
                  Cadastre-se
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="mx-auto flex-1 w-full max-w-[1440px] px-4 sm:px-8 lg:px-14 py-8 sm:py-12 flex flex-col gap-12">
        {/* Banner Hero */}
        <section className="relative overflow-hidden rounded-[40px] bg-[#171918] p-8 sm:p-12 lg:p-16 text-[#F6F3E4] shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl flex flex-col items-start gap-5">
            <span className="inline-block rounded-full bg-[#6A38F3]/30 border border-[#6A38F3]/50 px-4 py-1.5 text-xs sm:text-sm font-semibold tracking-wide text-[#a584f9]">
              PROCESSO TRAINEE CJR 2026.2 • GRUPO 8
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-white">
              Gestão de estoque e catálogo com a <span className="text-[#6A38F3]">Stock.io</span>
            </h1>
            <p className="text-lg sm:text-xl font-light text-[#F6F3E4]/80 leading-relaxed">
              Explore lojas locais, descubra produtos incríveis e gerencie seu inventário de forma rápida, moderna e integrada.
            </p>
            <div className="mt-2 flex flex-wrap gap-4">
              <Link
                href="/cadastro"
                className="h-12 flex items-center justify-center rounded-full bg-[#6A38F3] px-8 text-xl font-semibold text-white shadow-lg shadow-[#6A38F3]/40 transition-all hover:bg-[#582ad6]"
              >
                Comece Agora
              </Link>
              <Link
                href="/login"
                className="h-12 flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 text-xl font-medium text-white transition-all hover:bg-white/10"
              >
                Acessar Minha Conta
              </Link>
            </div>
          </div>

          {/* Mascote no Hero */}
          <div className="relative w-[260px] sm:w-[320px] lg:w-[380px] h-[300px] sm:h-[380px] flex items-end justify-center">
            <Image
              src="/StockLee%20-%20Mascote%20da%20Stock.io.png"
              alt="StockLee - Mascote da Stock.io"
              fill
              priority
              className="object-contain object-bottom select-none"
            />
          </div>
        </section>

        {/* Categorias (RF19, RF20, US12, US13) */}
        <section aria-labelledby="categorias-heading">
          <div className="flex items-center justify-between mb-6">
            <h2 id="categorias-heading" className="text-2xl sm:text-3xl font-extrabold">
              Navegue por Categorias
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {categorias.map((cat) => (
              <div
                key={cat.id}
                className="flex flex-col items-center justify-center p-6 rounded-3xl bg-white/70 border border-[#171918]/10 hover:border-[#6A38F3]/50 hover:shadow-lg transition-all cursor-pointer group"
              >
                <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {cat.icone}
                </span>
                <span className="text-base font-semibold text-center group-hover:text-[#6A38F3] transition-colors">
                  {cat.nome}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Vitrine / Carrossel em Destaque (RF24, RF25, US10) */}
        <section aria-labelledby="destaques-heading">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 id="destaques-heading" className="text-2xl sm:text-3xl font-extrabold">
                Vitrine e Lojas em Destaque
              </h2>
              <p className="text-sm sm:text-base font-light text-[#858585]">
                Itens e estabelecimentos avaliados pela nossa comunidade
              </p>
            </div>

            {/* Filtros rápidos (RF25, RF29) */}
            <div className="flex items-center gap-2 bg-white/70 p-1.5 rounded-full border border-[#171918]/10 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setSelectedFilter("todos")}
                className={`rounded-full px-4 py-1 text-sm font-semibold transition-colors cursor-pointer ${
                  selectedFilter === "todos"
                    ? "bg-[#6A38F3] text-white"
                    : "text-[#171918] hover:text-[#6A38F3]"
                }`}
              >
                Todos
              </button>
              <button
                type="button"
                onClick={() => setSelectedFilter("lojas")}
                className={`rounded-full px-4 py-1 text-sm font-semibold transition-colors cursor-pointer ${
                  selectedFilter === "lojas"
                    ? "bg-[#6A38F3] text-white"
                    : "text-[#171918] hover:text-[#6A38F3]"
                }`}
              >
                Lojas
              </button>
              <button
                type="button"
                onClick={() => setSelectedFilter("produtos")}
                className={`rounded-full px-4 py-1 text-sm font-semibold transition-colors cursor-pointer ${
                  selectedFilter === "produtos"
                    ? "bg-[#6A38F3] text-white"
                    : "text-[#171918] hover:text-[#6A38F3]"
                }`}
              >
                Produtos
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destaques
              .filter(
                (item) =>
                  selectedFilter === "todos" ||
                  (selectedFilter === "lojas" && item.tipo === "loja") ||
                  (selectedFilter === "produtos" && item.tipo === "produto"),
              )
              .map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-between rounded-3xl bg-white p-6 border border-[#171918]/10 shadow-sm hover:shadow-xl transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="rounded-full bg-[#6A38F3]/10 px-3 py-1 text-xs font-semibold text-[#6A38F3]">
                        {item.tag}
                      </span>
                      <span className="text-sm font-bold text-amber-500">
                        {item.badge}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{item.titulo}</h3>
                    <p className="text-sm font-light text-[#858585] leading-relaxed">
                      {item.subtitulo}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[#171918]/5">
                    <Link
                      href={item.tipo === "loja" ? "/cadastro" : "/login"}
                      className="text-sm font-semibold text-[#6A38F3] hover:underline"
                    >
                      {item.tipo === "loja" ? "Ver detalhes da loja →" : "Ver produto →"}
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </section>
      </main>

      {/* Rodapé */}
      <footer className="w-full border-t border-[#171918]/10 bg-white/40 py-8 px-4 sm:px-8 lg:px-14 mt-12">
        <div className="mx-auto max-w-[1440px] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-sm text-[#858585]">
          <p>© 2026 Stock.io - CJR Consultoria Júnior (Processo Trainee 2026.2 - Grupo 8)</p>
          <div className="flex items-center gap-6">
            <Link href="/cadastro" className="hover:text-[#171918] transition-colors">
              Cadastro
            </Link>
            <Link href="/login" className="hover:text-[#171918] transition-colors">
              Login
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
