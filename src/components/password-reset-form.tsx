"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";

export const forgotPasswordSchema = z.object({
  email: z.string({ message: "Email é obrigatório" }).email({
    message: "Email inválido",
  }),
});

export const resetPasswordSchema = z.object({
  email: z.string().email(),
  code: z.string().min(6, "Código inválido"),
  newPassword: z.string().min(8, "Senha deve ter no mínimo 8 caracteres"),
});

export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;

export function PasswordResetForm() {
  const { signIn } = useAuthActions();
  const { toast } = useToast();

  const [step, setStep] = useState<"forgot" | { email: string }>("forgot");

  // FORM 1 — SEND CODE
  const forgotForm = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  // FORM 2 — RESET PASSWORD
  const resetForm = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { code: "", newPassword: "" },
  });

  // submit step 1
  const handleSendCode = async (values: ForgotPasswordData) => {
    try {
      await signIn("password", {
        flow: "reset",
        email: values.email,
      });

      setStep({ email: values.email });

      toast({
        title: "Código enviado",
        description: "Verifique seu email.",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Erro ao enviar código",
        description: "Não foi possível enviar o email.",
      });
    }
  };

  // submit step 2
  const handleResetPassword = async (values: ResetPasswordData) => {
    if (step === "forgot") return;

    try {
      await signIn("password", {
        flow: "reset-verification",
        ...values,
      });

      toast({
        title: "Senha redefinida com sucesso!",
        description: "Agora você pode acessar sua conta normalmente.",
      });

      setStep("forgot");
      resetForm.reset();
      forgotForm.reset();
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Erro ao redefinir senha",
        description: "Código inválido ou expirado.",
      });
    }
  };

  // STEP 1 UI
  if (step === "forgot") {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Esqueceu a senha?</CardTitle>
          <CardDescription>
            Enviaremos um código para redefinir sua senha
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...forgotForm}>
            <form
              onSubmit={forgotForm.handleSubmit(handleSendCode)}
              className="space-y-2"
            >
              <FormField
                control={forgotForm.control}
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

              <Button
                className="w-full"
                disabled={forgotForm.formState.isSubmitting}
              >
                {forgotForm.formState.isSubmitting && (
                  <Loader2 className="animate-spin" />
                )}
                Enviar código
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => (window.location.href = "/login")}
              >
                Voltar para login
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    );
  }

  // STEP 2 UI
  return (
    <Card>
      <CardHeader>
        <CardTitle>Redefinir senha</CardTitle>
        <CardDescription>Digite o código recebido no email</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...resetForm}>
          <form
            onSubmit={resetForm.handleSubmit(handleResetPassword)}
            className="space-y-2"
          >
            <input
              type="hidden"
              value={step.email}
              {...resetForm.register("email")}
            />

            <FormField
              control={resetForm.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={resetForm.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nova senha</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className="w-full"
              disabled={resetForm.formState.isSubmitting}
            >
              {resetForm.formState.isSubmitting && (
                <Loader2 className="animate-spin" />
              )}
              Redefinir senha
            </Button>

            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={() => setStep("forgot")}
            >
              Voltar
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
