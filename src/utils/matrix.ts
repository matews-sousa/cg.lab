import { degreesToRadians } from "@/lib/utils";
import { TPolygon } from "@/types/Scene2DConfig";
import { Matrix3, Vector2 } from "three";

export function create2DTranslationMatrix(x: number, y: number): Matrix3 {
  return new Matrix3().translate(x, y);
}

export function create2DScaleMatrix(sx: number, sy: number): Matrix3 {
  return new Matrix3().scale(sx, sy);
}

export function create2DRotationMatrix(angleInDegrees: number): Matrix3 {
  return new Matrix3().rotate(degreesToRadians(angleInDegrees));
}

export function applyTransformationsToPoint(
  point: [number, number],
  matrices: Matrix3[]
): [number, number] {
  let modelMatrix = new Matrix3().identity();
  matrices.forEach(matrix => {
    modelMatrix = matrix.clone().multiply(modelMatrix);
  });
  // Transpose the model matrix if in production mode
  // This is a hack to make the transformations work correctly in production
  // TODO: Fix this in the future
  if (process.env.NODE_ENV === "production") {
    modelMatrix = modelMatrix.transpose();
  }

  const vector = new Vector2(point[0], point[1]);
  const transformedVec = vector.clone().applyMatrix3(modelMatrix);
  const transformedPoint = [transformedVec.x, transformedVec.y] as [
    number,
    number,
  ];
  return transformedPoint;
}

export function applyTransformationsToPolygon(
  polygon: TPolygon,
  matrices: Matrix3[]
): TPolygon {
  const modelMatrix = matrices
    .reduce(
      (acc, matrix) => acc.multiply(matrix.transpose()),
      new Matrix3().identity()
    )
    .transpose();

  const newPoints = polygon.points.map(point => {
    const vector = new Vector2(point.position[0], point.position[1]);
    vector.applyMatrix3(modelMatrix);
    return {
      ...point,
      position: [vector.x, vector.y] as [number, number],
    };
  });

  return {
    ...polygon,
    points: newPoints,
  };
}
