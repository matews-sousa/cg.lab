import React, { useEffect } from "react";
import {
  Matrix,
  MatrixType,
  MatrixValue,
  useFillBlankMatrixInputStore,
} from "@/store/fillInBlankMatrixInputStore";
import { useScene2DStore } from "@/store/scene2DStore";
import { useScene3DStore } from "@/store/scene3DStore";
import { Vector3 } from "three";

interface Props {
  matrix: Matrix;
}

export default function FillInMatrixInput({ matrix }: Props) {
  const { changeMatrixValue } = useFillBlankMatrixInputStore();
  const {
    getPoint,
    setPointTranslation,
    getPolygon,
    setPolygonScale,
    setPolygonRotation,
  } = useScene2DStore();
  const { getCube, updateCube } = useScene3DStore();

  const handleInputChange = (
    row: number,
    col: number,
    value: number | string
  ) => {
    // Do not allow empty strings or invalid numbers
    if (
      value === "" ||
      value === "-" ||
      value === "." ||
      value === "-." ||
      value === "-0." ||
      value === "-0" ||
      value === "0."
    ) {
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
      if (point && matrix.type === MatrixType.TRANSLATION) {
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
      if (polygon && matrix.type === MatrixType.SCALING) {
        const value00 = Number(matrix.matrixValue[0][0].value);
        const value11 = Number(matrix.matrixValue[1][1].value);
        const scale = [value00, value11] as [number, number];
        if (scale.some(isNaN)) return; // Do nothing if any value is NaN
        setPolygonScale(matrix.polygonRefId, scale);
      }

      if (matrix.type === MatrixType.ROTATION_Z) {
        const value00 = Number(matrix.matrixValue[0][0].value);
        const value01 = Number(matrix.matrixValue[0][1].value);
        const value10 = Number(matrix.matrixValue[1][0].value);
        const value11 = Number(matrix.matrixValue[1][1].value);
        const rotation = [value00, value01, value10, value11] as [
          number,
          number,
          number,
          number
        ];
        const valuesAreValid = rotation.every(
          value => !isNaN(value) && value === rotation[0]
        ); // Check if all values are the same and not NaN
        if (!valuesAreValid) return;
        setPolygonRotation(matrix.polygonRefId, rotation[0]);
      }
    }

    if (matrix.objectRefId) {
      // Apply transformation to object
      const cube = getCube(matrix.objectRefId);
      if (cube && matrix.type === MatrixType.TRANSLATION) {
        const translation = new Vector3(
          Number(matrix.matrixValue[0][3].value),
          Number(matrix.matrixValue[1][3].value),
          Number(matrix.matrixValue[2][3].value)
        );
        if (translation.toArray().some(isNaN)) return; // Do nothing if any value is NaN
        updateCube(cube.id, { ...cube, position: translation });
      }
      if (cube && matrix.type === MatrixType.SCALING) {
        const scale = new Vector3(
          Number(matrix.matrixValue[0][0].value),
          Number(matrix.matrixValue[1][1].value),
          Number(matrix.matrixValue[2][2].value)
        );
        if (scale.toArray().some(isNaN)) return; // Do nothing if any value is NaN
        updateCube(cube.id, { ...cube, scale });
      }
      if (cube && matrix.type === MatrixType.ROTATION_X) {
        const value22 = Number(matrix.matrixValue[1][1].value);
        const value23 = Number(matrix.matrixValue[1][2].value);
        const value32 = Number(matrix.matrixValue[2][1].value);
        const value33 = Number(matrix.matrixValue[2][2].value);
        const rotation = new Vector3(
          Number(matrix.matrixValue[1][1].value),
          0,
          0
        );
        const valuesAreValid = [value22, value23, value32, value33].every(
          value => !isNaN(value) && value === value22
        ); // Check if all values are the same and not NaN
        if (!valuesAreValid) return; // Do nothing if any value is NaN
        updateCube(cube.id, { ...cube, rotation });
      }
      if (cube && matrix.type === MatrixType.ROTATION_Y) {
        const value00 = Number(matrix.matrixValue[0][0].value);
        const value02 = Number(matrix.matrixValue[0][2].value);
        const value20 = Number(matrix.matrixValue[2][0].value);
        const value22 = Number(matrix.matrixValue[2][2].value);
        const rotation = new Vector3(
          0,
          Number(matrix.matrixValue[0][2].value),
          0
        );
        const valuesAreValid = [value00, value02, value20, value22].every(
          value => !isNaN(value) && value === value22
        ); // Check if all values are the same and not NaN
        if (!valuesAreValid) return; // Do nothing if any value is NaN
        updateCube(cube.id, { ...cube, rotation });
      }
      if (cube && matrix.type === MatrixType.ROTATION_Z) {
        const value11 = Number(matrix.matrixValue[0][0].value);
        const value12 = Number(matrix.matrixValue[0][1].value);
        const value21 = Number(matrix.matrixValue[1][0].value);
        const value22 = Number(matrix.matrixValue[1][1].value);
        const rotation = new Vector3(
          0,
          0,
          Number(matrix.matrixValue[1][0].value)
        );
        const valuesAreValid = [value11, value12, value21, value22].every(
          value => !isNaN(value) && value === value11
        ); // Check if all values are the same and not NaN
        if (!valuesAreValid) return; // Do nothing if any value is NaN
        updateCube(cube.id, { ...cube, rotation });
      }
    }
  }, [
    matrix,
    setPolygonScale,
    getPoint,
    getPolygon,
    setPointTranslation,
    setPolygonRotation,
    getCube,
    updateCube,
  ]);

  const trigMapping: Partial<Record<MatrixType, Record<string, string>>> = {
    [MatrixType.ROTATION_X]: {
      "1-1": "cos",
      "1-2": "-sin",
      "2-1": "sin",
      "2-2": "cos",
    },
    [MatrixType.ROTATION_Y]: {
      "0-0": "cos",
      "0-2": "sin",
      "2-0": "-sin",
      "2-2": "cos",
    },
    [MatrixType.ROTATION_Z]: {
      "0-0": "cos",
      "0-1": "-sin",
      "1-0": "sin",
      "1-1": "cos",
    },
  };

  const getTrigValue = (type: MatrixType, row: number, col: number) =>
    trigMapping[type]?.[`${row}-${col}`] || "";

  const generateEditableRotationMatrixCell = (
    matrixType: MatrixType,
    rowIndex: number,
    colIndex: number,
    cell: MatrixValue
  ) => {
    const trigValue = getTrigValue(matrixType, rowIndex, colIndex);

    return (
      <div
        className={`flex text-xs items-center justify-center ${
          trigValue ? "w-16" : "w-10"
        } h-10`}
        key={colIndex}
      >
        {trigValue && `${trigValue}(`}
        <input
          key={colIndex}
          type="text"
          autoComplete="off"
          className={`${
            trigValue ? "w-[30%]" : "w-full"
          } text-xs text-center bg-transparent border-b border-gray-500 focus:outline-none`}
          value={cell.value}
          onChange={e => handleInputChange(rowIndex, colIndex, e.target.value)}
        />
        {trigValue && ")"}
      </div>
    );
  };

  return (
    <div className="my-4">
      <div className="relative matrix">
        {matrix.matrixValue.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-between">
            {row.map((cell, colIndex) =>
              cell.editable ? (
                generateEditableRotationMatrixCell(
                  matrix.type,
                  rowIndex,
                  colIndex,
                  cell
                )
              ) : (
                <div
                  key={colIndex}
                  className="w-10 h-10 text-xs text-center bg-transparent flex items-center justify-center"
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
