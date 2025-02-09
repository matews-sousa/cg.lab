import { useFillInTheBlankStore } from "@/store/fillInTheBlankStore";
import { useScene2DStore } from "@/store/scene2DStore";
import { Assignment, AssignmentType } from "@/types/Assignment";

interface WhichPositionCoordsInputAssignment {
  order: number;
  title: string;
  instructions: string;
  pointPosition: [number, number];
}

function createWhichPositionCoordsInputsAssignment({
  order,
  title,
  instructions,
  pointPosition,
}: WhichPositionCoordsInputAssignment): Assignment {
  return {
    id: `which-position-${order}`,
    order,
    title,
    instructions,
    type: AssignmentType.FILL_IN_THE_BLANK_COORDINATES,
    subjectCategory: "points",
    setup: () => {
      const { setPoints } = useScene2DStore.getState();
      setPoints([
        {
          id: "A",
          position: pointPosition,
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
          label: "A",
          coordinatesValue: { x: "", y: "" },
        },
      ]);
    },
    validate: () => {
      const { getInputByPointRef } = useFillInTheBlankStore.getState();
      const input = getInputByPointRef("A");
      if (!input) return false;
      const coordinates = input.coordinatesValue;
      const inputX = Number(coordinates.x);
      const inputY = Number(coordinates.y);
      const isCorrect =
        inputX === pointPosition[0] && inputY === pointPosition[1];
      useFillInTheBlankStore.getState().reset();
      return isCorrect;
    },
  };
}

const whichPositionAssignments = [
  {
    order: 7,
    title: "Qual a posição do ponto?",
    instructions: "Qual a posição do ponto A?",
    pointPosition: [-2, 2] as [number, number],
  },
  {
    order: 8,
    title: "Qual a posição do ponto? 2",
    instructions: "Qual a posição do ponto A?",
    pointPosition: [3, -4] as [number, number],
  },
];

export const whichPositionAssignmentList = whichPositionAssignments.map(
  assignment =>
    createWhichPositionCoordsInputsAssignment({
      ...assignment,
    })
);
