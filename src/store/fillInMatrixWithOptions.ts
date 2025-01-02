import { create } from "zustand";
import { Matrix } from "./fillInBlankMatrixInputStore";

export type Option = {
  id: string;
  displayValue: string;
  value: number;
};

export type SelectedOption = {
  row: number;
  col: number;
  option: Option;
};

interface FillInMatrixWithOptionsStore {
  matrix: Matrix | null;
  options: Option[];
  selectedOptions: SelectedOption[];
  setMatrix: (matrix: Matrix) => void;
  updateMatrixValue: (row: number, col: number, value: number | string) => void;
  setIsEditable: (row: number, col: number, isEditable: boolean) => void;
  setOptions: (options: Option[]) => void;
  setSelectedOptions: (selectedOptions: SelectedOption[]) => void;
  reset: () => void;
}

const initialState = {
  matrix: null,
  options: [],
  selectedOptions: [],
};

export const useFillInMatrixWithOptionsStore =
  create<FillInMatrixWithOptionsStore>(set => ({
    ...initialState,
    setMatrix: matrix => set({ matrix }),
    updateMatrixValue: (row, col, value) =>
      set(state => {
        if (!state.matrix) return state;
        const newMatrix = state.matrix.matrixValue.map((r, rowIndex) => {
          if (rowIndex === row) {
            return r.map((c, colIndex) => {
              if (colIndex === col) {
                return { ...c, value };
              }
              return c;
            });
          }
          return r;
        });

        return {
          matrix: {
            ...state.matrix,
            matrixValue: newMatrix,
          },
        };
      }),
    setIsEditable: (row, col, isEditable) =>
      set(state => {
        if (!state.matrix) return state;
        const newMatrix = state.matrix.matrixValue.map((r, rowIndex) => {
          if (rowIndex === row) {
            return r.map((c, colIndex) => {
              if (colIndex === col) {
                return { ...c, editable: isEditable };
              }
              return c;
            });
          }
          return r;
        });

        return {
          matrix: {
            ...state.matrix,
            matrixValue: newMatrix,
          },
        };
      }),
    setOptions: options => set({ options }),
    setSelectedOptions: options => set({ selectedOptions: options }),
    reset: () => set({ ...initialState }),
  }));
