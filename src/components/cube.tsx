import { degreesToRadians } from "@/lib/utils";
import { TCube } from "@/store/scene3DStore";
import { Billboard, Edges, Text } from "@react-three/drei";
import React, { useEffect, useRef, useState } from "react";
import { Euler, Matrix4, Mesh, Vector3 } from "three";

interface Props {
  cube: TCube;
}

export default function Cube({ cube }: Props) {
  const cubeRef = useRef<Mesh>(null);
  const {
    id,
    position,
    translation,
    rotation,
    scale,
    size,
    color,
    customXRotationMatrix,
    customYRotationMatrix,
    customZRotationMatrix,
  } = cube;
  const [worldPosition, setWorldPosition] = useState<Vector3>(
    position.clone().add(translation)
  );

  useEffect(() => {
    if (!cubeRef.current) return;

    const worldP = position.clone().add(translation);
    setWorldPosition(worldP);

    // Create individual transformation matrices
    const translationMatrix = new Matrix4().makeTranslation(
      worldP.x,
      worldP.y,
      worldP.z
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
    translation,
    rotation,
    scale,
    customXRotationMatrix,
    customYRotationMatrix,
    customZRotationMatrix,
  ]);

  return (
    <>
      {/* Cube Mesh */}
      <mesh ref={cubeRef} userData={{ id }}>
        <axesHelper args={[2]} />
        <boxGeometry args={[size.x, size.y, size.z]} />
        <meshPhongMaterial color={color} opacity={0.9} transparent />
        <Edges threshold={1} color="white" scale={1} />
      </mesh>

      {/* Label Text (Always faces the camera) */}
      <Billboard
        follow
        position={[
          worldPosition.x,
          worldPosition.y + (size.y * scale.y) / 2 + 0.5,
          worldPosition.z,
        ]}
      >
        <Text
          color="white"
          fontSize={0.4}
          outlineWidth={0.02}
          outlineColor="black"
        >
          {cube.label}
        </Text>
      </Billboard>

      {/* Position Text (Always faces the camera) */}
      <Billboard
        follow
        position={[
          worldPosition.x,
          worldPosition.y - (size.y * scale.y) / 2 - 0.5,
          worldPosition.z,
        ]}
      >
        <Text
          color="white"
          fontSize={0.5}
          outlineWidth={0.02}
          outlineColor="black"
        >
          {`(${worldPosition.x.toFixed(2)}, ${worldPosition.y.toFixed(
            2
          )}, ${worldPosition.z.toFixed(2)})`}
        </Text>
      </Billboard>
    </>
  );
}
