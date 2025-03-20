import { MatrixType, MatrixValue } from "@/store/fillInBlankMatrixInputStore";
import {
  Option,
  useFillInMatrixWithOptionsStore,
} from "@/store/fillInMatrixWithOptions";
import { MousePointerSquareDashedIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect } from "react";
import { useScene3DStore } from "@/store/scene3DStore";
import { Matrix4 } from "three";
import { useScene2DStore } from "@/store/scene2DStore";

export default function FillInMatrixWithOptions() {
  const {
    matrix,
    updateMatrixValue,
    setIsEditable,
    options,
    selectedOptions,
    setSelectedOptions,
  } = useFillInMatrixWithOptionsStore();
  const { getImageById, setImageScale } = useScene2DStore();
  const {
    getCube,
    setCubeCustomXRotationMatrix,
    setCubeCustomYRotationMatrix,
    setCubeCustomZRotationMatrix,
  } = useScene3DStore();

  // Tracks changes to the matrix and processes updates
  useEffect(() => {
    const editableCells = matrix?.matrixValue
      .flat()
      .filter(cell => cell.editable);

    // If there is a matrix and there are no editable cells, update the object attached to the matrix
    if (matrix && !editableCells?.length) {
      // If there is a objectRefId, set the custom rotation matrix for the cube
      if (matrix.type && matrix.objectRefId) {
        const matrixElements = matrix?.matrixValue
          .flat()
          .map(cell => cell.value as number);
        if (matrixElements?.every(value => typeof value === "number")) {
          const customMatrix = new Matrix4().set(
            matrixElements[0],
            matrixElements[1],
            matrixElements[2],
            matrixElements[3],
            matrixElements[4],
            matrixElements[5],
            matrixElements[6],
            matrixElements[7],
            matrixElements[8],
            matrixElements[9],
            matrixElements[10],
            matrixElements[11],
            matrixElements[12],
            matrixElements[13],
            matrixElements[14],
            matrixElements[15]
          );
          switch (matrix && matrix.type && matrix.objectRefId) {
            case MatrixType.ROTATION_X:
              setCubeCustomXRotationMatrix(matrix!.objectRefId!, customMatrix);
              break;
            case MatrixType.ROTATION_Y:
              setCubeCustomYRotationMatrix(matrix!.objectRefId!, customMatrix);
              break;
            case MatrixType.ROTATION_Z:
              setCubeCustomZRotationMatrix(matrix!.objectRefId!, customMatrix);
              break;
            default:
              break;
          }
        }
      }
      // If there is a imageRefId, set the scale for the image
      if (matrix.type === MatrixType.SCALING && matrix.imageRefId) {
        const image = getImageById(matrix.imageRefId);
        if (image) {
          const scaleX = matrix.matrixValue[0][0].value as number;
          const scaleY = matrix.matrixValue[1][1].value as number;
          setImageScale(image.id, [scaleX, scaleY]);
        }
      }
    }
  }, [
    matrix,
    getCube,
    setCubeCustomXRotationMatrix,
    setCubeCustomYRotationMatrix,
    setCubeCustomZRotationMatrix,
    selectedOptions,
    getImageById,
    setImageScale,
  ]);

  // Gets the next editable cell
  const getNextEditableCell = () => {
    if (!matrix) return null;
    for (let row = 0; row < matrix.matrixValue.length; row++) {
      for (let col = 0; col < matrix.matrixValue[row].length; col++) {
        if (matrix.matrixValue[row][col].editable) {
          return { row, col };
        }
      }
    }
  };

  const handleOptionClick = (option: Option) => {
    const nextEditableCell = getNextEditableCell();
    if (!nextEditableCell) return;

    const { row, col } = nextEditableCell;
    updateMatrixValue(row, col, option.value);
    setIsEditable(row, col, false);
    setSelectedOptions([...selectedOptions, { row, col, option }]);
  };

  const handleRemoveOption = (optionId: string, row: number, col: number) => {
    setSelectedOptions(selectedOptions.filter(o => o.option.id !== optionId));
    setIsEditable(row, col, true);

    if (matrix?.objectRefId) {
      setCubeCustomXRotationMatrix(matrix.objectRefId, null);
      setCubeCustomYRotationMatrix(matrix.objectRefId, null);
      setCubeCustomZRotationMatrix(matrix.objectRefId, null);
    }
    if (matrix?.imageRefId) {
      setImageScale(matrix.imageRefId, [1, 1]);
    }
  };

  const renderCell = (
    cell: MatrixValue,
    rowIndex: number,
    colIndex: number
  ) => {
    if (!matrix) return null;

    const selectedOption = selectedOptions.find(
      o => o.row === rowIndex && o.col === colIndex
    );

    const cellClasses = [
      MatrixType.IDENTITY,
      MatrixType.TRANSLATION,
      MatrixType.SCALING,
    ].includes(matrix.type)
      ? "w-12"
      : "w-16";

    return (
      <div
        key={colIndex}
        className={`${cellClasses} h-12 text-center bg-transparent flex items-center justify-center`}
      >
        {cell.editable ? (
          <MousePointerSquareDashedIcon />
        ) : selectedOption ? (
          <Button
            size="sm"
            onClick={() =>
              handleRemoveOption(selectedOption.option.id, rowIndex, colIndex)
            }
          >
            {selectedOption.option.displayValue}
          </Button>
        ) : (
          <div>{cell.value}</div>
        )}
      </div>
    );
  };

  return (
    <div className="flex items-center justify-center gap-4 my-2">
      <div className="relative matrix">
        {matrix?.matrixValue.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-between">
            {row.map((cell, colIndex) => renderCell(cell, rowIndex, colIndex))}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-2 mt-4 flex-wrap w-1/3">
        {options.map(option => (
          <Button
            key={option.id}
            onClick={() => handleOptionClick(option)}
            disabled={selectedOptions.some(o => o.option.id === option.id)}
          >
            {option.displayValue}
          </Button>
        ))}
      </div>
    </div>
  );
}
