import {
  MatrixType,
  useFillBlankMatrixInputStore,
} from "@/store/fillInBlankMatrixInputStore";
import { TCube, useScene3DStore } from "@/store/scene3DStore";
import { Assignment, AssignmentType } from "@/types/Assignment";
import { Vector3 } from "three";

export const scaleMatrix3dAssignment: Assignment = {
  id: "scale-matrix-3d",
  title: "Matriz de Escala 3D",
  instructions:
    "Altere a matriz de escala no cubo A para que fique com o dobro do tamanho.",
  order: 2,
  type: AssignmentType.FILL_IN_THE_BLANK_MATRIX,
  subjectCategory: "scaling-matrix",
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
      id: "scaling-matrix-3d",
      dimention: "3D",
      type: MatrixType.SCALING,
      objectRefId: cube.id,
      matrixValue: [
        [
          { value: 1, editable: true },
          { value: 0, editable: false },
          { value: 0, editable: false },
          { value: 0, editable: false },
        ],
        [
          { value: 0, editable: false },
          { value: 1, editable: true },
          { value: 0, editable: false },
          { value: 0, editable: false },
        ],
        [
          { value: 0, editable: false },
          { value: 0, editable: false },
          { value: 1, editable: true },
          { value: 0, editable: false },
        ],
        [
          { value: 0, editable: false },
          { value: 0, editable: false },
          { value: 0, editable: false },
          { value: 1, editable: false },
        ],
      ],
    });
  },
  validate() {
    const { matrices } = useFillBlankMatrixInputStore.getState();
    const matrix = matrices.find(m => m.id === "scaling-matrix-3d");
    if (!matrix) return false;
    const cube = useScene3DStore.getState().cubes.find(c => c.id === "cube-1");
    if (!cube) return false;
    const scale = new Vector3(
      Number(matrix.matrixValue[0][0].value),
      Number(matrix.matrixValue[1][1].value),
      Number(matrix.matrixValue[2][2].value)
    );
    if (scale.toArray().some(isNaN)) return false;
    return cube.scale.equals(new Vector3(2, 2, 2));
  },
};
