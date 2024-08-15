import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useSpring, a } from "@react-spring/three";
import * as THREE from "three";

useGLTF.preload("/models/level-react-draco.glb");

export default function Camera() {
  const { scene, materials } = useGLTF("/models/level-react-draco.glb");
  const [spring, api] = useSpring(
    () => ({ "rotation-z": 0, config: { friction: 40 } }),
    []
  );
  useEffect(() => {
    let timeout: string | number | NodeJS.Timeout | undefined;
    const wander = () => {
      api.start({ "rotation-z": Math.random() });
      timeout = setTimeout(wander, (1 + Math.random() * 5) * 1000);
    };
    wander();
    return () => clearTimeout(timeout);
  }, [api]);

  // Accessing geometry by name
  const cameraMesh = scene.getObjectByName("Camera") as THREE.Mesh;
  const cameraGeometry = cameraMesh?.geometry;
  const cameraMaterial = cameraMesh?.material;

  const lensMesh = scene.getObjectByName("Camera_1") as THREE.Mesh;
  const lensGeometry = lensMesh?.geometry;

  return (
    <a.group
      position={[-0.58, 0.83, -0.03]}
      rotation={[Math.PI / 2, 0, 0.47]}
      {...spring}>
      {cameraGeometry && (
        <mesh geometry={cameraGeometry} material={cameraMaterial} />
      )}
      {lensGeometry && (
        <mesh geometry={lensGeometry} material={materials.Lens} />
      )}
    </a.group>
  );
}
