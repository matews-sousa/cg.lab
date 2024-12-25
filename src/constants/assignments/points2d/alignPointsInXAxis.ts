import { useScene2DStore } from "@/store/scene2DStore";
import { Assignment, AssignmentType } from "@/types/Assignment";

export const alignPointsInXAxisAssignment: Assignment = {
  id: "align-points-x-axis",
  order: 3,
  title: "Alinhar pontos",
  instructions: "Mova os pontos para que fiquem no eixo x.",
  type: AssignmentType.INTERACTIVE,
  setup: () => {
    const { setPoints } = useScene2DStore.getState();
    setPoints([
      {
        id: "A",
        position: [-2, 4],
        movable: true,
        color: "blue",
        label: "A",
        constraints: {
          roundCoordinates: true,
        },
      },
      {
        id: "B",
        position: [1, -2],
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

    const isCorrect = pointA?.position[1] === 0 && pointB?.position[1] === 0;
    return isCorrect;
  },
};
