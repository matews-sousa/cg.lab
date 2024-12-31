import { degreesToRadians } from "@/lib/utils";
import React, { useEffect, useRef } from "react";
import { Euler, Matrix4, Mesh, Vector3 } from "three";

interface Props {
  id: string;
  position?: Vector3;
  size?: Vector3;
  rotation?: Vector3;
  scale?: Vector3;
  color?: string;
}

export default function Cube({
  id,
  position = new Vector3(0, 0, 0),
  size = new Vector3(1, 1, 1),
  rotation = new Vector3(0, 0, 0),
  scale = new Vector3(1, 1, 1),
  color = "gray",
}: Props) {
  const cubeRef = useRef<Mesh>(null);

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
    modelMatrix.multiply(rotationMatrix);
    modelMatrix.multiply(scaleMatrix);

    // Apply the resulting matrix to the mesh
    cubeRef.current.matrixAutoUpdate = false; // Disable Three.js auto-updates
    cubeRef.current.matrix.copy(modelMatrix); // Apply the custom model matrix
  }, [position, rotation, scale]);

  return (
    <mesh ref={cubeRef} userData={{ id }}>
      <axesHelper args={[2]} />
      <boxGeometry args={[size.x, size.y, size.z]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
