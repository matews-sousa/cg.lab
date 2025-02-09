import { useFillInTheBlankStore } from "@/store/fillInTheBlankStore";
import { useScene2DStore } from "@/store/scene2DStore";
import { Assignment, AssignmentType } from "@/types/Assignment";
import { vec } from "mafs";

interface InsertVectorSumAssignmentProps {
  order: number;
  title: string;
  instructions: string;
  vectorATail: [number, number];
  vectorATip: [number, number];
  vectorBTail: [number, number];
  vectorBTip: [number, number];
}

function createInsertVectorSumAssignment({
  order,
  title,
  instructions,
  vectorATail,
  vectorATip,
  vectorBTail,
  vectorBTip,
}: InsertVectorSumAssignmentProps): Assignment {
  return {
    id: `insert-vector-sum-${order}`,
    title,
    instructions,
    order,
    type: AssignmentType.FILL_IN_THE_BLANK_COORDINATES,
    subjectCategory: "vector-sum",
    setup: () => {
      const { setVectors } = useScene2DStore.getState();
      setVectors([
        {
          id: "a",
          tail: vectorATail,
          tip: vectorATip,
          label: "a",
        },
        {
          id: "b",
          tail: vectorBTail,
          tip: vectorBTip,
          label: "b",
        },
      ]);

      useFillInTheBlankStore.getState().setInputs([
        {
          dimention: "2D",
          pointRef: "c",
          label: "c",
          coordinatesValue: { x: "", y: "" },
        },
      ]);
    },
    validate: () => {
      const { getVector, addVector } = useScene2DStore.getState();
      const { getInputByPointRef } = useFillInTheBlankStore.getState();
      const a = getVector("a");
      const b = getVector("b");
      const input = getInputByPointRef("c");
      if (!a || !b || !input) return false;

      const vecA = vec.sub(a.tip, a.tail);
      const vecB = vec.sub(b.tip, b.tail);

      const sum = vec.add(vecA, vecB);
      const inputX = Number(input.coordinatesValue.x);
      const inputY = Number(input.coordinatesValue.y);
      const isCorrect = inputX === sum[0] && inputY === sum[1];

      if (isCorrect) {
        addVector({
          id: "c",
          tail: [0, 0],
          tip: sum,
          label: "c",
          color: "green",
        });
      }

      return isCorrect;
    },
  };
}

const insertVectorSumAssignmentsProps: InsertVectorSumAssignmentProps[] = [
  {
    order: 1,
    title: "Some os vetores",
    instructions: "Insira a soma dos vetores a e b.",
    vectorATail: [1, 1],
    vectorATip: [2, 2],
    vectorBTail: [3, 3],
    vectorBTip: [4, 4],
  },
  {
    order: 2,
    title: "Some os vetores",
    instructions: "Insira a soma dos vetores a e b.",
    vectorATail: [0, 0],
    vectorATip: [2, 3],
    vectorBTail: [2, 3],
    vectorBTip: [3, 3],
  },
  {
    order: 3,
    title: "Some os vetores",
    instructions: "Insira a soma dos vetores a e b.",
    vectorATail: [0, 0],
    vectorATip: [2, 2],
    vectorBTail: [2, 2],
    vectorBTip: [0, 4],
  },
  {
    order: 4,
    title: "Some os vetores",
    instructions: "Insira a soma dos vetores a e b.",
    vectorATail: [0, 0],
    vectorATip: [2, 2],
    vectorBTail: [2, 2],
    vectorBTip: [2, 5],
  },
];

export const insertVectorSumAssignmentList =
  insertVectorSumAssignmentsProps.map(createInsertVectorSumAssignment);
