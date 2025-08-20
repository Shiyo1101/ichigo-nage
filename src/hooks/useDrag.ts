import { createRef, useCallback, useEffect, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { usePointToPointConstraint, useSphere } from "@react-three/cannon";
import { Vector3, Object3D } from "three";

export const cursor = createRef<Object3D>();

let grabbingPointerId: number | undefined = undefined;
const grabbedPosition = new Vector3();

export const useDragConstraint = (child: RefObject<Object3D>) => {
  const [, , api] = usePointToPointConstraint(cursor, child, {
    pivotA: [0, 0, 0],
    pivotB: [0, 0, 0],
  });

  useEffect(() => void api.disable(), [api]);

  const onPointerUp = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (e: any) => {
      if (grabbingPointerId === undefined) {
        return;
      }
      grabbingPointerId = undefined;
      document.body.style.cursor = "grab";
      e.target.releasePointerCapture(e.pointerId);
      api.disable();
    },
    [api]
  );

  const onPointerDown = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (e: any) => {
      if (grabbingPointerId !== undefined) {
        return;
      }
      grabbingPointerId = e.pointerId;
      grabbedPosition.copy(e.point);
      document.body.style.cursor = "grabbing";
      e.stopPropagation();
      e.target.setPointerCapture(e.pointerId);
      api.enable();
    },
    [api]
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onPointerMove = useCallback((e: any) => {
    if (grabbingPointerId !== e.pointerId) {
      return;
    }
    grabbedPosition.copy(e.point);
  }, []);

  return { onPointerUp, onPointerMove, onPointerDown };
};

export const Cursor = () => {
  const [, api] = useSphere(
    () => ({ collisionFilterMask: 0, type: "Kinematic", mass: 0, args: [0.5] }),
    cursor
  );

  useFrame(() => {
    if (grabbingPointerId === undefined) {
      return;
    }
    api.position.set(grabbedPosition.x, grabbedPosition.y, grabbedPosition.z);
  });

  return null;
};
