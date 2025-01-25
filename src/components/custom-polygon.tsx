import { Polygon, Transform } from "mafs";
import CustomPoint from "./custom-point";
import { TPolygon } from "@/types/Scene2DConfig";
import { degreesToRadians } from "@/lib/utils";

interface Props {
  polygon: TPolygon;
}

export default function CustomPolygon({ polygon }: Props) {
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
      <Transform translate={polygon.translation}>
        <Transform rotate={degreesToRadians(polygon.rotation ?? 0)}>
          <Transform scale={polygon.scale}>
            {/* Render polygon */}
            <Polygon
              key={polygon.id}
              points={polygon.points.map(point => point.position)}
              color={polygon.color}
              strokeStyle={polygon.strokeStyle}
            />
            {/* Render vertices as draggable points */}
            {polygon.points.map(point => (
              <CustomPoint
                key={point.id}
                point={point}
                polygonId={polygon.id}
              />
            ))}
          </Transform>
        </Transform>
      </Transform>
    </>
  );
}
