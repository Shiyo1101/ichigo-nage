import { RigidBody, type RigidBodyProps } from "@react-three/rapier";

type BoxProps = RigidBodyProps;

export function ThrowableBox(props: BoxProps) {
  return (
    <RigidBody colliders="cuboid" restitution={0.7} {...props}>
      <mesh castShadow>
        <boxGeometry args={[0.2, 0.2, 0.2]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    </RigidBody>
  );
}
