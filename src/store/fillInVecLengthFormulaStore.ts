import { create } from "zustand";

export interface VecLenFormula {
  vectorRefId: string;
  values: {
    x: number | string;
    y: number | string;
    z: number | string;
  };
  dimentions: "2D" | "3D";
  fixedValues?: boolean;
}

interface FillInVecLengthFormulaStore {
  vecLengthFormulas: VecLenFormula[];
  getVecLengthFormula: (vectorRefId: string) => VecLenFormula | undefined;
  setVecLengthFormulas: (vecLengthFormulas: VecLenFormula[]) => void;
  setVectorRefId: (vectorRefId: string) => void;
  setValues: (
    vectorRefId: string,
    values: { x: number | string; y: number | string; z: number | string }
  ) => void;
  setDimentions: (vectorRefId: string, dimentions: "2D" | "3D") => void;
  reset: () => void;
}

const initialState = {
  vecLengthFormulas: [],
};

export const useFillInVecLengthFormulaStore =
  create<FillInVecLengthFormulaStore>((set, get) => ({
    ...initialState,
    getVecLengthFormula: vectorRefId =>
      get().vecLengthFormulas.find(
        formula => formula.vectorRefId === vectorRefId
      ),
    setVecLengthFormulas: vecLengthFormulas => set({ vecLengthFormulas }),
    setVectorRefId: vectorRefId =>
      set(state => ({
        vecLengthFormulas: state.vecLengthFormulas.map(formula =>
          formula.vectorRefId === vectorRefId
            ? { ...formula, vectorRefId }
            : formula
        ),
      })),
    setValues: (vectorRefId, values) =>
      set(state => ({
        vecLengthFormulas: state.vecLengthFormulas.map(formula =>
          formula.vectorRefId === vectorRefId ? { ...formula, values } : formula
        ),
      })),
    setDimentions: (vectorRefId, dimentions) =>
      set(state => ({
        vecLengthFormulas: state.vecLengthFormulas.map(formula =>
          formula.vectorRefId === vectorRefId
            ? { ...formula, dimentions }
            : formula
        ),
      })),
    reset: () => set({ ...initialState }),
  }));
