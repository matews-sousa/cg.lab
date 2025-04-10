import { TPolygon } from "@/types/Scene2DConfig";

export function createSquare(
  id: string,
  color: string,
  position: [number, number],
  size: [number, number],
  movable = false
): TPolygon {
  return {
    id,
    color,
    points: generateSquarePoints(position, size).map((point, index) => ({
      id: `${id}-${String.fromCharCode(65 + index)}`,
      position: point,
      movable,
    })),
  };
}

function generateSquarePoints(
  center: [number, number],
  size: [number, number]
): [number, number][] {
  const [cx, cy] = center;
  const [width, height] = size;
  const halfW = width / 2;
  const halfH = height / 2;

  return [
    [cx - halfW, cy - halfH], // Bottom-left
    [cx + halfW, cy - halfH], // Bottom-right
    [cx + halfW, cy + halfH], // Top-right
    [cx - halfW, cy + halfH], // Top-left
  ];
}
