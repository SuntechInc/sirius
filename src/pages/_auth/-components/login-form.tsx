"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
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
import { useAuth } from "@/hooks/use-auth";
import { UserType } from "@/types/user";
import { type AuthSchema, authSchema } from "../-validations/auth";

export function LoginForm() {
	const form = useForm<AuthSchema>({
		resolver: zodResolver(authSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const { login, loading, user } = useAuth();
	const navigate = useNavigate();

	async function onSubmit(data: AuthSchema) {
		await login(data);

		if (user?.userType === UserType.GLOBAL_ADMIN) {
			navigate({
				to: "/admin",
			});
		} else {
			navigate({
				to: "/",
			});
		}
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
									disabled={loading}
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
									disabled={loading}
									placeholder="********"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button disabled={loading} type="submit" className="cursor-pointer">
					{loading ? "Entrando..." : "Entrar"}
				</Button>
			</form>
		</Form>
	);
}
