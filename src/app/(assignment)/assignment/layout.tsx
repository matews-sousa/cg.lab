import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AssingmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="overflow-y-hidden relative">
      <Link href="subject">
        <Button
          className="absolute top-4 right-4 rounded-full"
          variant="destructive"
          size="icon"
        >
          <ArrowLeft />
        </Button>
      </Link>

      {children}
    </html>
  );
}
