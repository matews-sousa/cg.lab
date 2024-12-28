import React from "react";

const translationMatrix = [
  [
    { value: 1, editable: false },
    { value: 0, editable: false },
    { value: "", editable: true },
  ],
  [
    { value: 0, editable: false },
    { value: 1, editable: false },
    { value: "", editable: true },
  ],
  [
    { value: 0, editable: false },
    { value: 0, editable: false },
    { value: 1, editable: false },
  ],
];

const scaleMatrix = [
  [
    { value: "", editable: true },
    { value: 0, editable: false },
    { value: 0, editable: false },
  ],
  [
    { value: 0, editable: false },
    { value: "", editable: true },
    { value: 0, editable: false },
  ],
  [
    { value: 0, editable: false },
    { value: 0, editable: false },
    { value: "", editable: true },
  ],
];

const rotationMatrix = [
  [
    { value: "cos(θ)", editable: true },
    { value: "-sin(θ)", editable: true },
    { value: 0, editable: false },
  ],
  [
    { value: "sin(θ)", editable: true },
    { value: "cos(θ)", editable: true },
    { value: 0, editable: false },
  ],
  [
    { value: 0, editable: false },
    { value: 0, editable: false },
    { value: 1, editable: false },
  ],
];

export default function FillInMatrixInput() {
  return (
    <div className="">
      <div className="relative matrix">
        {translationMatrix.map((row, i) => (
          <div key={i} className="flex">
            {row.map((cell, j) =>
              cell.editable ? (
                <input
                  key={j}
                  type="text"
                  className="w-12 h-12 text-center bg-transparent border-b border-gray-500 focus:outline-none"
                  value={cell.value}
                />
              ) : (
                <div
                  key={j}
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
