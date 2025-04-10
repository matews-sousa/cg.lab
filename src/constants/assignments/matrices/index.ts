import { applyScalematrixToPointAssignmentListList } from "./applyScaleMatrixToPoint";
import { applyScaleMatrixToPolygonAssignmentList } from "./applyScaleMatrixToPolygon";
import { applyTranslationmatrixToPointAssignmentListList } from "./applyTranslationMatrixToPoint";
import { orderingMatricesAssignments } from "./orderingMatrices";
import { rotationMatrixAssignment } from "./rotationMatrix";
import { rotationMatrixFillInWithOptionsAssignments } from "./rotationMatrixFillInWithOptions";
import { scalePointAssignmentList } from "./scalePoint";
import { scalePolygonAssignmentList } from "./scalePolygon";
import { translationMatrix2dAssignmentList } from "./translationMatrix";

export const matricesAssignments = [
  ...translationMatrix2dAssignmentList,
  ...applyTranslationmatrixToPointAssignmentListList,
  ...scalePointAssignmentList,
  ...scalePolygonAssignmentList,
  ...applyScaleMatrixToPolygonAssignmentList,
  ...applyScalematrixToPointAssignmentListList,
  ...rotationMatrixFillInWithOptionsAssignments,
  rotationMatrixAssignment,
  ...orderingMatricesAssignments,
];
