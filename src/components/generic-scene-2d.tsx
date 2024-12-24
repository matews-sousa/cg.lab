"use client";

import useWindowSize from "@/hooks/useWindowSize";
import { Coordinates, Mafs } from "mafs";
import CustomPoint from "./custom-point";
import VectorWithControls from "./vector-with-controls";
import { Scene2DConfig } from "@/types/Scene2DConfig";

export default function GenericScene2D({ config }: { config: Scene2DConfig }) {
  const windowSize = useWindowSize();

  return (
    <Mafs pan={config.pan} viewBox={config.viewBox} height={windowSize.height}>
      <Coordinates.Cartesian subdivisions={config.grid.subdivisions} />

      {config.vectors?.map(vector => (
        <VectorWithControls key={vector.label} vector={vector} />
      ))}

      {config.points?.map(point => {
        return <CustomPoint key={point.id} point={point} />;
      })}
    </Mafs>
  );
}
