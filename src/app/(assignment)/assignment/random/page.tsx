"use client";

import FillCoordinateInput from "@/components/fill-coordinate-input";
import FillFormulaWithOptions from "@/components/fill-in-the-blank-with-options";
import GenericScene2D from "@/components/generic-scene-2d";
import { Button } from "@/components/ui/button";
import { useFillInTheBlankWithOptionsStore } from "@/store/fillInTheBlankWithOptionsStore";
import { useFillInTheBlankStore } from "@/store/fillInTheBlankStore";
import { useScene2DStore } from "@/store/scene2DStore";
import { Assignment, AssignmentType } from "@/types/Assignment";
import { ArrowRight } from "lucide-react";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import FillInMatrixInput from "@/components/fill-in-matrix-input";
import { useFillBlankMatrixInputStore } from "@/store/fillInBlankMatrixInputStore";
import Scene3D from "@/components/scene-3d";
import { useScene3DStore } from "@/store/scene3DStore";
import FillInMatrixWithOptions from "@/components/fill-in-matrix-with-options";
import { useFillInMatrixWithOptionsStore } from "@/store/fillInMatrixWithOptions";
import ObjectivePanel from "@/components/objective-panel";
import Lottie from "lottie-react";
import successAnimationData from "@/assets/success-anim.json";
import failAnimationData from "@/assets/fail-anim.json";
import {
  generateAnyRandomAssignment,
  SubjectOptionsKey,
} from "@/constants/assignments";
import { api } from "../../../../../convex/_generated/api";
import { useMutation } from "convex/react";
import { useSearchParams } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { isSameDay } from "date-fns";

export default function Page() {
  const [assignment, setAssignment] = useState<
    (Assignment & { dimensions: "2D" | "3D" }) | null
  >(null);
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

  const searchParams = useSearchParams();
  const selectedSubjects = useMemo(
    () => searchParams.getAll("subjects"),
    [searchParams]
  ) as SubjectOptionsKey[];

  const completeAssignmentMutation = useMutation(
    api.assignmentCompletions.completeAssignment
  );
  const updateUserStreakMutation = useMutation(api.users.updateUserStreak);

  const resetAll = useCallback(() => {
    resetScene2D();
    resetScene3D();
    resetFillInTheBlankWithOptions();
    resetFillBlankMatrixInput();
    resetFillInMatrixWithOptions();
  }, [
    resetScene2D,
    resetScene3D,
    resetFillInTheBlankWithOptions,
    resetFillBlankMatrixInput,
    resetFillInMatrixWithOptions,
  ]);

  useEffect(() => {
    resetAll();

    const assi = generateAnyRandomAssignment(selectedSubjects);
    if (assi) {
      setAssignment(assi);
      assi.setup();
    }
  }, [resetAll, selectedSubjects]);

  const handleConfirm = useCallback(async () => {
    if (!assignment) return;
    const isCorrect = assignment.validate();

    // Work around to get the user session from the cookie in the browser
    // This is for reducing the number of Convex function calls
    const res = await fetch("/api/getSession");
    const data = await res.json();

    // If the user is authenticated and the answer is correct, complete the assignment
    if (isCorrect && data.userSession) {
      // Complete the assignment, it return if the user completed a daily mission and the user last completed date
      const data = await completeAssignmentMutation({
        assignmentId: "",
        subject: "",
        subjectCategory: assignment.subjectCategory,
        ignoreCompletionSave: true,
      });

      // Only update the streak if the user hasn't completed a task today
      // This is to avoid calling the updateUserStreak function unnecessarily
      if (
        !isSameDay(data?.userLastCompletedDate ?? new Date(), new Date()) ||
        !data?.userLastCompletedDate
      ) {
        await updateUserStreakMutation();
      }

      if (data?.completedMission) {
        toast({
          title: "Missão diária concluída!",
          description: "Parabéns, você completou uma missão diária.",
        });
      }
    }
    setAssignmentState(isCorrect ? "correct" : "incorrect");
  }, [assignment, completeAssignmentMutation, updateUserStreakMutation]);

  const handleTryAgain = useCallback(() => {
    resetAll();
    setAssignmentState("notAnswered");
    assignment?.setup();
  }, [resetAll, assignment]);

  const handleNext = useCallback(() => {
    setAssignmentState("notAnswered");

    const assi = generateAnyRandomAssignment(selectedSubjects);
    if (assi) {
      setAssignment(assi);
      resetAll();
      assi.setup();
    }
  }, [resetAll, selectedSubjects]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        if (assignmentState === "notAnswered") handleConfirm();
        if (assignmentState === "incorrect") handleTryAgain();
        if (assignmentState === "correct") handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [assignmentState, handleConfirm, handleTryAgain, handleNext]);

  return (
    <>
      {assignment?.dimensions === "2D" ? (
        <GenericScene2D config={config} />
      ) : (
        <Scene3D />
      )}

      <ObjectivePanel />

      <div className="absolute bottom-4 bg-gray-200 p-4 rounded-md left-2 w-3/4 md:w-[40%] border-b-4 border-b-gray-400">
        <div className="text-center">
          {assignmentState === "correct" && (
            <>
              <div className="flex items-center justify-center gap-2">
                <Lottie
                  animationData={successAnimationData}
                  loop={false}
                  className="w-12 h-12"
                />
                <p className="text-base md:text-xl">Parabéns! Você acertou.</p>
              </div>
              <div className="flex items-center justify-center gap-4 mt-4">
                <Button onClick={handleNext}>
                  Próximo <ArrowRight className="w-6 h-6" />
                </Button>
              </div>
            </>
          )}
          {assignmentState === "incorrect" && (
            <>
              <div className="flex items-center justify-center gap-2">
                <Lottie
                  animationData={failAnimationData}
                  loop={false}
                  className="w-12 h-12"
                />
                <p className="text-base md:text-xl">
                  Resposta incorreta. Tente novamente.
                </p>
              </div>
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
                    label={input.label}
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
