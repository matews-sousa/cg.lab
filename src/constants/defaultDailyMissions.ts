export type SubjectCategories =
  | "points"
  | "vector-basics"
  | "vector-sum"
  | "vector-scalar"
  | "vector-length"
  | "translation-matrix"
  | "rotation-matrix"
  | "scaling-matrix";

export type DailyMission = {
  id: string;
  title: string;
  target: number;
  subjectCategory: SubjectCategories;
};

export const defaultDailyMissions: DailyMission[] = [
  {
    id: "complete-5-exercises-on-points",
    title: "Complete 5 exercícios sobre Pontos",
    target: 5,
    subjectCategory: "points",
  },
  {
    id: "complete-5-exercises-on-vector-basics",
    title: "Complete 5 exercícios sobre o Básico de Vetores",
    target: 5,
    subjectCategory: "vector-basics",
  },
  {
    id: "complete-5-exercises-on-vector-sum",
    title: "Complete 5 exercícios sobre Soma de Vetores",
    target: 5,
    subjectCategory: "vector-sum",
  },
  {
    id: "complete-5-exercises-on-vector-scalar",
    title: "Complete 5 exercícios sobre Vetores Escalares",
    target: 5,
    subjectCategory: "vector-scalar",
  },
  {
    id: "complete-5-exercises-on-vector-length",
    title: "Complete 5 exercícios sobre o Comprimento de Vetores",
    target: 5,
    subjectCategory: "vector-length",
  },
  {
    id: "complete-5-exercises-on-translation-matrix",
    title: "Complete 5 exercícios sobre Matriz de Translação",
    target: 5,
    subjectCategory: "translation-matrix",
  },
  {
    id: "complete-5-exercises-on-rotation-matrix",
    title: "Complete 5 exercícios sobre Matriz de Rotação",
    target: 5,
    subjectCategory: "rotation-matrix",
  },
  {
    id: "complete-5-exercises-on-scaling-matrix",
    title: "Complete 5 exercícios sobre Matriz de Escala",
    target: 5,
    subjectCategory: "scaling-matrix",
  },
];
