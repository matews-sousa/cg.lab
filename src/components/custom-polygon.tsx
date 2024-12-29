import { Polygon, Transform, useMovablePoint } from "mafs";
import CustomPoint from "./custom-point";
import { TPolygon } from "@/types/Scene2DConfig";

interface Props {
  polygon: TPolygon;
}

export default function CustomPolygon({ polygon }: Props) {
  // Calculate the polygon's center
  const polygonCenter = polygon.points
    .reduce(
      (acc, point) => [acc[0] + point.position[0], acc[1] + point.position[1]],
      [0, 0]
    )
    .map(coord => coord / polygon.points.length) as [number, number];

  // Translation control
  const t = useMovablePoint(polygonCenter, {
    constrain: ([x, y]) => [Math.round(x), Math.round(y)],
  });

  if (polygon.points.length < 4) {
    return (
      <>
        <Polygon
          key={polygon.id}
          points={polygon.points.map(point => point.position)}
          color={polygon.color}
          strokeStyle={polygon.strokeStyle}
        />
        {polygon.points.map(point => (
          <CustomPoint key={point.id} point={point} polygonId={polygon.id} />
        ))}
      </>
    );
  }

  return (
    <>
      {/* Transformations */}
      <Transform translate={t.point}>
        <Transform scale={polygon.scale}>
          <Polygon
            key={polygon.id}
            points={polygon.points.map(point => point.position)}
            color={polygon.color}
            strokeStyle={polygon.strokeStyle}
          />
          {polygon.points.map(point => (
            <CustomPoint key={point.id} point={point} polygonId={polygon.id} />
          ))}
        </Transform>
        {/* Render vertices as draggable points */}
      </Transform>
      {/* Render controls */}
      {polygon.movable && t.element}
    </>
  );
}
