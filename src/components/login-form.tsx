"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";
import { useAuthActions } from "@convex-dev/auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const loginSchema = z.object({
  email: z.string({ message: "Email é obrigatório" }).email({
    message: "Email inválido",
  }),
  password: z.string({ message: "Senha é obrigatória" }).min(8, {
    message: "Senha deve ter no mínimo 8 caracteres",
  }),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const { signIn } = useAuthActions();
  const { toast } = useToast();
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: LoginFormData) => {
    try {
      await signIn("password", {
        flow: "signIn",
        email: values.email,
        password: values.password,
      });
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Erro ao entrar",
        description: "Email ou senha inválidos",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Entrar</CardTitle>
        <CardDescription>Acesse o CG.lab com sua conta</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
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
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting && (
                <Loader2 className="animate-spin" />
              )}
              Entrar
            </Button>
            <div className="mt-4 text-center text-sm">
              Ainda não possui uma conta?{" "}
              <Link href="/sign-up" className="underline underline-offset-4">
                Registrar
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
