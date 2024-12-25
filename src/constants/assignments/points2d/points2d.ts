import { useScene2DStore } from "@/store/scene2DStore";

export interface Assignment {
  id: string;
  order: number;
  title: string;
  instructions: string;
  setup: () => void;
  validate: () => boolean;
}

export const movePointAssignment: Assignment = {
  id: "move-point",
  order: 1,
  title: "Mova o ponto",
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

export const perpendicularAssignment: Assignment = {
  id: "perpendicular-point",
  order: 2,
  title: "Perpendicularidade",
  instructions: "Mova os pontos para que fiquem perpendiculares verticalmente.",
  setup: () => {
    const { setPoints } = useScene2DStore.getState();
    setPoints([
      {
        id: "A",
        position: [-3, 0],
        movable: true,
        color: "blue",
        label: "A",
        constraints: {
          roundCoordinates: true,
        },
      },
      {
        id: "B",
        position: [3, 0],
        movable: true,
        color: "green",
        label: "B",
        constraints: {
          roundCoordinates: true,
        },
      },
    ]);
  },
  validate: () => {
    const { getPoint } = useScene2DStore.getState();
    const pointA = getPoint("A");
    const pointB = getPoint("B");
    return pointA?.position[0] === pointB?.position[0];
  },
};

export const pointsAssignments = [movePointAssignment, perpendicularAssignment];
