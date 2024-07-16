import { MeshWobbleMaterial, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

interface CustomGLTF extends GLTF {
  nodes: {
    Cactus: THREE.Mesh;
  };
  materials: {
    Cactus: THREE.MeshStandardMaterial;
  };
}

export default function Cactus() {
  const { nodes, materials } = useGLTF(
    "/models/level-react-draco.glb"
  ) as unknown as CustomGLTF;

  const cactusMaterial = materials.Cactus as THREE.MeshStandardMaterial;

  return (
    <mesh
      geometry={nodes.Cactus.geometry}
      position={[-0.42, 0.51, -0.62]}
      rotation={[Math.PI / 2, 0, 0]}>
      <MeshWobbleMaterial factor={0.4} map={cactusMaterial.map} />
    </mesh>
  );
}
