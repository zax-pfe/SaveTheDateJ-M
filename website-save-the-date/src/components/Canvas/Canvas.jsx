import { Canvas as FiberCanvas } from "@react-three/fiber";
import { WebGPURenderer } from "three/webgpu";
import Experience from "@/components/Experience/Experience";
import styles from "./style.module.scss";

// WebGPURenderer uses WebGPU when available and falls back to its WebGL2 backend otherwise.
async function createRenderer(props) {
  const renderer = new WebGPURenderer({ ...props, antialias: true });
  await renderer.init();
  return renderer;
}

export default function Canvas() {
  return (
    <div className={styles.canvas}>
      <FiberCanvas
        gl={createRenderer}
        dpr={[1, 1.5]}
        flat
        // R3F's boolean default sets PCFSoftShadowMap, which WebGPURenderer no longer supports.
        shadows={{ enabled: false }}
        camera={{ position: [3, 2, 5], fov: 45, near: 0.1, far: 100 }}
      >
        <Experience />
      </FiberCanvas>
    </div>
  );
}
