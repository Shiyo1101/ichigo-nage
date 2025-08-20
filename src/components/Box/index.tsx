import { useBox } from "@react-three/cannon";
import { useDragConstraint } from "../../hooks/useDrag";
import { useMemo } from "react";
import { Color } from "three";

export const Box = () => {
  const color = useMemo(() => new Color(Math.random() * 0xffffff), []);

  const [ref] = useBox(() => ({
    mass: 1,
    position: [
      (Math.random() - 0.5) * 0.5,
      (Math.random() + 5) * 0.5,
      (Math.random() - 0.5) * 0.5,
    ],
    rotation: [Math.random(), Math.random(), Math.random()],
    args: [0.1, 0.1, 0.1],
  }));

  const bind = useDragConstraint(ref);

  return (
    <mesh ref={ref} {...bind} castShadow>
      <icosahedronGeometry args={[0.1, 2]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};
