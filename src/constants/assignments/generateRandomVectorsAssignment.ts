import { useFillInTheBlankStore } from "@/store/fillInTheBlankStore";
import { useScene2DStore } from "@/store/scene2DStore";
import { AssignmentType, RandomGeneratedAssignment } from "@/types/Assignment";
import {
  generateAssignmentId,
  getRandomVector,
  getRandomVectorWithTailAndTip,
} from "@/utils";
import { vec } from "mafs";
import { SubjectCategories } from "../defaultDailyMissions";

const COORDINATE_LIMITS = [-4, 4] as const;

function setupScene(
  vectors: Array<{
    id: string;
    tail: [number, number];
    tip: [number, number];
    tailMovable: boolean;
    tipMovable: boolean;
    color: string;
    label: string;
  }>
) {
  const { reset, setVectors } = useScene2DStore.getState();
  reset();
  setVectors(vectors);
}

function validateVector(
  inputVector: { x: string; y: string },
  expectedVector: [number, number]
): boolean {
  return (
    Number(inputVector.x) === expectedVector[0] &&
    Number(inputVector.y) === expectedVector[1]
  );
}

// Common Assignment Factory
function createVectorAssignment({
  title,
  instructions,
  type,
  subjectCategory,
  setup,
  validate,
}: {
  title: string;
  instructions: string;
  type: AssignmentType;
  subjectCategory: SubjectCategories;
  setup: () => void;
  validate: () => boolean;
}): RandomGeneratedAssignment {
  return {
    id: generateAssignmentId("vector-assignment"),
    dimensions: "2D",
    order: Math.floor(Math.random() * 100),
    title,
    instructions,
    type,
    subjectCategory,
    setup,
    validate,
  };
}

// Assignment Generators
export function generateVectorTransformationAssignment(): RandomGeneratedAssignment {
  const targetVector = getRandomVector(COORDINATE_LIMITS);
  const initialVector = getRandomVectorWithTailAndTip(COORDINATE_LIMITS);

  return createVectorAssignment({
    title: "Transforme o vetor",
    type: AssignmentType.INTERACTIVE,
    instructions: `Transforme o vetor a em (${targetVector[0]}, ${targetVector[1]}).`,
    subjectCategory: "vector-definition",
    setup: () => {
      setupScene([
        {
          id: "a",
          tail: initialVector.tail,
          tip: initialVector.tip,
          tailMovable: true,
          tipMovable: true,
          color: "blue",
          label: "a",
        },
      ]);
    },
    validate: () => {
      const { getVector } = useScene2DStore.getState();
      const a = getVector("a");
      if (!a) return false;

      const vecA = vec.sub(a.tip, a.tail);
      return vecA[0] === targetVector[0] && vecA[1] === targetVector[1];
    },
  });
}

export function generateVectorSumAssignment(): RandomGeneratedAssignment {
  const a = getRandomVectorWithTailAndTip(COORDINATE_LIMITS);
  const b = getRandomVectorWithTailAndTip(COORDINATE_LIMITS);
  const targetVector = getRandomVector(COORDINATE_LIMITS);

  return createVectorAssignment({
    title: "Some os vetores",
    instructions: `Mude os vetores a e b para que a soma deles seja (${targetVector[0]}, ${targetVector[1]}).`,
    type: AssignmentType.INTERACTIVE,
    subjectCategory: "vector-sum",
    setup: () => {
      setupScene([
        {
          id: "a",
          tail: a.tail,
          tip: a.tip,
          tailMovable: true,
          tipMovable: true,
          color: "blue",
          label: "a",
        },
        {
          id: "b",
          tail: b.tail,
          tip: b.tip,
          tailMovable: true,
          tipMovable: true,
          color: "red",
          label: "b",
        },
      ]);
    },
    validate: () => {
      const { getVector } = useScene2DStore.getState();
      const aVec = getVector("a");
      const bVec = getVector("b");
      if (!aVec || !bVec) return false;

      const vecSum = vec.add(
        vec.sub(aVec.tip, aVec.tail),
        vec.sub(bVec.tip, bVec.tail)
      );
      const isCorrect =
        vecSum[0] === targetVector[0] && vecSum[1] === targetVector[1];
      if (isCorrect) {
        useScene2DStore.getState().addVector({
          id: "c",
          label: "c",
          tail: [0, 0],
          tip: vecSum,
          tailMovable: false,
          tipMovable: false,
          color: "green",
        });
      }
      return isCorrect;
    },
  });
}

