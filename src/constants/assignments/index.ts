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
  generateRandomVectorAssignment,
  generateVectorFillInAssignment,
  generateVectorSumAssignment,
  generateVectorSumFillInAssignment,
  generateVectorTransformationAssignment,
} from "./generateRandomVectorsAssignment";
import {
  generate2DFillInTranslationMatrixAssignment,
  generate2DFillInTranslationMatrixForSquareAssignment,
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

const subjects: Subject[] = [
  {
    title: "Pontos 2D",
    description: "Aprenda os conceitos básicos de pontos num plano 2D.",
    slug: "points2d",
    assignments: pointsAssignments,
    type: "2D",
  },
  {
    title: "Vetores 2D",
    description: "Aprenda os conceitos básicos de vetores num plano 2D.",
    slug: "vectors2d",
    assignments: vectorAssignments,
    type: "2D",
  },
  {
    title: "Matrizes 2D",
    description:
      "Aprenda os conceitos básicos de matrizes aplicadas em objetos 2D.",
    slug: "matrices2d",
    assignments: matricesAssignments,
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

export const generateAnyRandomAssignment = () => {
  const generators = [
    generateRandomMoveToPositionPointAssignment,
    generateRandomWhichPositionPointAssignment,
    generateRandomFillInTheBlankWithOptionsPointAssignment,
    generateRandomVectorAssignment,
    generateVectorFillInAssignment,
    generateVectorSumAssignment,
    generateVectorSumFillInAssignment,
    generateVectorTransformationAssignment,
    generate2DFillInTranslationMatrixAssignment,
    generate2DFillInTranslationMatrixForSquareAssignment,
    generate2DScaleMatrixAssignment,
    generate2DTranslationMatrixAssignment,
  ];
  return generators[Math.floor(Math.random() * generators.length)]();
};

export { subjects };
