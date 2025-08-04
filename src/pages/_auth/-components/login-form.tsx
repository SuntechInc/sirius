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
    await mutateAsync(data, {
      onSuccess: async ({ accessToken }) => {
        await login(accessToken);

        const { userType } = decodeJwt<{
          userType: UserType;
        }>(accessToken);

        const destination = userType === UserType.GLOBAL_ADMIN ? "/admin" : "/";

        navigate({ to: destination });
      },
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  placeholder="email@exemplo.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <PasswordInput
                  disabled={isPending}
                  placeholder="********"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} type="submit" className="cursor-pointer">
          {isPending ? "Entrando..." : "Entrar"}
        </Button>
      </form>
    </Form>
  );
}
