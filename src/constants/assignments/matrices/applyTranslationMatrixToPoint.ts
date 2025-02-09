import {
  MatrixType,
  useFillBlankMatrixInputStore,
} from "@/store/fillInBlankMatrixInputStore";
import { useScene2DStore } from "@/store/scene2DStore";
import { Assignment, AssignmentType } from "@/types/Assignment";
import { vec } from "mafs";

interface ApplyTranslationMatrixToPointProps {
  order: number;
  initialPosition: [number, number];
  translation: [number, number];
}

function createTranslationMatrix2DAssignment({
  order,
  initialPosition,
  translation,
}: ApplyTranslationMatrixToPointProps): Assignment {
  return {
    id: `apply-translation-matrix-2d-${order}`,
    title: "Aplique a Matriz de Translação",
    instructions: `Mova o ponto A(${initialPosition[0]}, ${initialPosition[1]}) para a posição resultante após a aplicação da matriz de translação.`,
    order,
    type: AssignmentType.INTERACTIVE,
    subjectCategory: "translation-matrix",
    setup: () => {
      const { setPoints } = useScene2DStore.getState();
      setPoints([
        {
          id: "A",
          label: "A",
          position: initialPosition,
          movable: true,
          color: "red",
        },
      ]);

      const { addMatrix } = useFillBlankMatrixInputStore.getState();
      addMatrix({
        id: "translation-matrix",
        type: MatrixType.TRANSLATION,
        dimention: "2D",
        matrixValue: [
          [
            { value: 1, editable: false },
            { value: 0, editable: false },
            { value: translation[0], editable: false },
          ],
          [
            { value: 0, editable: false },
            { value: 1, editable: false },
            { value: translation[1], editable: false },
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
      const point = useScene2DStore.getState().getPoint("A");
      if (!matrix || !point) return false;

      const initialPositionTranslated = vec.add(initialPosition, translation);

      const isCorrect =
        point.position[0] === initialPositionTranslated[0] &&
        point.position[1] === initialPositionTranslated[1];
      return isCorrect;
    },
  };
}

const applyTranslationMatrixToPointAssignmentProps: ApplyTranslationMatrixToPointProps[] =
  [
    {
      order: 1,
      initialPosition: [0, 0],
      translation: [2, 3],
    },
    {
      order: 2,
      initialPosition: [-2, 4],
      translation: [4, -1],
    },
    {
      order: 3,
      initialPosition: [1, 1],
      translation: [5, 4],
    },
    {
      order: 4,
      initialPosition: [3, -2],
      translation: [-1, 0.5],
    },
  ];

export const applyTranslationmatrixToPointAssignmentListList: Assignment[] =
  applyTranslationMatrixToPointAssignmentProps.map(props =>
    createTranslationMatrix2DAssignment(props)
  );
