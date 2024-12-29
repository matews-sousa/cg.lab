import {
  MatrixType,
  useFillBlankMatrixInputStore,
} from "@/store/fillInBlankMatrixInputStore";
import { useScene2DStore } from "@/store/scene2DStore";
import { Assignment, AssignmentType } from "@/types/Assignment";

export const scalePolygonAssignment: Assignment = {
  id: "scale-polygon",
  title: "Matriz de Escala",
  instructions:
    "Altere a matriz de escala para que o quadrado tenha o dobro do tamanho.",
  order: 3,
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
      id: "scale-matrix",
      polygonRefId: "square",
      type: MatrixType.SCALING,
      dimention: "2D",
      matrixValue: [
        [
          { value: 1, editable: true },
          { value: 0, editable: false },
          { value: 0, editable: false },
        ],
        [
          { value: 0, editable: false },
          { value: 1, editable: true },
          { value: 0, editable: false },
        ],
        [
          { value: 0, editable: false },
          { value: 0, editable: false },
          { value: 1, editable: false },
        ],
      ],
    });
  },
  validate: () => {
    const { getPolygon } = useScene2DStore.getState();
    const polygon = getPolygon("square");
    if (!polygon || !polygon.scale) return false;

    if (polygon.scale[0] === 2 && polygon.scale[1] === 2) {
      return true;
    }

    return false;
  },
};
