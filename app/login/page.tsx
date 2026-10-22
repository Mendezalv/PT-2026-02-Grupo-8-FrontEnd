"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { League_Spartan } from "next/font/google";
import { useState, type FormEvent } from "react";

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

interface LoginErrors {
  email?: string;
  password?: string;
  general?: string;
}

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verSenha, setVerSenha] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showForgotModal, setShowForgotModal] = useState(false);

  const validate = (): boolean => {
    const newErrors: LoginErrors = {};

    const cleanEmail = email.trim();
    if (!cleanEmail) {
      newErrors.email = "O email é obrigatório.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(cleanEmail)) {
        newErrors.email = "Formato de e-mail inválido.";
      }
    }

    if (!password) {
      newErrors.password = "A senha é obrigatória.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);

    if (!validate()) {
      return;
    }

    setIsLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        let errorMsg = "E-mail ou senha incorretos.";
        if (data?.message) {
          if (Array.isArray(data.message)) {
            errorMsg = data.message.join(", ");
          } else if (typeof data.message === "string") {
            errorMsg = data.message;
          }
        }
        setErrors({ general: errorMsg });
        return;
      }

      if (data?.access_token) {
        // Armazenamento seguro de sessão do usuário no navegador
        try {
          localStorage.setItem("stockio_token", data.access_token);
          if (data.user) {
            localStorage.setItem("stockio_user", JSON.stringify(data.user));
          } else {
            localStorage.setItem(
              "stockio_user",
              JSON.stringify({ email: email.trim() }),
            );
          }
        } catch {
          // Fallback para caso localStorage esteja bloqueado
        }
      }

      setSuccessMessage("Login efetuado com sucesso! Redirecionando...");
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch {
      setErrors({
        general:
          "Não foi possível conectar ao servidor. Verifique se o backend está em execução.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle =
    "h-12 w-full rounded-full bg-[#F6F3E4] px-[34px] text-xl sm:text-2xl font-light text-[#171918] outline-none placeholder:text-[#858585] transition-all focus:ring-2 focus:ring-[#6A38F3] focus:ring-offset-2 focus:ring-offset-[#171918]";

  return (
    <main
      className={`${leagueSpartan.className} min-h-screen w-full bg-[#F6F3E4] flex flex-col justify-between overflow-x-hidden`}
    >
      {/* Cabeçalho exclusivo para Mobile e Tablet (< lg) */}
      <header className="lg:hidden w-full flex justify-center pt-8 pb-3 px-6">
        <Link href="/">
          <Image
            src="/LOGO%20Stock.io.png"
            alt="Stock.io Logo"
            width={320}
            height={64}
            priority
            className="h-auto w-[220px] sm:w-[280px] object-contain"
          />
        </Link>
      </header>

      {/* Conteúdo Principal Centralizado */}
      <div className="relative mx-auto flex-1 w-full max-w-[1440px] px-4 sm:px-8 lg:px-14 flex flex-col lg:flex-row items-center lg:items-end justify-center lg:justify-between gap-6 pb-0">
        {/* Lado Esquerdo no Desktop: Logo e Mascote 2 */}
        <section className="hidden lg:flex flex-col items-center justify-between self-stretch pt-6 xl:pt-10 w-full max-w-[440px] xl:max-w-[500px]">
          {/* Logo Stock.io */}
          <div className="w-full flex justify-center px-4">
            <Link href="/">
              <Image
                src="/LOGO%20Stock.io.png"
                alt="Stock.io"
                width={419}
                height={86}
                priority
                className="h-auto w-[280px] xl:w-[380px] object-contain cursor-pointer hover:opacity-90 transition-opacity"
              />
            </Link>
          </div>

          {/* Mascote 2 da Stock.io */}
          <div className="mt-auto relative w-full flex justify-center items-end">
            <Image
              src="/Mascote%202%20da%20Stock.io.png"
              alt="Mascote da Stock.io"
              width={497}
              height={660}
              priority
              className="h-auto max-h-[62vh] xl:max-h-[68vh] 2xl:max-h-[74vh] w-[320px] xl:w-[440px] object-contain object-bottom select-none pointer-events-none"
            />
          </div>
        </section>

        {/* Lado Direito: Card de Login Escuro */}
        <section
          aria-labelledby="login-heading"
          className="w-full max-w-[654px] rounded-t-[50px] sm:rounded-t-[80px] bg-[#171918] px-6 sm:px-12 xl:px-[75px] pt-8 sm:pt-14 pb-8 text-[#F6F3E4] shadow-2xl flex flex-col justify-center transition-all duration-300"
        >
          <h1
            id="login-heading"
            className="text-center text-3xl sm:text-4xl xl:text-[42px] font-extrabold leading-none tracking-tight text-white"
          >
            BEM VINDO DE VOLTA!
          </h1>

          {/* Mensagens de Feedback */}
          {errors.general && (
            <div
              role="alert"
              className="mt-4 rounded-xl bg-red-500/15 border border-red-500/40 p-3.5 text-center text-sm font-medium text-red-300 animate-fadeIn"
            >
              {errors.general}
            </div>
          )}

          {successMessage && (
            <div
              role="status"
              className="mt-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 p-3.5 text-center text-sm font-medium text-emerald-300 animate-fadeIn"
            >
              {successMessage}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            noValidate
            className="mt-8 flex flex-col gap-4 xl:gap-[18px]"
          >
            {/* Campo E-mail */}
            <div>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email || errors.general) {
                    setErrors((prev) => ({ ...prev, email: undefined, general: undefined }));
                  }
                }}
                placeholder="Email"
                disabled={isLoading}
                aria-label="Email de acesso"
                aria-invalid={!!errors.email}
                className={inputStyle}
              />
              {errors.email && (
                <span className="mt-1 ml-5 block text-xs font-normal text-red-400">
                  {errors.email}
                </span>
              )}
            </div>

            {/* Campo Senha com Toggle */}
            <div className="relative">
              <input
                type={verSenha ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password || errors.general) {
                    setErrors((prev) => ({ ...prev, password: undefined, general: undefined }));
                  }
                }}
                placeholder="Senha"
                disabled={isLoading}
                aria-label="Senha"
                aria-invalid={!!errors.password}
                className={`${inputStyle} pr-14`}
              />
              <button
                type="button"
                onClick={() => setVerSenha(!verSenha)}
                aria-label={verSenha ? "Ocultar senha" : "Ver senha"}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer p-1 text-[#858585] hover:opacity-80 transition-opacity"
              >
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.25 13C16.25 13.8619 15.9076 14.6886 15.2981 15.2981C14.6886 15.9076 13.8619 16.25 13 16.25C12.138 16.25 11.3114 15.9076 10.7019 15.2981C10.0924 14.6886 9.74998 13.8619 9.74998 13C9.74998 12.138 10.0924 11.3114 10.7019 10.7019C11.3114 10.0924 12.138 9.74998 13 9.74998C13.8619 9.74998 14.6886 10.0924 15.2981 10.7019C15.9076 11.3114 16.25 12.138 16.25 13Z"
                    stroke="#858585"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2.16672 13C3.90005 8.56158 7.94737 5.41667 13 5.41667C18.0527 5.41667 22.1 8.56158 23.8333 13C22.1 17.4384 18.0527 20.5833 13 20.5833C7.94737 20.5833 3.90005 17.4384 2.16672 13Z"
                    stroke="#858585"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {verSenha && (
                    <path
                      d="M3 23L23 3"
                      stroke="#858585"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                  )}
                </svg>
              </button>
              {errors.password && (
                <span className="mt-1 ml-5 block text-xs font-normal text-red-400">
                  {errors.password}
                </span>
              )}
            </div>

            {/* Link Esqueceu sua senha? */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="text-base sm:text-lg font-light text-[#F6F3E4]/80 underline-offset-4 hover:underline hover:text-white transition-colors cursor-pointer"
              >
                Esqueceu sua senha?
              </button>
            </div>

            {/* Botão Entrar */}
            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 sm:mt-3 h-[52px] w-full rounded-full bg-[#6A38F3] text-2xl font-semibold tracking-wide text-white transition-all hover:bg-[#582ad6] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer shadow-lg shadow-[#6A38F3]/30"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <svg
                    className="h-5 w-5 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>ENTRANDO...</span>
                </div>
              ) : (
                "ENTRAR"
              )}
            </button>
          </form>

          {/* Link para Cadastro */}
          <p className="mt-6 text-center text-xl sm:text-2xl font-light text-white">
            Não possui uma conta?{" "}
            <Link
              href="/cadastro"
              className="font-medium text-[#6A38F3] hover:underline"
            >
              Cadastre-se
            </Link>
          </p>
        </section>
      </div>

      {/* Modal de Esqueceu a Senha (RF14 / Ciclo 4) */}
      {showForgotModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm animate-fadeIn"
        >
          <div className="w-full max-w-md rounded-3xl bg-[#171918] border border-[#6A38F3]/40 p-6 text-center shadow-2xl text-[#F6F3E4]">
            <h3 className="text-2xl font-bold text-white">Recuperação de Senha</h3>
            <p className="mt-3 text-base font-light text-[#F6F3E4]/80 leading-relaxed">
              A funcionalidade de redefinição de senha está planejada para a próxima etapa (Ciclo 4) do Processo Trainee.
            </p>
            <p className="mt-2 text-sm text-[#858585]">
              Caso necessite de redefinição emergencial, contate a coordenação ou o administrador do sistema.
            </p>
            <button
              type="button"
              onClick={() => setShowForgotModal(false)}
              className="mt-6 h-11 w-full rounded-full bg-[#6A38F3] text-lg font-semibold text-white hover:bg-[#582ad6] transition-colors cursor-pointer"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
