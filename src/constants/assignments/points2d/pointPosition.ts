import {
  TOption,
  useFillInTheBlankWithOptionsStore,
} from "@/store/fillInTheBlankWithOptionsStore";
import { useScene2DStore } from "@/store/scene2DStore";
import { Assignment, AssignmentType } from "@/types/Assignment";
import { shuffleArray } from "@/utils";

interface PointPositionWithOptionAssignmentProps {
  order: number;
  title: string;
  instructions: string;
  pointPosition: [number, number];
  options: TOption[];
}

function createPointPositionWithOptionsAssignment({
  order,
  title,
  instructions,
  pointPosition,
  options,
}: PointPositionWithOptionAssignmentProps): Assignment {
  return {
    id: `point-position-${order}`,
    order,
    title,
    instructions,
    type: AssignmentType.FILL_IN_THE_BLANK_WITH_OPTIONS,
    setup() {
      const { setPoints } = useScene2DStore.getState();
      setPoints([
        {
          id: "A",
          position: pointPosition,
          label: "A",
          movable: false,
          color: "red",
        },
      ]);

      const { setSentence, setOptions } =
        useFillInTheBlankWithOptionsStore.getState();

      setSentence("A posição do ponto A é {coordinatesA}");

      const optionsShuffled = shuffleArray(options);
      setOptions(optionsShuffled);
    },
    validate() {
      const { selectedOptions } = useFillInTheBlankWithOptionsStore.getState();
      const coordinatesAAnswer = selectedOptions["coordinatesA"];

      const isCorrect = coordinatesAAnswer.correct;

      return isCorrect;
    },
  };
}

const pointPositionWithOptionsAssignments: PointPositionWithOptionAssignmentProps[] =
  [
    {
      order: 6,
      title: "Posição do ponto",
      instructions: "Complete o espaço em branco.",
      pointPosition: [3, 2] as [number, number],
      options: [
        { id: "option-1", value: "(3, 2)", correct: true },
        { id: "option-2", value: "(2, 3)", correct: false },
        { id: "option-3", value: "(2, 2)", correct: false },
        { id: "option-4", value: "(3, 3)", correct: false },
      ],
    },
    {
      order: 7,
      title: "Posição do ponto 2",
      instructions: "Complete o espaço em branco.",
      pointPosition: [-3, -2] as [number, number],
      options: [
        { id: "option-1", value: "(-3, -2)", correct: true },
        { id: "option-2", value: "(-2, -3)", correct: false },
        { id: "option-3", value: "(-2, -2)", correct: false },
        { id: "option-4", value: "(-3, -3)", correct: false },
      ],
    },
    {
      order: 8,
      instructions: "Complete o espaço em branco.",
      title: "Posição do ponto 3",
      pointPosition: [0, 5] as [number, number],
      options: [
        { id: "option-1", value: "(0, 5)", correct: true },
        { id: "option-2", value: "(5, 0)", correct: false },
        { id: "option-3", value: "(0, 0)", correct: false },
        { id: "option-4", value: "(5, 5)", correct: false },
      ],
    },
  ];

export const pointPositionWithOptionsAssignmentsList =
  pointPositionWithOptionsAssignments.map(assi =>
    createPointPositionWithOptionsAssignment(assi)
  );
