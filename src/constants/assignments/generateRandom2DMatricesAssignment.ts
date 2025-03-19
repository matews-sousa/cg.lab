import {
  MatrixType,
  useFillBlankMatrixInputStore,
} from "@/store/fillInBlankMatrixInputStore";
import { useScene2DStore } from "@/store/scene2DStore";
import { AssignmentType, RandomGeneratedAssignment } from "@/types/Assignment";
import { TPoint } from "@/types/Scene2DConfig";
import { getRandomCoords, getRandomIntInRange } from "@/utils";
import {
  initial2DScalingMatrixValue,
  initial2DTranslationMatrixValue,
} from "../inicial2DMatricesValues";
import { SubjectCategories } from "../defaultDailyMissions";
import { Matrix3 } from "three";
import { applyMatrixToSquare, createSquare } from "./matrices/orderingMatrices";
import {
  MatrixOption,
  useOrderMatrixStore,
} from "@/store/orderMatrixMultiplicationStore";
import { degreesToRadians } from "@/lib/utils";
import { shuffleArray } from "@/utils";

const COORDINATE_LIMITS = [-4, 4] as [number, number];

function setupScene(points: TPoint[]) {
  const { reset, setPoints } = useScene2DStore.getState();
  reset();
  setPoints(points);
}

const generateRandomSquarePoints = (): [number, number][] => {
  // Generate a random center for the square
  const centerX = getRandomCoords([-2, 2])[0]; // Random X-coordinate between -3 and 3
  const centerY = getRandomCoords([-2, 2])[0]; // Random Y-coordinate between -5 and 5
  const size = getRandomCoords([1, 2])[0]; // Random size between 1 and 2

  // Calculate square vertices based on the center and size
  return [
    [centerX - size, centerY - size],
    [centerX + size, centerY - size],
    [centerX + size, centerY + size],
    [centerX - size, centerY + size],
  ];
};

function createMatrixAssignment({
  title,
  instructions,
  type,
  subjectCategory,
  setup,
  validate,
}: {
  title: string;
  instructions: string;
  type: AssignmentType;
  subjectCategory: SubjectCategories;
  setup: () => void;
  validate: () => boolean;
}) {
  return {
    id: "matrix-assignment",
    dimensions: "2D" as "2D" | "3D",
    order: Math.floor(Math.random() * 100),
    title,
    instructions,
    subjectCategory,
    type,
    setup,
    validate,
  };
}

export function generate2DFillInTranslationMatrixAssignment(): RandomGeneratedAssignment {
  const pointA = getRandomCoords(COORDINATE_LIMITS);
  const targetPoint = getRandomCoords(COORDINATE_LIMITS);

  return createMatrixAssignment({
    title: "Matrix de translação 2D",
    instructions: `Complete a matriz de translação que desloque o ponto A(${pointA[0]}, ${pointA[1]}) para a posição (${targetPoint[0]}, ${targetPoint[1]})`,
    type: AssignmentType.FILL_IN_THE_BLANK_MATRIX,
    subjectCategory: "translation-matrix",
    setup: () => {
      setupScene([
        {
          id: "pointA",
          position: pointA,
          movable: false,
          label: "A",
        },
      ]);

      useFillBlankMatrixInputStore.getState().setMatrices([
        {
          id: "translationMatrix",
          type: MatrixType.TRANSLATION,
          dimention: "2D",
          matrixValue: initial2DTranslationMatrixValue,
          pointRefId: "pointA",
        },
      ]);
    },
    validate: () => {
      const { getPoint, addVector } = useScene2DStore.getState();
      const point = getPoint("pointA");
      if (!point || !point.translation) return false;
      const calculatedPoint = [
        point.position[0] + point.translation[0],
        point.position[1] + point.translation[1],
      ] as [number, number];

      const isCorrect =
        calculatedPoint[0] === targetPoint[0] &&
        calculatedPoint[1] === targetPoint[1];

      if (isCorrect) {
        addVector({
          id: "translationVector",
          tail: point.position,
          tip: calculatedPoint,
          color: "blue",
          label: "t",
        });
      }

      return isCorrect;
    },
  });
}

