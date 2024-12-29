import {
  MatrixType,
  useFillBlankMatrixInputStore,
} from "@/store/fillInBlankMatrixInputStore";
import { useScene2DStore } from "@/store/scene2DStore";
import { Assignment, AssignmentType } from "@/types/Assignment";

export const translationMatrixAssignment: Assignment = {
  id: "translation-matrix",
  title: "Matriz de Translação",
  instructions:
    "Altere a matriz de translação para mover o ponto A para a posição (2, 3).",
  order: 1,
  type: AssignmentType.FILL_IN_THE_BLANK_MATRIX,
  setup: () => {
    const { setPoints } = useScene2DStore.getState();
    setPoints([
      {
        id: "A",
        label: "A",
        position: [0, 0],
        movable: false,
        color: "red",
      },
    ]);

    const { addMatrix } = useFillBlankMatrixInputStore.getState();
    addMatrix({
      id: "translation-matrix",
      pointRefId: "A",
      type: MatrixType.TRANSLATION,
      dimention: "2D",
      matrixValue: [
        [
          { value: 1, editable: false },
          { value: 0, editable: false },
          { value: "", editable: true },
        ],
        [
          { value: 0, editable: false },
          { value: 1, editable: false },
          { value: "", editable: true },
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
    const { getMatrixById } = useFillBlankMatrixInputStore.getState();
    const matrix = getMatrixById("translation-matrix");
    if (!matrix) return false;

    const [a, b, c, d, e, f] = matrix.matrixValue
      .flat()
      .map(cell => cell.value);
    if (a === 1 && b === 0 && c === 2 && d === 0 && e === 1 && f === 3) {
      return true;
    }

    return false;
  },
};
