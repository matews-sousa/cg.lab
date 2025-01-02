"use client";

import FillCoordinateInput from "@/components/fill-coordinate-input";
import FillFormulaWithOptions from "@/components/fill-in-the-blank-with-options";
import GenericScene2D from "@/components/generic-scene-2d";
import { Button } from "@/components/ui/button";
import { Subject, subjects } from "@/constants/assignments";
import { useFillInTheBlankWithOptionsStore } from "@/store/fillInTheBlankWithOptionsStore";
import { useFillInTheBlankStore } from "@/store/fillInTheBlankStore";
import { useScene2DStore } from "@/store/scene2DStore";
import { Assignment, AssignmentType } from "@/types/Assignment";
import { ArrowRight } from "lucide-react";
import { redirect } from "next/navigation";

import React, { useEffect, useLayoutEffect, use, useState } from "react";
import FillInMatrixInput from "@/components/fill-in-matrix-input";
import { useFillBlankMatrixInputStore } from "@/store/fillInBlankMatrixInputStore";
import Scene3D from "@/components/scene-3d";
import { useScene3DStore } from "@/store/scene3DStore";
import FillInMatrixWithOptions from "@/components/fill-in-matrix-with-options";
import { useFillInMatrixWithOptionsStore } from "@/store/fillInMatrixWithOptions";

export default function Page({
  params,
}: {
  params: Promise<{ subject: string; id: string }>;
}) {
  const { subject, id } = use(params);
  const [subjectData, setSubjectData] = useState<Subject | null>(null);
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const { inputs } = useFillInTheBlankStore();
  const { reset: resetFillInTheBlankWithOptions } =
    useFillInTheBlankWithOptionsStore();
  const { matrices, reset: resetFillBlankMatrixInput } =
    useFillBlankMatrixInputStore();
  const { reset: resetFillInMatrixWithOptions } =
    useFillInMatrixWithOptionsStore();
  const [assignmentState, setAssignmentState] = useState<
    "notAnswered" | "correct" | "incorrect"
  >("notAnswered");
  const { config, reset: resetScene2D } = useScene2DStore();
  const { reset: resetScene3D } = useScene3DStore();

  useLayoutEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    resetScene2D();
    resetScene3D();
    resetFillInTheBlankWithOptions();
    resetFillBlankMatrixInput();
    resetFillInMatrixWithOptions();

    const subj = subjects.find(s => s.slug === subject);
    if (!subj) return;
    const assi = subj?.assignments.find(a => a.id === id);
    if (assi) {
      setSubjectData(subj);
      setAssignment(assi);
      assi.setup();
    }
  }, [
    id,
    subject,
    resetScene2D,
    resetScene3D,
    resetFillInTheBlankWithOptions,
    resetFillBlankMatrixInput,
    resetFillInMatrixWithOptions,
  ]);

  const handleConfirm = () => {
    if (!assignment) return;
    const isCorrect = assignment.validate();
    setAssignmentState(isCorrect ? "correct" : "incorrect");
  };

  const handleTryAgain = () => {
    resetScene2D();
    resetScene3D();
    resetFillInTheBlankWithOptions();
    resetFillBlankMatrixInput();
    resetFillInMatrixWithOptions();
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
      {subjectData?.type === "2D" ? (
        <GenericScene2D config={config} />
      ) : (
        <Scene3D />
      )}

      <div className="absolute bottom-4 bg-gray-200 p-4 rounded-3xl left-2 w-3/4 md:w-1/3 border-b-4 border-b-gray-400">
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

              {assignment?.type === AssignmentType.FILL_IN_THE_BLANK_MATRIX &&
                matrices.map(matrix => (
                  <FillInMatrixInput key={matrix.id} matrix={matrix} />
                ))}

              {assignment?.type ===
                AssignmentType.FILL_IN_THE_BLANK_MATRIX_WITH_OPTIONS && (
                <FillInMatrixWithOptions />
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
