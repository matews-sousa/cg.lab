"use client";

import GenericScene2D from "@/components/generic-scene-2d";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const initialPoint: [number, number] = [
  Math.floor(Math.random() * 11) - 5,
  Math.floor(Math.random() * 7) - 3,
];

const answer = [
  Math.floor(Math.random() * 11) - 5,
  Math.floor(Math.random() * 7) - 3,
];

export default function AssignmentPage() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  return (
    <>
      <GenericScene2D
        config={{
          pan: false,
          viewBox: {
            x: [-10, 10],
            y: [-7, 7],
          },
          grid: {
            subdivisions: 2,
          },
          points: [
            {
              id: "A",
              initialPosition: initialPoint,
              movable: true,
              color: "red",
              label: "A",
              constraints: {
                roundCoordinates: true,
              },
            },
          ],
        }}
      />

      <div className="absolute bottom-4 bg-gray-200 p-4 rounded-md -translate-x-1/2 left-1/2 w-2/3 md:w-1/3">
        <div className="text-center">
          <p className="text-xl">
            Mova o ponto A para a posição {`(${answer[0]}, ${answer[1]})`}.
          </p>

          <div className="flex items-center justify-center gap-4 mt-4">
            <Button onClick={() => console.log("Confirmar")}>Confirmar</Button>
          </div>
        </div>
      </div>
    </>
  );
}
