import {
  useFillInVecLengthFormulaStore,
  VecLenFormula,
} from "@/store/fillInVecLengthFormulaStore";
import React from "react";

interface Props {
  vecLengthFormula: VecLenFormula;
}

export default function FillInVecLengthFormula({ vecLengthFormula }: Props) {
  const { vectorRefId, values, dimensions } = vecLengthFormula;
  const { setValues } = useFillInVecLengthFormulaStore();

  const handleChange =
    (key: keyof typeof values) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues(vectorRefId, { ...values, [key]: Number(event.target.value) });
    };

  // Define the keys to render based on dimensions
  const dimensionKeys = dimensions === "3D" ? ["x", "y", "z"] : ["x", "y"];

  return (
    <div className="flex items-center justify-center gap-2 my-4">
      <span className="text-3xl">||{vectorRefId}|| = </span>
      <div className="relative flex items-center">
        {/* SVG Square Root Symbol */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 180 60"
          className="w-[180px] h-[60px] text-black"
        >
          {/* Square root hook */}
          <path
            d="M0 40 L10 40 20 60 40 2.5"
            stroke="black"
            fill="none"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Horizontal bar */}
          <line x1="40" y1="2" x2="180" y2="2" stroke="black" strokeWidth="3" />
        </svg>

        {/* Formula Inputs */}
        <div className="flex items-center absolute left-10">
          {dimensionKeys.map((key, index) => (
            <React.Fragment key={key}>
              <div className="relative w-8 h-8">
                <input
                  value={values[key as keyof typeof values] || ""}
                  onChange={handleChange(key as keyof typeof values)}
                  type="text"
                  className="text-2xl w-full h-full border-b-2 bg-transparent border-b-black text-center focus:outline-none"
                />
                <span className="absolute -top-2 -right-3">2</span>
              </div>
              {index < dimensionKeys.length - 1 && (
                <span className="mx-4">+</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
