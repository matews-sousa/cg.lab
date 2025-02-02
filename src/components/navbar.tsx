"use client";

import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useAuthActions } from "@convex-dev/auth/react";
import { Loader2 } from "lucide-react"; // Import a loading spinner

export default function Navbar() {
  const user = useQuery(api.users.currentUser);
  const { signOut } = useAuthActions();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Failed to sign out", error);
    }
  };

  // Show a loading spinner while the query is loading
  if (user === undefined) {
    return (
      <nav className="shadow border-b w-full">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center p-4">
          <Link href="/" className="text-2xl font-bold">
            CG.lab
          </Link>
          <div className="space-x-4">
            <Loader2 className="h-6 w-6 animate-spin" /> {/* Loading spinner */}
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="shadow border-b w-full">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center p-4">
        <Link href="/" className="text-2xl font-bold">
          CG.lab
        </Link>
        <div className="space-x-4">
          {user ? (
            <>
              <Button onClick={handleSignOut}>Sair</Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button>Entrar</Button>
              </Link>
              <Link href="/sign-up">
                <Button>Registrar</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
