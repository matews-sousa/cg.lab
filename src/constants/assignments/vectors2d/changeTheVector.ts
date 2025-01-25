import { useScene2DStore } from "@/store/scene2DStore";
import { Assignment, AssignmentType } from "@/types/Assignment";
import { vec } from "mafs";

interface ChangeTheVectorAssignmentProps {
  order: number;
  title: string;
  instructions: string;
  tail: [number, number];
  tip: [number, number];
  goalVector: [number, number];
}

function createChangeTheVectorAssignment({
  order,
  title,
  instructions,
  tail,
  tip,
  goalVector,
}: ChangeTheVectorAssignmentProps): Assignment {
  return {
    id: `change-the-vector-${order}`,
    order,
    title,
    instructions,
    type: AssignmentType.INTERACTIVE,
    setup: () => {
      useScene2DStore.getState().reset();
      const { setVectors } = useScene2DStore.getState();
      setVectors([
        {
          id: "a",
          tail: tail,
          tip: tip,
          tailMovable: true,
          tipMovable: true,
          color: "red",
          label: "a",
        },
      ]);
    },
    validate: () => {
      const { getVector } = useScene2DStore.getState();
      const a = getVector("a");
      if (!a) return false;

      const vecA = vec.sub(a.tip, a.tail);
      const isCorrect = vecA[0] === goalVector[0] && vecA[1] === goalVector[1];
      return isCorrect;
    },
  };
}

const changeTheVectorAssignments: ChangeTheVectorAssignmentProps[] = [
  {
    order: 1,
    title: "Mude o vetor",
    instructions: "Transforme o vetor num vetor (3, 2)",
    tail: [0, 0],
    tip: [-2, 1],
    goalVector: [3, 2],
  },
  {
    order: 2,
    title: "Mude o vetor",
    instructions: "Transforme o vetor num vetor (1, 1)",
    tail: [0, 0],
    tip: [2, 3],
    goalVector: [1, 1],
  },
  {
    order: 3,
    title: "Mude o vetor",
    instructions: "Transforme o vetor num vetor (-3, 2)",
    tail: [0, 0],
    tip: [1, 1],
    goalVector: [-3, 2],
  },
  {
    order: 4,
    title: "Mude o vetor",
    instructions: "Transforme o vetor num vetor (2, -4)",
    tail: [1, 2],
    tip: [1, 1],
    goalVector: [2, -4],
  },
];

export const changeTheVectorAssignmentList: Assignment[] =
  changeTheVectorAssignments.map(createChangeTheVectorAssignment);
