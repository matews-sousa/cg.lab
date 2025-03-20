import { initial2DScalingMatrixValue } from "@/constants/inicial2DMatricesValues";
import { MatrixType } from "@/store/fillInBlankMatrixInputStore";
import { useFillInMatrixWithOptionsStore } from "@/store/fillInMatrixWithOptions";
import { useScene2DStore } from "@/store/scene2DStore";
import { Assignment, AssignmentType } from "@/types/Assignment";

interface ReflectionMatrixAssignmentProps {
  order: number;
}

function createReflectionMatrixAssignment({
  order,
}: ReflectionMatrixAssignmentProps): Assignment {
  return {
    id: `reflection-matrix-${order}`,
    title: "Matriz de Reflexão",
    instructions:
      "Altere a matriz de reflexão para que resulte no objetivo desejado.",
    order,
    type: AssignmentType.FILL_IN_THE_BLANK_MATRIX_WITH_OPTIONS,
    subjectCategory: "scaling-matrix",
    setup() {
      const { setMatrix, setOptions } =
        useFillInMatrixWithOptionsStore.getState();
      setMatrix({
        id: "reflection-matrix",
        type: MatrixType.SCALING,
        dimention: "2D",
        matrixValue: initial2DScalingMatrixValue,
        imageRefId: "mario",
      });
      setOptions([
        { id: "option1", displayValue: "1", value: 1 },
        { id: "option2", displayValue: "-1", value: -1 },
        { id: "option3", displayValue: "-1", value: -1 },
        { id: "option4", displayValue: "-2", value: -2 },
        { id: "option5", displayValue: "2", value: 2 },
      ]);

      const { setImages, setObjectiveImages } = useScene2DStore.getState();
      setImages([
        {
          id: "mario",
          src: "/mario.png",
          width: 2,
          height: 2,
          position: [0, 0],
          scale: [1, 1],
        },
      ]);
      setObjectiveImages([
        {
          id: "objectiveMario",
          src: "/mario.png",
          width: 2,
          height: 2,
          position: [0, 0],
          scale: [-1, 1],
        },
      ]);
    },
    validate() {
      const { matrix } = useFillInMatrixWithOptionsStore.getState();
      if (!matrix) return false;
      const matrixValue = matrix.matrixValue;
      return matrixValue[0][0].value === -1 && matrixValue[1][1].value === 1;
    },
  };
}

const reflectionMatrixAssignmentsProps: ReflectionMatrixAssignmentProps[] = [
  {
    order: 1,
  },
];

export const reflectionMatrixAssignments = reflectionMatrixAssignmentsProps.map(
  createReflectionMatrixAssignment
);
