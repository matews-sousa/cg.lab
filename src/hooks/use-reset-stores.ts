import { useCallback } from "react";
import { useScene2DStore } from "@/store/scene2DStore";
import { useScene3DStore } from "@/store/scene3DStore";
import { useFillInTheBlankWithOptionsStore } from "@/store/fillInTheBlankWithOptionsStore";
import { useFillBlankMatrixInputStore } from "@/store/fillInBlankMatrixInputStore";
import { useFillInMatrixWithOptionsStore } from "@/store/fillInMatrixWithOptions";
import { useFillInVecLengthFormulaStore } from "@/store/fillInVecLengthFormulaStore";
import { useOrderMatrixStore } from "@/store/orderMatrixMultiplicationStore";

export function useResetStores() {
  const { reset: resetScene2D } = useScene2DStore();
  const { reset: resetScene3D } = useScene3DStore();
  const { reset: resetFillInTheBlankWithOptions } =
    useFillInTheBlankWithOptionsStore();
  const { reset: resetFillBlankMatrixInput } = useFillBlankMatrixInputStore();
  const { reset: resetFillInMatrixWithOptions } =
    useFillInMatrixWithOptionsStore();
  const { reset: resetFillInVecLengthFormulaStore } =
    useFillInVecLengthFormulaStore();
  const { reset: resetOrderMatrix } = useOrderMatrixStore();

  const resetAll = useCallback(() => {
    resetScene2D();
    resetScene3D();
    resetFillInTheBlankWithOptions();
    resetFillBlankMatrixInput();
    resetFillInMatrixWithOptions();
    resetFillInVecLengthFormulaStore();
    resetOrderMatrix();
  }, [
    resetScene2D,
    resetScene3D,
    resetFillInTheBlankWithOptions,
    resetFillBlankMatrixInput,
    resetFillInMatrixWithOptions,
    resetFillInVecLengthFormulaStore,
    resetOrderMatrix,
  ]);

  return resetAll;
}
