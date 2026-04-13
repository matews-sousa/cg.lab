"use client";

import Navbar from "@/components/navbar";
import { PasswordResetForm } from "@/components/password-reset-form";
import { useAuthActions } from "@convex-dev/auth/react";

export default function Page() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col w-full items-center justify-center h-[90vh]">
        <div className="max-w-sm w-full">
          <PasswordResetForm />
        </div>
      </div>
    </>
  );
}
