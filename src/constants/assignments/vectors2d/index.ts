import { adjustVectorSumAssignmentsList } from "./adjustTheVectorToSum";
import { changeTheVectorAssignmentList } from "./changeTheVector";
import { defineTheVectorAssignmentList } from "./defineTheVector";
import { insertVectorSumAssignmentList } from "./insertVectorSum";
import { pointDisplacementAssignmentList } from "./pointDisplacement";
import { vectorLengthAssignmentList } from "./vectorLength";
import { vectorSumAssignmentList } from "./vectorSum";

export const vectorAssignments = [
  ...changeTheVectorAssignmentList,
  ...defineTheVectorAssignmentList,
  ...vectorSumAssignmentList,
  ...insertVectorSumAssignmentList,
  ...adjustVectorSumAssignmentsList,
  ...pointDisplacementAssignmentList,
  ...vectorLengthAssignmentList,
];
