import { useState, useCallback } from "react";
import { useMutation } from "convex/react";
import { isSameDay } from "date-fns";
import { toast } from "@/hooks/use-toast";
import { Assignment } from "@/types/Assignment";
import { api } from "../../convex/_generated/api";

export function useAssignment(subject?: string) {
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [assignmentState, setAssignmentState] = useState<
    "notAnswered" | "correct" | "incorrect"
  >("notAnswered");

  const completeAssignmentMutation = useMutation(
    api.assignmentCompletions.completeAssignment
  );
  const updateUserStreakMutation = useMutation(api.users.updateUserStreak);

  const handleConfirm = useCallback(
    async ({ ignoreCompletionSave = false } = {}) => {
      if (!assignment) return;

      const isCorrect = assignment.validate();
      setAssignmentState(isCorrect ? "correct" : "incorrect");

      if (!isCorrect) return;

      try {
        // Work around to get the user session from the cookie in the browser
        // This is for reducing the number of Convex function calls
        const res = await fetch("/api/getSession");
        const data = await res.json();

        // If the user is authenticated, complete the assignment
        // and update the user streak if the assignment is completed today
        // and the user hasn't completed a task today
        if (data.userSession) {
          // Complete the assignment, it return if the user completed a daily mission and the user last completed date
          const completionData = await completeAssignmentMutation({
            assignmentId: assignment.id ?? "",
            subject: subject ?? "",
            subjectCategory: assignment.subjectCategory,
            ignoreCompletionSave,
          });

          // Only update the streak if the user hasn't completed a task today
          // This is to avoid calling the updateUserStreak function unnecessarily
          const shouldUpdateStreak =
            !isSameDay(
              completionData?.userLastCompletedDate ?? new Date(),
              new Date()
            ) || !completionData?.userLastCompletedDate;
          if (shouldUpdateStreak) {
            await updateUserStreakMutation();
          }

          if (completionData?.completedMission) {
            toast({
              title: "Missão diária concluída!",
              description: "Parabéns, você completou uma missão diária.",
            });
          }
        }
      } catch (error) {
        console.error("Error completing assignment:", error);
      }
    },
    [assignment, subject, completeAssignmentMutation, updateUserStreakMutation]
  );

  return {
    assignment,
    setAssignment,
    assignmentState,
    setAssignmentState,
    handleConfirm,
  };
}
