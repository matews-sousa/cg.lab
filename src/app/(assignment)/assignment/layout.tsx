"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AssingmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [backUrl, setBackUrl] = useState("/");

  useEffect(() => {
    // Access window only on the client
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
