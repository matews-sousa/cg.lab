import { useScene2DStore } from "@/store/scene2DStore";
import { Assignment, AssignmentType } from "@/types/Assignment";
import { vec } from "mafs";

export const vectorLengthAssignment: Assignment = {
  id: "vector-length",
  title: "Comprimento do Vetor",
  instructions: "Ajuste o vetor para que tenha comprimento 2",
  type: AssignmentType.INTERACTIVE,
  order: 1,
  setup() {
    const { addVector } = useScene2DStore.getState();
    addVector({
      id: "a",
      tail: [0, 0],
      tip: [1, 1],
      color: "blue",
      label: "a",
      tailMovable: true,
      tipMovable: true,
    });
  },
  validate() {
    const { getVector } = useScene2DStore.getState();
    const aVec = getVector("a");
    if (!aVec) return false;
    const vector = vec.sub(aVec.tip, aVec.tail);
    const calculatedLength = Math.sqrt(vector[0] ** 2 + vector[1] ** 2);
    return calculatedLength === 2;
  },
};