export function generate2DFillInTranslationMatrixForSquareAssignment(): RandomGeneratedAssignment {
  const initialPoints = generateRandomSquarePoints();
  const randomTranslation = getRandomCoords([-3, 3]);

  return createMatrixAssignment({
    title: "Matrix de translação 2D",
    instructions: `Complete a matriz de Translação que desloque o quadrado Azul para o quadrado Verde`,
    type: AssignmentType.FILL_IN_THE_BLANK_MATRIX,
    subjectCategory: "translation-matrix",
    setup: () => {
      useScene2DStore.getState().reset();
      useScene2DStore.getState().setPolygons([
        {
          id: "polygon",
          points: initialPoints.map((point, index) => ({
            id: `point${index}`,
            position: point,
            movable: false,
          })),
          color: "blue",
        },
        {
          id: "translatedPolygon",
          points: initialPoints.map((point, index) => ({
            id: `translatedPoint${index}`,
            position: [
              point[0] + randomTranslation[0],
              point[1] + randomTranslation[1],
            ],
            movable: false,
          })),
          color: "green",
        },
      ]);

      useFillBlankMatrixInputStore.getState().setMatrices([
        {
          id: "translationMatrix",
          type: MatrixType.TRANSLATION,
          dimention: "2D",
          matrixValue: initial2DTranslationMatrixValue,
          polygonRefId: "polygon",
        },
      ]);
    },
    validate: () => {
      const { getPolygon, addVector } = useScene2DStore.getState();
      const polygon = getPolygon("polygon");
      if (!polygon || !polygon.translation) return false;

      const isCorrect =
        polygon.translation[0] === randomTranslation[0] &&
        polygon.translation[1] === randomTranslation[1];

      if (isCorrect) {
        // Add vector to represent the translation
        initialPoints.forEach((point, index) => {
          addVector({
            id: `translationVector${index}`,
            tail: point,
            tip: [
              point[0] + polygon.translation![0],
              point[1] + polygon.translation![1],
            ],
            color: "green",
          });
        });
        useScene2DStore.getState().addPolygon({
          id: "polygon",
          points: initialPoints.map((point, index) => ({
            id: `point${index}`,
            position: point,
            movable: false,
          })),
          color: "blue",
        });
      }

      return isCorrect;
    },
  });
}

export function generate2DTranslationMatrixAssignment(): RandomGeneratedAssignment {
  const pointA = getRandomCoords(COORDINATE_LIMITS);
  const targetPoint = getRandomCoords(COORDINATE_LIMITS);

  return createMatrixAssignment({
    title: "Matrix de translação 2D",
    instructions: `Mova o ponto A(${pointA[0]}, ${pointA[1]}) para a posição resultante da aplicação da matriz de translação`,
    type: AssignmentType.FILL_IN_THE_BLANK_MATRIX,
    subjectCategory: "translation-matrix",
    setup: () => {
      setupScene([
        {
          id: "pointA",
          position: pointA,
          movable: true,
          label: "A",
          constraints: {
            roundCoordinates: true,
          },
        },
      ]);

      const newMatrixValue = structuredClone(initial2DTranslationMatrixValue);
      newMatrixValue[0][2].value = targetPoint[0] - pointA[0];
      newMatrixValue[0][2].editable = false;
      newMatrixValue[1][2].value = targetPoint[1] - pointA[1];
      newMatrixValue[1][2].editable = false;

      useFillBlankMatrixInputStore.getState().setMatrices([
        {
          id: "translationMatrix",
          type: MatrixType.TRANSLATION,
          dimention: "2D",
          matrixValue: newMatrixValue,
        },
      ]);
    },
    validate: () => {
      const { getPoint } = useScene2DStore.getState();
      const point = getPoint("pointA");
      if (!point) return false;
      const isCorrect =
        point.position[0] === targetPoint[0] &&
        point.position[1] === targetPoint[1];

      return isCorrect;
    },
  });
}

export function generate2DScaleMatrixAssignment(): RandomGeneratedAssignment {
  const initialPoints = generateRandomSquarePoints();
  const randomScaleTarget = getRandomCoords([1, 3]);

  return createMatrixAssignment({
    title: "Matrix de escala 2D",
    instructions: `Mova os pontos do quadrado para a posição resultante da aplicação da matriz de escala`,
    type: AssignmentType.FILL_IN_THE_BLANK_MATRIX,
    subjectCategory: "scaling-matrix",
    setup: () => {
      useScene2DStore.getState().setPolygons([
        {
          id: "polygon",
          points: initialPoints.map((point, index) => ({
            id: `point${index}`,
            position: point,
            movable: true,
            constraints: {
              roundCoordinates: true,
            },
          })),
          color: "blue",
        },
      ]);

      const newMatrixValue = structuredClone(initial2DScalingMatrixValue);
      newMatrixValue[0][0].value = randomScaleTarget[0];
      newMatrixValue[0][0].editable = false;
      newMatrixValue[1][1].value = randomScaleTarget[1];
      newMatrixValue[1][1].editable = false;

      useFillBlankMatrixInputStore.getState().setMatrices([
        {
          id: "scaleMatrix",
          type: MatrixType.SCALING,
          dimention: "2D",
          matrixValue: newMatrixValue,
        },
      ]);
    },
    validate: () => {
      const { getPolygon } = useScene2DStore.getState();
      const polygon = getPolygon("polygon");
      if (!polygon) return false;

      const transformedPoints = initialPoints.map(point => ({
        x: point[0] * randomScaleTarget[0],
        y: point[1] * randomScaleTarget[1],
      }));

      const isCorrect = polygon.points.every((point, index) => {
        return (
          point.position[0] === transformedPoints[index].x &&
          point.position[1] === transformedPoints[index].y
        );
      });

      return isCorrect;
    },
  });
}

