"use client";

import GenericScene2D from "@/components/generic-scene-2d";
import { Button } from "@/components/ui/button";
import { movePointAssignment } from "@/constants/move-point-assignment";
import { useScene2DStore } from "@/store/scene2DStore";
import { ArrowRight } from "lucide-react";
import { useEffect, useLayoutEffect, useState } from "react";

export default function AssignmentPage() {
  const { config } = useScene2DStore();
  const [answerState, setAnswerState] = useState<
    "notAnswered" | "correct" | "incorrect"
  >("notAnswered");

  useLayoutEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    movePointAssignment.setup();
  }, []);

  const handleConfirm = () => {
    const isCorrect = movePointAssignment.validate();
    setAnswerState(isCorrect ? "correct" : "incorrect");
  };

  return (
    <>
      <GenericScene2D config={config} />

      <div className="absolute bottom-4 bg-gray-200 p-4 rounded-md -translate-x-1/2 left-1/2 w-2/3 md:w-1/3">
        <div className="text-center">
          {answerState === "correct" && (
            <>
              <p className="text-xl">Parabéns! Você acertou.</p>

              <div className="flex items-center justify-center gap-4 mt-4">
                <Button onClick={() => setAnswerState("notAnswered")}>
                  Próximo <ArrowRight />
                </Button>
              </div>
            </>
          )}
          {answerState === "incorrect" && (
            <>
              <p className="text-xl">Resposta incorreta. Tente novamente.</p>

              <div className="flex items-center justify-center gap-4 mt-4">
                <Button
                  onClick={() => {
                    setAnswerState("notAnswered");
                  }}
                >
                  Tentar novamente
                </Button>
              </div>
            </>
          )}

          {answerState === "notAnswered" && (
            <>
              <p className="text-xl">{movePointAssignment.instructions}</p>

              <div className="flex items-center justify-center gap-4 mt-4">
                <Button onClick={handleConfirm}>Confirmar</Button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
