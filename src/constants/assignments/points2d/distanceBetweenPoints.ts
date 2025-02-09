import { useScene2DStore } from "@/store/scene2DStore";
import { Assignment, AssignmentType } from "@/types/Assignment";
import { vec } from "mafs";

export const distanceBetweenPointsAssignment: Assignment = {
  id: "distance-between-points",
  order: 5,
  title: "Distância entre pontos",
  instructions: "Mova os pontos para que a distância entre eles seja 6.",
  type: AssignmentType.INTERACTIVE,
  subjectCategory: "points",
  setup: () => {
    const { setPoints } = useScene2DStore.getState();
    setPoints([
      {
        id: "A",
        position: [-2, 3],
        movable: true,
        color: "red",
        label: "A",
        constraints: {
          roundCoordinates: true,
        },
      },
      {
        id: "B",
        position: [3, -3],
        movable: true,
        color: "blue",
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
    if (!pointA || !pointB) return false;

    const distance = vec.dist(pointA.position, pointB.position);
    return distance === 6;
  },
};
