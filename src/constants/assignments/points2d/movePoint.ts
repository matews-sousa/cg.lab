import { useScene2DStore } from "@/store/scene2DStore";
import { Assignment, AssignmentType } from "@/types/Assignment";

interface MovePointAssignmentProps {
  order: number;
  title: string;
  instructions: string;
  initialPointPosition: [number, number];
  goalPointPosition: [number, number];
}

function createMovePointAssignment({
  order,
  title,
  instructions,
  initialPointPosition,
  goalPointPosition,
}: MovePointAssignmentProps): Assignment {
  return {
    id: `move-point-${order}`,
    order,
    title,
    instructions,
    type: AssignmentType.INTERACTIVE,
    setup: () => {
      const { setPoints } = useScene2DStore.getState();
      setPoints([
        {
          id: "A",
          position: initialPointPosition,
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

      return (
        point.position[0] === goalPointPosition[0] &&
        point.position[1] === goalPointPosition[1]
      );
    },
  };
}

const movePointAssignments = [
  {
    title: "Mova o ponto",
    instructions: "Mova o ponto A para a posição (3, 2).",
    initialPointPosition: [0, 0] as [number, number],
    goalPointPosition: [3, 2] as [number, number],
  },
  {
    title: "Mova o ponto 2",
    instructions: "Mova o ponto A para a posição (-3, -2).",
    initialPointPosition: [0, 0] as [number, number],
    goalPointPosition: [-3, -2] as [number, number],
  },
  {
    title: "Mova o ponto 3",
    instructions: "Mova o ponto A para a posição (0, 5).",
    initialPointPosition: [0, 0] as [number, number],
    goalPointPosition: [0, 5] as [number, number],
  },
  {
    title: "Mova o ponto 4",
    instructions: "Mova o ponto A para a posição (-4, 0).",
    initialPointPosition: [0, 0] as [number, number],
    goalPointPosition: [-4, 0] as [number, number],
  },
  {
    title: "Mova o ponto 5",
    instructions: "Mova o ponto A para a origem.",
    initialPointPosition: [4, -3] as [number, number],
    goalPointPosition: [0, 0] as [number, number],
  },
];

export const movePointAssignmentsList = movePointAssignments.map(
  (assignment, index) =>
    createMovePointAssignment({
      order: index + 1, // Order is derived from the array index
      ...assignment,
    })
);
