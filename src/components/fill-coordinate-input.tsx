import React from "react";
import { useFillInTheBlankStore } from "@/store/fillInTheBlankStore";

interface FillCoordinateInputProps {
  coordinateDimention: "2D" | "3D";
  pointRef: string;
}

export default function FillCoordinateInput({
  coordinateDimention,
  pointRef,
}: FillCoordinateInputProps) {
  const { setInputValue, getInputByPointRef } = useFillInTheBlankStore();
  const coordsInput = getInputByPointRef(pointRef);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    if (!pointRef || !coordsInput) return;

    // Allow empty input or just a single dash ("-")
    if (value === "" || value === "-") {
      setInputValue(pointRef, {
        ...coordsInput.coordinatesValue,
        [name]: value,
      });
      return;
    }

    // Parse the number only if it's valid
    const num = parseInt(value, 10);
    if (!isNaN(num)) {
      setInputValue(pointRef, {
        ...coordsInput.coordinatesValue,
        [name]: num,
      });
    }
  };

  return (
    <div className="flex items-center justify-center">
      <span className="text-2xl">{pointRef}</span>
      <div className="flex items-center justify-center text-4xl">
        <span>{"("}</span>
        <input
          className="w-8 border-b border-b-black bg-transparent text-center text-xl"
          autoFocus
          type="text"
          value={coordsInput?.coordinatesValue?.x}
          name="x"
          onChange={handleChange}
        />
        <span>,</span>
        <input
          className="w-8 border-b border-b-black bg-transparent text-center text-xl"
          type="text"
          value={coordsInput?.coordinatesValue?.y}
          name="y"
          onChange={handleChange}
        />
        {coordinateDimention === "3D" && (
          <>
            <span>,</span>
            <input
              className="w-8 border-b border-b-black bg-transparent text-center text-xl"
              type="text"
              value={coordsInput?.coordinatesValue?.z}
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
