import { PCFShadowMap } from "three";
import { Canvas as FiberCanvas } from "@react-three/fiber";
import Experience from "@/components/Experience/Experience";
import styles from "./style.module.scss";

// Default R3F WebGL renderer for now (drei gizmos work). Switch to WebGPURenderer
// when starting TSL shaders: see CLAUDE.md.
export default function Canvas() {
  return (
    <div className={styles.canvas}>
      <FiberCanvas
        dpr={[1, 1.5]}
        flat
        // Not `shadows`: R3F's default PCFSoftShadowMap was removed from three and logs a warning.
        shadows={{ type: PCFShadowMap }}
        camera={{ position: [0, 2.5, 10], fov: 45, near: 0.1, far: 100 }}
      >
        <Experience />
      </FiberCanvas>
    </div>
  );
}
