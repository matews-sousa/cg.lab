import { useEffect } from "react";

export function useAssignmentKeyboardShortcuts(
  assignmentState: "notAnswered" | "correct" | "incorrect",
  onConfirm: () => void,
  onTryAgain: () => void,
  onNext: () => void
) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        if (assignmentState === "notAnswered") onConfirm();
        if (assignmentState === "incorrect") onTryAgain();
        if (assignmentState === "correct") onNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [assignmentState, onConfirm, onTryAgain, onNext]);
}
