import { Assignment } from "@/types/Assignment";
import { matricesAssignments } from "./matrices";
import { matrices3dAssignments } from "./matrices3d";
import { pointsAssignments } from "./points2d";
import { vectorAssignments } from "./vectors2d";

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

export { subjects };
