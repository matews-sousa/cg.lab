"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { subjects } from "@/constants/assignments";
import { AssignmentType } from "@/types/Assignment";
import { useQuery } from "convex/react";
import {
  BadgeCheck,
  BringToFront,
  Grab,
  LayoutGrid,
  MousePointerSquareDashedIcon,
  Puzzle,
  Radical,
  Space,
  Variable,
} from "lucide-react";
import Link from "next/link";
import React, { use } from "react";
import { api } from "../../../../../convex/_generated/api";
import { SubjectCategories } from "@/constants/defaultDailyMissions";

export default function SubjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const subject = subjects.find(s => s.slug === slug);
  const assignmentsCompletions = useQuery(
    api.assignmentCompletions.getAssignmentCompletionsBySubject,
    {
      subject: slug,
    }
  );

  const assignmentTypeToIcon: Record<AssignmentType, React.ReactElement> = {
    INTERACTIVE: <Grab />,
    FILL_IN_THE_BLANK_COORDINATES: <Puzzle />,
    FILL_IN_THE_BLANK_MATRIX: <LayoutGrid />,
    FILL_IN_THE_BLANK_MATRIX_WITH_OPTIONS: <MousePointerSquareDashedIcon />,
    FILL_IN_THE_BLANK_WITH_OPTIONS: <Space />,
    FILL_IN_THE_BLANK_FORMULA: <Radical />,
    PARAMETERIZED: <Variable />,
    ORDER_MATRIX_MULTIPLICATION: <BringToFront />,
  };

  const mapSubjectCategoryToPortuguese: Record<SubjectCategories, string> = {
    points: "Pontos",
    "vector-definition": "Definição de vetores",
    "vector-sum": "Soma de vetores",
    "vector-scalar": "Multiplicação por escalar",
    "vector-length": "Módulo de vetores",
    "translation-matrix": "Matriz de translação",
    "rotation-matrix": "Matriz de rotação",
    "scaling-matrix": "Matriz de escala",
    "matrix-multiplication": "Multiplicação de matrizes",
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 md:gap-16">
      <Card className="mb-4 md:mb-0 self-start md:sticky top-4 lg:col-span-1">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{subject?.title}</CardTitle>
          <CardDescription>{subject?.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            {assignmentsCompletions?.length ?? "?"}/
            {subject?.assignments.length} exercícios
          </p>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 col-span-2 gap-4">
        {subject?.assignments.map(assignment => (
          <Card key={assignment.id} className="flex flex-col justify-between">
            <CardHeader>
              <CardTitle>
                <div className="flex items-center mb-2">
                  <div className="flex items-center gap-1 p-1 bg-blue-200 border border-blue-300 rounded-md shadow-sm">
                    <p className="text-xs">
                      {
                        mapSubjectCategoryToPortuguese[
                          assignment.subjectCategory
                        ]
                      }
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    {assignmentTypeToIcon[assignment.type]}
                    {assignment.title}
                  </div>
                  {assignmentsCompletions?.some(
                    assi => assi.assignmentId === assignment.id
                  ) && (
                    <div className="flex items-center gap-1 p-1 bg-green-200 border border-green-300 rounded-md shadow-sm">
                      <BadgeCheck size={14} />
                      <p className="text-xs">Completo</p>
                    </div>
                  )}
                </div>
              </CardTitle>
              <CardDescription>{assignment.instructions}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={`/assignment/${subject.slug}/${assignment.id}`}>
                <Button className="w-full">Resolver</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
