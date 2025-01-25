import { create } from "zustand";

export type TOption = {
  id: string;
  value: string;
  correct: boolean;
};

interface FillInTheBlankWithOptionsStore {
  sentence: string; // Sentence with placeholders as {id}
  selectedValues: Record<string, string>; // Map of placeholder id to selected value
  selectedOptions: Record<string, TOption>; // Map of placeholder id to selected option
  options: TOption[];
  handleSelect: (id: string, option: TOption) => void;
  handleRemove: (id: string) => void;
  setOptions: (
    options: { id: string; value: string; correct: boolean }[]
  ) => void;
  setSentence: (sentence: string) => void;
  reset: () => void;
}

const initialState = {
  sentence: "",
  selectedValues: {},
  selectedOptions: {},
  options: [],
};

export const useFillInTheBlankWithOptionsStore =
  create<FillInTheBlankWithOptionsStore>(set => ({
    ...initialState,
    handleSelect: (id, option) => {
      set(state => {
        const selectedValues = { ...state.selectedValues };
        selectedValues[id] = option.value;
        return {
          selectedValues,
          selectedOptions: {
            ...state.selectedOptions,
            [id]: option,
          },
        };
      });
    },
    handleRemove: id => {
      set(state => {
        const selectedValues = { ...state.selectedValues };
        delete selectedValues[id];
        const selectedOptions = { ...state.selectedOptions };
        delete selectedOptions[id];
        return { selectedValues, selectedOptions };
      });
    },
    setOptions: options => set({ options }),
    setSentence: sentence => set({ sentence }),
    reset: () => set({ ...initialState }),
  }));
