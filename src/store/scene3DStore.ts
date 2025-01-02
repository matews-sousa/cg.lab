import { Matrix4, Vector3 } from "three";
import { create } from "zustand";

export type TCube = {
  id: string;
  label?: string;
  position: Vector3;
  size: Vector3;
  color: string;
  rotation: Vector3;
  scale: Vector3;
  customXRotationMatrix?: Matrix4 | null;
  customYRotationMatrix?: Matrix4 | null;
  customZRotationMatrix?: Matrix4 | null;
};

interface Scene3DStore {
  cubes: TCube[];
  addCube: (cube: TCube) => void;
  getCube: (id: string) => TCube | undefined;
  updateCube: (id: string, cube: TCube) => void;
  setCubeCustomYRotationMatrix: (id: string, matrix: Matrix4 | null) => void;
  setCubeCustomXRotationMatrix: (id: string, matrix: Matrix4 | null) => void;
  setCubeCustomZRotationMatrix: (id: string, matrix: Matrix4 | null) => void;
  reset: () => void;
}

const initialState = {
  cubes: [],
};

export const useScene3DStore = create<Scene3DStore>((set, get) => ({
  ...initialState,
  addCube: cube => {
    set(state => ({
      ...state,
      cubes: [...state.cubes, cube],
    }));
  },
  getCube: id => {
    return get().cubes.find(cube => cube.id === id);
  },
  updateCube: (id, cube) => {
    set(state => {
      const index = state.cubes.findIndex(cube => cube.id === id);
      if (index === -1) return state;
      const newCubes = [...state.cubes];
      newCubes[index] = cube;
      return {
        ...state,
        cubes: newCubes,
      };
    });
  },
  setCubeCustomYRotationMatrix: (id, matrix) => {
    set(state => {
      const index = state.cubes.findIndex(cube => cube.id === id);
      if (index === -1) return state;
      const newCubes = [...state.cubes];
      newCubes[index] = { ...newCubes[index], customYRotationMatrix: matrix };
      return {
        ...state,
        cubes: newCubes,
      };
    });
  },
  setCubeCustomXRotationMatrix: (id, matrix) => {
    set(state => {
      const index = state.cubes.findIndex(cube => cube.id === id);
      if (index === -1) return state;
      const newCubes = [...state.cubes];
      newCubes[index] = { ...newCubes[index], customXRotationMatrix: matrix };
      return {
        ...state,
        cubes: newCubes,
      };
    });
  },
  setCubeCustomZRotationMatrix: (id, matrix) => {
    set(state => {
      const index = state.cubes.findIndex(cube => cube.id === id);
      if (index === -1) return state;
      const newCubes = [...state.cubes];
      newCubes[index] = { ...newCubes[index], customZRotationMatrix: matrix };
      return {
        ...state,
        cubes: newCubes,
      };
    });
  },
  reset: () => {
    set(initialState);
  },
}));
