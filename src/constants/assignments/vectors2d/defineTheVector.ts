import { useFillInTheBlankStore } from "@/store/fillInTheBlankStore";
import { useScene2DStore } from "@/store/scene2DStore";
import { Assignment, AssignmentType } from "@/types/Assignment";

interface DefineTheVectorAssignmentProps {
  order: number;
  title: string;
  instructions: string;
  pointA: [number, number];
  pointB: [number, number];
}

function createDefineTheVectorAssignment({
  order,
  title,
  instructions,
  pointA,
  pointB,
}: DefineTheVectorAssignmentProps): Assignment {
  return {
    id: `define-the-vector-${order}`,
    title,
    instructions,
    order,
    type: AssignmentType.FILL_IN_THE_BLANK_COORDINATES,
    setup: () => {
      const { setPoints, setVectors } = useScene2DStore.getState();
      setPoints([
        {
          id: "A",
          position: pointA,
          label: "A",
          movable: false,
          color: "red",
        },
        {
          id: "B",
          position: pointB,
          label: "B",
          movable: false,
          color: "red",
        },
      ]);

      setVectors([
        {
          id: "v",
          tail: pointA,
          tip: pointB,
          label: "v",
        },
      ]);

      useFillInTheBlankStore.getState().setInputs([
        {
          dimention: "2D",
          coordinatesValue: { x: "", y: "", z: "" },
          pointRef: "v",
          label: "v",
        },
      ]);
    },
    validate() {
      const { getInputByPointRef } = useFillInTheBlankStore.getState();
      const v = getInputByPointRef("v");
      const isCorrect =
        v?.coordinatesValue.x === pointB[0] - pointA[0] &&
        v?.coordinatesValue.y === pointB[1] - pointA[1];
      return isCorrect;
    },
  };
}

const defineTheVectorAssignmentsProps: DefineTheVectorAssignmentProps[] = [
  {
    order: 1,
    title: "Encontre o vetor v de A para B",
    instructions:
      "Calcule o vetor que conecta o ponto A ao ponto B no plano cartesiano.",
    pointA: [0, 0],
    pointB: [1, 1],
  },
  {
    order: 2,
    title: "Determine as coordenadas do vetor v",
    instructions:
      "Determine as coordenadas do vetor v com base nos pontos A e B fornecidos.",
    pointA: [2, 1],
    pointB: [4, 3],
  },
  {
    order: 3,
    title: "Calcule o vetor a partir de A e B",
    instructions:
      "Use as coordenadas de A e B para encontrar o vetor correspondente.",
    pointA: [3, 4],
    pointB: [1, 1],
  },
  {
    order: 4,
    title: "Descubra o vetor com origem em A",
    instructions:
      "Descubra as coordenadas do vetor v que parte do ponto A e termina no ponto B.",
    pointA: [2, 3],
    pointB: [-3, 5],
  },
];

export const defineTheVectorAssignmentList: Assignment[] =
  defineTheVectorAssignmentsProps.map(createDefineTheVectorAssignment);
