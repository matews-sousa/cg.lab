import { applyTranslationmatrixToPointAssignmentListList } from "./applyTranslationMatrixToPoint";
import { rotationMatrixAssignment } from "./rotationMatrix";
import { scalePolygonAssignment } from "./scalePolygon";
import { translationMatrix2dAssignmentList } from "./translationMatrix";

export const matricesAssignments = [
  ...translationMatrix2dAssignmentList,
  ...applyTranslationmatrixToPointAssignmentListList,
  scalePolygonAssignment,
  rotationMatrixAssignment,
];
