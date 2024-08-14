"use client";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { PresentationControls } from "@react-three/drei";
import useMediaQuery from "@/app/hooks/userMediaQuery";
import dynamic from "next/dynamic";
import { div } from "three/examples/jsm/nodes/Nodes.js";
import { useRef } from "react";

interface AutoRotatingGroupProps {
  children: React.ReactNode;
}

function AutoRotatingGroup({ children }: AutoRotatingGroupProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1; // Adjust the speed as needed
    }
  });

  return (
    <group ref={groupRef} position-y={-0.75} dispose={null}>
      {children}
    </group>
  );
}

export default function Model() {
  const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");
  const isAboveSmallScreens = useMediaQuery("(min-width: 640px)");

  const Level = dynamic(() => import("@/app/components/Level"), {
    ssr: false,
  });
  const Sudo = dynamic(() => import("@/app/components/Sudo"), {
    ssr: false,
  });
  const Cactus = dynamic(() => import("@/app/components/Cactus"), {
    ssr: false,
  });
  const Camera = dynamic(() => import("@/app/components/Camera"), {
    ssr: false,
  });
  const Icon = dynamic(() => import("@/app/components/Icon"), {
    ssr: false,
  });
  const Pyramid = dynamic(() => import("@/app/components/Pyramid"), {
    ssr: false,
  });

  return (
    <div className="relative rightSlide h-[350px] md:h-[500px] mt-12 flex basis-3/5 justify-center items-center md:z-10 md:ml-40 md:my-auto md:justify-end">
      <Canvas flat dpr={[1, 2]} camera={{ fov: 25, position: [0, 0, 8] }}>
        <color attach="background" args={["#FFFFFF"]} />
        <ambientLight />
        <PresentationControls
          global
          zoom={0.8}
          rotation={[0, -Math.PI / 4, 0]}
          polar={[0, Math.PI / 4]}
          azimuth={[-Math.PI / 4, Math.PI / 4]}>
          <AutoRotatingGroup>
            <Level />
            <Sudo />
            <Camera />
            <Cactus />
            {/* <Icon /> */}
            <Pyramid />
          </AutoRotatingGroup>
        </PresentationControls>
      </Canvas>
    </div>
  );
}
