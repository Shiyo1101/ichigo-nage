import { usePlane } from "@react-three/cannon";

export function Floor() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -1, 0],
    type: "Static",
    material: {
      friction: 0.5,
    },
  }));

  return (
    <mesh ref={ref}>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="#cccccc" />
    </mesh>
  );
}
