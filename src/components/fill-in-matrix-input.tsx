import React, { useEffect } from "react";
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
  const { getPoint, setPointTranslation, getPolygon, setPolygonScale } =
    useScene2DStore();

  const handleInputChange = (
    row: number,
    col: number,
    value: number | string
  ) => {
    // Allow empty input or just a single dash ("-")
    if (value === "" || value === "-") {
      changeMatrixValue(matrix.id, row, col, value);
      return;
    }

    // Parse the number only if it's valid
    const num = Number(value);
    if (!isNaN(num)) {
      changeMatrixValue(matrix.id, row, col, num);
    }
  };

  // Apply transformation whenever the matrix value changes
  useEffect(() => {
    if (matrix.pointRefId) {
      const point = getPoint(matrix.pointRefId);
      if (point && matrix.type === "translation") {
        const translation = [
          Number(matrix.matrixValue[0][2].value),
          Number(matrix.matrixValue[1][2].value),
        ] as [number, number];
        if (translation.some(isNaN)) return; // Do nothing if any value is NaN
        setPointTranslation(matrix.pointRefId, translation);
      }
    }

    if (matrix.polygonRefId) {
      const polygon = getPolygon(matrix.polygonRefId);
      if (polygon && matrix.type === "scaling") {
        const value00 = Number(matrix.matrixValue[0][0].value);
        const value11 = Number(matrix.matrixValue[1][1].value);
        const scale = [value00, value11] as [number, number];
        if (scale.some(isNaN)) return; // Do nothing if any value is NaN
        setPolygonScale(matrix.polygonRefId, scale);
      }
    }
  }, [matrix, setPolygonScale, getPoint, getPolygon, setPointTranslation]);

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
                    handleInputChange(rowIndex, colIndex, e.target.value)
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
