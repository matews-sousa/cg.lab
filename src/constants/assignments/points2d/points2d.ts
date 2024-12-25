import { useFillInTheBlankStore } from "@/store/fillInTheBlankStore";
import { useScene2DStore } from "@/store/scene2DStore";

export enum AssignmentType {
  INTERACTIVE = "INTERACTIVE",
  PARAMETERIZED = "PARAMETERIZED",
  REORDER = "REORDER",
  FILL_IN_THE_BLANK_COORDINATES = "FILL_IN_THE_BLANK_COORDINATES",
  FILL_IN_THE_BLANK_FORMULA = "FILL_IN_THE_BLANK_FORMULA",
  FILL_IN_THE_BLANK_MATRIX = "FILL_IN_THE_BLANK_MATRIX",
}

export interface Assignment {
  id: string;
  order: number;
  title: string;
  instructions: string;
  type: AssignmentType;
  setup: () => void;
  validate: () => boolean;
}

export const movePointAssignment: Assignment = {
  id: "move-point",
  order: 1,
  title: "Mova o ponto",
  instructions: "Mova o ponto A para a posição (3, 2).",
  type: AssignmentType.INTERACTIVE,
  setup: () => {
    const { setPoints } = useScene2DStore.getState();
    setPoints([
      {
        id: "A",
        position: [0, 0],
        movable: true,
        color: "red",
        label: "A",
        constraints: {
          roundCoordinates: true,
        },
      },
    ]);
  },
  validate: () => {
    const { getPoint } = useScene2DStore.getState();
    const point = getPoint("A");
    if (!point) return false;

    return point.position[0] === 3 && point.position[1] === 2;
  },
};

export const perpendicularAssignment: Assignment = {
  id: "perpendicular-point",
  order: 2,
  title: "Perpendicularidade",
  instructions: "Mova os pontos para que fiquem perpendiculares verticalmente.",
  type: AssignmentType.INTERACTIVE,
  setup: () => {
    const { setPoints } = useScene2DStore.getState();
    setPoints([
      {
        id: "A",
        position: [-3, 0],
        movable: true,
        color: "blue",
        label: "A",
        constraints: {
          roundCoordinates: true,
        },
      },
      {
        id: "B",
        position: [3, 0],
        movable: true,
        color: "green",
        label: "B",
        constraints: {
          roundCoordinates: true,
        },
      },
    ]);
  },
  validate: () => {
    const { getPoint } = useScene2DStore.getState();
    const pointA = getPoint("A");
    const pointB = getPoint("B");
    return pointA?.position[0] === pointB?.position[0];
  },
};

const whichPositionAssignment: Assignment = {
  id: "which-position",
  order: 3,
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
        coordinatesValue: { x: -0, y: 0 },
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

export const pointsAssignments = [
  movePointAssignment,
  perpendicularAssignment,
  whichPositionAssignment,
];