function generateTransformations() {
  const transformations = [];

  // Add translation (ensure it's not zero)
  const translation = getRandomCoords([-3, 3]);
  if (translation[0] !== 0 || translation[1] !== 0) {
    transformations.push({
      type: "translation",
      value: translation,
    });
  }

  // Add scaling (ensure it's not 1)
  const scaling = getRandomCoords([1, 3]);
  if (scaling[0] !== 1 || scaling[1] !== 1) {
    transformations.push({
      type: "scaling",
      value: scaling,
    });
  }

  // Add rotation (ensure it's not 0°)
  const rotation = getRandomIntInRange(-45, 45);
  if (rotation !== 0) {
    transformations.push({
      type: "rotation",
      value: rotation,
    });
  }

  // Ensure at least two transformations are applied
  if (transformations.length < 2) {
    transformations.push({
      type: "translation",
      value: getRandomCoords([-3, 3]),
    });
  }

  return transformations;
}

function generateMatrices(
  transformations: (
    | { type: string; value: [number, number] }
    | { type: string; value: number }
  )[]
) {
  return transformations.map(({ type, value }) => {
    const matrix = new Matrix3();
    switch (type) {
      case "translation":
        if (Array.isArray(value))
          matrix.makeTranslation(value[0], value[1]).transpose();
        break;
      case "scaling":
        if (Array.isArray(value)) matrix.makeScale(value[0], value[1]);
        break;
      case "rotation":
        if (typeof value === "number")
          matrix.makeRotation(degreesToRadians(value));
        break;
    }
    return matrix;
  });
}

export function generate2DMatrixMultiplicationSortingAssignment(): RandomGeneratedAssignment {
  const randomInitialPolygon = createSquare("square1", "blue", [0, 0], [1, 1]);
  // generate random matrices to be multiplied using Matrix3 from three
  const transformations = generateTransformations();
  // shuffle the transformations to be applied
  const shuffledTransformations = shuffleArray(transformations);
  const matrices = generateMatrices(shuffledTransformations);
  // generate the objective polygon by applying the matrices to the initial polygon
  const objectivePolygon = applyMatrixToSquare(matrices, randomInitialPolygon);

  // generate the assignment
  return createMatrixAssignment({
    title: "Ordenação de multiplicação de matrizes 2D",
    instructions: `Ordene as matrizes de forma que a multiplicação resulte no objetivo esperado`,
    type: AssignmentType.ORDER_MATRIX_MULTIPLICATION,
    subjectCategory: "matrix-multiplication",
    setup() {
      const { setPolygons, setObjectivePolygons } = useScene2DStore.getState();
      setPolygons([randomInitialPolygon]);
      setObjectivePolygons([objectivePolygon]);

      const { createObject, setMatricesOptions } =
        useOrderMatrixStore.getState();
      createObject("square1");
      const matricesOptions: MatrixOption[] = shuffledTransformations.map(
        ({ type, value }, index) => ({
          id: type,
          matrix: matrices[index],
          rotationAngle:
            type === "rotation" && typeof value === "number"
              ? value
              : undefined,
          rotationAxis: type === "rotation" ? "z" : undefined,
        })
      );
      setMatricesOptions(shuffleArray(matricesOptions));
    },
    validate() {
      const square1 = useScene2DStore.getState().getPolygon("square1");
      if (!square1) return false;

      const objectiveSquare = objectivePolygon;
      return (
        square1.points.every(
          (point, index) =>
            point.position[0] === objectiveSquare.points[index].position[0] &&
            point.position[1] === objectiveSquare.points[index].position[1]
        ) && square1.color === objectiveSquare.color
      );
    },
  });
}
