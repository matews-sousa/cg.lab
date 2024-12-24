import { TPoint } from "@/types/Scene2DConfig";
import { LaTeX, MovablePoint, Point, Transform } from "mafs";
import { useScene2DStore } from "@/store/scene2DStore";

export default function CustomPoint({ point }: { point: TPoint }) {
  const { movePoint } = useScene2DStore();

  const constraints = point.constraints?.roundCoordinates
    ? ([x, y]: [number, number]) =>
        [Math.round(x), Math.round(y)] as [number, number]
    : undefined;

  const handlePointMove = (newPosition: [number, number]) => {
    movePoint(point.id, newPosition);
  };

  if (!point.movable) {
    return (
      <>
        <Point
          key={point.id}
          x={point.position[0]}
          y={point.position[1]}
          color={point.color}
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
      </>
    );
  }

  return (
    <>
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
    </>
  );
}
