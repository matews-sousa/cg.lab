import { Scene2DConfig, TPoint, TVector } from "@/types/Scene2DConfig";
import { create } from "zustand";

type Scene2DStore = {
  config: Scene2DConfig;
  setConfig: (config: Scene2DConfig) => void;
  setPoints: (points: Scene2DConfig["points"]) => void;
  setVectors: (vectors: Scene2DConfig["vectors"]) => void;
  setAnnotations: (annotations: Scene2DConfig["annotations"]) => void;
  movePoint: (id: string, position: [number, number]) => void;
  moveVector: (
    id: string,
    tail: [number, number],
    tip: [number, number]
  ) => void;
  setVectorTail: (id: string, tail: [number, number]) => void;
  setVectorTip: (id: string, tip: [number, number]) => void;
  getPoint: (id: string) => TPoint | undefined;
  getVector: (id: string) => TVector | undefined;
};

export const useScene2DStore = create<Scene2DStore>((set, get) => ({
  config: {
    pan: false,
    viewBox: {
      x: [-10, 10],
      y: [-7, 7],
    },
    grid: {
      subdivisions: 2,
    },
  },
  setConfig: config => set({ config }),
  setPoints: points => set(state => ({ config: { ...state.config, points } })),
  setVectors: vectors =>
    set(state => ({ config: { ...state.config, vectors } })),
  setAnnotations: annotations =>
    set(state => ({ config: { ...state.config, annotations } })),
  movePoint: (id, position) =>
    set(state => ({
      config: {
        ...state.config,
        points: state.config.points?.map(point =>
          point.id === id ? { ...point, position: position } : point
        ),
      },
    })),
  moveVector: (id, tail, tip) =>
    set(state => ({
      config: {
        ...state.config,
        vectors: state.config.vectors?.map(vector =>
          vector.id === id ? { ...vector, tail, tip } : vector
        ),
      },
    })),
  setVectorTail: (id, tail) =>
    set(state => ({
      config: {
        ...state.config,
        vectors: state.config.vectors?.map(vector =>
          vector.id === id ? { ...vector, tail } : vector
        ),
      },
    })),
  setVectorTip: (id, tip) =>
    set(state => ({
      config: {
        ...state.config,
        vectors: state.config.vectors?.map(vector =>
          vector.id === id ? { ...vector, tip } : vector
        ),
      },
    })),
  getPoint: id => get().config.points?.find(point => point.id === id),
  getVector: id => get().config.vectors?.find(vector => vector.id === id),
}));
