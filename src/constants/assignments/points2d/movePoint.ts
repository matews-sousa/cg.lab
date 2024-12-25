import { useScene2DStore } from "@/store/scene2DStore";
import { Assignment, AssignmentType } from "@/types/Assignment";

export const movePointAssignment: Assignment = {
  id: "move-point",
  order: 1,
  title: "Mova o ponto",
  instructions: "Mova o ponto A para a posição (3, 2).",
  type: AssignmentType.INTERACTIVE,
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
