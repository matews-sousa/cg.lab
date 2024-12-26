import { useScene2DStore } from "@/store/scene2DStore";
import { Assignment, AssignmentType } from "@/types/Assignment";
import { vec } from "mafs";

export const changeTheVectorAssignment: Assignment = {
  id: "change-the-vector",
  order: 1,
  title: "Mude o vetor",
  instructions: "Transforme o vetor a num vetor (3, 2).",
  type: AssignmentType.INTERACTIVE,
  setup: () => {
    useScene2DStore.getState().reset();
    const { setVectors } = useScene2DStore.getState();
    setVectors([
      {
        id: "a",
        tail: [0, 0],
        tip: [-1, 2],
        tailMovable: true,
        tipMovable: true,
        color: "red",
        label: "a",
      },
    ]);
  },
  validate: () => {
    const { getVector } = useScene2DStore.getState();
    const a = getVector("a");
    if (!a) return false;

    const vecA = vec.sub(a.tip, a.tail);
    const isCorrect = vecA[0] === 3 && vecA[1] === 2;
    return isCorrect;
  },
};
