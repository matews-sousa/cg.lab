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

const AXIS_LENGTH = 1; // Length of coordinate axes vectors

const CustomPolygon = memo(({ polygon }: Props) => {
  // Calculate polygon center in local space
  const polygonCenter = useMemo(() => {
    if (polygon.points.length === 0) return [0, 0] as [number, number];

    const sum = polygon.points.reduce(
      (acc, point) => {
        return [acc[0] + point.position[0], acc[1] + point.position[1]];
      },
      [0, 0]
    );

    return [sum[0] / polygon.points.length, sum[1] / polygon.points.length] as [
      number,
      number,
    ];
  }, [polygon.points]);

  // Memoized transformed polygon
  const transformedPolygon = useMemo(() => {
    if (!polygon.rotationMatrix) return polygon;
    return applyTransformationsToPolygon(polygon, [polygon.rotationMatrix]);
  }, [polygon]);

  // Get transformed center point (accounts for rotation)
  const transformedCenter = useMemo(() => {
    if (!polygon.rotationMatrix) return polygonCenter;
    return applyTransformationsToPoint(polygonCenter, [polygon.rotationMatrix]);
  }, [polygon.rotationMatrix, polygonCenter]);

  // Local space axes (before any transformations)
  const localAxes = useMemo(
    () => ({
      xAxis: {
        tail: [0, 0] as [number, number],
        tip: [AXIS_LENGTH, 0] as [number, number],
      },
      yAxis: {
        tail: [0, 0] as [number, number],
        tip: [0, AXIS_LENGTH] as [number, number],
      },
    }),
    []
  );

  // Memoized transformed axes (rotated in local space, then positioned at transformed center)
  const transformedAxes = useMemo(() => {
    // Apply rotation to local axes
    const rotateVector = (vector: [number, number]) => {
      if (!polygon.rotationMatrix) return vector;
      return applyTransformationsToPoint(vector, [polygon.rotationMatrix]);
    };

    const xTip = rotateVector(localAxes.xAxis.tip);
    const yTip = rotateVector(localAxes.yAxis.tip);

    // Position the rotated axes at the transformed center point
    return {
      xAxis: {
        tail: transformedCenter,
        tip: [
          transformedCenter[0] + xTip[0],
          transformedCenter[1] + xTip[1],
        ] as [number, number],
      },
      yAxis: {
        tail: transformedCenter,
        tip: [
          transformedCenter[0] + yTip[0],
          transformedCenter[1] + yTip[1],
        ] as [number, number],
      },
    };
  }, [polygon.rotationMatrix, transformedCenter, localAxes]);

  // Early return for simple polygons
  if (transformedPolygon.points.length < 4) {
    return (
      <Transform
        translate={transformedPolygon.translation}
        rotate={degreesToRadians(transformedPolygon.rotation ?? 0)}
        scale={transformedPolygon.scale}
      >
        <Polygon
          fillOpacity={polygon.opacity}
          strokeOpacity={polygon.opacity}
          points={transformedPolygon.points.map(p => p.position)}
          color={transformedPolygon.color}
          strokeStyle={transformedPolygon.strokeStyle}
        />
        {transformedPolygon.points.map(point => (
          <CustomPoint key={point.id} point={point} polygonId={polygon.id} />
        ))}
      </Transform>
    );
  }

  return (
    <Transform
      translate={transformedPolygon.translation}
      rotate={degreesToRadians(transformedPolygon.rotation ?? 0)}
      scale={transformedPolygon.scale}
    >
      <Polygon
        fillOpacity={polygon.opacity}
        strokeOpacity={polygon.opacity}
        points={transformedPolygon.points.map(p => p.position)}
        color={transformedPolygon.color}
        strokeStyle={transformedPolygon.strokeStyle}
      />
      {transformedPolygon.points.map(
        point =>
          point.movable && (
            <CustomPoint
              key={point.id}
              point={point}
              polygonId={transformedPolygon.id}
            />
          )
      )}
      {polygon.displayAxes && (
        <>
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
        </>
      )}
    </Transform>
  );
});

CustomPolygon.displayName = "CustomPolygon";
export default CustomPolygon;
