import { Physics } from "@react-three/cannon";
import { Floor } from "../Floor";
import { Cursor } from "../../hooks/useDrag";
import { Box } from "../Box";
import { Suspense } from "react";
import { Lights } from "../Light";
import { Shadows } from "../Shadow";

export function Scene() {
  return (
    <>
      <color attach="background" args={["#f0f0f0"]} />
      <Lights />
      <Shadows />
      <Suspense>
        <Physics
          gravity={[0, -9.82, 0]}
          allowSleep={true}
          defaultContactMaterial={{
            friction: 0.1,
            restitution: 0.7,
          }}
        >
          <Cursor />
          <Floor />
          {Array.from({ length: 20 }).map((_, i) => (
            <Box key={i} />
          ))}
        </Physics>
      </Suspense>
    </>
  );
}
