import { useScene2DStore } from "@/store/scene2DStore";
import { Assignment, AssignmentType } from "@/types/Assignment";
import { vec } from "mafs";
import { VectorTailAndTip } from "./adjustTheVectorToSum";

interface VectorScaleAssignmentProps {
  order: number;
  initialVector: VectorTailAndTip;
  scalar: number;
}

function createVectorScalarAssignment({
  order,
  initialVector,
  scalar,
}: VectorScaleAssignmentProps): Assignment {
  return {
    id: `vector-scalar-${order}`,
    title: "Multiplicação de vetor por escalar",
    instructions: `Aplique uma escalar de ${scalar} ao vetor v = (${initialVector.tip[0]}, ${initialVector.tip[1]}).`,
    order,
    type: AssignmentType.INTERACTIVE,
    subjectCategory: "vector-scalar",
    setup() {
      const { addVector } = useScene2DStore.getState();
      addVector({
        id: "v1",
        tail: initialVector.tail,
        tip: initialVector.tip,
        color: "blue",
        label: "v",
        tailMovable: true,
        tipMovable: true,
      });
    },
    validate() {
      const { getVector } = useScene2DStore.getState();
      const sceneVec = getVector("v1");
      if (!sceneVec) return false;

      const vector = vec.sub(sceneVec.tip, sceneVec.tail);
      const vectorScaled = vec.scale(initialVector.tip, scalar);

      const isCorrect =
        vector[0] === vectorScaled[0] && vector[1] === vectorScaled[1];
      return isCorrect;
    },
  };
}

const vectorScalarAssignmentsProps: VectorScaleAssignmentProps[] = [
  {
    order: 1,
    initialVector: { tail: [0, 0], tip: [2, 3] },
    scalar: 2,
  },
  {
    order: 2,
    initialVector: { tail: [0, 0], tip: [1, 1] },
    scalar: 3,
  },
  {
    order: 3,
    initialVector: { tail: [0, 0], tip: [4, 1] },
    scalar: 0.5,
  },
];

export const vectorScalarAssignmentList = vectorScalarAssignmentsProps.map(
  createVectorScalarAssignment
);
