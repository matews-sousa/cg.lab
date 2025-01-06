import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <nav className="shadow-md border-b">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center p-4">
        <Link href="/" className="text-2xl font-bold">
          CG.lab
        </Link>
        <Button>Entrar</Button>
      </div>
    </nav>
  );
}
