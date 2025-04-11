import { Assignment } from "@/types/Assignment";
import {
  alignPointsInXAxisAssignment,
  alignPointsInYAxisAssignment,
} from "./alignPointsInAxis";
import { distanceBetweenPointsAssignment } from "./distanceBetweenPoints";
import { movePointAssignmentsList } from "./movePoint";
import { perpendicularAssignment } from "./perpendicular";
import { pointPositionWithOptionsAssignmentsList } from "./pointPosition";
import { whichPositionAssignmentList } from "./whichPosition";

export const pointsAssignments: Assignment[] = [
  ...pointPositionWithOptionsAssignmentsList,
  alignPointsInXAxisAssignment,
  alignPointsInYAxisAssignment,
  ...movePointAssignmentsList,
  ...whichPositionAssignmentList,
  distanceBetweenPointsAssignment,
  perpendicularAssignment,
];
