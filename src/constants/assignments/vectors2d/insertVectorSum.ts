import { useFillInTheBlankStore } from "@/store/fillInTheBlankStore";
import { useScene2DStore } from "@/store/scene2DStore";
import { Assignment, AssignmentType } from "@/types/Assignment";
import { vec } from "mafs";

export const insertVectorSumAssignment: Assignment = {
  id: "insert-vector-sum",
  title: "Some os vetores",
  instructions: "Qual o vetor que resulta da soma dos vetores a e b?",
  order: 4,
  type: AssignmentType.FILL_IN_THE_BLANK_COORDINATES,
  setup: () => {
    const { setVectors } = useScene2DStore.getState();
    setVectors([
      {
        id: "a",
        tail: [0, 0],
        tip: [-4, 4],
        label: "a",
      },
      {
        id: "b",
        tail: [-4, 4],
        tip: [-6, 2],
        label: "b",
      },
    ]);

    useFillInTheBlankStore.getState().setInputs([
      {
        dimention: "2D",
        pointRef: "c",
        coordinatesValue: { x: 0, y: 0 },
      },
    ]);
  },
  validate: () => {
    const { getVector } = useScene2DStore.getState();
    const { getInputByPointRef } = useFillInTheBlankStore.getState();
    const a = getVector("a");
    const b = getVector("b");
    const input = getInputByPointRef("c");
    if (!a || !b || !input) return false;

    const vecA = vec.sub(a.tip, a.tail);
    const vecB = vec.sub(b.tip, b.tail);

    const sum = vec.add(vecA, vecB);
    const isCorrect =
      input.coordinatesValue.x === sum[0] &&
      input.coordinatesValue.y === sum[1];

    return isCorrect;
  },
};
