import { Vector3 } from "three";

export function getRandomIntInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomVector(
  range: readonly [number, number]
): [number, number] {
  // make sure the vector is not the zero vector
  let x, y;
  do {
    x = getRandomIntInRange(range[0], range[1]);
    y = getRandomIntInRange(range[0], range[1]);
  } while (x === 0 && y === 0);
  return [x, y];
}

export function getRandomVectorWithTailAndTip(
  range: readonly [number, number]
): {
  tail: [number, number];
  tip: [number, number];
} {
  // make sure the vector tail and tip are not the same
  let tail, tip;
  do {
    tail = getRandomVector(range);
    tip = getRandomVector(range);
  } while (tail[0] === tip[0] && tail[1] === tip[1]);
  return { tail, tip };
}

export function getRandomCoords(
  range: readonly [number, number]
): [number, number] {
  return [
    getRandomIntInRange(range[0], range[1]),
    getRandomIntInRange(range[0], range[1]),
  ];
}

export function getRandomVector3(range: readonly [number, number]): Vector3 {
  return new Vector3(
    getRandomIntInRange(range[0], range[1]),
    getRandomIntInRange(range[0], range[1]),
    getRandomIntInRange(range[0], range[1])
  );
}

export const generateAssignmentId = (prefix: string): string =>
  `${prefix}-${Math.random().toString(36).substring(7)}`;

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
