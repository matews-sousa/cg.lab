import { useScene2DStore } from "@/store/scene2DStore";
import { Assignment, AssignmentType } from "@/types/Assignment";
import { vec } from "mafs";

export const positionTwoTrianglesToSquare: Assignment = {
  id: "triangles-to-square",
  type: AssignmentType.INTERACTIVE,
  title: "Forme um quadrado",
  instructions: "Mova os pontos para formar um quadrado.",
  order: 8,
  setup: () => {
    const { setPolygons } = useScene2DStore.getState();
    setPolygons([
      {
        id: "triangle1",
        color: "red",
        points: [
          {
            id: "A",
            position: [-3, 3],
            movable: true,
            constraints: { roundCoordinates: true },
          },
          {
            id: "B",
            position: [-5, 1],
            movable: true,
            constraints: { roundCoordinates: true },
          },
          {
            id: "C",
            position: [-1, 2],
            movable: true,
            constraints: { roundCoordinates: true },
          },
        ],
        strokeStyle: "solid",
        movable: false,
      },
      {
        id: "triangle2",
        color: "blue",
        points: [
          {
            id: "D",
            position: [2, -2],
            movable: true,
            constraints: { roundCoordinates: true },
          },
          {
            id: "E",
            position: [1, 2],
            movable: true,
            constraints: { roundCoordinates: true },
          },
          {
            id: "F",
            position: [4, -4],
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
    const triangle1 = getPolygon("triangle1");
    const triangle2 = getPolygon("triangle2");
    if (!triangle1 || !triangle2) return false;

    const [A, B, C] = triangle1.points.map(p => p.position);
    const [D, E, F] = triangle2.points.map(p => p.position);

    const allPoints = [A, B, C, D, E, F];
    const uniquePoints = Array.from(
      new Set(allPoints.map(p => p.join(",")))
    ).map(p => p.split(",").map(Number));

    const distances = [];
    for (let i = 0; i < uniquePoints.length; i++) {
      for (let j = i + 1; j < uniquePoints.length; j++) {
        const dist = vec.dist(
          uniquePoints[i] as [number, number],
          uniquePoints[j] as [number, number]
        );
        distances.push(dist);
      }
    }

    distances.sort((a, b) => a - b);
    const [side1, side2, side3, side4, diagonal1, diagonal2] = distances;

    const areSidesEqual = side1 === side2 && side2 === side3 && side3 === side4;
    const areDiagonalsEqual = diagonal1 === diagonal2;

    return areSidesEqual && areDiagonalsEqual;
  },
};
