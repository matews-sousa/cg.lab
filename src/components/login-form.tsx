"use client";

import React from "react";
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
import { redirect } from "next/navigation";

export default function LoginForm() {
  const { signIn } = useAuthActions();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      setIsSubmitting(true);
      await signIn("password", {
        flow: "signIn",
        email,
        password,
      });
      redirect("/");
    } catch (error) {
      console.error("Failed to sign in", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Entrar</CardTitle>
        <CardDescription>Acesse o CG.lab com sua conta</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
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
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              Entrar
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Ainda não possui uma conta?{" "}
            <Link href="/sign-up" className="underline underline-offset-4">
              Registrar
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
