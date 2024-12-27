import { create } from "zustand";

interface FillInTheBlankWithOptionsStore {
  sentence: string; // Sentence with placeholders as {id}
  selectedValues: Record<string, string>; // Map of placeholder id to selected value
  options: {
    id: string;
    value: string;
    correct: boolean;
  }[];
  handleSelect: (id: string, value: string) => void;
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
  options: [],
};

export const useFillInTheBlankWithOptionsStore =
  create<FillInTheBlankWithOptionsStore>(set => ({
    ...initialState,
    handleSelect: (id, value) => {
      set(state => ({
        selectedValues: {
          ...state.selectedValues,
          [id]: value,
        },
      }));
    },
    handleRemove: id => {
      set(state => {
        const updated = { ...state.selectedValues };
        delete updated[id];
        return { selectedValues: updated };
      });
    },
    setOptions: options => set({ options }),
    setSentence: sentence => set({ sentence }),
    reset: () => set({ ...initialState }),
  }));
