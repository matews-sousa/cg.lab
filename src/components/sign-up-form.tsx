"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";
import { useAuthActions } from "@convex-dev/auth/react";

import { z } from "zod";
import { redirect } from "next/navigation";

export const SignUpSchema = z
  .object({
    name: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("Email inválido"),
    password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
    passwordConfirmation: z.string(),
  })
  .refine(data => data.password === data.passwordConfirmation, {
    message: "Senhas não coincidem",
    path: ["passwordConfirmation"], // Attach the error to passwordConfirmation
  });

export type SignUpFormData = z.infer<typeof SignUpSchema>;

export default function SignUpForm() {
  const { signIn } = useAuthActions();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const data: SignUpFormData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      passwordConfirmation: formData.get("passwordConfirm") as string,
    };
    const result = SignUpSchema.safeParse(data);
    if (!result.success) {
      console.error(result.error);
      setIsSubmitting(false);
      return;
    }

    try {
      await signIn("password", {
        flow: "signUp",
        email: data.email,
        password: data.password,
        name: data.name,
      });
      redirect("/login");
    } catch (error) {
      console.error("Failed to sign up", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Registrar</CardTitle>
        <CardDescription>Crie uma conta para acessar o CG.lab</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          {/* hidden input to Convex recognize if it's a Login or SignUp */}
          <input type="hidden" name="flow" value="signUp" />{" "}
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" name="name" type="text" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="seuemail@email.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" name="password" type="password" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="passwordConfirmation">Confirmar senha</Label>
              <Input
                id="passwordConfirmation"
                name="passwordConfirm"
                type="password"
              />
            </div>
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              Registrar
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Já possui uma conta?{" "}
            <Link href="/login" className="underline underline-offset-4">
              Entrar
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
