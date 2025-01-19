import { create } from "zustand";

type TOption = {
  id: string;
  value: string;
  correct: boolean;
};

interface FillInTheBlankWithOptionsStore {
  sentence: string; // Sentence with placeholders as {id}
  selectedValues: Record<string, string>; // Map of placeholder id to selected value
  selectedOptions: string[]; // Map of placeholder id to selected option
  options: TOption[];
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
  selectedOptions: [],
  options: [],
};

export const useFillInTheBlankWithOptionsStore =
  create<FillInTheBlankWithOptionsStore>((set, get) => ({
    ...initialState,
    handleSelect: (id, value) => {
      const option = get().options.find(option => option.value === value);
      if (!option) return;
      set(state => ({
        selectedValues: { ...state.selectedValues, [id]: value },
        selectedOptions: [...state.selectedOptions, option.id],
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
