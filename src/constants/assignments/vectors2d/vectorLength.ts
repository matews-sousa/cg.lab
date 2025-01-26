import { useFillInVecLengthFormulaStore } from "@/store/fillInVecLengthFormulaStore";
import { useScene2DStore } from "@/store/scene2DStore";
import { Assignment, AssignmentType } from "@/types/Assignment";
import { vec } from "mafs";

export const vectorLengthAssignment: Assignment = {
  id: "vector-length",
  title: "Comprimento do Vetor",
  instructions:
    "Ajuste os valores da fórmula para calcular o comprimento do vetor.",
  type: AssignmentType.FILL_IN_THE_BLANK_FORMULA,
  order: 1,
  setup() {
    const { addVector } = useScene2DStore.getState();
    addVector({
      id: "a",
      tail: [0, 0],
      tip: [3, 2],
      color: "blue",
      label: "a",
      tailMovable: false,
      tipMovable: false,
    });

    useFillInVecLengthFormulaStore.getState().setVecLengthFormulas([
      {
        vectorRefId: "a",
        values: { x: 3, y: 0, z: 0 },
        dimensions: "2D",
      },
    ]);
  },
  validate() {
    const { getVector } = useScene2DStore.getState();
    const aVec = getVector("a");
    const vecLenFormula = useFillInVecLengthFormulaStore
      .getState()
      .getVecLengthFormula("a");
    if (!vecLenFormula || !aVec) return false;
    const calculatedInputLen = Math.sqrt(
      vecLenFormula.values.x ** 2 + vecLenFormula.values.y ** 2
    );
    const vectorLen = vec.dist(aVec.tail, aVec.tip);
    return calculatedInputLen === vectorLen;
  },
};
