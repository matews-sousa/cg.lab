import { useFillInTheBlankWithOptionsStore } from "@/store/fillInTheBlankWithOptionsStore";
import { useScene2DStore } from "@/store/scene2DStore";
import { Assignment, AssignmentType } from "@/types/Assignment";

export const pointPosition: Assignment = {
  id: "point-position",
  title: "Posição do ponto",
  instructions: "Complete o espaço em branco.",
  type: AssignmentType.FILL_IN_THE_BLANK_WITH_OPTIONS,
  order: 6,
  setup: () => {
    const { setPoints } = useScene2DStore.getState();
    setPoints([
      {
        id: "A",
        position: [-3, 5],
        label: "A",
        movable: false,
      },
    ]);

    const { setSentence, setOptions } =
      useFillInTheBlankWithOptionsStore.getState();

    setSentence("A posição do ponto A é {coordinatesA}");
    setOptions([
      { id: "1", value: "(-3,5)", correct: true },
      { id: "2", value: "(3,5)", correct: false },
      { id: "4", value: "(3,-5)", correct: false },
      { id: "3", value: "(-3,-5)", correct: false },
    ]);
  },
  validate: () => {
    const { selectedValues } = useFillInTheBlankWithOptionsStore.getState();
    const coordinatesAAnswer = selectedValues["coordinatesA"];

    const isCorrect = coordinatesAAnswer === "(-3,5)";

    return isCorrect;
  },
};
