"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Smartphone, XIcon } from "lucide-react";
import Link from "next/link";

export default function AssingmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [backUrl, setBackUrl] = useState("/");
  const [isMounted, setIsMounted] = useState(false);

  // Ensure client-only rendering
  useEffect(() => {
    setIsMounted(true);

    // Prevent scrolling when the component is mounted
    document.body.style.overflow = "hidden";
    return () => {
      // Restore scrolling on unmount
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const slug = window.location.pathname.split("/")[2];
    const url =
      slug === "random" || typeof slug === "undefined"
        ? "/"
        : `/subject/${slug}`;
    setBackUrl(url);
  }, []);

  // Prevent rendering anything until the component is mounted on the client
  if (!isMounted) return null;

  return (
    <>
      <Link href={backUrl}>
        <Button
          className="absolute top-4 left-4 rounded-full w-12 h-12 z-50"
          variant="destructive"
          size="icon"
        >
          <XIcon />
        </Button>
      </Link>

      {children}

      {/* Modal alerting that the application is better used in larger screen sizes*/}
      <div className="lg:hidden fixed top-0 left-0 w-screen h-screen bg-black/50 z-40 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 max-w-lg mx-auto text-center">
          <Smartphone className="w-10 h-10 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Visualização Mobile</h2>
          <p className="mb-4">
            Esta aplicação é otimizada para telas maiores. Para uma melhor
            experiência, utilize um dispositivo com tela maior{" "}
            <span className="font-semibold">
              (largura mínima recomendada: 1024px)
            </span>
            .
          </p>
          <Link href={backUrl}>
            <Button variant="destructive">Voltar</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
