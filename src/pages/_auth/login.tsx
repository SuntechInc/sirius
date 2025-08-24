import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { LoginForm } from "./-components/login-form";
import { GalleryVerticalEnd, Sparkles, Shield, Zap } from "lucide-react";

export const Route = createFileRoute("/_auth/login")({
  head: () => ({
    meta: [
      {
        title: "Login | Quality Flow",
      },
    ],
  }),
  component: LoginComponent,
  beforeLoad: async ({ context: { auth } }) => {
    if (auth.isAuthenticated) {
      throw redirect({
        to: "/",
      });
    }
  },
});

function LoginComponent() {
  return (
    <div className="min-h-svh bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex min-h-svh items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Logo and branding */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex size-12 items-center justify-center rounded-2xl shadow-lg">
                  <GalleryVerticalEnd className="size-6" />
                </div>
                <div className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white size-5 rounded-full flex items-center justify-center">
                  <Sparkles className="size-3" />
                </div>
              </div>
              <div className="text-left">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                  Acme Inc.
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">Quality Flow Platform</p>
              </div>
            </div>
          </div>

          {/* Main login card */}
          <div className="backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 rounded-3xl shadow-2xl border border-white/20 dark:border-slate-700/50 p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent mb-2">
                Bem-vindo de volta
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Entre com suas credenciais para acessar sua conta
              </p>
            </div>

            <LoginForm />

            {/* Features highlights */}
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-2 rounded-xl">
                    <Shield className="size-4" />
                  </div>
                  <span className="text-xs text-slate-600 dark:text-slate-400">Seguro</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white p-2 rounded-xl">
                    <Zap className="size-4" />
                  </div>
                  <span className="text-xs text-slate-600 dark:text-slate-400">Rápido</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white p-2 rounded-xl">
                    <Sparkles className="size-4" />
                  </div>
                  <span className="text-xs text-slate-600 dark:text-slate-400">Moderno</span>
                </div>
              </div>
            </div>
          </div>

          {/* Terms and privacy */}
          <div className="text-center mt-6">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Ao continuar, você concorda com nossos{" "}
              <Link 
                to="/termos" 
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium transition-colors"
              >
                Termos de Serviço
              </Link>{" "}
              e{" "}
              <Link 
                to="/privacidade" 
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium transition-colors"
              >
                Política de Privacidade
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
