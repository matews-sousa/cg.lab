import { useScene2DStore } from "@/store/scene2DStore";
import { Assignment, AssignmentType } from "@/types/Assignment";
import { vec } from "mafs";

export const scaleSquarePointsAssignment: Assignment = {
  id: "scale-square-points",
  type: AssignmentType.INTERACTIVE,
  title: "Escala de pontos",
  instructions:
    "Mude a posição dos pontos para que o quadrado tenha o dobro do tamanho.",
  order: 7,
  setup: () => {
    const { setPolygons } = useScene2DStore.getState();
    setPolygons([
      {
        id: "square",
        points: [
          {
            id: "A",
            position: [-1, 1],
            movable: true,
            constraints: { roundCoordinates: true },
          },
          {
            id: "B",
            position: [1, 1],
            movable: true,
            constraints: { roundCoordinates: true },
          },
          {
            id: "C",
            position: [1, -1],
            movable: true,
            constraints: { roundCoordinates: true },
          },
          {
            id: "D",
            position: [-1, -1],
            movable: true,
            constraints: { roundCoordinates: true },
          },
        ],
        strokeStyle: "solid",
        movable: false,
      },
    ]);
  },
  validate: () => {
    const { getPolygon } = useScene2DStore.getState();
    const square = getPolygon("square");
    if (!square) return false;
    const [A, B, C, D] = square.points.map(p => p.position);

    const distAB = vec.dist(A, B);
    const distBC = vec.dist(B, C);
    const distCD = vec.dist(C, D);
    const distDA = vec.dist(D, A);

    return distAB === 4 && distBC === 4 && distCD === 4 && distDA === 4;
  },
};
