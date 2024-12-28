import { alignPointsInXAxisAssignment } from "./alignPointsInXAxis";
import { distanceBetweenPointsAssignment } from "./distanceBetweenPoints";
import { movePointAssignment } from "./movePoint";
import { perpendicularAssignment } from "./perpendicular";
import { pointPosition } from "./pointPosition";
import { positionTwoTrianglesToSquare } from "./positionTwoTrianglesToSquare";
import { scaleSquarePointsAssignment } from "./scaleSquarePoints";
import { whichPositionAssignment } from "./whichPosition";

export const pointsAssignments = [
  movePointAssignment,
  perpendicularAssignment,
  alignPointsInXAxisAssignment,
  whichPositionAssignment,
  distanceBetweenPointsAssignment,
  pointPosition,
  scaleSquarePointsAssignment,
  positionTwoTrianglesToSquare,
];
