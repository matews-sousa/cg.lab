import { useFillInTheBlankStore } from "@/store/fillInTheBlankStore";
import { useFillInTheBlankWithOptionsStore } from "@/store/fillInTheBlankWithOptionsStore";
import { useScene2DStore } from "@/store/scene2DStore";
import { Assignment, AssignmentType } from "@/types/Assignment";

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomPosition(range: [number, number]) {
  const [min, max] = range;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor() {
  const colors = ["red", "blue", "green", "yellow", "purple", "orange"];
  return getRandomElement(colors);
}

function getRandomLabel(index: number) {
  return String.fromCharCode(65 + index); // Generates labels like A, B, C, etc.
}

const goalConfigurations = {
  "move-to-position": {
    title: "Mover para posição",
    type: AssignmentType.INTERACTIVE,
    instructions: (pointLabel: string, goalPosition: [number, number]) =>
      `Mova o ponto ${pointLabel} para a posição (${goalPosition[0]}, ${goalPosition[1]}).`,
    movable: true,
  },
  "which-position": {
    title: "Qual a posição?",
    type: AssignmentType.FILL_IN_THE_BLANK_COORDINATES,
    instructions: (pointLabel: string) =>
      `Qual a posição do ponto ${pointLabel}?`,
    movable: false,
  },
  "fill-in-the-blank-with-options": {
    title: "Preencher os espaços em branco",
    type: AssignmentType.FILL_IN_THE_BLANK_WITH_OPTIONS,
    instructions: () =>
      `Preencha os espaços em branco com as coordenadas dos pontos.`,
    movable: false,
  },
};

export function generateRandomPointsAssignment(): Assignment & {
  dimensions: "2D" | "3D";
} {
  const numPoints = Math.floor(Math.random() * 3) + 2; // Randomly 2-4 points
  const positionRange: [number, number] = [-5, 5];
  const goal = getRandomElement(
    Object.keys(goalConfigurations) as Array<keyof typeof goalConfigurations>
  );

  const config = goalConfigurations[goal];
  const points = Array.from({ length: numPoints }, (_, index) => ({
    id: getRandomLabel(index),
    position: [
      getRandomPosition(positionRange),
      getRandomPosition(positionRange),
    ] as [number, number],
    movable: config.movable,
    color: getRandomColor(),
    label: getRandomLabel(index),
    constraints: {
      roundCoordinates: true,
    },
  }));

  const randomGoalPosition = [
    getRandomPosition(positionRange),
    getRandomPosition(positionRange),
  ] as [number, number];

  const randomTargetPoint = getRandomElement(points);

  const setupHandlers = {
    "move-to-position": () => {
      useScene2DStore.getState().setPoints(points);
    },
    "which-position": () => {
      useScene2DStore.getState().setPoints(points);
      useFillInTheBlankStore.getState().setInputs([
        {
          dimention: "2D",
          label: randomTargetPoint.label,
          pointRef: randomTargetPoint.id,
          coordinatesValue: { x: "", y: "" },
        },
      ]);
    },
    "fill-in-the-blank-with-options": () => {
      useScene2DStore.getState().setPoints(points);
      const sentence = `O ponto ${randomTargetPoint.label} tem coordenadas {coordinates${randomTargetPoint.label}}.`;
      const options = [
        {
          id: "1",
          value: `(${randomTargetPoint.position[0]},${randomTargetPoint.position[1]})`,
          correct: true,
        },
        {
          id: "2",
          value: `(${randomGoalPosition[0]},${randomGoalPosition[1]})`,
          correct: false,
        },
        {
          id: "3",
          value: `(${randomGoalPosition[1]},${randomGoalPosition[0]})`,
          correct: false,
        },
        {
          id: "4",
          value: `(${randomTargetPoint.position[1]},${randomTargetPoint.position[0]})`,
          correct: false,
        },
      ];
      useFillInTheBlankWithOptionsStore.getState().setSentence(sentence);
      useFillInTheBlankWithOptionsStore.getState().setOptions(options);
    },
  };

  const validateHandlers = {
    "move-to-position": () => {
      const point = useScene2DStore.getState().getPoint(randomTargetPoint.id);
      return (
        point?.position[0] === randomGoalPosition[0] &&
        point?.position[1] === randomGoalPosition[1]
      );
    },
    "which-position": () => {
      const point = useScene2DStore.getState().getPoint(randomTargetPoint.id);
      const input = useFillInTheBlankStore
        .getState()
        .getInputByPointRef(randomTargetPoint.id);
      return (
        point?.position[0] === input?.coordinatesValue.x &&
        point?.position[1] === input?.coordinatesValue.y
      );
    },
    "fill-in-the-blank-with-options": () => {
      const { selectedOptions, options } =
        useFillInTheBlankWithOptionsStore.getState();
      return selectedOptions.every(
        optionId => options.find(option => option.id === optionId)?.correct
      );
    },
  };

  return {
    id: `assignment-${Math.random().toString(36).substring(7)}`,
    order: Math.floor(Math.random() * 100), // Random order
    title: config.title,
    instructions: config.instructions(
      randomTargetPoint.label,
      randomGoalPosition
    ),
    type: config.type,
    setup: setupHandlers[goal],
    validate: validateHandlers[goal],
    dimensions: "2D",
  };
}
