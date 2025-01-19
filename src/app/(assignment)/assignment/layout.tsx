"use client";

import React, { useEffect, useLayoutEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AssingmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [backUrl, setBackUrl] = useState("/");

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const slug = window.location.pathname.split("/")[2];
    const url =
      slug === "random" || typeof slug === "undefined"
        ? "/"
        : `/subject/${slug}`;
    setBackUrl(url);
  }, []);

  return (
    <>
      <Link href={backUrl}>
        <Button
          className="absolute top-4 left-4 rounded-full w-14 h-14 z-50"
          variant="destructive"
        >
          <ArrowLeft className="w-12 h-12" />
        </Button>
      </Link>

      {children}
    </>
  );
}
