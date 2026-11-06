"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { getStoredUser, clearSession } from "@/lib/auth";
import { UserProfile } from "@/types/auth";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

interface Usuario {
  id: number;
  name: string;
  username: string;
  email: string;
  fotoPerfilUrl?: string | null;
}

export default function PerfilPage() {
  return (
    <Suspense
      fallback={
        <main className="flex flex-1 items-center justify-center">
          <p className="text-xl">Carregando perfil...</p>
        </main>
      }
    >
      <PerfilConteudo />
    </Suspense>
  );
}

function PerfilConteudo() {
  const { username } = useParams<{ username: string }>();
  const router = useRouter();

  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [logado, setLogado] = useState<UserProfile | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const stored = getStoredUser();
    if (stored) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLogado(stored);
    }
  }, []);

  useEffect(() => {
    async function carregar() {
      try {
        const res = await fetch(`${API}/user/username/${username}`);
        if (!res.ok) {
          setErro(
            res.status === 404
              ? "Usuário não encontrado."
              : "Erro ao carregar o perfil.",
          );
          return;
        }
        const dados: Usuario = await res.json();
        if (!dados) {
          setErro("Usuário não encontrado.");
          return;
        }
        setUsuario(dados);
      } catch {
        setErro("Não foi possível conectar ao servidor.");
      } finally {
        setCarregando(false);
      }
    }
    if (username) carregar();
  }, [username]);

  function handleLogout() {
    clearSession();
    setLogado(null);
    router.replace("/login");
  }

  const ehMeuPerfil =
    !!logado?.username && !!usuario && logado.username === usuario.username;

  if (carregando) {
    return (
      <>
        <div className="bg-black">
          <Navbar user={logado} onLogout={handleLogout} />
        </div>
        <main className="flex flex-1 items-center justify-center">
          <p className="text-xl">Carregando perfil...</p>
        </main>
      </>
    );
  }

  if (erro || !usuario) {
    return (
      <>
        <div className="bg-black">
          <Navbar user={logado} onLogout={handleLogout} />
        </div>
        <main className="flex flex-1 flex-col items-center justify-center gap-5 px-6">
          <p className="text-center text-xl">{erro}</p>
          <Link
            href="/"
            className="rounded-full bg-[#6A38F3] px-8 py-3 font-semibold text-white hover:opacity-90"
          >
            Voltar para a home
          </Link>
        </main>
      </>
    );
  }

  return (
    <main className="flex-1">
      <div className="bg-black">
        <Navbar user={logado} onLogout={handleLogout} />
        <div className="h-[150px] w-full lg:h-[180px]" />
      </div>

      <section className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-14">
        <button
          onClick={() => router.back()}
          aria-label="Voltar"
          className="absolute left-2 top-[-90px] text-white hover:opacity-80 sm:left-6 lg:left-10 lg:top-[-110px]"
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <div className="relative -mt-[110px] h-[170px] w-[170px] overflow-hidden rounded-full border-4 border-[#F6F3E4] bg-[#D9D9D9] lg:-mt-[130px] lg:h-[230px] lg:w-[230px]">
          {usuario.fotoPerfilUrl ? (
            <Image
              src={usuario.fotoPerfilUrl}
              alt={usuario.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-5xl font-bold text-[#8A8A8A]">
              {usuario.name?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {ehMeuPerfil && (
          <Link
            href="/perfil/editar"
            className="absolute right-4 top-[20px] rounded-full bg-[#6A38F3] px-8 py-3 font-medium text-white hover:opacity-90 sm:right-8 lg:right-14 lg:px-10 lg:text-lg"
          >
            Editar Perfil
          </Link>
        )}

        <h1 className="mt-5 text-[40px] font-bold leading-none lg:text-[56px]">
          {usuario.name}
        </h1>

        <p className="mt-3 flex items-center gap-2 text-lg text-[#6B6B6B] lg:text-2xl">
          <span className="text-xl">@</span> {usuario.username}
        </p>

        <p className="mt-1 flex items-center gap-2 text-lg text-[#6B6B6B] lg:text-2xl">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m2 7 10 6 10-6" />
          </svg>
          {usuario.email}
        </p>

        <div className="mt-12 flex items-end justify-between">
          <h2 className="text-[28px] font-bold lg:text-[32px]">Produtos</h2>
          <Link
            href="#"
            className="text-sm text-[#6A38F3] hover:underline lg:text-base"
          >
            ver mais
          </Link>
        </div>

        <div className="mt-5 pb-16 text-[#6B6B6B]">
          <p>Nenhum produto para exibir ainda.</p>
        </div>
      </section>
    </main>
  );
}
