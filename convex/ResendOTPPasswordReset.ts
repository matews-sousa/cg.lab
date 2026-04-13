import Resend from "@auth/core/providers/resend";
import { Resend as ResendAPI } from "resend";
import { RandomReader, generateRandomString } from "@oslojs/crypto/random";

export const ResendOTPPasswordReset = Resend({
  id: "resend-otp",
  apiKey: process.env.AUTH_RESEND_KEY,
  async generateVerificationToken() {
    const random: RandomReader = {
      read(bytes) {
        crypto.getRandomValues(bytes);
      },
    };

    const alphabet = "0123456789";
    const length = 8;
    return generateRandomString(random, alphabet, length);
  },
  async sendVerificationRequest({ identifier: email, provider, token }) {
    const resend = new ResendAPI(provider.apiKey);
    const { error } = await resend.emails.send({
      from: "CG.lab <onboarding@resend.dev>",
      to: [email],
      subject: "Redefinição de senha - CG.lab",
      text: `Seu código de redefinição é: ${token}`,
      html: getResetPasswordEmailHtml(token),
    });

    if (error) {
      throw new Error("Could not send");
    }
  },
});

function getResetPasswordEmailHtml(token: string) {
  return `
  <div style="font-family: Arial, sans-serif; background:#f6f9fc; padding:40px;">
    <div style="max-width:480px;margin:0 auto;background:white;padding:32px;border-radius:12px;">
      
      <h2 style="margin-top:0;">Redefinir senha</h2>
      <p>Recebemos uma solicitação para redefinir sua senha no <b>CG.lab</b>.</p>
      <p>Use o código abaixo:</p>

      <div style="
        font-size:32px;
        letter-spacing:8px;
        font-weight:bold;
        text-align:center;
        padding:16px;
        margin:24px 0;
        background:#f1f5f9;
        border-radius:8px;
      ">
        ${token}
      </div>

      <p>Este código expira em <b>10 minutos</b>.</p>

      <hr style="margin:32px 0;border:none;border-top:1px solid #eee;" />

      <p style="font-size:12px;color:#666;">
        Se você não solicitou a redefinição, pode ignorar este email.
      </p>

      <p style="font-size:12px;color:#666;">
        © ${new Date().getFullYear()} CG.lab
      </p>
    </div>
  </div>
  `;
}
