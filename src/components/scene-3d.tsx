"use client";

import { Canvas } from "@react-three/fiber";
import {
  PerspectiveCamera,
  GizmoHelper,
  GizmoViewport,
  OrbitControls,
  Text,
  Billboard,
} from "@react-three/drei";
import Cube from "./cube";
import { useScene3DStore } from "@/store/scene3DStore";

function Scene() {
  const { cubes } = useScene3DStore();

  return (
    <>
      <GizmoHelper>
        <GizmoViewport />
      </GizmoHelper>

      {/* Floor Grid */}
      <gridHelper args={[16, 16]} position={[0, 0, 0]} />

      {/* Vertical Grid Wall */}
      <gridHelper
        args={[16, 16]}
        position={[0, 8, -8]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <gridHelper
        args={[16, 16]}
        position={[-8, 8, 0]}
        rotation={[0, 0, Math.PI / 2]}
      />

      <Billboard follow position={[8.5, 0, 0]}>
        <Text
          color="white"
          fontSize={1}
          outlineColor="black"
          outlineWidth={0.02}
        >
          X+
        </Text>
      </Billboard>
      <Billboard follow position={[0, 8.5, 0]}>
        <Text
          color="white"
          fontSize={1}
          outlineColor="black"
          outlineWidth={0.02}
        >
          Y+
        </Text>
      </Billboard>
      <Billboard follow position={[0, 0, 8.5]}>
        <Text
          color="white"
          fontSize={1}
          outlineColor="black"
          outlineWidth={0.02}
        >
          Z+
        </Text>
      </Billboard>

      <axesHelper args={[8]} />

      <PerspectiveCamera makeDefault position={[10, 10, 10]} />
      <OrbitControls />

      {/* Example Mesh */}
      {cubes.map(cube => (
        <Cube key={cube.id} cube={cube} />
      ))}

      {/* Lighting */}
      <ambientLight intensity={0.1} />
      <directionalLight position={[2, 5, 1]} intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
    </>
  );
}

export default function Scene3D() {
  return (
    <div className="w-full h-screen bg-black">
      <Canvas>
        <Scene />
      </Canvas>
    </div>
  );
}
