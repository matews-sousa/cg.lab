import { initial2DRotationMatrixZValue } from "@/constants/inicial2DMatricesValues";
import {
  MatrixType,
  useFillBlankMatrixInputStore,
} from "@/store/fillInBlankMatrixInputStore";
import { useScene2DStore } from "@/store/scene2DStore";
import { Assignment, AssignmentType } from "@/types/Assignment";

export const rotationMatrixAssignment: Assignment = {
  id: "rotation-matrix",
  title: "Matriz de Rotação no eixo Z",
  instructions:
    "Altere a matriz de rotação para rotacionar o quadrado em 45 graus no eixo Z.",
  order: 4,
  type: AssignmentType.FILL_IN_THE_BLANK_MATRIX,
  setup: () => {
    const { setPolygons } = useScene2DStore.getState();
    setPolygons([
      {
        id: "square",
        color: "blue",
        points: [
          { id: "A", position: [-1, 1], movable: false },
          { id: "B", position: [1, 1], movable: false },
          { id: "C", position: [1, -1], movable: false },
          { id: "D", position: [-1, -1], movable: false },
        ],
      },
    ]);

    const { addMatrix } = useFillBlankMatrixInputStore.getState();
    addMatrix({
      id: "rotation-matrix-z",
      polygonRefId: "square",
      type: MatrixType.ROTATION_Z,
      dimention: "2D",
      matrixValue: initial2DRotationMatrixZValue,
    });
  },
  validate: () => {
    const { getMatrixById } = useFillBlankMatrixInputStore.getState();
    const matrix = getMatrixById("rotation-matrix-z");
    const square = useScene2DStore.getState().getPolygon("square");
    if (!matrix || !square) return false;

    return square.rotation === 45;
  },
};
