import { useOrderMatrixStore } from "@/store/orderMatrixMultiplicationStore";
import { useScene2DStore } from "@/store/scene2DStore";
import { Assignment, AssignmentType } from "@/types/Assignment";
import { Matrix3 } from "three";

interface OrderMatrixMultiplicationProps {
  order: number;
}

function createOrderMatrixMultiplication({
  order,
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
      const { addPolygon, setObjectivePolygons } = useScene2DStore.getState();
      addPolygon({
        id: "square1",
        color: "blue",
        points: [
          { id: "A", position: [1, 1], movable: false },
          { id: "B", position: [2, 1], movable: false },
          { id: "C", position: [2, 2], movable: false },
          { id: "D", position: [1, 2], movable: false },
        ],
      });

      setObjectivePolygons([
        {
          id: "squareObjective",
          color: "blue",
          points: [
            { id: "A", position: [0, 0], movable: false },
            { id: "B", position: [2, 0], movable: false },
            { id: "C", position: [2, 2], movable: false },
            { id: "D", position: [0, 2], movable: false },
          ],
        },
      ]);

      const { addMatrix } = useOrderMatrixStore.getState();
      addMatrix(new Matrix3().translate(-1.5, -1.5).transpose());
      addMatrix(new Matrix3().scale(2, 2));
      addMatrix(new Matrix3().translate(1, 1).transpose());
    },
    validate() {
      return false;
    },
  };
}

const orderingMatricesAssignmentsProps: OrderMatrixMultiplicationProps[] = [
  { order: 1 },
];

export const orderingMatricesAssignments = orderingMatricesAssignmentsProps.map(
  createOrderMatrixMultiplication
);
