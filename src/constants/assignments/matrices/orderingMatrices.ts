import {
  MatrixOption,
  useOrderMatrixStore,
} from "@/store/orderMatrixMultiplicationStore";
import { useScene2DStore } from "@/store/scene2DStore";
import { Assignment, AssignmentType } from "@/types/Assignment";
import { TPolygon } from "@/types/Scene2DConfig";
import { generateSquarePoints } from "@/utils";
import { Matrix3 } from "three";

interface OrderMatrixMultiplicationProps {
  order: number;
  matricesOptions: MatrixOption[];
  initialPolygons: TPolygon[];
  objectivePolygons: TPolygon[];
}

function createOrderMatrixMultiplication({
  order,
  matricesOptions,
  initialPolygons,
  objectivePolygons,
}: OrderMatrixMultiplicationProps): Assignment {
  return {
    id: `sorting-matrices-${order}`,
    title: "Ordenação de Matrizes",
    instructions:
      "Ordene as matrizes de transformação para obter o resultado esperado.",
    order,
    type: AssignmentType.ORDER_MATRIX_MULTIPLICATION,
    subjectCategory: "matrix-multiplication",
    setup() {
      const { setPolygons, setObjectivePolygons } = useScene2DStore.getState();
      setPolygons(initialPolygons);

      setObjectivePolygons(objectivePolygons);

      const { createObject, setMatricesOptions } =
        useOrderMatrixStore.getState();
      createObject("square1");
      setMatricesOptions(matricesOptions);
    },
    validate() {
      const square1 = useScene2DStore.getState().getPolygon("square1");
      if (!square1) return false;

      return (
        square1.points.every(
          (point, index) =>
            point.position[0] ===
              objectivePolygons[0].points[index].position[0] &&
            point.position[1] === objectivePolygons[0].points[index].position[1]
        ) && square1.color === objectivePolygons[0].color
      );
    },
  };
}

function createSquare(
  id: string,
  color: string,
  position: [number, number],
  size: [number, number]
): TPolygon {
  return {
    id,
    color,
    points: generateSquarePoints(position, size).map((point, index) => ({
      id: String.fromCharCode(65 + index),
      position: point,
      movable: false,
    })),
  };
}

const orderingMatricesAssignmentsProps: OrderMatrixMultiplicationProps[] = [
  {
    order: 1,
    initialPolygons: [createSquare("square1", "blue", [1.5, 1.5], [1, 1])],
    objectivePolygons: [createSquare("square1", "blue", [1, 1], [2, 2])],
    matricesOptions: [
      {
        id: "translate-to-origin",
        matrix: new Matrix3().translate(-1.5, -1.5).transpose(),
      },
      {
        id: "scale",
        matrix: new Matrix3().scale(2, 2),
      },
      {
        id: "translate-back",
        matrix: new Matrix3().translate(1, 1).transpose(),
      },
    ],
  },
  {
    order: 2,
    initialPolygons: [createSquare("square1", "blue", [1, 1], [2, 2])],
    objectivePolygons: [createSquare("square1", "blue", [1, 1], [1, 1])],
    matricesOptions: [
      {
        id: "translate-to-origin",
        matrix: new Matrix3().translate(-1, -1).transpose(),
      },
      {
        id: "scale",
        matrix: new Matrix3().scale(0.5, 0.5),
      },
      {
        id: "translate-back",
        matrix: new Matrix3().translate(1, 1).transpose(),
      },
    ],
  },
];

export const orderingMatricesAssignments = orderingMatricesAssignmentsProps.map(
  createOrderMatrixMultiplication
);
