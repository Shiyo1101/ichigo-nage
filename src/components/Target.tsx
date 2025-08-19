import { useRef } from "react";
import {
  RigidBody,
  RapierRigidBody,
  type CollisionPayload,
} from "@react-three/rapier";
import * as THREE from "three";

type TargetProps = {
  onHit: () => void;
};

export function Target({ onHit }: TargetProps) {
  const targetRef = useRef<RapierRigidBody>(null);

  const handleCollision = (event: CollisionPayload) => {
    if (event.other.rigidBodyObject?.name === "strawberry") {
      onHit();
      const newPosition = new THREE.Vector3(
        (Math.random() - 0.5) * 4,
        1 + Math.random() * 1,
        -3 + (Math.random() - 0.5) * 2
      );
      targetRef.current?.setTranslation(newPosition, true);
    }
  };

  return (
    <RigidBody
      ref={targetRef}
      type="fixed"
      colliders="ball"
      sensor
      onCollisionEnter={handleCollision}
      position={[0, 1.5, -3]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <mesh>
        <cylinderGeometry args={[0.5, 0.5, 0.1, 32]} />
        <meshStandardMaterial color="teal" />
      </mesh>
    </RigidBody>
  );
}
