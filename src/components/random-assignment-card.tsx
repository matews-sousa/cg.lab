"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { subjectOptions } from "@/constants/assignments";
import { MultiSelect } from "./multi-select";

const initialSelectedSubjects = subjectOptions
  .filter(subject => subject.generators.length > 0)
  .map(subject => subject.id);

export default function RandomAssignmentCard() {
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(
    initialSelectedSubjects
  );

  // Generate the URL with selected subjects as query parameters
  const generateRandomAssignmentUrl = () => {
    const params = new URLSearchParams();
    selectedSubjects.forEach(subject => params.append("subjects", subject));
    return `/assignment/random?${params.toString()}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Treine com Exercícios Aleatórios!
        </CardTitle>
        <CardDescription>
          Aqui você pode praticar com exercícios gerados aleatoriamente.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <MultiSelect
            className="mb-4"
            options={subjectOptions.map(subject => ({
              label: subject.label,
              value: subject.id,
            }))}
            onValueChange={setSelectedSubjects}
            value={selectedSubjects}
            defaultValue={initialSelectedSubjects}
            placeholder="Selecione os assuntos"
          />
          {/* Start button with dynamic URL */}
          <Link
            href={generateRandomAssignmentUrl()}
            className={`${
              selectedSubjects.length === 0 ? "pointer-events-none" : ""
            }`}
          >
            <Button className="w-full" disabled={selectedSubjects.length === 0}>
              Começar
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
