import { applyScaleMatrixToPolygonAssignmentList } from "./applyScaleMatrixToPolygon";
import { applyTranslationmatrixToPointAssignmentListList } from "./applyTranslationMatrixToPoint";
import { rotationMatrixAssignment } from "./rotationMatrix";
import { scalePointAssignmentList } from "./scalePoint";
import { scalePolygonAssignmentList } from "./scalePolygon";
import { translationMatrix2dAssignmentList } from "./translationMatrix";

export const matricesAssignments = [
  ...translationMatrix2dAssignmentList,
  ...applyTranslationmatrixToPointAssignmentListList,
  ...scalePointAssignmentList,
  ...scalePolygonAssignmentList,
  ...applyScaleMatrixToPolygonAssignmentList,
  rotationMatrixAssignment,
];
