import React, { useState } from "react";
import { TPoint } from "@/types/Scene2DConfig";
import { LaTeX, MovablePoint, Point, Transform } from "mafs";

export default function CustomPoint({ point }: { point: TPoint }) {
  const [position, setPosition] = useState(point.initialPosition);

  const constraints = point.constraints?.roundCoordinates
    ? ([x, y]: [number, number]) =>
        [Math.round(x), Math.round(y)] as [number, number]
    : undefined;

  const handlePointMove = (newPosition: [number, number]) => {
    setPosition(newPosition);
  };

  if (!point.movable) {
    return (
      <>
        <Point
          key={point.id}
          x={position[0]}
          y={position[1]}
          color={point.color}
        />
        {point.label && (
          <Transform translate={[0, -0.7]}>
            <LaTeX
              at={position}
              tex={point.label
                ?.replace("${x}", position[0].toString())
                .replace("${y}", position[1].toString())}
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
        point={position}
        color={point.color}
        constrain={constraints}
        onMove={newPosition => handlePointMove(newPosition)}
      />
      {point.label && (
        <Transform translate={[0, -0.7]}>
          <LaTeX
            at={position}
            tex={point.label
              ?.replace("${x}", position[0].toString())
              .replace("${y}", position[1].toString())}
          />
        </Transform>
      )}
    </>
  );
}
