import { useScene3DStore } from "@/store/scene3DStore";
import {
  Billboard,
  OrbitControls,
  PerspectiveCamera,
  Text,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useState } from "react";
import Cube from "./cube";
import { ChevronDown } from "lucide-react";

export default function ObjectivePanel() {
  const { objectiveCubes } = useScene3DStore();
  const [isOpen, setIsOpen] = useState(true);

  if (!objectiveCubes.length) return null;

  return (
    <div className="absolute top-4 right-4 border-2 border-gray-400 bg-black rounded-sm overflow-hidden w-[30%]">
      <div
        className={`${
          isOpen && "border-b-2"
        } border-gray-400 text-white px-4 py-2 bg-zinc-900 flex items-center justify-between`}
      >
        <h1 className="font-semibold">Objetivo</h1>
        <ChevronDown
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer"
        />
      </div>
      {isOpen && (
        <div className="w-full h-56">
          <Canvas>
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
            {/* Axes */}
            <axesHelper args={[8]} />
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
            <ambientLight intensity={0.1} />
            <directionalLight position={[2, 5, 1]} intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <PerspectiveCamera makeDefault position={[7, 7, 7]} />
            <OrbitControls />
            {objectiveCubes.map(cube => (
              <Cube key={cube.id} cube={cube} />
            ))}
          </Canvas>
        </div>
      )}
    </div>
  );
}
