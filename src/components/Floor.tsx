import { RigidBody, type RigidBodyProps } from "@react-three/rapier";

export function Floor(props: RigidBodyProps) {
  return (
    <RigidBody type="fixed" restitution={0.5} {...props}>
      <mesh receiveShadow>
        <boxGeometry args={[10, 0.2, 10]} />
        <meshStandardMaterial color="lightgray" />
      </mesh>
    </RigidBody>
  );
}
