"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
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
    </>
  );
}
