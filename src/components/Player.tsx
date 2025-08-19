// src/components/Player.tsx

import { useState, useRef, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import {
  useXRInputSourceState,
  useXRInputSourceEvent,
  type XRInputSourceState,
  type XRControllerState,
} from "@react-three/xr";
import {
  RigidBody,
  RapierRigidBody,
  CuboidCollider,
  type CollisionPayload,
} from "@react-three/rapier";
import * as THREE from "three";

// 型ガード: XRInputSourceStateがコントローラーであるかを確認
function isControllerState(
  state: XRInputSourceState | undefined
): state is XRControllerState {
  return state?.type === "controller";
}

// 掴んだオブジェクトの状態を管理するための型
type GrabbedObjectState = {
  object: RapierRigidBody;
  controllerState: XRControllerState;
} | null;

// GrabTriggerのプロパティの型
type GrabTriggerProps = {
  onGrab: (controllerState: XRControllerState, object: RapierRigidBody) => void;
  controllerState: XRInputSourceState | undefined;
};

/**
 * 掴むためのセンサーエリア。コントローラーに追従する。
 */
function GrabTrigger({ onGrab, controllerState }: GrabTriggerProps) {
  const grabAreaRef = useRef<RapierRigidBody>(null);

  // Hooksは必ずコンポーネントのトップレベルで呼び出す
  useFrame(() => {
    // Hooksのコールバック内で条件分岐を行う
    if (
      isControllerState(controllerState) &&
      controllerState.object &&
      grabAreaRef.current
    ) {
      const { position, quaternion } = controllerState.object;
      grabAreaRef.current.setNextKinematicTranslation(position);
      grabAreaRef.current.setNextKinematicRotation(quaternion);
    }
  });

  // コンポーネントの早期リターンはHooksの後で行う
  if (!isControllerState(controllerState)) return null;

  return (
    <RigidBody ref={grabAreaRef} type="kinematicPosition" colliders={false}>
      <CuboidCollider
        args={[0.1, 0.1, 0.1]}
        sensor
        onIntersectionEnter={(e: CollisionPayload) => {
          // コントローラーであり、ボタンが押されていることを確認
          if (
            e.other.rigidBodyObject?.name === "strawberry" &&
            controllerState.inputSource.gamepad?.buttons[0].pressed
          ) {
            // e.other.parent()で親のRigidBodyを取得
            const rigidBody = e.other.rigidBody;
            if (rigidBody) {
              onGrab(controllerState, rigidBody);
            }
          }
        }}
      />
    </RigidBody>
  );
}

/**
 * プレイヤーの入力とインタラクションを管理するメインコンポーネント
 */
export function Player() {
  const [grabbedObject, setGrabbedObject] = useState<GrabbedObjectState>(null);

  const leftControllerState = useXRInputSourceState("controller", "left");
  const rightControllerState = useXRInputSourceState("controller", "right");

  const prevPositions = useRef<{ [key: string]: THREE.Vector3 }>({}).current;

  const handleGrab = (
    controllerState: XRControllerState,
    object: RapierRigidBody
  ) => {
    if (grabbedObject) return;
    object.setBodyType(1, true); // 1: Kinematic
    setGrabbedObject({ object, controllerState });
  };

  const handleRelease = useCallback(() => {
    if (!grabbedObject) return;

    const { object, controllerState } = grabbedObject;
    // controllerState.objectが存在する場合のみ処理
    if (controllerState.object) {
      object.setBodyType(0, true); // 0: Dynamic

      const handedness = controllerState.inputSource.handedness;
      const pos = controllerState.object.position;
      const prevPos = prevPositions[handedness] || pos;

      const delta = pos.clone().sub(prevPos);
      object.setLinvel(delta.multiplyScalar(30), true);
    }

    setGrabbedObject(null);
  }, [grabbedObject, prevPositions]);

  useXRInputSourceEvent(
    leftControllerState?.inputSource,
    "selectend",
    handleRelease,
    [handleRelease]
  );
  useXRInputSourceEvent(
    rightControllerState?.inputSource,
    "selectend",
    handleRelease,
    [handleRelease]
  );

  useFrame(() => {
    if (grabbedObject && grabbedObject.controllerState.object) {
      const { object, controllerState } = grabbedObject;

      if (controllerState.object) {
        object.setNextKinematicTranslation(controllerState.object.position);
        object.setNextKinematicRotation(controllerState.object.quaternion);
      }
    }

    if (isControllerState(leftControllerState) && leftControllerState.object) {
      prevPositions["left"] = leftControllerState.object.position.clone();
    }
    if (
      isControllerState(rightControllerState) &&
      rightControllerState.object
    ) {
      prevPositions["right"] = rightControllerState.object.position.clone();
    }
  });

  return (
    <>
      <GrabTrigger onGrab={handleGrab} controllerState={leftControllerState} />
      <GrabTrigger onGrab={handleGrab} controllerState={rightControllerState} />
    </>
  );
}
