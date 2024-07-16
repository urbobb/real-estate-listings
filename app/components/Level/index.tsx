import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useSpring } from "@react-spring/three";
import * as THREE from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

// Preload the GLTF model
useGLTF.preload("/models/level-react-draco.glb");

interface CustomGLTF extends GLTF {
  nodes: {
    Level: THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>;
  };
}

export default function Level() {
  const { nodes } = useGLTF(
    "/models/level-react-draco.glb"
  ) as unknown as CustomGLTF;
  const { camera } = useThree();

  useSpring(
    () => ({
      from: { y: camera.position.y + 5 },
      to: { y: camera.position.y },
      config: { friction: 100 },
      onChange: ({ value }) => (
        (camera.position.y = value.y), camera.lookAt(0, 0, 0)
      ),
    }),
    []
  );

  return (
    <mesh
      geometry={nodes?.Level?.geometry}
      material={nodes?.Level?.material}
      position={[-0.38, 0.69, 0.62]}
      rotation={[Math.PI / 2, -Math.PI / 9, 0]}
    />
  );
}
