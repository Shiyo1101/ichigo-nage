import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { createXRStore, XR } from "@react-three/xr";
import { Physics } from "@react-three/rapier";
import { Text } from "@react-three/drei";
import * as THREE from "three";

import { Floor } from "./components/Floor";
import { Strawberry } from "./components/Strawberry";
import { Target } from "./components/Target";
import { Player } from "./components/Player";

export function App() {
  const store = createXRStore({});
  const [score, setScore] = useState(0);

  const initialStrawberries = [
    { position: new THREE.Vector3(0, 0.5, -1), id: 1 },
    { position: new THREE.Vector3(-0.5, 0.5, -1), id: 2 },
    { position: new THREE.Vector3(0.5, 0.5, -1), id: 3 },
    { position: new THREE.Vector3(-0.25, 0.5, -1.2), id: 4 },
    { position: new THREE.Vector3(0.25, 0.5, -1.2), id: 5 },
  ];

  return (
    <>
      <button onClick={() => store.enterVR()}>Enter XR</button>

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

          <Physics>
            <Player />
            <Floor position={[0, -0.1, 0]} />
            <Target onHit={() => setScore((s) => s + 1)} />

            {initialStrawberries.map(({ position, id }) => (
              <Strawberry key={id} position={position} name="strawberry" />
            ))}
          </Physics>
        </XR>
      </Canvas>
    </>
  );
}

export default App;
