import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";

export default function SubjectPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 md:gap-16">
      <Card className="mb-4 md:mb-0">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Pontos 2D</CardTitle>
          <CardDescription>
            Aprenda os conceitos básicos de pontos num plano 2D.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>3/15 exercícios</p>
        </CardContent>
      </Card>
      <div>
        <Link href="assignment">
          <Button>Conheça os Pontos</Button>
        </Link>
      </div>
    </div>
  );
}
