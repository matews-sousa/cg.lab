import { rotationMatrixX3dAssignment } from "./rotationMatrixX";
import { rotationMatrixY3dAssignment } from "./rotationMatrixY";
import { rotationMatrixZ3dAssignment } from "./rotationMatrixZ";
import { scaleMatrix3dAssignment } from "./scaleMatrix3d";
import { translationMatrix3dAssignment } from "./translationMatrix3d";

export const matrices3dAssignments = [
  translationMatrix3dAssignment,
  scaleMatrix3dAssignment,
  rotationMatrixX3dAssignment,
  rotationMatrixY3dAssignment,
  rotationMatrixZ3dAssignment,
];
