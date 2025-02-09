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

export const generateAnyRandomAssignment = (selectedSubjects: string[]) => {
  // Define generators for each subject
  const pointGenerators = [
    generateRandomMoveToPositionPointAssignment,
    generateRandomWhichPositionPointAssignment,
    generateRandomFillInTheBlankWithOptionsPointAssignment,
  ];

  const vectorGenerators = [
    generateRandomVectorAssignment,
    generateVectorFillInAssignment,
    generateVectorSumAssignment,
    generateVectorSumFillInAssignment,
    generateVectorTransformationAssignment,
  ];

  const matrixGenerators = [
    generate2DFillInTranslationMatrixAssignment,
    generate2DFillInTranslationMatrixForSquareAssignment,
    generate2DScaleMatrixAssignment,
    generate2DTranslationMatrixAssignment,
  ];

  // Combine generators based on selected subjects
  const generators = selectedSubjects.flatMap(subject => {
    if (subject === "points") {
      return pointGenerators;
    } else if (subject === "vectors") {
      return vectorGenerators;
    } else if (subject === "matrices") {
      return matrixGenerators;
    }
    return []; // Return an empty array for unknown subjects
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
