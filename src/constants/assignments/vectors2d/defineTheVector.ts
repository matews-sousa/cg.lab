import { useFillInTheBlankStore } from "@/store/fillInTheBlankStore";
import { useScene2DStore } from "@/store/scene2DStore";
import { Assignment, AssignmentType } from "@/types/Assignment";

export const defineTheVectorAssignment: Assignment = {
  id: "define-the-vector",
  title: "Defina o vetor",
  instructions: "Defina o vetor v que vai de A a B",
  order: 2,
  type: AssignmentType.FILL_IN_THE_BLANK_COORDINATES,
  setup: () => {
    const { setPoints, setVectors } = useScene2DStore.getState();
    setPoints([
      {
        id: "A",
        position: [1, 2],
        label: "A",
        movable: false,
        color: "red",
      },
      {
        id: "B",
        position: [4, 3],
        label: "B",
        movable: false,
        color: "red",
      },
    ]);

    setVectors([
      {
        id: "v",
        tail: [1, 2],
        tip: [4, 3],
        label: "v",
      },
    ]);

    useFillInTheBlankStore.getState().setInputs([
      {
        dimention: "2D",
        coordinatesValue: { x: "", y: "", z: "" },
        pointRef: "v",
        label: "v",
      },
    ]);
  },
  validate: () => {
    const { getInputByPointRef } = useFillInTheBlankStore.getState();
    const v = getInputByPointRef("v");
    const isCorrect =
      v?.coordinatesValue.x === 3 && v?.coordinatesValue.y === 1;
    return isCorrect;
  },
};
