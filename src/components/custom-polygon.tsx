import { Polygon, Transform, Vector } from "mafs";
import { memo, useMemo } from "react";
import CustomPoint from "./custom-point";
import { TPolygon } from "@/types/Scene2DConfig";
import { degreesToRadians } from "@/lib/utils";
import {
  applyTransformationsToPoint,
  applyTransformationsToPolygon,
} from "@/utils/matrix";

interface Props {
  polygon: TPolygon;
}

const DEFAULT_AXES = {
  xAxis: { tail: [0, 0] as [number, number], tip: [1, 0] as [number, number] },
  yAxis: { tail: [0, 0] as [number, number], tip: [0, 1] as [number, number] },
};

const CustomPolygon = memo(({ polygon }: Props) => {
  // Memoized transformed polygon
  const transformedPolygon = useMemo(() => {
    if (!polygon.rotationMatrix) return polygon;
    return applyTransformationsToPolygon(polygon, [polygon.rotationMatrix]);
  }, [polygon]);

  // Memoized transformed axes
  const transformedAxes = useMemo(() => {
    if (!polygon.rotationMatrix) return DEFAULT_AXES;

    return {
      xAxis: {
        ...DEFAULT_AXES.xAxis,
        tip: applyTransformationsToPoint(DEFAULT_AXES.xAxis.tip, [
          polygon.rotationMatrix,
        ]),
      },
      yAxis: {
        ...DEFAULT_AXES.yAxis,
        tip: applyTransformationsToPoint(DEFAULT_AXES.yAxis.tip, [
          polygon.rotationMatrix,
        ]),
      },
    };
  }, [polygon.rotationMatrix]);

  // Early return for simple polygons
  if (transformedPolygon.points.length < 4) {
    return (
      <>
        <Polygon
          points={transformedPolygon.points.map(p => p.position)}
          color={transformedPolygon.color}
          strokeStyle={transformedPolygon.strokeStyle}
        />
        {transformedPolygon.points.map(point => (
          <CustomPoint key={point.id} point={point} polygonId={polygon.id} />
        ))}
      </>
    );
  }

  return (
    <Transform
      translate={transformedPolygon.translation}
      rotate={degreesToRadians(transformedPolygon.rotation ?? 0)}
      scale={transformedPolygon.scale}
    >
      <Polygon
        points={transformedPolygon.points.map(p => p.position)}
        color={transformedPolygon.color}
        strokeStyle={transformedPolygon.strokeStyle}
      />
      {transformedPolygon.points.map(
        point =>
          point.movable && (
            <CustomPoint key={point.id} point={point} polygonId={polygon.id} />
          )
      )}
      <Vector
        color="red"
        tail={transformedAxes.xAxis.tail}
        tip={transformedAxes.xAxis.tip}
      />
      <Vector
        color="green"
        tail={transformedAxes.yAxis.tail}
        tip={transformedAxes.yAxis.tip}
      />
    </Transform>
  );
});

CustomPolygon.displayName = "CustomPolygon";
export default CustomPolygon;
