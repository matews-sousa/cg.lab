import { useFillInTheBlankStore } from "@/store/fillInTheBlankStore";
import { useScene2DStore } from "@/store/scene2DStore";
import { Assignment, AssignmentType } from "@/types/Assignment";

export const pointDisplacementAssignment: Assignment = {
  id: "point-displacement",
  title: "Deslocamento de Ponto",
  instructions:
    "Descreva o vetor de deslocamento que leva o ponto A para a posição (2, 3).",
  order: 5,
  type: AssignmentType.FILL_IN_THE_BLANK_COORDINATES,
  setup: () => {
    const { setPoints } = useScene2DStore.getState();
    setPoints([
      {
        id: "A",
        label: "A",
        position: [-1, 2],
        movable: false,
        color: "red",
      },
    ]);

    const { setInputs } = useFillInTheBlankStore.getState();
    setInputs([
      {
        dimention: "2D",
        coordinatesValue: { x: "", y: "" },
        pointRef: "A",
        label: "v",
      },
    ]);
  },
  validate: () => {
    const { getInputByPointRef } = useFillInTheBlankStore.getState();
    const { setVectors } = useScene2DStore.getState();
    const vector = getInputByPointRef("A");
    if (!vector) return false;

    const { x, y } = vector.coordinatesValue;
    if (x === 3 && y === 1) {
      setVectors([
        {
          id: "displacement-vector",
          tail: [-1, 2],
          tip: [2, 3],
          color: "blue",
          label: "v",
        },
      ]);
      return true;
    }

    return false;
  },
};
