import React from "react";
import { useFillInTheBlankStore } from "@/store/fillInTheBlankStore";

interface FillCoordinateInputProps {
  coordinateDimention: "2D" | "3D";
  pointRef: string;
  label?: string;
}

export default function FillCoordinateInput({
  coordinateDimention,
  pointRef,
  label,
}: FillCoordinateInputProps) {
  const { setInputValue, getInputByPointRef } = useFillInTheBlankStore();
  const coordsInput = getInputByPointRef(pointRef);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;

    if (!pointRef || !coordsInput) return;

    // Allow valid partial inputs such as ".", "-", "-0.", and full numbers
    const regex = /^-?\d*\.?\d*$/;
    if (regex.test(value)) {
      setInputValue(pointRef, {
        ...coordsInput.coordinatesValue,
        [name]: value,
      });
    }
  };

  const parseCoordinate = (coord: number | string | undefined): string => {
    if (typeof coord === "number") {
      return coord.toString();
    }
    return coord || "";
  };

  return (
    <div className="flex items-center justify-center">
      <span className="text-2xl">{label}</span>
      <div className="flex items-center justify-center text-4xl">
        <span>{"("}</span>
        <input
          className="w-8 border-b border-b-black bg-transparent text-center text-xl"
          autoFocus
          autoComplete="off"
          type="text"
          value={parseCoordinate(coordsInput?.coordinatesValue?.x)}
          name="x"
          onChange={handleChange}
        />
        <span>,</span>
        <input
          className="w-8 border-b border-b-black bg-transparent text-center text-xl"
          type="text"
          autoComplete="off"
          value={parseCoordinate(coordsInput?.coordinatesValue?.y)}
          name="y"
          onChange={handleChange}
        />
        {coordinateDimention === "3D" && (
          <>
            <span>,</span>
            <input
              className="w-8 border-b border-b-black bg-transparent text-center text-xl"
              type="text"
              autoComplete="off"
              value={parseCoordinate(coordsInput?.coordinatesValue?.z)}
              name="z"
              onChange={handleChange}
            />
          </>
        )}
        <span>{")"}</span>
      </div>
    </div>
  );
}
