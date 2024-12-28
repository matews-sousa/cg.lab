export type TPoint = {
  id: string;
  position: [number, number];
  movable: boolean;
  constraints?: {
    roundCoordinates?: boolean;
  };
  label?: string;
  color?: string;
};

export type TVector = {
  id: string;
  tail: [number, number];
  tip: [number, number];
  tailMovable?: boolean;
  tipMovable?: boolean;
  middleMovable?: boolean;
  color?: string;
  label?: string;
};

export type TPolygon = {
  id: string;
  points: TPoint[];
  color?: string;
  strokeStyle?: "solid" | "dashed";
  movable?: boolean;
};

export type Annotation = {
  type: "LaTeX";
  position: "relative" | "absolute";
  text: string;
  point_reference: string;
  offset?: [number, number];
};

export type Scene2DConfig = {
  pan?: boolean;
  viewBox: {
    x: [number, number];
    y: [number, number];
  };
  grid: {
    subdivisions: number;
  };
  points?: TPoint[];
  vectors?: TVector[];
  polygons?: TPolygon[];
  annotations?: Annotation[];
};
