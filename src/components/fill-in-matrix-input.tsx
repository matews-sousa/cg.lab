import React, { useEffect, useState, useCallback } from "react";
import {
  Matrix,
  useFillBlankMatrixInputStore,
} from "@/store/fillInBlankMatrixInputStore";
import { useScene2DStore } from "@/store/scene2DStore";

interface Props {
  matrix: Matrix;
}

export default function FillInMatrixInput({ matrix }: Props) {
  const { changeMatrixValue } = useFillBlankMatrixInputStore();
  const { movePoint, getPoint } = useScene2DStore();
  const [originalPointPosition, setOriginalPointPosition] = useState<
    [number, number]
  >([0, 0]);

  const applyTransformation = useCallback(
    (
      matrixValue: typeof matrix.matrixValue,
      originalPosition: [number, number],
      pointRefId: string
    ) => {
      const [x, y, z] = [originalPosition[0], originalPosition[1], 1]; // Homogeneous coordinates

      const value00 = Number(matrixValue[0][0].value);
      const value01 = Number(matrixValue[0][1].value);
      const value02 = Number(matrixValue[0][2].value);
      const value10 = Number(matrixValue[1][0].value);
      const value11 = Number(matrixValue[1][1].value);
      const value12 = Number(matrixValue[1][2].value);

      const transformedX = value00 * x + value01 * y + value02 * z;
      const transformedY = value10 * x + value11 * y + value12 * z;

      movePoint(pointRefId, [transformedX, transformedY]);
    },
    [movePoint, matrix]
  );

  const handleInputChange = (row: number, col: number, value: number) => {
    changeMatrixValue(matrix.id, row, col, value);
  };

  // Initialize the original position of the referenced point
  useEffect(() => {
    if (matrix.pointRefId) {
      const point = getPoint(matrix.pointRefId);
      if (point) {
        setOriginalPointPosition(point.position);
      }
    }
  }, [matrix.pointRefId, getPoint]);

  // Apply transformation whenever the matrix value changes
  useEffect(() => {
    if (matrix.pointRefId) {
      const point = getPoint(matrix.pointRefId);
      if (point) {
        applyTransformation(
          matrix.matrixValue,
          originalPointPosition,
          matrix.pointRefId
        );
      }
    }
  }, [
    matrix.matrixValue,
    originalPointPosition,
    matrix.pointRefId,
    applyTransformation,
    getPoint,
  ]);

  return (
    <div className="my-4">
      <div className="relative matrix">
        {matrix.matrixValue.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((cell, colIndex) =>
              cell.editable ? (
                <input
                  key={colIndex}
                  type="text"
                  className="w-12 h-12 text-center bg-transparent border-b border-gray-500 focus:outline-none"
                  value={cell.value}
                  onChange={e =>
                    handleInputChange(
                      rowIndex,
                      colIndex,
                      Number(e.target.value)
                    )
                  }
                />
              ) : (
                <div
                  key={colIndex}
                  className="w-12 h-12 text-center bg-transparent flex items-center justify-center"
                >
                  {cell.value}
                </div>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
