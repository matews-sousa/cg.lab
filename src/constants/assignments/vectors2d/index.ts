import { Assignment } from "@/types/Assignment";
import { adjustVectorSumAssignmentsList } from "./adjustTheVectorToSum";
import { changeTheVectorAssignmentList } from "./changeTheVector";
import { defineTheVectorAssignmentList } from "./defineTheVector";
import { insertVectorSumAssignmentList } from "./insertVectorSum";
import { pointDisplacementAssignmentList } from "./pointDisplacement";
import { vectorLengthAssignmentList } from "./vectorLength";
import { vectorScalarAssignmentList } from "./vectorScalar";
import { vectorScalarFillInCoordsAssignmentList } from "./vectorScalarFillInCoords";
import { vectorSumAssignmentList } from "./vectorSum";

export const vectorAssignments: Assignment[] = [
  ...changeTheVectorAssignmentList,
  ...defineTheVectorAssignmentList,
  ...vectorSumAssignmentList,
  ...insertVectorSumAssignmentList,
  ...adjustVectorSumAssignmentsList,
  ...pointDisplacementAssignmentList,
  ...vectorScalarAssignmentList,
  ...vectorScalarFillInCoordsAssignmentList,
  ...vectorLengthAssignmentList,
];
