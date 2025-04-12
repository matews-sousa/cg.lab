import { applyScalematrixToPointAssignmentListList } from "./applyScaleMatrixToPoint";
import { applyScaleMatrixToPolygonAssignmentList } from "./applyScaleMatrixToPolygon";
import { applyTranslationmatrixToPointAssignmentListList } from "./applyTranslationMatrixToPoint";
import { applyTranslationMatrixToPolygonAssignmentList } from "./applyTranslationMatrixToPolygon";
import { orderingMatricesAssignments } from "./orderingMatrices";
import { rotationMatrixFillInBlankAssignments } from "./rotationMatrixFillInBlank";
import { rotationMatrixFillInWithOptionsAssignments } from "./rotationMatrixFillInWithOptions";
import { scalePointAssignmentList } from "./scalePoint";
import { scalePolygonAssignmentList } from "./scalePolygon";
import { translationMatrix2dAssignmentList } from "./translationMatrix";

export const matricesAssignments = [
  ...translationMatrix2dAssignmentList,
  ...applyTranslationmatrixToPointAssignmentListList,
  ...applyTranslationMatrixToPolygonAssignmentList,
  ...scalePointAssignmentList,
  ...scalePolygonAssignmentList,
  ...applyScaleMatrixToPolygonAssignmentList,
  ...applyScalematrixToPointAssignmentListList,
  ...rotationMatrixFillInWithOptionsAssignments,
  ...rotationMatrixFillInBlankAssignments,
  ...orderingMatricesAssignments,
];