export function generateVectorFillInAssignment(): RandomGeneratedAssignment {
  const vector = getRandomVectorWithTailAndTip(COORDINATE_LIMITS);

  return createVectorAssignment({
    title: "Preencha o vetor",
    type: AssignmentType.FILL_IN_THE_BLANK_COORDINATES,
    instructions: "Preencha o vetor com os valores corretos.",
    subjectCategory: "vector-definition",
    setup: () => {
      setupScene([
        {
          id: "a",
          tail: vector.tail,
          tip: vector.tip,
          tailMovable: false,
          tipMovable: false,
          color: "blue",
          label: "a",
        },
      ]);

      const { setInputs } = useFillInTheBlankStore.getState();
      setInputs([
        {
          label: "a",
          dimention: "2D",
          pointRef: "a",
          coordinatesValue: { x: "", y: "" },
        },
      ]);
    },
    validate: () => {
      const { getInputByPointRef } = useFillInTheBlankStore.getState();
      const input = getInputByPointRef("a");
      if (!input) return false;

      const { getVector } = useScene2DStore.getState();
      const a = getVector("a");
      if (!a) return false;
      const userAnswer = {
        x: input.coordinatesValue.x as string,
        y: input.coordinatesValue.y as string,
      };

      return validateVector(userAnswer, vec.sub(a.tip, a.tail));
    },
  });
}

export function generateVectorSumFillInAssignment(): RandomGeneratedAssignment {
  const a = getRandomVectorWithTailAndTip(COORDINATE_LIMITS);
  const b = getRandomVectorWithTailAndTip(COORDINATE_LIMITS);

  return createVectorAssignment({
    title: "Preencha a soma dos vetores",
    type: AssignmentType.FILL_IN_THE_BLANK_COORDINATES,
    instructions: "Qual é a soma dos vetores a e b?.",
    subjectCategory: "vector-sum",
    setup: () => {
      setupScene([
        {
          id: "a",
          tail: a.tail,
          tip: a.tip,
          tailMovable: false,
          tipMovable: false,
          color: "blue",
          label: "a",
        },
        {
          id: "b",
          tail: b.tail,
          tip: b.tip,
          tailMovable: false,
          tipMovable: false,
          color: "red",
          label: "b",
        },
      ]);

      const { setInputs } = useFillInTheBlankStore.getState();
      setInputs([
        {
          label: "c",
          dimention: "2D",
          pointRef: "c",
          coordinatesValue: { x: "", y: "" },
        },
      ]);
    },
    validate: () => {
      const { getInputByPointRef } = useFillInTheBlankStore.getState();
      const input = getInputByPointRef("c");
      if (!input) return false;

      const { getVector } = useScene2DStore.getState();
      const aVec = getVector("a");
      const bVec = getVector("b");
      if (!aVec || !bVec) return false;
      const userAnswer = {
        x: input.coordinatesValue.x as string,
        y: input.coordinatesValue.y as string,
      };

      const vecSum = vec.add(
        vec.sub(aVec.tip, aVec.tail),
        vec.sub(bVec.tip, bVec.tail)
      );
      const isCorrect = validateVector(userAnswer, vecSum);
      if (isCorrect) {
        useScene2DStore.getState().addVector({
          id: "c",
          label: "c",
          tail: [0, 0],
          tip: vecSum,
          tailMovable: false,
          tipMovable: false,
          color: "green",
        });
      }

      return isCorrect;
    },
  });
}

export function generateRandomVectorAssignment(): RandomGeneratedAssignment {
  const assignmentGenerators = [
    generateVectorTransformationAssignment,
    generateVectorSumAssignment,
    generateVectorFillInAssignment,
    generateVectorSumFillInAssignment,
  ];

  const randomIndex = Math.floor(Math.random() * assignmentGenerators.length);
  return assignmentGenerators[randomIndex]();
}
