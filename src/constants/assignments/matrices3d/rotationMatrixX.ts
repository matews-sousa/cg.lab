import { initial3DRotationMatrixXValue } from "@/constants/initial3DMatricesValues";
import {
  MatrixType,
  useFillBlankMatrixInputStore,
} from "@/store/fillInBlankMatrixInputStore";
import { TCube, useScene3DStore } from "@/store/scene3DStore";
import { Assignment, AssignmentType } from "@/types/Assignment";
import { Vector3 } from "three";

export const rotationMatrixX3dAssignment: Assignment = {
  id: "rotation-x-matrix-3d",
  title: "Matriz de Rotação 3D no eixo X",
  instructions:
    "Altere a matriz de rotação 3D no eixo X para que o cubo gire 45 graus.",
  order: 3,
  type: AssignmentType.FILL_IN_THE_BLANK_MATRIX,
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
      type: MatrixType.ROTATION_X,
      objectRefId: cube.id,
      matrixValue: initial3DRotationMatrixXValue,
    });
  },
  validate() {
    const cube = useScene3DStore.getState().cubes.find(c => c.id === "cube-1");
    if (!cube) return false;
    return cube.rotation.equals(new Vector3(45, 0, 0));
  },
};
