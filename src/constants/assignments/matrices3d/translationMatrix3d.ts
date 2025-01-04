import {
  MatrixType,
  useFillBlankMatrixInputStore,
} from "@/store/fillInBlankMatrixInputStore";
import { TCube, useScene3DStore } from "@/store/scene3DStore";
import { Assignment, AssignmentType } from "@/types/Assignment";
import { Vector3 } from "three";

export const translationMatrix3dAssignment: Assignment = {
  id: "translation-matrix-3d",
  title: "Matriz de Translação 3D",
  instructions:
    "Altere a matriz de translação no cubo A para que fique igual ao cubo B.",
  order: 1,
  type: AssignmentType.FILL_IN_THE_BLANK_MATRIX,
  setup() {
    const { addCube, addObjectiveCube } = useScene3DStore.getState();
    const { addMatrix } = useFillBlankMatrixInputStore.getState();
    const cube: TCube = {
      id: "cube-1",
      label: "A",
      position: new Vector3(0, 0, 0),
      size: new Vector3(1, 1, 1),
      scale: new Vector3(1, 1, 1),
      rotation: new Vector3(0, 0, 0),
      color: "red",
    };
    addCube(cube);
    const objectiveCube: TCube = {
      id: "cube-2",
      label: "B",
      position: new Vector3(2, 0.5, 2),
      size: new Vector3(1, 1, 1),
      scale: new Vector3(1, 1, 1),
      rotation: new Vector3(0, 0, 0),
      color: "yellow",
    };
    addObjectiveCube(objectiveCube);

    addMatrix({
      id: "translation-matrix-3d",
      dimention: "3D",
      type: MatrixType.TRANSLATION,
      objectRefId: cube.id,
      matrixValue: [
        [
          { value: 1, editable: false },
          { value: 0, editable: false },
          { value: 0, editable: false },
          { value: 0, editable: true },
        ],
        [
          { value: 0, editable: false },
          { value: 1, editable: false },
          { value: 0, editable: false },
          { value: 0, editable: true },
        ],
        [
          { value: 0, editable: false },
          { value: 0, editable: false },
          { value: 1, editable: false },
          { value: 0, editable: true },
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
    const matrix = matrices.find(m => m.id === "translation-matrix-3d");
    if (!matrix) return false;
    const translation = new Vector3(
      Number(matrix.matrixValue[0][3].value),
      Number(matrix.matrixValue[1][3].value),
      Number(matrix.matrixValue[2][3].value)
    );
    return translation.equals(new Vector3(2, 0.5, 2));
  },
};
