import {
  MatrixType,
  useFillBlankMatrixInputStore,
} from "@/store/fillInBlankMatrixInputStore";
import { useScene2DStore } from "@/store/scene2DStore";
import { Assignment, AssignmentType } from "@/types/Assignment";
import { generateSquarePoints } from "@/utils";

interface ScalePolygonAssignmentProps {
  order: number;
  squareCenter: [number, number];
  squareSize: [number, number];
  goalScale: [number, number];
}

function createScalePolygonAssignment({
  order,
  squareCenter,
  squareSize,
  goalScale,
}: ScalePolygonAssignmentProps): Assignment {
  const squarePoints = generateSquarePoints(squareCenter, squareSize);
  const squareWidth = squareSize[0];
  const squareHeight = squareSize[1];

  const goalSquareWidth = goalScale[0] * squareWidth;
  const goalSquareHeight = goalScale[1] * squareHeight;

  return {
    id: `scale-polygon-${order}`,
    title: "Matriz de Escala",
    instructions: `Altere a matriz de escala para que o quadrado fique com tamanho (${goalSquareWidth}, ${goalSquareHeight}).`,
    order,
    type: AssignmentType.FILL_IN_THE_BLANK_MATRIX,
    subjectCategory: "scaling-matrix",
    setup: () => {
      const { setPolygons } = useScene2DStore.getState();
      setPolygons([
        {
          id: "square",
          color: "blue",
          points: squarePoints.map((point, index) => ({
            id: `point${index}`,
            position: point,
            movable: false,
          })),
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

      console.log(polygon.scale, goalScale);

      const isCorrect =
        polygon.scale[0] === goalScale[0] && polygon.scale[1] === goalScale[1];
      return isCorrect;
    },
  };
}

const scalePolygonAssignmentsProps: ScalePolygonAssignmentProps[] = [
  {
    order: 1,
    squareCenter: [0, 0],
    squareSize: [1, 1],
    goalScale: [2, 2],
  },
  {
    order: 2,
    squareCenter: [0.5, 0.5],
    squareSize: [1, 1],
    goalScale: [2, 1],
  },
  {
    order: 3,
    squareCenter: [1.5, 1.5],
    squareSize: [1, 1],
    goalScale: [2, 2],
  },
];

export const scalePolygonAssignmentList = scalePolygonAssignmentsProps.map(
  createScalePolygonAssignment
);
