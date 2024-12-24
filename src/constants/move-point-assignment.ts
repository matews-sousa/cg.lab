import { useScene2DStore } from "@/store/scene2DStore";

export interface Assignment {
  id: string;
  instructions: string;
  setup: () => void;
  validate: () => boolean;
}

export const movePointAssignment: Assignment = {
  id: "move-point",
  instructions: "Mova o ponto A para a posição (3, 2).",
  setup: () => {
    const { setPoints } = useScene2DStore.getState();
    setPoints([
      {
        id: "A",
        position: [0, 0],
        movable: true,
        color: "red",
        label: "A",
        constraints: {
          roundCoordinates: true,
        },
      },
    ]);
  },
  validate: () => {
    const { getPoint } = useScene2DStore.getState();
    const point = getPoint("A");
    if (!point) return false;

    return point.position[0] === 3 && point.position[1] === 2;
  },
};
