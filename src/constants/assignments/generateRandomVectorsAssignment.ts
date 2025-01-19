import { useFillInTheBlankStore } from "@/store/fillInTheBlankStore";
import { useScene2DStore } from "@/store/scene2DStore";
import { Assignment, AssignmentType } from "@/types/Assignment";
import { vec } from "mafs";

const COORDINATE_LIMITS = [-4, 4] as const;

function getRandomIntInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomVector(range: readonly [number, number]): [number, number] {
  // make sure the vector is not the zero vector
  let x, y;
  do {
    x = getRandomIntInRange(range[0], range[1]);
    y = getRandomIntInRange(range[0], range[1]);
  } while (x === 0 && y === 0);
  return [x, y];
}

function getRandomVectorWithTailAndTip(range: readonly [number, number]): {
  tail: [number, number];
  tip: [number, number];
} {
  // make sure the vector tail and tip are not the same
  let tail, tip;
  do {
    tail = getRandomVector(range);
    tip = getRandomVector(range);
  } while (tail[0] === tip[0] && tail[1] === tip[1]);
  return { tail, tip };
}

interface RandomAssignmentGenerated extends Assignment {
  dimensions: "2D" | "3D";
}

const generateAssignmentId = (prefix: string): string =>
  `${prefix}-${Math.random().toString(36).substring(7)}`;

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
  setup,
  validate,
}: {
  title: string;
  instructions: string;
  type: AssignmentType;
  setup: () => void;
  validate: () => boolean;
}): RandomAssignmentGenerated {
  return {
    id: generateAssignmentId("vector-assignment"),
    dimensions: "2D",
    order: Math.floor(Math.random() * 100),
    title,
    instructions,
    type: type,
    setup,
    validate,
  };
}

// Assignment Generators
export function generateVectorTransformationAssignment(): RandomAssignmentGenerated {
  const targetVector = getRandomVector(COORDINATE_LIMITS);
  const initialVector = getRandomVectorWithTailAndTip(COORDINATE_LIMITS);

  return createVectorAssignment({
    title: "Transforme o vetor",
    type: AssignmentType.INTERACTIVE,
    instructions: `Transforme o vetor a em (${targetVector[0]}, ${targetVector[1]}).`,
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

export function generateVectorSumAssignment(): RandomAssignmentGenerated {
  const a = getRandomVectorWithTailAndTip(COORDINATE_LIMITS);
  const b = getRandomVectorWithTailAndTip(COORDINATE_LIMITS);
  const targetVector = getRandomVector(COORDINATE_LIMITS);

  return createVectorAssignment({
    title: "Some os vetores",
    instructions: `Mude os vetores a e b para que a soma deles seja (${targetVector[0]}, ${targetVector[1]}).`,
    type: AssignmentType.INTERACTIVE,
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

export function generateVectorFillInAssignment(): RandomAssignmentGenerated {
  const vector = getRandomVectorWithTailAndTip(COORDINATE_LIMITS);

  return createVectorAssignment({
    title: "Preencha o vetor",
    type: AssignmentType.FILL_IN_THE_BLANK_COORDINATES,
    instructions: "Preencha o vetor com os valores corretos.",
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

export function generateVectorSumFillInAssignment(): RandomAssignmentGenerated {
  const a = getRandomVectorWithTailAndTip(COORDINATE_LIMITS);
  const b = getRandomVectorWithTailAndTip(COORDINATE_LIMITS);

  return createVectorAssignment({
    title: "Preencha a soma dos vetores",
    type: AssignmentType.FILL_IN_THE_BLANK_COORDINATES,
    instructions: "Qual é a soma dos vetores a e b?.",
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

export function genereateRandomVectorAssignment(): RandomAssignmentGenerated {
  const assignmentGenerators = [
    generateVectorTransformationAssignment,
    generateVectorSumAssignment,
    generateVectorFillInAssignment,
    generateVectorSumFillInAssignment,
  ];

  const randomIndex = Math.floor(Math.random() * assignmentGenerators.length);
  return assignmentGenerators[randomIndex]();
}
