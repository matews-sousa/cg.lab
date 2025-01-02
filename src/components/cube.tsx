import { degreesToRadians } from "@/lib/utils";
import { TCube } from "@/store/scene3DStore";
import { Text } from "@react-three/drei";
import React, { useEffect, useRef } from "react";
import { Euler, Matrix4, Mesh } from "three";

interface Props {
  cube: TCube;
}

export default function Cube({ cube }: Props) {
  const cubeRef = useRef<Mesh>(null);
  const {
    id,
    position,
    rotation,
    scale,
    size,
    color,
    customXRotationMatrix,
    customYRotationMatrix,
    customZRotationMatrix,
  } = cube;

  useEffect(() => {
    if (!cubeRef.current) return;
    // Create individual transformation matrices
    const translationMatrix = new Matrix4().makeTranslation(
      position.x,
      position.y,
      position.z
    );

    const rotationMatrix = new Matrix4().makeRotationFromEuler(
      new Euler(
        degreesToRadians(rotation.x),
        degreesToRadians(rotation.y),
        degreesToRadians(rotation.z)
      )
    );
    const scaleMatrix = new Matrix4().makeScale(scale.x, scale.y, scale.z);

    const modelMatrix = new Matrix4().identity();
    modelMatrix.multiply(translationMatrix);

    if (customXRotationMatrix) {
      modelMatrix.multiply(customXRotationMatrix);
    } else if (customYRotationMatrix) {
      modelMatrix.multiply(customYRotationMatrix);
    } else if (customZRotationMatrix) {
      modelMatrix.multiply(customZRotationMatrix);
    } else {
      modelMatrix.multiply(rotationMatrix);
    }

    modelMatrix.multiply(scaleMatrix);

    // Apply the resulting matrix to the mesh
    cubeRef.current.matrixAutoUpdate = false; // Disable Three.js auto-updates
    cubeRef.current.matrix.copy(modelMatrix); // Apply the custom model matrix
  }, [
    position,
    rotation,
    scale,
    customXRotationMatrix,
    customYRotationMatrix,
    customZRotationMatrix,
  ]);

  return (
    <mesh ref={cubeRef} userData={{ id }}>
      <axesHelper args={[2]} />
      <boxGeometry args={[size.x, size.y, size.z]} />
      <meshStandardMaterial color={color} />
      <Text color="white" fontSize={0.5} position={[0, size.y + 0.1, 0.3]}>
        {cube.label}
      </Text>
    </mesh>
  );
}
