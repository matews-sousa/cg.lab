import { Assignment } from "@/types/Assignment";
import { vectorSumAdjustResultAssignmentList } from "./vectorSumAdjustResult";
import { changeTheVectorAssignmentList } from "./changeTheVector";
import { defineTheVectorAssignmentList } from "./defineTheVector";
import { vectorSumInsertResultAssignmentList } from "./vectorSumInsertResult";
import { pointDisplacementAssignmentList } from "./pointDisplacement";
import { vectorLengthAssignmentList } from "./vectorLength";
import { vectorScalarInteractiveAssignmentList } from "./vectorScalarInteractive";
import { vectorScalarFillInCoordsAssignmentList } from "./vectorScalarFillInCoords";
import { vectorSumAdjustVectorsAssignmentList } from "./vectorSumAdjustVectors";
import { vectorLengthInteractiveAssignmentList } from "./vectorLengthInteractive";

export const vectorAssignments: Assignment[] = [
  // Vector Basics assignments
  ...changeTheVectorAssignmentList,
  ...defineTheVectorAssignmentList,
  ...pointDisplacementAssignmentList,

  // Vector Sum assignments
  ...vectorSumAdjustVectorsAssignmentList,
  ...vectorSumAdjustResultAssignmentList,
  ...vectorSumInsertResultAssignmentList,

  // Scalar Multiplication assignments
  ...vectorScalarInteractiveAssignmentList,
  ...vectorScalarFillInCoordsAssignmentList,

  // Vector Length assignments
  ...vectorLengthInteractiveAssignmentList,
  ...vectorLengthAssignmentList,
];
