import { Assignment } from "@/types/Assignment";
import {
  alignPointsInXAxisAssignment,
  alignPointsInYAxisAssignment,
} from "./alignPointsInAxis";
import { distanceBetweenPointsAssignment } from "./distanceBetweenPoints";
import { movePointAssignmentsList } from "./movePoint";
import { perpendicularAssignment } from "./perpendicular";
import { pointPositionWithOptionsAssignmentsList } from "./pointPosition";
import { positionTwoTrianglesToSquare } from "./positionTwoTrianglesToSquare";
import { scaleSquarePointsAssignment } from "./scaleSquarePoints";
import { whichPositionAssignmentList } from "./whichPosition";

export const pointsAssignments: Assignment[] = [
  ...movePointAssignmentsList,
  alignPointsInXAxisAssignment,
  alignPointsInYAxisAssignment,
  ...pointPositionWithOptionsAssignmentsList,
  ...whichPositionAssignmentList,
  distanceBetweenPointsAssignment,
  perpendicularAssignment,
  scaleSquarePointsAssignment,
  positionTwoTrianglesToSquare,
];
