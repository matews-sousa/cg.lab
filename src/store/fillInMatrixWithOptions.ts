import { create } from "zustand";
import { produce } from "immer";
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
  selectOption: (row: number, col: number, optionId: string) => void;
  unselectOption: (row: number, col: number) => void;
  reset: () => void;
}

const initialState = {
  matrix: null,
  options: [],
  selectedOptions: [],
};

export const useFillInMatrixWithOptionsStore =
  create<FillInMatrixWithOptionsStore>((set, get) => ({
    ...initialState,
    setMatrix: matrix => set({ matrix }),

    updateMatrixValue: (row, col, value) =>
      set(
        produce((state: FillInMatrixWithOptionsStore) => {
          if (!state.matrix) return;
          state.matrix.matrixValue[row][col].value = value;
        })
      ),

    setIsEditable: (row, col, isEditable) =>
      set(
        produce((state: FillInMatrixWithOptionsStore) => {
          if (!state.matrix) return;
          state.matrix.matrixValue[row][col].editable = isEditable;
        })
      ),

    setOptions: options => set({ options }),

    setSelectedOptions: selectedOptions => set({ selectedOptions }),

    selectOption: (row, col, optionId) => {
      const state = get();
      const selectedOption = state.options.find(o => o.id === optionId);
      if (!selectedOption) return;

      set(
        produce((draft: FillInMatrixWithOptionsStore) => {
          // Update selected options
          const existingIndex = draft.selectedOptions.findIndex(
            o => o.row === row && o.col === col
          );

          if (existingIndex >= 0) {
            draft.selectedOptions[existingIndex].option = selectedOption;
          } else {
            draft.selectedOptions.push({ row, col, option: selectedOption });
          }

          // Update matrix value
          if (draft.matrix) {
            draft.matrix.matrixValue[row][col].value = selectedOption.value;
            draft.matrix.matrixValue[row][col].editable = false;
          }
        })
      );
    },

    unselectOption(row, col) {
      set(
        produce((draft: FillInMatrixWithOptionsStore) => {
          const index = draft.selectedOptions.findIndex(
            o => o.row === row && o.col === col
          );
          if (index >= 0) {
            draft.selectedOptions.splice(index, 1);
          }

          if (draft.matrix) {
            draft.matrix.matrixValue[row][col].editable = true;
            draft.matrix.matrixValue[row][col].value = 0; // Reset value to 0 or any default value
          }
        })
      );
    },

    reset: () => set(initialState),
  }));
