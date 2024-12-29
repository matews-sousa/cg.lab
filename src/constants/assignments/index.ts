import { matricesAssignments } from "./matrices";
import { pointsAssignments } from "./points2d";
import { vectorAssignments } from "./vectors2d";

const subjects = [
  {
    title: "Pontos 2D",
    description: "Aprenda os conceitos básicos de pontos num plano 2D.",
    slug: "points2d",
    assignments: pointsAssignments,
  },
  {
    title: "Vetores 2D",
    description: "Aprenda os conceitos básicos de vetores num plano 2D.",
    slug: "vectors2d",
    assignments: vectorAssignments,
  },
  {
    title: "Matrizes",
    description: "Aprenda os conceitos básicos de matrizes.",
    slug: "matrices",
    assignments: matricesAssignments,
  },
];

export { subjects };
