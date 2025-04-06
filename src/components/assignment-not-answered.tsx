import React from "react";
import FillCoordinateInput from "./fill-coordinate-input";
import { Assignment, AssignmentType } from "@/types/Assignment";
import { useFillInVecLengthFormulaStore } from "@/store/fillInVecLengthFormulaStore";
import { useFillBlankMatrixInputStore } from "@/store/fillInBlankMatrixInputStore";
import FillInMatrixInput from "./fill-in-matrix-input";
import FillInMatrixWithOptions from "./fill-in-matrix-with-options";
import FillInVecLengthFormula from "./fill-in-vec-length-formula";
import OrderMatrixMultiplication from "./order-matrix-multiplication";
import FillInTheBlankWithOptions from "./fill-in-the-blank-with-options";
import { Button } from "./ui/button";
import { useFillInTheBlankStore } from "@/store/fillInTheBlankStore";

interface Props {
  assignment: Assignment | null;
  handleConfirm: () => void;
}

export default function AssignmentNotAnswered({
  assignment,
  handleConfirm,
}: Props) {
  const { inputs } = useFillInTheBlankStore();
  const { matrices } = useFillBlankMatrixInputStore();
  const { vecLengthFormulas } = useFillInVecLengthFormulaStore();

  return (
    <>
      <p className="text-base md:text-xl">{assignment?.instructions}</p>

      {assignment?.type === AssignmentType.FILL_IN_THE_BLANK_COORDINATES &&
        inputs.map((input, index) => (
          <FillCoordinateInput
            key={index}
            coordinateDimention={input.dimention}
            pointRef={input.pointRef}
            label={input.label}
          />
        ))}

      {assignment?.type === AssignmentType.FILL_IN_THE_BLANK_WITH_OPTIONS && (
        <FillInTheBlankWithOptions />
      )}

      {matrices.map(matrix => (
        <FillInMatrixInput key={matrix.id} matrix={matrix} />
      ))}

      {assignment?.type ===
        AssignmentType.FILL_IN_THE_BLANK_MATRIX_WITH_OPTIONS && (
        <FillInMatrixWithOptions />
      )}

      {vecLengthFormulas.map((vecLengthFormula, index) => (
        <FillInVecLengthFormula
          key={index}
          vecLengthFormula={vecLengthFormula}
        />
      ))}

      <OrderMatrixMultiplication />

      <div className="flex items-center justify-center gap-4 mt-4">
        <Button onClick={handleConfirm}>Confirmar</Button>
      </div>
    </>
  );
}
