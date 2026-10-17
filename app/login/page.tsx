"use client";

import Image from "next/image";
import Link from "next/link";
import { Outfit } from "next/font/google";
import { useState } from "react";

const outfit = Outfit({ subsets: ["latin"], weight: ["300", "600", "800"] });

export default function Login() {
  const [verSenha, setVerSenha] = useState(false);

  const input =
    "h-12 w-full rounded-full bg-[#F6F3E4] px-[34px] text-xl font-light text-[#171918] outline-none placeholder:text-[#858585] lg:text-2xl";

  return (
    <main
      className={`${outfit.className} flex min-h-screen flex-col bg-[#F6F3E4] lg:flex-row`}
    >
      <div className="flex flex-1 flex-col items-center px-6 pt-8 lg:items-start lg:justify-between lg:px-[85px] lg:pb-0 lg:pt-[60px]">
        <Image
          src="/LOGO%20Stock.io.png"
          alt="Stock.io"
          width={418}
          height={82}
          priority
          className="h-auto w-[200px] lg:w-[418px]"
        />

        <div className="relative mt-6 h-[260px] w-full max-w-[420px] lg:mt-6 lg:h-[660px] lg:max-w-[497px]">
          <Image
            src="/Mascote%202%20da%20Stock.io.png"
            alt=""
            fill
            sizes="(max-width: 1024px) 420px, 497px"
            className="object-contain object-bottom lg:object-cover lg:object-top"
          />
        </div>
      </div>

      <section className="w-full rounded-t-[60px] bg-[#171918] px-8 pb-12 pt-12 text-[#F6F3E4] lg:w-[46%] lg:max-w-[654px] lg:rounded-t-[80px] lg:px-[75px] lg:pb-0 lg:pt-[160px]">
        <h1 className="text-center text-[32px] font-extrabold leading-none lg:text-[42px]">
          BEM VINDO DE VOLTA!
        </h1>

        <form className="mt-10 flex flex-col gap-[15px] lg:mt-[55px]">
          <input type="email" placeholder="Email" className={input} />

          <div className="relative">
            <input
              type={verSenha ? "text" : "password"}
              placeholder="Senha"
              className={input}
            />
            <button
              type="button"
              onClick={() => setVerSenha(!verSenha)}
              aria-label={verSenha ? "Ocultar senha" : "Mostrar senha"}
              className="absolute right-4 top-3"
            >
              <svg
                width="26"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#858585"
                strokeWidth="1.2"
              >
                <path d="M1.5 12S5.5 5 12 5s10.5 7 10.5 7-4 7-10.5 7S1.5 12 1.5 12Z" />
                <circle cx="12" cy="12" r="3" />
                {verSenha && <path d="M3 21 21 3" />}
              </svg>
            </button>
          </div>

          <Link
            href="/recuperar-senha"
            className="self-center text-base font-light underline-offset-2 hover:underline lg:text-lg"
          >
            Esqueceu sua senha?
          </Link>

          <button
            type="submit"
            className="mt-[14px] h-[52px] rounded-full bg-[#6A38F3] text-xl font-semibold text-white hover:opacity-90 lg:text-2xl"
          >
            ENTRAR
          </button>
        </form>

        <p className="mt-[25px] text-xl font-light lg:text-2xl">
          Não possui uma conta?{" "}
          <Link href="/cadastro" className="font-semibold text-[#6A38F3]">
            Cadastre-se
          </Link>
        </p>
      </section>
    </main>
  );
}
