import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { createXRStore, XR } from "@react-three/xr";
import { Physics } from "@react-three/rapier";
import { Text } from "@react-three/drei";

import { Floor } from "./components/Floor";
import { Target } from "./components/Target";
import { Player } from "./components/Player";
import { ThrowableBox } from "./components/ThrowableBox";
import { Vector3 } from "three";

export function App() {
  const store = createXRStore({});
  const [score, setScore] = useState(0);

  const initialBoxes = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    position: new Vector3(
      (Math.random() - 0.5) * 1.5,
      0.5 + i * 0.1,
      -1 - Math.random() * 1
    ),
  }));

  return (
    <>
      <button onClick={() => store.enterVR()}>Enter VR</button>

      <Canvas shadows>
        <XR store={store}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 10, 7.5]} castShadow />

          <Text
            position={[0, 2.5, -3]}
            fontSize={0.3}
            color="black"
            anchorX="center"
            anchorY="middle"
          >
            Score: {score}
          </Text>

          <Physics gravity={[0, -9.8, 0]}>
            <Floor />
            <Player />

            {initialBoxes.map(({ position, id }) => (
              <ThrowableBox
                key={id}
                position={position}
                userData={{ type: "box" }}
              />
            ))}

            <Target onHit={() => setScore((s) => s + 1)} />
          </Physics>
        </XR>
      </Canvas>
    </>
  );
}

export default App;
