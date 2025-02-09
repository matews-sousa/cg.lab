import { useFillInVecLengthFormulaStore } from "@/store/fillInVecLengthFormulaStore";
import { useScene2DStore } from "@/store/scene2DStore";
import { Assignment, AssignmentType } from "@/types/Assignment";
import { vec } from "mafs";
import { VectorTailAndTip } from "./adjustTheVectorToSum";

interface VectorLengthFormulaAssignmentProps {
  order: number;
  vectorRefId: string;
  vectorA: VectorTailAndTip;
  values: { x: number | string; y: number | string; z: number | string };
  dimensions: "2D" | "3D";
}

function createVectorLengthFormulaAssignment({
  order,
  vectorRefId,
  vectorA,
  values,
  dimensions,
}: VectorLengthFormulaAssignmentProps): Assignment {
  return {
    id: `vector-length-${order}`,
    title: "Comprimento do Vetor",
    instructions:
      "Ajuste os valores da fórmula para calcular o comprimento do vetor.",
    type: AssignmentType.FILL_IN_THE_BLANK_FORMULA,
    order,
    subjectCategory: "vector-length",
    setup() {
      const { addVector } = useScene2DStore.getState();
      addVector({
        id: vectorRefId,
        tail: vectorA.tail,
        tip: vectorA.tip,
        color: "blue",
        label: vectorRefId,
        tailMovable: false,
        tipMovable: false,
      });

      useFillInVecLengthFormulaStore
        .getState()
        .setVecLengthFormulas([{ vectorRefId, values, dimensions }]);
    },
    validate() {
      const { getVector } = useScene2DStore.getState();
      const vector = getVector(vectorRefId);
      const vecLenFormula = useFillInVecLengthFormulaStore
        .getState()
        .getVecLengthFormula(vectorRefId);
      if (!vecLenFormula || !vector) return false;
      const x = Number(vecLenFormula.values.x);
      const y = Number(vecLenFormula.values.y);
      const calculatedInputLen = Math.sqrt(x ** 2 + y ** 2);
      const vectorLen = vec.dist(vector.tail, vector.tip);
      const isCorrect = calculatedInputLen === vectorLen;
      if (isCorrect) {
        const newLabel = `||${vector.label}|| = ${vectorLen.toPrecision(2)}`;
        useScene2DStore.getState().setVectorLabel(vectorRefId, newLabel);
      }
      return calculatedInputLen === vectorLen;
    },
  };
}

const vectorLengthAssignmentsProps: VectorLengthFormulaAssignmentProps[] = [
  {
    order: 1,
    vectorRefId: "a",
    vectorA: { tail: [0, 0], tip: [2, 0] },
    values: { x: "", y: 0, z: 0 },
    dimensions: "2D",
  },
  {
    order: 2,
    vectorRefId: "a",
    vectorA: { tail: [0, 0], tip: [3, 4] },
    values: { x: 3, y: 4, z: 0 },
    dimensions: "2D",
  },
  {
    order: 3,
    vectorRefId: "a",
    vectorA: { tail: [0, 0], tip: [3, 4] },
    values: { x: 3, y: "", z: 0 },
    dimensions: "2D",
  },
];

export const vectorLengthAssignmentList = vectorLengthAssignmentsProps.map(
  createVectorLengthFormulaAssignment
);
