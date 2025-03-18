import { degreesToRadians } from "@/lib/utils";
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

      const objectiveSquare = objectivePolygons[0];
      return (
        square1.points.every(
          (point, index) =>
            point.position[0] === objectiveSquare.points[index].position[0] &&
            point.position[1] === objectiveSquare.points[index].position[1]
        ) && square1.color === objectiveSquare.color
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

function applyMatrixToSquare(matrices: Matrix3[], square: TPolygon): TPolygon {
  const newPoints = square.points?.map(point => {
    const modelMatrix = new Matrix3().identity();
    matrices.forEach(matrix => modelMatrix.multiply(matrix));

    const [x, y] = point.position;
    const w = 1;
    const newX =
      modelMatrix.elements[0] * x +
      modelMatrix.elements[1] * y +
      modelMatrix.elements[2] * w;
    const newY =
      modelMatrix.elements[3] * x +
      modelMatrix.elements[4] * y +
      modelMatrix.elements[5] * w;
    return {
      id: point.id,
      position: [newX, newY] as [number, number],
      movable: false,
    };
  });

  if (!newPoints) return square;

  return {
    ...square,
    points: newPoints,
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
  {
    order: 3,
    initialPolygons: [createSquare("square1", "blue", [1, 1], [1, 1])],
    objectivePolygons: [
      applyMatrixToSquare(
        [
          new Matrix3().translate(-1, -1).transpose(),
          new Matrix3().scale(2, 2),
          new Matrix3().rotate(degreesToRadians(45)),
        ],
        createSquare("square1", "blue", [1, 1], [1, 1])
      ),
    ],
    matricesOptions: [
      {
        id: "scale",
        matrix: new Matrix3().scale(2, 2),
      },
      {
        id: "rotation-z",
        matrix: new Matrix3().rotate(degreesToRadians(45)),
        rotationAxis: "z",
        rotationAngle: 45,
      },
      {
        id: "translate-to-origin",
        matrix: new Matrix3().translate(-1, -1).transpose(),
      },
    ],
  },
  {
    order: 4,
    initialPolygons: [createSquare("square1", "blue", [0, 0], [2, 2])],
    objectivePolygons: [
      applyMatrixToSquare(
        [
          new Matrix3().scale(0.5, 0.5),
          new Matrix3().translate(0.5, 0.5).transpose(),
        ],
        createSquare("square1", "blue", [0, 0], [2, 2])
      ),
    ],
    matricesOptions: [
      {
        id: "translate-to-origin",
        matrix: new Matrix3().translate(-1, -1).transpose(),
      },
      {
        id: "translate",
        matrix: new Matrix3().translate(0.5, 0.5).transpose(),
      },
      {
        id: "scale",
        matrix: new Matrix3().scale(0.5, 0.5),
      },
    ],
  },
  {
    order: 5,
    initialPolygons: [createSquare("square1", "blue", [-0.5, -0.5], [1, 1])],
    objectivePolygons: [
      applyMatrixToSquare(
        [
          new Matrix3().scale(2, 2),
          new Matrix3().translate(0.5, 0.5).transpose(),
        ],
        createSquare("square1", "blue", [-0.5, -0.5], [1, 1])
      ),
    ],
    matricesOptions: [
      {
        id: "translate",
        matrix: new Matrix3().translate(0.5, 0.5).transpose(),
      },
      {
        id: "scale",
        matrix: new Matrix3().scale(2, 2),
      },
      {
        id: "translate-to-origin",
        matrix: new Matrix3().translate(-0.5, -0.5).transpose(),
      },
    ],
  },
];

export const orderingMatricesAssignments = orderingMatricesAssignmentsProps.map(
  createOrderMatrixMultiplication
);
