import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { LoginForm } from "./-components/login-form";
import { GalleryVerticalEnd } from "lucide-react";

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
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Acme Inc.
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <div className="flex flex-col gap-6">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">
                    Bem vindo ao Quality Flow
                  </CardTitle>
                  <CardDescription>
                    Entre com seu email e senha empresarial
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <LoginForm />
                </CardContent>
              </Card>
              <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                By clicking continue, you agree to our{" "}
                <Link to="/termos">Terms of Service</Link> and{" "}
                <Link to="/privacidade">Privacy Policy</Link>.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
