import { initial3DRotationMatrixYValue } from "@/constants/initial3DMatricesValues";
import {
  MatrixType,
  useFillBlankMatrixInputStore,
} from "@/store/fillInBlankMatrixInputStore";
import { TCube, useScene3DStore } from "@/store/scene3DStore";
import { Assignment, AssignmentType } from "@/types/Assignment";
import { Vector3 } from "three";

export const rotationMatrixY3dAssignment: Assignment = {
  id: "rotation-y-matrix-3d",
  title: "Matriz de Rotação 3D no eixo Y",
  instructions:
    "Altere a matriz de rotação 3D no eixo Y para que o cubo gire 45 graus.",
  order: 4,
  type: AssignmentType.FILL_IN_THE_BLANK_MATRIX,
  subjectCategory: "rotation-matrix",
  setup() {
    const { addCube } = useScene3DStore.getState();
    const { addMatrix } = useFillBlankMatrixInputStore.getState();
    const cube: TCube = {
      id: "cube-1",
      label: "A",
      position: new Vector3(0, 0.5, 0),
      size: new Vector3(1, 1, 1),
      scale: new Vector3(1, 1, 1),
      rotation: new Vector3(0, 0, 0),
      translation: new Vector3(0, 0, 0),
      color: "red",
    };
    addCube(cube);

    addMatrix({
      id: "rotation-matrix-3d",
      dimention: "3D",
      type: MatrixType.ROTATION_Y,
      objectRefId: cube.id,
      matrixValue: initial3DRotationMatrixYValue,
    });
  },
  validate() {
    const cube = useScene3DStore.getState().cubes.find(c => c.id === "cube-1");
    if (!cube) return false;
    return cube.rotation.equals(new Vector3(0, 45, 0));
  },
};
