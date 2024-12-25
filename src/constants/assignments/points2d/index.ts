import { alignPointsInXAxisAssignment } from "./alignPointsInXAxis";
import { distanceBetweenPointsAssignment } from "./distanceBetweenPoints";
import { movePointAssignment } from "./movePoint";
import { perpendicularAssignment } from "./perpendicular";
import { whichPositionAssignment } from "./whichPosition";

export const pointsAssignments = [
  movePointAssignment,
  perpendicularAssignment,
  alignPointsInXAxisAssignment,
  whichPositionAssignment,
  distanceBetweenPointsAssignment,
];
