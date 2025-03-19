import { useScene2DStore } from "@/store/scene2DStore";
import { Coordinates, Mafs } from "mafs";
import React from "react";
import CustomPolygon from "./custom-polygon";

export default function ObjectivePanel2D() {
  const { config } = useScene2DStore();

  if (!config.objectivePolygons) return null;

  return (
    <div className="absolute top-4 right-4 border-2 border-gray-400 bg-black rounded-sm w-[30%] h-64 overflow-hidden">
      <Mafs pan={true} viewBox={{ x: [-5, 5], y: [-4, 4] }} height={250}>
        <Coordinates.Cartesian subdivisions={2} />

        {config.objectivePolygons?.map(polygon => (
          <CustomPolygon key={polygon.id} polygon={polygon} />
        ))}
      </Mafs>
    </div>
  );
}
