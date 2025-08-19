import { useGLTF } from "@react-three/drei";
import { RigidBody, type RigidBodyProps } from "@react-three/rapier";
import { useEffect } from "react";
import * as THREE from "three";

type StrawberryProps = RigidBodyProps;

export function Strawberry(props: StrawberryProps) {
  const gltf = useGLTF("/strawberry.glb");

  useEffect(() => {
    gltf.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [gltf.scene]);

  return (
    <RigidBody colliders="ball" restitution={0.5} {...props}>
      <primitive object={gltf.scene.clone()} scale={1} />
    </RigidBody>
  );
}
