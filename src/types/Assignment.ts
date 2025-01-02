export enum AssignmentType {
  INTERACTIVE = "INTERACTIVE",
  PARAMETERIZED = "PARAMETERIZED",
  REORDER = "REORDER",
  FILL_IN_THE_BLANK_COORDINATES = "FILL_IN_THE_BLANK_COORDINATES",
  FILL_IN_THE_BLANK_WITH_OPTIONS = "FILL_IN_THE_BLANK_WITH_OPTIONS",
  FILL_IN_THE_BLANK_MATRIX = "FILL_IN_THE_BLANK_MATRIX",
  FILL_IN_THE_BLANK_MATRIX_WITH_OPTIONS = "FILL_IN_THE_BLANK_MATRIX_WITH_OPTIONS",
}

export interface Assignment {
  id: string;
  order: number;
  title: string;
  instructions: string;
  type: AssignmentType;
  setup: () => void;
  validate: () => boolean;
}
