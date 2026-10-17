"use client";

import Image from "next/image";
import { Outfit } from "next/font/google";
import { useState } from "react";

const outfit = Outfit({ subsets: ["latin"], weight: ["300", "600", "800"] });

export default function Home() {
  const [verSenha, setVerSenha] = useState(false);
  const [verConfirmar, setVerConfirmar] = useState(false);


  const input =
    "h-12 w-full rounded-full bg-[#F6F3E4] px-[34px] text-2xl font-light text-[#171918] outline-none placeholder:text-[#858585]";


return (
    <main className={`${outfit.className} h-screen overflow-hidden bg-[#F6F3E4]`}>
      <div className="relative mx-auto h-full w-full max-w-[1440px]">
        <section className="absolute bottom-0 left-[85px] top-[113px] w-[654px] rounded-t-[80px] bg-[#171918] px-[75px] pt-[106px] text-[#F6F3E4]">
          <h1 className="text-center text-[42px] font-extrabold leading-none">
            CRIE SUA CONTA
          </h1>

          <form className="mt-[55px] flex flex-col gap-[15px]">
            <input type="text" placeholder="Nome Completo" className={input} />
            <input type="text" placeholder="Username" className={input} />
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
                className="absolute right-4 top-3"
              >
                <svg width="26" height="24" viewBox="0 0 24 24" fill="none" stroke="#858585" strokeWidth="1.2">
                  <path d="M1.5 12S5.5 5 12 5s10.5 7 10.5 7-4 7-10.5 7S1.5 12 1.5 12Z" />
                  <circle cx="12" cy="12" r="3" />
                  {verSenha && <path d="M3 21 21 3" />}
                </svg>
              </button>
            </div>
      <div className="relative">
              <input
                type={verConfirmar ? "text" : "password"}
                placeholder="Confirmar Senha"
                className={input}
              />
            <button
                type="button"
                onClick={() => setVerConfirmar(!verConfirmar)}
                className="absolute right-4 top-3"
              >
                <svg width="26" height="24" viewBox="0 0 24 24" fill="none" stroke="#858585" strokeWidth="1.2">
                  <path d="M1.5 12S5.5 5 12 5s10.5 7 10.5 7-4 7-10.5 7S1.5 12 1.5 12Z" />
                  <circle cx="12" cy="12" r="3" />
                  {verConfirmar && <path d="M3 21 21 3" />}
                </svg>
              </button>
            </div>

            <button
              type="submit"
              className="mt-[27px] h-[52px] rounded-full bg-[#6A38F3] text-2xl font-semibold text-white hover:opacity-90"
            >
              CRIAR CONTA
            </button>
          </form>

          <p className="mt-[25px] text-2xl font-light">
            Já possui uma conta?{" "}
            <a href="/login" className="font-semibold text-[#6A38F3]">
              Login
            </a>
          </p>
        </section>
<Image
  src="/LOGO%20Stock.io.png"
  alt="Stock.io"
  width={418}
  height={82}
className="absolute -top-14 left-[915px] h-auto w-[418px]"
/>
        <div className="absolute bottom-0 left-[878px] h-[796px] w-[497px]">
          <Image
            src="/StockLee%20-%20Mascote%20da%20Stock.io.png"
            alt="Mascote"
            fill
            className="object-contain object-bottom"
          />
  </div>
  </div>
</main>
  );
}