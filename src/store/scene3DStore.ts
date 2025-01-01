import { Vector3 } from "three";
import { create } from "zustand";

export type TCube = {
  id: string;
  label?: string;
  position: Vector3;
  size: Vector3;
  color: string;
  rotation: Vector3;
  scale: Vector3;
};

interface Scene3DStore {
  cubes: TCube[];
  addCube: (cube: TCube) => void;
  getCube: (id: string) => TCube | undefined;
  updateCube: (id: string, cube: TCube) => void;
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
  reset: () => {
    set(initialState);
  },
}));
