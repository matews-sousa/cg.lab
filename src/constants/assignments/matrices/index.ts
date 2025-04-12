import { applyScalematrixToPointAssignmentListList } from "./applyScaleMatrixToPoint";
import { applyScaleMatrixToPolygonAssignmentList } from "./applyScaleMatrixToPolygon";
import { applyTranslationmatrixToPointAssignmentList } from "./applyTranslationMatrixToPoint";
import { applyTranslationMatrixToPolygonAssignmentList } from "./applyTranslationMatrixToPolygon";
import { fillInTranslationMatrixAssignmentList } from "./fillInTranslationMatrix";
import { orderingMatricesAssignments } from "./orderingMatrices";
import { rotationMatrixFillInBlankAssignments } from "./rotationMatrixFillInBlank";
import { rotationMatrixFillInWithOptionsAssignments } from "./rotationMatrixFillInWithOptions";
import { scalePointAssignmentList } from "./scalePoint";
import { scalePolygonAssignmentList } from "./scalePolygon";
import { translationMatrix2dAssignmentList } from "./translationMatrix";

export const matricesAssignments = [
  // Translation Matrix Assignments
  ...translationMatrix2dAssignmentList,
  ...applyTranslationmatrixToPointAssignmentList,
  ...fillInTranslationMatrixAssignmentList,
  ...applyTranslationMatrixToPolygonAssignmentList,

  // Scale Matrix Assignments
  ...scalePointAssignmentList,
  ...scalePolygonAssignmentList,
  ...applyScaleMatrixToPolygonAssignmentList,
  ...applyScalematrixToPointAssignmentListList,

  // Rotation Matrix Assignments
  ...rotationMatrixFillInWithOptionsAssignments,
  ...rotationMatrixFillInBlankAssignments,
  ...orderingMatricesAssignments,
];
