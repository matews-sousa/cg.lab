"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AssingmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const slug = window && window.location.pathname.split("/")[2];

  return (
    <>
      <Link href={`/subject/${slug}`}>
        <Button
          className="absolute top-4 left-4 rounded-full w-14 h-14"
          variant="destructive"
        >
          <ArrowLeft className="w-12 h-12" />
        </Button>
      </Link>

      {children}
    </>
  );
}
