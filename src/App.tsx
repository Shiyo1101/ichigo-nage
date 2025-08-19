import { Canvas } from "@react-three/fiber";
import { XR, createXRStore } from "@react-three/xr";
import { useState } from "react";

const store = createXRStore();

export function App() {
  const [isRed, setIsRed] = useState(false);

  return (
    <>
      <button onClick={() => store.enterAR()}>Enter AR</button>

      <Canvas>
        <XR store={store}>
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 5, 5]} />

          <mesh
            position={[0, 1.2, -1]}
            pointerEventsType={{ deny: "grab" }}
            onClick={() => setIsRed(!isRed)}
          >
            <boxGeometry />
            <meshStandardMaterial color={isRed ? "red" : "blue"} />
          </mesh>
        </XR>
      </Canvas>
    </>
  );
}

export default App;
