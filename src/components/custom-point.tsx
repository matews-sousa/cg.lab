import { TPoint } from "@/types/Scene2DConfig";
import { LaTeX, MovablePoint, Point, Transform } from "mafs";
import { useScene2DStore } from "@/store/scene2DStore";

interface Props {
  point: TPoint;
  polygonId?: string;
}

export default function CustomPoint({ point, polygonId }: Props) {
  const { movePoint, movePolygonPoint } = useScene2DStore();

  const gridStep = 0.5;

  // Constraint function to snap to grid points
  const constraints = (mousePosition: [number, number]) => {
    const [x, y] = mousePosition;
    return [
      Math.round(x / gridStep) * gridStep, // Snap x to the nearest grid step
      Math.round(y / gridStep) * gridStep, // Snap y to the nearest grid step
    ] as [number, number];
  };

  const handlePointMove = (newPosition: [number, number]) => {
    if (polygonId) {
      movePolygonPoint(polygonId, point.id, newPosition);
    } else {
      movePoint(point.id, newPosition);
    }
  };

  if (!point.movable) {
    return (
      <>
        <Transform translate={point.translation} scale={point.scale}>
          <Point
            key={point.id}
            x={point.position[0]}
            y={point.position[1]}
            color={point.color}
          />
        </Transform>
        {point.label && (
          <Transform
            translate={
              point.translation
                ? [0 + point.translation[0], -0.7 + point.translation[1]]
                : [0, -0.7]
            }
          >
            <Transform scale={point.scale}>
              <LaTeX
                at={point.position}
                tex={point.label
                  ?.replace("${x}", point.position[0].toString())
                  .replace("${y}", point.position[1].toString())}
              />
            </Transform>
          </Transform>
        )}
      </>
    );
  }

  return (
    <>
      <Transform translate={point.translation}>
        <MovablePoint
          key={point.id}
          point={point.position}
          color={point.color}
          constrain={constraints}
          onMove={newPosition => handlePointMove(newPosition)}
        />
        {point.label && (
          <Transform translate={[0, -0.7]}>
            <LaTeX
              at={point.position}
              tex={point.label
                ?.replace("${x}", point.position[0].toString())
                .replace("${y}", point.position[1].toString())}
            />
          </Transform>
        )}
      </Transform>
    </>
  );
}
