"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { League_Spartan } from "next/font/google";
import { useState, type FormEvent } from "react";

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "800"],
  display: "swap",
});

interface FormErrors {
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

export default function CadastroPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [verSenha, setVerSenha] = useState(false);
  const [verConfirmar, setVerConfirmar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined, general: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "O nome é obrigatório.";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "O nome deve ter no mínimo 2 caracteres.";
    }

    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!formData.username.trim()) {
      newErrors.username = "O username é obrigatório.";
    } else if (formData.username.trim().length < 3) {
      newErrors.username = "O username deve ter no mínimo 3 caracteres.";
    } else if (!usernameRegex.test(formData.username.trim())) {
      newErrors.username = "Use apenas letras, números e sublinhado (_).";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "O email é obrigatório.";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Formato de e-mail inválido.";
    }

    if (!formData.password) {
      newErrors.password = "A senha é obrigatória.";
    } else if (formData.password.length < 6) {
      newErrors.password = "A senha deve ter no mínimo 6 caracteres.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirme a sua senha.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "As senhas não conferem.";
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
      const response = await fetch(`${apiUrl}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          username: formData.username.trim(),
          email: formData.email.trim(),
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        let errorMsg = "Ocorreu um erro ao criar a conta.";
        if (data?.message) {
          if (Array.isArray(data.message)) {
            errorMsg = data.message.join(", ");
          } else if (typeof data.message === "string") {
            errorMsg = data.message;
          }
        }
        setErrors((prev) => ({ ...prev, general: errorMsg }));
        return;
      }

      setSuccessMessage("Conta criada com sucesso! Redirecionando para o login...");
      setFormData({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch {
      setErrors((prev) => ({
        ...prev,
        general:
          "Não foi possível conectar ao servidor. Verifique se o backend está em execução.",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle =
    "h-12 w-full rounded-full bg-[#F6F3E4] px-[34px] text-xl sm:text-2xl font-light text-[#171918] outline-none placeholder:text-[#858585] transition-all focus:ring-2 focus:ring-[#6A38F3] focus:ring-offset-2 focus:ring-offset-[#171918]";

  return (
    <main
      className={`${leagueSpartan.className} min-h-screen w-full bg-[#F6F3E4] flex flex-col justify-between py-6 sm:py-8 lg:py-0`}
    >
      {/* Cabeçalho para Mobile e Tablet (< lg) */}
      <header className="lg:hidden w-full flex justify-center pb-4 px-6">
        <Link href="/">
          <Image
            src="/LOGO%20Stock.io.png"
            alt="Stock.io Logo"
            width={320}
            height={64}
            priority
            className="h-auto w-[200px] sm:w-[260px] object-contain hover:opacity-90 transition-opacity"
          />
        </Link>
      </header>

      {/* Conteúdo Principal */}
      <div className="relative mx-auto flex-1 w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16 flex flex-col lg:flex-row items-center lg:items-end justify-between gap-8 pb-4 lg:pb-0">
        {/* Painel do Formulário de Cadastro (Figma #12:200) */}
        <section
          aria-labelledby="cadastro-heading"
          className="w-full max-w-[560px] xl:max-w-[654px] rounded-t-[50px] sm:rounded-t-[80px] rounded-b-[40px] lg:rounded-b-none bg-[#171918] px-6 sm:px-12 xl:px-[75px] pt-8 sm:pt-10 xl:pt-12 pb-8 sm:pb-10 xl:pb-12 text-[#F6F3E4] shadow-2xl flex flex-col justify-center transition-all my-auto lg:my-0"
        >
          <h1
            id="cadastro-heading"
            className="text-center text-3xl sm:text-4xl xl:text-[44px] font-extrabold leading-none tracking-tight text-[#F6F3E4]"
          >
            CRIE SUA CONTA
          </h1>

          {/* Mensagens de Feedback */}
          {errors.general && (
            <div
              role="alert"
              className="mt-4 rounded-xl bg-red-500/15 border border-red-500/40 p-3 text-center text-sm font-medium text-red-300"
            >
              {errors.general}
            </div>
          )}

          {successMessage && (
            <div
              role="status"
              className="mt-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 p-3 text-center text-sm font-medium text-emerald-300"
            >
              {successMessage}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            noValidate
            className="mt-6 sm:mt-7 xl:mt-8 flex flex-col gap-3.5 xl:gap-[15px]"
          >
            {/* Campo Nome Completo */}
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nome Completo"
                disabled={isLoading}
                aria-label="Nome Completo"
                className={inputStyle}
              />
              {errors.name && (
                <span className="mt-1 ml-5 block text-xs font-normal text-red-400">
                  {errors.name}
                </span>
              )}
            </div>

            {/* Campo Username */}
            <div>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                disabled={isLoading}
                aria-label="Username"
                className={inputStyle}
              />
              {errors.username && (
                <span className="mt-1 ml-5 block text-xs font-normal text-red-400">
                  {errors.username}
                </span>
              )}
            </div>

            {/* Campo Email */}
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                disabled={isLoading}
                aria-label="Email"
                className={inputStyle}
              />
              {errors.email && (
                <span className="mt-1 ml-5 block text-xs font-normal text-red-400">
                  {errors.email}
                </span>
              )}
            </div>

            {/* Campo Senha com Toggle Oficial iconamoon:eye-thin */}
            <div className="relative">
              <input
                type={verSenha ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Senha"
                disabled={isLoading}
                aria-label="Senha"
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

            {/* Campo Confirmar Senha */}
            <div className="relative">
              <input
                type={verConfirmar ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirmar Senha"
                disabled={isLoading}
                aria-label="Confirmar Senha"
                className={`${inputStyle} pr-14`}
              />
              <button
                type="button"
                onClick={() => setVerConfirmar(!verConfirmar)}
                aria-label={verConfirmar ? "Ocultar confirmação de senha" : "Ver confirmação de senha"}
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
                  {verConfirmar && (
                    <path
                      d="M3 23L23 3"
                      stroke="#858585"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                  )}
                </svg>
              </button>
              {errors.confirmPassword && (
                <span className="mt-1 ml-5 block text-xs font-normal text-red-400">
                  {errors.confirmPassword}
                </span>
              )}
            </div>

            {/* Botão de Envio (Figma #12:260) */}
            <button
              type="submit"
              disabled={isLoading}
              className="mt-3 sm:mt-4 h-[52px] w-full rounded-full bg-[#6A38F3] text-2xl font-semibold tracking-wide text-white transition-all hover:bg-[#582ad6] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer shadow-lg shadow-[#6A38F3]/30"
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
                  <span>CRIANDO...</span>
                </div>
              ) : (
                "CRIAR CONTA"
              )}
            </button>
          </form>

          {/* Link para Login (Figma #12:263) */}
          <p className="mt-5 sm:mt-6 text-center text-xl sm:text-2xl font-light text-white">
            Já possui uma conta?{" "}
            <Link
              href="/login"
              className="font-medium text-[#6A38F3] hover:underline"
            >
              Login
            </Link>
          </p>
        </section>

        {/* Lado Direito / Logo e Mascote (Desktop - Figma #12:267 e #33:35) */}
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

          {/* Mascote StockLee */}
          <div className="mt-auto relative w-full flex justify-center items-end">
            <Image
              src="/StockLee%20-%20Mascote%20da%20Stock.io.png"
              alt="StockLee - Mascote da Stock.io"
              width={497}
              height={799}
              priority
              className="h-auto max-h-[58vh] xl:max-h-[66vh] 2xl:max-h-[72vh] w-[300px] xl:w-[420px] object-contain object-bottom select-none pointer-events-none"
            />
          </div>
        </section>
      </div>
    </main>
  );
}
