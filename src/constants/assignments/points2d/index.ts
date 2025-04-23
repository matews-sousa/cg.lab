import { Assignment } from "@/types/Assignment";
import {
  alignPointsInXAxisAssignment,
  alignPointsInYAxisAssignment,
} from "./alignPointsInAxis";
import { movePointAssignmentsList } from "./movePoint";
import { pointPositionWithOptionsAssignmentsList } from "./pointPosition";
import { whichPositionAssignmentList } from "./whichPosition";

export const pointsAssignments: Assignment[] = [
  ...pointPositionWithOptionsAssignmentsList,
  alignPointsInXAxisAssignment,
  alignPointsInYAxisAssignment,
  ...movePointAssignmentsList,
  ...whichPositionAssignmentList,
];
