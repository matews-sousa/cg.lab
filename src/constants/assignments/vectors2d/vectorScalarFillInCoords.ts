import { Assignment, AssignmentType } from "@/types/Assignment";
import { VectorTailAndTip } from "./adjustTheVectorToSum";
import { useScene2DStore } from "@/store/scene2DStore";
import { useFillInTheBlankStore } from "@/store/fillInTheBlankStore";
import { vec } from "mafs";

interface VectorScalarFillInCoordsAssignmentProps {
  order: number;
  initialVector: VectorTailAndTip;
  scalar: number;
}

function createVectorScalarFillInCoordsAssignment({
  order,
  initialVector,
  scalar,
}: VectorScalarFillInCoordsAssignmentProps): Assignment {
  return {
    id: `vector-scalar-fill-in-coords-${order}`,
    title: "Multiplicação de vetor por escalar",
    instructions: `Defina o vetor resultante após aplicar o escalar de ${scalar} ao vetor v.`,
    order,
    type: AssignmentType.FILL_IN_THE_BLANK_COORDINATES,
    subjectCategory: "vector-scalar",
    setup() {
      const { addVector } = useScene2DStore.getState();
      addVector({
        id: "v",
        tail: initialVector.tail,
        tip: initialVector.tip,
        color: "blue",
        label: "v",
        tailMovable: false,
        tipMovable: false,
      });

      useFillInTheBlankStore.getState().setInputs([
        {
          pointRef: "v",
          label: "v",
          coordinatesValue: { x: "", y: "", z: "" },
          dimention: "2D",
        },
      ]);
    },
    validate() {
      const { getVector } = useScene2DStore.getState();
      const sceneVec = getVector("v");
      const coordsInput = useFillInTheBlankStore
        .getState()
        .getInputByPointRef("v");
      if (!sceneVec || !coordsInput) return false;

      const vectorScaled = vec.scale(initialVector.tip, scalar);

      const inputX = coordsInput.coordinatesValue.x;
      const inputY = coordsInput.coordinatesValue.y;
      const isCorrect =
        vectorScaled[0] === Number(inputX) &&
        vectorScaled[1] === Number(inputY);

      if (isCorrect) {
        useScene2DStore.getState().setVectorTail("v", initialVector.tail);
        useScene2DStore.getState().setVectorTip("v", vectorScaled);
      }

      return isCorrect;
    },
  };
}

const vectorScalarFillInCoordsAssignmentsProps: VectorScalarFillInCoordsAssignmentProps[] =
  [
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
      initialVector: { tail: [0, 0], tip: [1, 1] },
      scalar: 0.5,
    },
    {
      order: 4,
      initialVector: { tail: [0, 0], tip: [1, 1] },
      scalar: -1,
    },
  ];

export const vectorScalarFillInCoordsAssignmentList =
  vectorScalarFillInCoordsAssignmentsProps.map(
    createVectorScalarFillInCoordsAssignment
  );
