import { useScene2DStore } from "@/store/scene2DStore";
import { Assignment, AssignmentType } from "@/types/Assignment";

export const perpendicularAssignment: Assignment = {
  id: "perpendicular-point",
  order: 2,
  title: "Perpendicularidade",
  instructions: "Mova os pontos para que fiquem perpendiculares verticalmente.",
  type: AssignmentType.INTERACTIVE,
  subjectCategory: "points",
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
