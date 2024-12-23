"use client";

import { Coordinates, LaTeX, Mafs, Transform, useMovablePoint } from "mafs";
import React from "react";

export default function Scene2D() {
  const pointA = useMovablePoint([1, 1], {
    constrain: ([x, y]) => [Math.round(x), Math.round(y)],
  });

  const screenHeight = window.innerHeight;

  return (
    <Mafs
      pan={true}
      height={screenHeight}
      viewBox={{
        x: [-10, 10],
      }}
    >
      <Coordinates.Cartesian subdivisions={2} />

      {pointA.element}

      <Transform translate={[-0.7, 0]}>
        <LaTeX
          at={pointA.point}
          tex={String.raw`
          \begin{bmatrix} ${pointA.x} \\ ${pointA.y} \end{bmatrix}
          `}
        />
      </Transform>
    </Mafs>
  );
}
