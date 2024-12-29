import { create } from "zustand";

type Dimention = "2D" | "3D";

type CoordinateInput = {
  dimention: Dimention;
  pointRef: string;
  coordinatesValue: {
    x: number | string;
    y: number | string;
    z?: number | string;
  };
};

interface FillInTheBlankStore {
  inputs: CoordinateInput[];
  setInputs: (inputs: CoordinateInput[]) => void;
  setInputValue: (
    pointRef: string,
    value: { x: number | string; y: number | string; z?: number | string }
  ) => void;
  getInputByPointRef: (pointRef: string) => CoordinateInput | undefined;
  reset: () => void;
}

const initialState = {
  inputs: [],
};

export const useFillInTheBlankStore = create<FillInTheBlankStore>(
  (set, get) => ({
    ...initialState,
    setInputs: inputs => set({ inputs }),
    setInputValue: (pointRef, value) => {
      const input = get().inputs.find(input => input.pointRef === pointRef);
      if (input) {
        input.coordinatesValue = value;
        set({ inputs: [...get().inputs] });
      }
    },
    getInputByPointRef: pointRef =>
      get().inputs.find(input => input.pointRef === pointRef),
    reset: () => set({ ...initialState }),
  })
);
