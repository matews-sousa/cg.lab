import { useScene2DStore } from "@/store/scene2DStore";
import { Assignment, AssignmentType } from "@/types/Assignment";

export const changeTheVectorAssignment: Assignment = {
  id: "change-the-vector",
  order: 1,
  title: "Mude o vetor",
  instructions: "Transforme o vetor A num vetor (3, 2).",
  type: AssignmentType.INTERACTIVE,
  setup: () => {
    useScene2DStore.getState().reset();
    const { setVectors } = useScene2DStore.getState();
    setVectors([
      {
        id: "A",
        tail: [0, 0],
        tip: [-1, 2],
        tailMovable: true,
        tipMovable: true,
        color: "red",
        label: "A",
      },
    ]);
  },
  validate: () => {
    const { getVector } = useScene2DStore.getState();
    const vector = getVector("A");
    if (!vector) return false;

    return vector.tip[0] === 3 && vector.tip[1] === 2;
  },
};
