import { initial3DRotationMatrixYValue } from "@/constants/initial3DMatricesValues";
import { degreesToRadians } from "@/lib/utils";
import { MatrixType } from "@/store/fillInBlankMatrixInputStore";
import { useFillInMatrixWithOptionsStore } from "@/store/fillInMatrixWithOptions";
import { useScene3DStore } from "@/store/scene3DStore";
import { Assignment, AssignmentType } from "@/types/Assignment";
import { Matrix4, Vector3 } from "three";

export const completeRotationMatrix3dYAssignment: Assignment = {
  id: "complete-rotation-matrix-3d-y",
  title: "Complete a matrix de rotação 3D no eixo Y",
  instructions:
    "Complete a matrix para que o cubo seja rotacionado 45 graus no sentido anti-horário.",
  type: AssignmentType.FILL_IN_THE_BLANK_MATRIX_WITH_OPTIONS,
  order: 6,
  subjectCategory: "rotation-matrix",
  setup() {
    useScene3DStore.getState().addCube({
      id: "cube",
      label: "Cubo",
      position: new Vector3(0, 0, 0),
      scale: new Vector3(1, 1, 1),
      rotation: new Vector3(0, 0, 0),
      size: new Vector3(1, 1, 1),
      translation: new Vector3(0, 0, 0),
      color: "red",
    });

    useScene3DStore.getState().addObjectiveCube({
      id: "cube",
      label: "Cubo",
      position: new Vector3(0, 0, 0),
      scale: new Vector3(1, 1, 1),
      rotation: new Vector3(0, 45, 0),
      size: new Vector3(1, 1, 1),
      translation: new Vector3(0, 0, 0),
      color: "red",
    });

    const { setMatrix, setOptions } =
      useFillInMatrixWithOptionsStore.getState();
    setMatrix({
      id: "rotation-matrix-y",
      type: MatrixType.ROTATION_Y,
      dimention: "3D",
      matrixValue: initial3DRotationMatrixYValue,
      objectRefId: "cube",
    });

    const angleInRadians = degreesToRadians(45);

    setOptions([
      {
        id: "option1",
        displayValue: "cos(45)",
        value: Math.cos(angleInRadians),
      },
      {
        id: "option2",
        displayValue: "-sin(45)",
        value: -Math.sin(angleInRadians),
      },
      {
        id: "option3",
        displayValue: "sin(45)",
        value: Math.sin(angleInRadians),
      },
      {
        id: "option4",
        displayValue: "cos(45)",
        value: Math.cos(angleInRadians),
      },
    ]);
  },
  validate() {
    const cube = useScene3DStore.getState().getCube("cube");
    if (!cube) return false;
    const expectedRotationMatrix = new Matrix4().makeRotationY(
      degreesToRadians(45)
    );
    if (!cube.customYRotationMatrix) return false;
    return expectedRotationMatrix.equals(cube.customYRotationMatrix);
  },
};
