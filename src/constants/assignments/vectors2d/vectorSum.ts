import { useScene2DStore } from "@/store/scene2DStore";
import { Assignment, AssignmentType } from "@/types/Assignment";
import { vec } from "mafs";

export const vectorSumAssignment: Assignment = {
  id: "vector-sum",
  title: "Soma de vetores",
  instructions: "Ajuste os vetores a e b para que a soma deles seja o vetor c",
  order: 3,
  type: AssignmentType.INTERACTIVE,
  setup: () => {
    const { setVectors } = useScene2DStore.getState();
    setVectors([
      {
        id: "a",
        tail: [-2, 1],
        tip: [-4, 3],
        label: "a",
        tipMovable: true,
        tailMovable: true,
      },
      {
        id: "b",
        tail: [1, 4],
        tip: [3, 5],
        label: "b",
        tipMovable: true,
        tailMovable: true,
      },
      {
        id: "c",
        tail: [0, 0],
        tip: [5, 2],
        label: "c",
      },
    ]);
  },
  validate: () => {
    const { getVector } = useScene2DStore.getState();
    const a = getVector("a");
    const b = getVector("b");
    const c = getVector("c");
    if (!a || !b || !c) return false;

    const vecA = vec.sub(a.tip, a.tail);
    const vecB = vec.sub(b.tip, b.tail);
    const vecC = vec.sub(c.tip, c.tail);

    const sum = vec.add(vecA, vecB);
    const isCorrect = vecC[0] === sum[0] && vecC[1] === sum[1];

    return isCorrect;
  },
};
