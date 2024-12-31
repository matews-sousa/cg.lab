import { TCube, useScene3DStore } from "@/store/scene3DStore";
import { Assignment, AssignmentType } from "@/types/Assignment";
import { Vector3 } from "three";

export const translationMatrix3dAssignment: Assignment = {
  id: "translation-matrix-3d",
  title: "Matriz de Translação 3D",
  instructions: "Aplique uma matriz de translação 3D no cubo.",
  order: 1,
  type: AssignmentType.FILL_IN_THE_BLANK_MATRIX,
  setup() {
    const { addCube } = useScene3DStore.getState();
    const cube: TCube = {
      id: "cube-1",
      position: new Vector3(0.5, 0.5, 0.5),
      size: new Vector3(1, 1, 1),
      scale: new Vector3(1, 1, 1),
      rotation: new Vector3(0, 45, 0),
      color: "red",
    };
    addCube(cube);
  },
  validate() {
    return false;
  },
};
