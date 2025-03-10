import { Matrix3, Matrix4 } from "three";
import { create } from "zustand";

interface OrderMatrixStore {
  matrices: Array<Matrix3 | Matrix4>;
  objects: Record<string, Array<Matrix3 | Matrix4>>;
  addMatrix: (matrix: Matrix3 | Matrix4) => void;
  addObjectMatrix: (object: string, matrix: Matrix3 | Matrix4) => void;
  addObjectMatrices: (
    object: string,
    matrices: Array<Matrix3 | Matrix4>
  ) => void;
  removeMatrix: (index: number) => void;
  removeObjectMatrix: (object: string, index: number) => void;
  reset: () => void;
}

const initialState = {
  matrices: [],
  objects: {},
};

export const useOrderMatrixStore = create<OrderMatrixStore>(set => ({
  ...initialState,
  addMatrix: matrix =>
    set(state => ({ matrices: [...state.matrices, matrix] })),
  addObjectMatrix: (object, matrix) =>
    set(state => ({
      objects: {
        ...state.objects,
        [object]: [...(state.objects[object] ?? []), matrix],
      },
    })),
  addObjectMatrices: (object, matrices) =>
    set(state => ({
      objects: {
        ...state.objects,
        [object]: matrices,
      },
    })),
  removeMatrix: index =>
    set(state => ({
      matrices: state.matrices.filter((_, i) => i !== index),
    })),
  removeObjectMatrix: (object, index) =>
    set(state => ({
      objects: {
        ...state.objects,
        [object]: state.objects[object].filter((_, i) => i !== index),
      },
    })),
  reset: () => set({ ...initialState }),
}));
