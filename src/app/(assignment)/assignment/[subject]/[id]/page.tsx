"use client";

import FillCoordinateInput from "@/components/fill-coordinate-input";
import FillFormulaWithOptions from "@/components/fill-in-the-blank-with-options";
import GenericScene2D from "@/components/generic-scene-2d";
import { Button } from "@/components/ui/button";
import { subjects } from "@/constants/assignments";
import { useFillInTheBlankWithOptionsStore } from "@/store/fillInTheBlankWithOptionsStore";
import { useFillInTheBlankStore } from "@/store/fillInTheBlankStore";
import { useScene2DStore } from "@/store/scene2DStore";
import { Assignment, AssignmentType } from "@/types/Assignment";
import { ArrowRight } from "lucide-react";
import { redirect } from "next/navigation";

import React, { useEffect, useLayoutEffect, use, useState } from "react";

export default function Page({
  params,
}: {
  params: Promise<{ subject: string; id: string }>;
}) {
  const { subject, id } = use(params);
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const { inputs } = useFillInTheBlankStore();
  const { reset: resetFillInTheBlankWithOptions } =
    useFillInTheBlankWithOptionsStore();
  const [assignmentState, setAssignmentState] = useState<
    "notAnswered" | "correct" | "incorrect"
  >("notAnswered");
  const { config, reset } = useScene2DStore();

  useLayoutEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    reset();
    resetFillInTheBlankWithOptions();
    const assi = subjects
      .find(s => s.slug === subject)
      ?.assignments.find(a => a.id === id);
    if (assi) {
      setAssignment(assi);
      assi.setup();
    }
  }, [id, subject, reset, resetFillInTheBlankWithOptions]);

  const handleConfirm = () => {
    if (!assignment) return;
    const isCorrect = assignment.validate();
    setAssignmentState(isCorrect ? "correct" : "incorrect");
  };

  const handleTryAgain = () => {
    setAssignmentState("notAnswered");
    assignment?.setup();
  };

  const handleNext = () => {
    if (!assignment) return;
    const currentOrder = assignment?.order;
    const nextAssignment = subjects
      .find(s => s.slug === subject)
      ?.assignments.find(a => a.order === currentOrder + 1);
    if (nextAssignment) {
      redirect(`/assignment/${subject}/${nextAssignment.id}`);
    } else {
      redirect(`/subject/${subject}`);
    }
  };

  return (
    <>
      <GenericScene2D config={config} />

      <div className="absolute bottom-4 bg-gray-200 p-4 rounded-3xl -translate-x-1/2 left-1/2 w-3/4 md:w-1/3 border-b-4 border-b-gray-400">
        <div className="text-center">
          {assignmentState === "correct" && (
            <>
              <p className="text-base md:text-xl">Parabéns! Você acertou.</p>
              <div className="flex items-center justify-center gap-4 mt-4">
                <Button onClick={handleNext}>
                  Próximo <ArrowRight />
                </Button>
              </div>
            </>
          )}
          {assignmentState === "incorrect" && (
            <>
              <p className="text-base md:text-xl">
                Resposta incorreta. Tente novamente.
              </p>
              <div className="flex items-center justify-center gap-4 mt-4">
                <Button onClick={handleTryAgain}>Tentar novamente</Button>
              </div>
            </>
          )}

          {assignmentState === "notAnswered" && (
            <>
              <p className="text-base md:text-xl">{assignment?.instructions}</p>

              {assignment?.type ===
                AssignmentType.FILL_IN_THE_BLANK_COORDINATES &&
                inputs.map((input, index) => (
                  <FillCoordinateInput
                    key={index}
                    coordinateDimention={input.dimention}
                    pointRef={input.pointRef}
                  />
                ))}

              {assignment?.type ===
                AssignmentType.FILL_IN_THE_BLANK_WITH_OPTIONS && (
                <FillFormulaWithOptions />
              )}

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
