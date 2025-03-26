import { Assignment } from "@/types/Assignment";
import { matricesAssignments } from "./matrices";
import { matrices3dAssignments } from "./matrices3d";
import { pointsAssignments } from "./points2d";
import { vectorAssignments } from "./vectors2d";
import {
  generateRandomFillInTheBlankWithOptionsPointAssignment,
  generateRandomMoveToPositionPointAssignment,
  generateRandomWhichPositionPointAssignment,
} from "./generateRandomPointsAssignment";
import {
  generateVectorFillInAssignment,
  generateVectorSumAssignment,
  generateVectorSumFillInAssignment,
  generateVectorTransformationAssignment,
} from "./generateRandomVectorsAssignment";
import {
  generate2DFillInTranslationMatrixAssignment,
  generate2DFillInTranslationMatrixForSquareAssignment,
  generate2DMatrixMultiplicationSortingAssignment,
  generate2DScaleMatrixAssignment,
  generate2DTranslationMatrixAssignment,
} from "./generateRandom2DMatricesAssignment";

export type Subject = {
  title: string;
  description: string;
  slug: string;
  assignments: Assignment[];
  type: "2D" | "3D";
};

// Static subjects with their assignments
const subjects: Subject[] = [
  {
    title: "Pontos 2D",
    description: "Aprenda os conceitos básicos de pontos num plano 2D.",
    slug: "points2d",
    assignments: pointsAssignments,
    type: "2D",
  },
  {
    title: "Básico de Vetores",
    description: "Aprenda os conceitos básicos de vetores num plano 2D.",
    slug: "vector-basics",
    assignments: vectorAssignments.filter(
      assi => assi.subjectCategory === "vector-basics"
    ),
    type: "2D",
  },
  {
    title: "Soma de Vetores",
    description: "Aprenda a somar vetores num plano 2D.",
    slug: "vector-sum",
    assignments: vectorAssignments.filter(
      assi => assi.subjectCategory === "vector-sum"
    ),
    type: "2D",
  },
  {
    title: "Multiplicação por Escalar",
    description: "Aprenda a multiplicar vetores por escalares.",
    slug: "vector-scalar",
    assignments: vectorAssignments.filter(
      assi => assi.subjectCategory === "vector-scalar"
    ),
    type: "2D",
  },
  {
    title: "Módulo de Vetores",
    description: "Aprenda a calcular o módulo de vetores.",
    slug: "vector-length",
    assignments: vectorAssignments.filter(
      assi => assi.subjectCategory === "vector-length"
    ),
    type: "2D",
  },
  {
    title: "Matriz de Translação",
    description: "Aprenda a criar matrizes de translação 2D.",
    slug: "translation-matrix",
    assignments: matricesAssignments.filter(
      assi => assi.subjectCategory === "translation-matrix"
    ),
    type: "2D",
  },
  {
    title: "Matriz de Escala",
    description: "Aprenda a criar matrizes de escala 2D.",
    slug: "scaling-matrix",
    assignments: matricesAssignments.filter(
      assi => assi.subjectCategory === "scaling-matrix"
    ),
    type: "2D",
  },
  {
    title: "Matriz de Rotação",
    description: "Aprenda a criar matrizes de rotação 2D.",
    slug: "rotation-matrix",
    assignments: matricesAssignments.filter(
      assi => assi.subjectCategory === "rotation-matrix"
    ),
    type: "2D",
  },
  {
    title: "Multiplicação de Matrizes",
    description: "Aprenda a multiplicar matrizes 2D.",
    slug: "matrix-multiplication",
    assignments: matricesAssignments.filter(
      assi => assi.subjectCategory === "matrix-multiplication"
    ),
    type: "2D",
  },
  {
    title: "Matrizes 3D",
    description:
      "Aprenda os conceitos básicos de matrizes aplicadas em objetos 3D.",
    slug: "matrices3d",
    assignments: matrices3dAssignments,
    type: "3D",
  },
];

// Subject options for the dropdown menu with their generators
export const subjectOptions = [
  {
    id: "points",
    label: "Pontos",
    generators: [
      generateRandomMoveToPositionPointAssignment,
      generateRandomWhichPositionPointAssignment,
      generateRandomFillInTheBlankWithOptionsPointAssignment,
    ],
  },
  {
    id: "vector-basics",
    label: "Básico de vetores",
    generators: [
      generateVectorFillInAssignment,
      generateVectorTransformationAssignment,
    ],
  },
  {
    id: "vector-sum",
    label: "Soma de vetores",
    generators: [
      generateVectorSumAssignment,
      generateVectorSumFillInAssignment,
    ],
  },
  {
    id: "scalar-multiplication",
    label: "Multiplicação por escalar",
    generators: [],
  },
  { id: "vector-length", label: "Módulo de vetores", generators: [] },
  {
    id: "translation-matrix",
    label: "Matriz de translação",
    generators: [
      generate2DTranslationMatrixAssignment,
      generate2DFillInTranslationMatrixAssignment,
      generate2DFillInTranslationMatrixForSquareAssignment,
    ],
  },
  {
    id: "scale-matrix",
    label: "Matriz de escala",
    generators: [generate2DScaleMatrixAssignment],
  },
  {
    id: "rotation-matrix",
    label: "Matriz de rotação",
    generators: [],
  },
  {
    id: "matrix-multiplication",
    label: "Multiplicação de matrizes",
    generators: [generate2DMatrixMultiplicationSortingAssignment],
  },
] as const;

export type SubjectOptionsKey = (typeof subjectOptions)[number]["id"];

export const generateAnyRandomAssignment = (
  selectedSubjects: SubjectOptionsKey[]
) => {
  // Combine generators based on selected subjects
  const generators = selectedSubjects.flatMap(subject => {
    const subjectOption = subjectOptions.find(s => s.id === subject);
    return subjectOption?.generators ?? [];
  });

  // Check if there are any generators available
  if (generators.length === 0) {
    throw new Error("No generators found for the selected subjects.");
  }

  // Select a random generator and execute it
  const randomGenerator =
    generators[Math.floor(Math.random() * generators.length)];
  return randomGenerator();
};

export { subjects };
