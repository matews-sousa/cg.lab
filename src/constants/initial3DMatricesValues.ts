import { MatrixValue } from "@/store/fillInBlankMatrixInputStore";

export const initial3DTranslationMatrixValue: MatrixValue[][] = [
  [
    { value: 1, editable: false },
    { value: 0, editable: false },
    { value: 0, editable: false },
    { value: "", editable: true },
  ],
  [
    { value: 0, editable: false },
    { value: 1, editable: false },
    { value: 0, editable: false },
    { value: "", editable: true },
  ],
  [
    { value: 0, editable: false },
    { value: 0, editable: false },
    { value: 1, editable: false },
    { value: "", editable: true },
  ],
  [
    { value: 0, editable: false },
    { value: 0, editable: false },
    { value: 0, editable: false },
    { value: 1, editable: false },
  ],
];

export const initial3DScalingMatrixValue: MatrixValue[][] = [
  [
    { value: 1, editable: true },
    { value: 0, editable: false },
    { value: 0, editable: false },
    { value: 0, editable: false },
  ],
  [
    { value: 0, editable: false },
    { value: 1, editable: true },
    { value: 0, editable: false },
    { value: 0, editable: false },
  ],
  [
    { value: 0, editable: false },
    { value: 0, editable: false },
    { value: 1, editable: true },
    { value: 0, editable: false },
  ],
  [
    { value: 0, editable: false },
    { value: 0, editable: false },
    { value: 0, editable: false },
    { value: 1, editable: false },
  ],
];

export const initial3DRotationMatrixXValue: MatrixValue[][] = [
  [
    { value: 1, editable: false },
    { value: 0, editable: false },
    { value: 0, editable: false },
    { value: 0, editable: false },
  ],
  [
    { value: 0, editable: false },
    { value: "", editable: true },
    { value: "", editable: true },
    { value: 0, editable: false },
  ],
  [
    { value: 0, editable: false },
    { value: "", editable: true },
    { value: "", editable: true },
    { value: 0, editable: false },
  ],
  [
    { value: 0, editable: false },
    { value: 0, editable: false },
    { value: 0, editable: false },
    { value: 1, editable: false },
  ],
];

export const initial3DRotationMatrixYValue: MatrixValue[][] = [
  [
    { value: "", editable: true },
    { value: 0, editable: false },
    { value: "", editable: true },
    { value: 0, editable: false },
  ],
  [
    { value: 0, editable: false },
    { value: 1, editable: false },
    { value: 0, editable: false },
    { value: 0, editable: false },
  ],
  [
    { value: "", editable: true },
    { value: 0, editable: false },
    { value: "", editable: true },
    { value: 0, editable: false },
  ],
  [
    { value: 0, editable: false },
    { value: 0, editable: false },
    { value: 0, editable: false },
    { value: 1, editable: false },
  ],
];

export const initial3DRotationMatrixZValue: MatrixValue[][] = [
  [
    { value: "", editable: true },
    { value: "", editable: true },
    { value: 0, editable: false },
    { value: 0, editable: false },
  ],
  [
    { value: "", editable: true },
    { value: "", editable: true },
    { value: 0, editable: false },
    { value: 0, editable: false },
  ],
  [
    { value: 0, editable: false },
    { value: 0, editable: false },
    { value: 1, editable: false },
    { value: 0, editable: false },
  ],
  [
    { value: 0, editable: false },
    { value: 0, editable: false },
    { value: 0, editable: false },
    { value: 1, editable: false },
  ],
];
