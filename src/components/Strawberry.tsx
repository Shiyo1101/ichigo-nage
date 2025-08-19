import { useGLTF } from "@react-three/drei";
import { RigidBody, type RigidBodyProps } from "@react-three/rapier";
import { Mesh, MeshStandardMaterial } from "three";

type GLTFResult = {
  nodes: {
    strawberry: Mesh;
  };
  materials: {
    red: MeshStandardMaterial;
  };
};

export function Strawberry(props: RigidBodyProps) {
  // as any で一時的に型エラーを回避し、内部で型付けされた変数に代入
  const { nodes, materials } = useGLTF(
    "/strawberry.glb"
  ) as unknown as GLTFResult;

  return (
    <RigidBody colliders="ball" restitution={0.5} {...props}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.strawberry.geometry}
        material={materials.red}
        scale={0.1}
      />
    </RigidBody>
  );
}
