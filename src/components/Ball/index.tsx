import { useDragConstraint } from "../../hooks/useDrag";
import { useSphere } from "@react-three/cannon";
import { Mesh, Color } from "three";
import { useMemo } from "react";

type BallProps = {
  position: [number, number, number];
};

export function Ball({ position }: BallProps) {
  const color = useMemo(() => new Color(Math.random() * 0xffffff), []);

  const [ref] = useSphere(() => ({
    mass: 1,
    position,
    args: [0.25],
    restitution: 0.9,
  }));

  const dragHandlers = useDragConstraint(ref as React.RefObject<Mesh>);

  return (
    <mesh ref={ref as React.Ref<Mesh>} {...dragHandlers}>
      <sphereGeometry args={[0.25, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
