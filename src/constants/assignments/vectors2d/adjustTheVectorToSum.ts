import { useScene2DStore } from "@/store/scene2DStore";
import { Assignment, AssignmentType } from "@/types/Assignment";
import { getRandomVectorWithTailAndTip } from "@/utils";
import { vec } from "mafs";

type VectorTailAndTip = {
  tail: [number, number];
  tip: [number, number];
};

interface AdjustVectorToSumAssignmentProps {
  order: number;
  title: string;
  instructions: string;
  vectorA: VectorTailAndTip;
  vectorB: VectorTailAndTip;
}

function createAdjustVectorSumAssignment({
  order,
  title,
  instructions,
  vectorA,
  vectorB,
}: AdjustVectorToSumAssignmentProps): Assignment {
  const randomCVec = getRandomVectorWithTailAndTip([-4, 4]);

  return {
    id: `adjust-vector-to-sum-${order}`,
    title,
    instructions,
    order,
    type: AssignmentType.INTERACTIVE,
    setup: () => {
      const { setVectors } = useScene2DStore.getState();
      setVectors([
        {
          id: "a",
          tail: vectorA.tail,
          tip: vectorA.tip,
          label: "a",
          tipMovable: false,
          tailMovable: false,
          color: "white",
        },
        {
          id: "b",
          tail: vectorB.tail,
          tip: vectorB.tip,
          label: "b",
          tipMovable: false,
          tailMovable: false,
          color: "white",
        },
        {
          id: "c",
          tail: randomCVec.tail,
          tip: randomCVec.tip,
          label: "c",
          tipMovable: true,
          tailMovable: true,
          color: "green",
        },
      ]);
    },
    validate: () => {
      const { getVector } = useScene2DStore.getState();
      const a = getVector("a");
      const b = getVector("b");
      const c = getVector("c");
      if (!a || !b || !c) return false;

      const expectedSum = vec.add(
        vec.sub(a.tip, a.tail),
        vec.sub(b.tip, b.tail)
      );
      const cVector = vec.sub(c.tip, c.tail);

      const isCorrect =
        cVector[0] === expectedSum[0] && cVector[1] === expectedSum[1];
      return isCorrect;
    },
  };
}

const adjustVectorSumAssignmentsProps: AdjustVectorToSumAssignmentProps[] = [
  {
    order: 1,
    title: "Ajuste o vetor",
    instructions: "Ajuste o vetor c para que se torne a soma dos vetores a e b",
    vectorA: {
      tail: [0, 0],
      tip: [3, 2],
    },
    vectorB: {
      tail: [0, 0],
      tip: [2, 3],
    },
  },
  {
    order: 2,
    title: "Ajuste o vetor",
    instructions: "Ajuste o vetor c para que se torne a soma dos vetores a e b",
    vectorA: {
      tail: [1, 3],
      tip: [2, 3],
    },
    vectorB: {
      tail: [-1, 4],
      tip: [-1, 5],
    },
  },
  {
    order: 3,
    title: "Ajuste o vetor",
    instructions: "Ajuste o vetor c para que se torne a soma dos vetores a e b",
    vectorA: {
      tail: [0, 0],
      tip: [2, 3],
    },
    vectorB: {
      tail: [-3, 2],
      tip: [-5, 5],
    },
  },
];

export const adjustVectorSumAssignmentsList: Assignment[] =
  adjustVectorSumAssignmentsProps.map(createAdjustVectorSumAssignment);
