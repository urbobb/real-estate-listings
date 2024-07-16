import * as THREE from "three";
import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useSpring, a } from "@react-spring/three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

// Preload the GLTF model
useGLTF.preload("/models/level-react-draco.glb");

interface CustomGLTF extends GLTF {
  nodes: {
    Sudo: THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>;
    SudoHead: THREE.Mesh<
      THREE.BufferGeometry,
      THREE.Material | THREE.Material[]
    >;
  };
}

export default function Sudo() {
  const { nodes } = useGLTF(
    "/models/level-react-draco.glb"
  ) as unknown as CustomGLTF;
  const [spring, api] = useSpring(
    () => ({ rotation: [Math.PI / 2, 0, 0.29], config: { friction: 40 } }),
    []
  );

  useEffect(() => {
    let timeout: string | number | NodeJS.Timeout | undefined;
    const wander = () => {
      api.start({
        rotation: [
          Math.PI / 2 + THREE.MathUtils.randFloatSpread(2) * 0.3,
          0,
          0.29 + THREE.MathUtils.randFloatSpread(2) * 0.2,
        ],
      });
      timeout = setTimeout(wander, (1 + Math.random() * 3) * 1000);
    };
    wander();
    return () => clearTimeout(timeout);
  }, [api]);

  return (
    <>
      <mesh
        geometry={nodes?.Sudo?.geometry}
        material={nodes?.Sudo?.material}
        position={[0.68, 0.33, -0.67]}
        rotation={[Math.PI / 2, 0, 0.29]}
      />
      <a.mesh
        geometry={nodes?.SudoHead?.geometry}
        material={nodes?.SudoHead?.material}
        position={[0.68, 0.33, -0.67]}
      />
    </>
  );
}
