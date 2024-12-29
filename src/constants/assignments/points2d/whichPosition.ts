import { useFillInTheBlankStore } from "@/store/fillInTheBlankStore";
import { useScene2DStore } from "@/store/scene2DStore";
import { Assignment, AssignmentType } from "@/types/Assignment";

export const whichPositionAssignment: Assignment = {
  id: "which-position",
  order: 4,
  title: "Qual a posição?",
  instructions: "Qual a posição do ponto A?",
  type: AssignmentType.FILL_IN_THE_BLANK_COORDINATES,
  setup: () => {
    const { setPoints } = useScene2DStore.getState();
    setPoints([
      {
        id: "A",
        position: [-2, 2],
        movable: false,
        color: "red",
        label: "A",
        constraints: {
          roundCoordinates: true,
        },
      },
    ]);

    useFillInTheBlankStore.getState().setInputs([
      {
        dimention: "2D",
        pointRef: "A",
        coordinatesValue: { x: "", y: "" },
      },
    ]);
  },
  validate: () => {
    const { getInputByPointRef } = useFillInTheBlankStore.getState();
    const input = getInputByPointRef("A");
    if (!input) return false;
    const coordinates = input.coordinatesValue;
    const isCorrect = coordinates?.x === -2 && coordinates.y === 2;
    useFillInTheBlankStore.getState().reset();
    return isCorrect;
  },
};
