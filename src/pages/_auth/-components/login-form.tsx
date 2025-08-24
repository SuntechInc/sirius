import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type AuthSchema, authSchema } from "../-validations/auth";
import { useAuth } from "@/hooks/use-auth";
import { useLoginMutation } from "@/hooks/use-login";
import { decodeJwt } from "jose";
import { UserType } from "@/types/enum";
import { useNavigate } from "@tanstack/react-router";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { mutateAsync, isPending } = useLoginMutation();
  
  const form = useForm<AuthSchema>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: AuthSchema) {
    // Usar mutate em vez de mutateAsync para melhor controle
    mutateAsync(data, {
      onSuccess: async ({ accessToken, refreshToken }) => {
        await login(accessToken, refreshToken);

        const { userType } = decodeJwt<{
          userType: UserType;
        }>(accessToken);

        const destination = userType === UserType.GLOBAL_ADMIN ? "/admin" : "/";

        navigate({ to: destination });
      },
      onError: (error) => {
        console.error("Erro no login:", error);
        
        let errorMessage = "Erro ao fazer login. Tente novamente.";
        
        if (error.response?.status === 401) {
          errorMessage = "E-mail ou senha incorretos.";
        } else if (error.response?.status === 400) {
          errorMessage = "Dados inválidos. Verifique suas credenciais.";
        } else if (error.response?.status && error.response.status >= 500) {
          errorMessage = "Erro no servidor. Tente novamente mais tarde.";
        } else if (error.code === "NETWORK_ERROR") {
          errorMessage = "Erro de conexão. Verifique sua internet.";
        }
        
        toast.error(errorMessage, {
          duration: 6000, // 6 segundos para mensagens de erro
          style: {
            fontSize: '16px',
            fontWeight: '500',
          },
        });
      },
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-slate-700 dark:text-slate-300">
                E-mail
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <Input
                    disabled={isPending}
                    placeholder="seu@email.com"
                    className="pl-10 h-12 bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 backdrop-blur-sm"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage className="text-red-500 text-sm" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Senha
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <PasswordInput
                    disabled={isPending}
                    placeholder="••••••••"
                    className="pl-10 h-12 bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 backdrop-blur-sm"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage className="text-red-500 text-sm" />
            </FormItem>
          )}
        />
        
        <Button 
          disabled={isPending} 
          type="submit" 
          className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 group"
        >
          {isPending ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Entrando...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              Entrar
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
            </div>
          )}
        </Button>
      </form>
    </Form>
  );
}
