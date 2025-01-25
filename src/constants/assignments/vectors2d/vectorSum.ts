import { useScene2DStore } from "@/store/scene2DStore";
import { Assignment, AssignmentType } from "@/types/Assignment";
import { getRandomVectorWithTailAndTip } from "@/utils";
import { vec } from "mafs";

interface AdjustVectorSumAssignmentProps {
  order: number;
  title: string;
  instructions: string;
  vectorCTail: [number, number];
  vectorCTip: [number, number];
}

function createAdjustVectorSumAssignment({
  order,
  title,
  instructions,
  vectorCTail,
  vectorCTip,
}: AdjustVectorSumAssignmentProps): Assignment {
  const randomAVec = getRandomVectorWithTailAndTip([-4, 4]);
  const randomBVec = getRandomVectorWithTailAndTip([-4, 4]);

  return {
    id: `adjust-vector-sum-${order}`,
    title,
    instructions,
    order,
    type: AssignmentType.INTERACTIVE,
    setup: () => {
      const { setVectors } = useScene2DStore.getState();
      setVectors([
        {
          id: "a",
          tail: randomAVec.tail,
          tip: randomAVec.tip,
          label: "a",
          tipMovable: true,
          tailMovable: true,
          color: "red",
        },
        {
          id: "b",
          tail: randomBVec.tail,
          tip: randomBVec.tip,
          label: "b",
          tipMovable: true,
          tailMovable: true,
          color: "blue",
        },
        {
          id: "c",
          tail: vectorCTail,
          tip: vectorCTip,
          label: "c",
        },
      ]);
    },
    validate: () => {
      const { getVector } = useScene2DStore.getState();
      const a = getVector("a");
      const b = getVector("b");
      const c = getVector("c");
      if (!a || !b || !c) return false;

      const vecA = vec.sub(a.tip, a.tail);
      const vecB = vec.sub(b.tip, b.tail);
      const vecC = vec.sub(c.tip, c.tail);

      const sum = vec.add(vecA, vecB);
      const isCorrect = vecC[0] === sum[0] && vecC[1] === sum[1];

      return isCorrect;
    },
  };
}

const vectorSumAssignmentsProps: AdjustVectorSumAssignmentProps[] = [
  {
    order: 1,
    title: "Soma de vetores",
    instructions:
      "Ajuste os vetores a e b para que a soma deles seja o vetor c",
    vectorCTail: [0, 0],
    vectorCTip: [3, 3],
  },
  {
    order: 2,
    title: "Soma de vetores",
    instructions:
      "Ajuste os vetores a e b para que a soma deles seja o vetor c",
    vectorCTail: [0, 0],
    vectorCTip: [4, 4],
  },
  {
    order: 3,
    title: "Soma de vetores",
    instructions:
      "Ajuste os vetores a e b para que a soma deles seja o vetor c",
    vectorCTail: [0, 0],
    vectorCTip: [-3, 4],
  },
  {
    order: 4,
    title: "Soma de vetores",
    instructions:
      "Ajuste os vetores a e b para que a soma deles seja o vetor c",
    vectorCTail: [0, 0],
    vectorCTip: [-2, -3],
  },
];

export const vectorSumAssignmentList = vectorSumAssignmentsProps.map(
  createAdjustVectorSumAssignment
);
