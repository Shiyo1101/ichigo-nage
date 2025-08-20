import { Canvas } from "@react-three/fiber";
import { XR, createXRStore } from "@react-three/xr";
import { Scene } from "./components/Scene";

export function App() {
  const store = createXRStore({});

  return (
    <>
      <button onClick={() => store.enterVR()}>Enter VR</button>

      <Canvas shadows>
        <XR store={store}>
          <Scene />
        </XR>
      </Canvas>
    </>
  );
}

export default App;
