import { Matrix3, Matrix4 } from "three";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type MatrixOption = {
  id: string;
  matrix: Matrix3 | Matrix4;
};

interface OrderMatrixStore {
  matricesOptions: MatrixOption[];
  objectsMatrices: Record<string, Array<Matrix3 | Matrix4>>;
  setObjectsMatrices: (
    objectsMatrices: Record<string, Array<Matrix3 | Matrix4>>
  ) => void;
  setMatricesOptions: (matricesOptions: MatrixOption[]) => void;
  addMatrixOption: (id: string, matrix: Matrix3 | Matrix4) => void;
  createObject: (objectKey: string) => void;
  addObjectMatrix: (objectKey: string, matrix: Matrix3 | Matrix4) => void;
  addObjectMatrices: (
    objectKey: string,
    matrices: Array<Matrix3 | Matrix4>
  ) => void;
  updateObjectMatrix: (
    objectKey: string,
    index: number,
    matrix: Matrix3 | Matrix4
  ) => void;
  setObjectMatrices: (
    objectKey: string,
    matrices: Array<Matrix3 | Matrix4>
  ) => void;
  removeObjectMatrix: (objectKey: string, index: number) => void;
  reset: () => void;
}

const initialState = {
  matricesOptions: [],
  objectsMatrices: {},
};

export const useOrderMatrixStore = create<OrderMatrixStore>()(
  immer(set => ({
    ...initialState,
    setObjectsMatrices: objectsMatrices => set({ objectsMatrices }),
    setMatricesOptions: matricesOptions =>
      set(state => {
        state.matricesOptions = matricesOptions;
      }),
    addMatrixOption(id, matrix) {
      set(state => {
        state.matricesOptions.push({ id, matrix });
      });
    },
    createObject: objectKey =>
      set(state => {
        state.objectsMatrices[objectKey] = [];
      }),
    addObjectMatrix: (objectKey, matrix) =>
      set(state => {
        state.objectsMatrices[objectKey].push(matrix);
      }),
    addObjectMatrices: (objectKey, matrices) =>
      set(state => {
        state.objectsMatrices[objectKey] = matrices;
      }),
    updateObjectMatrix: (objectKey, index, matrix) =>
      set(state => {
        state.objectsMatrices[objectKey][index] = matrix;
      }),
    setObjectMatrices: (objectKey, matrices) =>
      set(state => {
        state.objectsMatrices[objectKey] = matrices;
      }),
    removeObjectMatrix: (objectKey, index) =>
      set(state => {
        state.objectsMatrices[objectKey] = state.objectsMatrices[
          objectKey
        ].filter((_, i) => i !== index);
      }),
    reset: () =>
      set(state => {
        state.matricesOptions = [];
        state.objectsMatrices = {};
      }),
  }))
);
