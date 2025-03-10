import React, { Fragment, useEffect } from "react";
import "katex/dist/katex.min.css";
import Latex from "react-latex-next";
import { Matrix3, Matrix4 } from "three";
import { useOrderMatrixStore } from "@/store/orderMatrixMultiplicationStore";
import { useScene2DStore } from "@/store/scene2DStore";

export default function OrderMatrixMultiplication() {
  const { matrices, objects, addObjectMatrix, removeObjectMatrix } =
    useOrderMatrixStore();
  const { getPolygon, setPolygonPoints } = useScene2DStore();

  useEffect(() => {
    const objectsKeys = Object.keys(objects);
    objectsKeys.forEach(objectKey => {
      const sceneObject = getPolygon(objectKey);
      const objectMatrices = objects[objectKey];
      const newPoints = sceneObject?.originalPoints?.map(point => {
        const modelMatrix = new Matrix3().identity();
        objectMatrices.forEach(matrix => {
          if (matrix instanceof Matrix3) {
            modelMatrix.multiply(matrix);
          }
        });

        // Apply the model matrix to the point
        const x = point.position[0];
        const y = point.position[1];
        const w = 1;
        const newX =
          modelMatrix.elements[0] * x +
          modelMatrix.elements[1] * y +
          modelMatrix.elements[2] * w;
        const newY =
          modelMatrix.elements[3] * x +
          modelMatrix.elements[4] * y +
          modelMatrix.elements[5] * w;
        return {
          id: point.id,
          position: [newX, newY] as [number, number],
          movable: false,
        };
      });
      if (sceneObject && newPoints)
        setPolygonPoints(sceneObject?.id, newPoints);
    });
  }, [objects, getPolygon, setPolygonPoints]);

  return (
    <>
      <div className="flex justify-center gap-4 bottom-0 right-0 p-4">
        {matrices.map((matrix, index) => (
          <button
            key={index}
            className="bg-blue-300 rounded-md"
            onClick={() => addObjectMatrix("square1", matrix)}
          >
            <MatrixLatex matrix={matrix} />
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-4 mt-2">
        {Object.keys(objects).map(objectKey => (
          <div key={objectKey}>
            {Object.keys(objects).length > 1 && (
              <p className="font-bold mb-1 text-left">{objectKey}</p>
            )}
            <div className="bg-green-300 flex items-center justify-center p-2 rounded-md gap-1 overflow-auto">
              {objects[objectKey].map((matrix, index) => (
                <Fragment key={index}>
                  <button
                    className="bg-blue-300 rounded-md"
                    onClick={() => removeObjectMatrix(objectKey, index)}
                  >
                    <MatrixLatex matrix={matrix} />
                  </button>
                  {index < objects[objectKey].length - 1 && (
                    <Latex>{`$$\\times$$`}</Latex>
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function MatrixLatex({ matrix }: { matrix: Matrix3 | Matrix4 }) {
  if (matrix instanceof Matrix3) {
    return (
      <div className="bg-blue-300 rounded-md px-2">
        <Latex>
          {`$$
          \\begin{bmatrix}
            ${matrix.elements[0]} & ${matrix.elements[1]} & ${matrix.elements[2]} \\\\
            ${matrix.elements[3]} & ${matrix.elements[4]} & ${matrix.elements[5]} \\\\
            ${matrix.elements[6]} & ${matrix.elements[7]} & ${matrix.elements[8]} \\\\
          \\end{bmatrix}
          $$`}
        </Latex>
      </div>
    );
  } else {
    return (
      <div className="bg-blue-300 rounded-md">
        <Latex>
          {`$$
          \\begin{bmatrix}
            ${matrix.elements[0]} & ${matrix.elements[1]} & ${matrix.elements[2]} & ${matrix.elements[3]} \\\\
            ${matrix.elements[4]} & ${matrix.elements[5]} & ${matrix.elements[6]} & ${matrix.elements[7]} \\\\
            ${matrix.elements[8]} & ${matrix.elements[9]} & ${matrix.elements[10]} & ${matrix.elements[11]} \\\\
            ${matrix.elements[12]} & ${matrix.elements[13]} & ${matrix.elements[14]} & ${matrix.elements[15]} \\\\
          \\end{bmatrix}
          $$`}
        </Latex>
      </div>
    );
  }
}
