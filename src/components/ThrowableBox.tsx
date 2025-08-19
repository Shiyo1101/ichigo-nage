import { CuboidCollider, RigidBody } from "@react-three/rapier";
import * as THREE from "three";

const boxGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.2); // Boxのサイズ (幅, 高さ, 奥行き)
const boxMaterial = new THREE.MeshStandardMaterial({ color: "mediumpurple" }); // Boxの色

type ThrowableBoxProps = {
  position: [number, number, number];
};

/**
 * プレイヤーが掴んで投げることができるBoxコンポーネント
 */
export function ThrowableBox({ position }: ThrowableBoxProps) {
  return (
    // RigidBodyは物理演算の対象となるオブジェクトを定義します
    <RigidBody
      position={position}
      colliders={false} // カスタムの衝突判定領域を使用するためfalseに設定
      restitution={0.5} // 反発係数
      friction={0.8} // 摩擦係数
    >
      {/* meshはオブジェクトの見た目を定義します */}
      <mesh
        geometry={boxGeometry}
        material={boxMaterial}
        castShadow // このオブジェクトが影を落とすように設定
        receiveShadow // このオブジェクトに影が落ちるように設定
      />
      {/* CuboidColliderは物理的な衝突判定の形状を定義します */}
      <CuboidCollider args={[0.1, 0.1, 0.1]} />
    </RigidBody>
  );
}
