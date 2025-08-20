import { AccumulativeShadows, RandomizedLight } from "@react-three/drei";

export const Shadows = () => {
  return (
    <AccumulativeShadows
      temporal
      frames={100}
      color="#316d39"
      colorBlend={0.5}
      opacity={1}
      scale={20}
      position={[0, -0.01, 0]}
    >
      <RandomizedLight
        amount={8}
        radius={10}
        ambient={0.5}
        position={[5, 5, -10]}
        bias={0.001}
      />
    </AccumulativeShadows>
  );
};
