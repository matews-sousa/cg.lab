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
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

// List of available subjects
const subjects = [
  { id: "points", label: "Pontos" },
  { id: "vectors", label: "Vetores" },
  { id: "matrices", label: "Matrizes" },
];

export default function RandomAssignmentCard() {
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([
    "points",
    "vectors",
    "matrices",
  ]);

  // Handle checkbox changes
  const handleSubjectChange = (subjectId: string) => {
    setSelectedSubjects(
      prev =>
        prev.includes(subjectId)
          ? prev.filter(id => id !== subjectId) // Remove if already selected
          : [...prev, subjectId] // Add if not selected
    );
  };

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
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button size="icon" variant="outline">
                <Settings />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <div className="space-y-2 mb-2">
                <Label>Selecione os assuntos:</Label>
                {subjects.map(subject => (
                  <div key={subject.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={subject.id}
                      checked={selectedSubjects.includes(subject.id)}
                      onCheckedChange={() => handleSubjectChange(subject.id)}
                    />
                    <Label htmlFor={subject.id}>{subject.label}</Label>
                  </div>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardTitle>
        <CardDescription>
          Aqui você pode praticar com exercícios gerados aleatoriamente.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Subject selection checkboxes */}

          {/* Start button with dynamic URL */}
          <Link href={generateRandomAssignmentUrl()}>
            <Button className="w-full" disabled={selectedSubjects.length === 0}>
              Começar
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
