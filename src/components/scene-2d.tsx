"use client";

import useWindowSize from "@/hooks/useWindowSize";
import {
  Coordinates,
  LaTeX,
  Mafs,
  MovablePoint,
  Transform,
  UseMovablePoint,
} from "mafs";
import { useState } from "react";

export default function Scene2D({ pointA }: { pointA: UseMovablePoint }) {
  const windowSize = useWindowSize();

  const [pointPosition, setPointPosition] = useState<[number, number]>([1, 2]);

  return (
    <Mafs
      pan={true}
      height={windowSize.height}
      viewBox={{
        x: [-10, 10],
      }}
    >
      <Coordinates.Cartesian subdivisions={2} />

      <MovablePoint
        point={pointPosition}
        color="red"
        onMove={point => {
          setPointPosition(point);
        }}
        constrain={([x, y]) => [Math.round(x), Math.round(y)]}
      />
      <Transform translate={[0, -0.5]}>
        <LaTeX at={pointPosition} tex={String.raw`B`} />
      </Transform>

      {pointA.element}

      <Transform translate={[0, -0.5]}>
        <LaTeX at={pointA.point} tex={String.raw`A`} />
      </Transform>
    </Mafs>
  );
}
