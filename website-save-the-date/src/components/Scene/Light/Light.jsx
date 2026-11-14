import { useRef } from "react";
import { DirectionalLightHelper } from "three";
import { useHelper } from "@react-three/drei";
import DebugPivot from "@/components/DebugPivot/DebugPivot";
import { useDebugStore } from "@/stores/store";

// The light points at the scene origin: moving it changes the shadows' direction.
export default function Light() {
  const debug = useDebugStore((state) => state.debug);
  const light = useRef(null);
  useHelper(debug && light, DirectionalLightHelper, 1);

  return (
    <DebugPivot id="light">
      <directionalLight ref={light} castShadow shadow-mapSize={[2048, 2048]}>
        {/* Area covered by shadows: the default (±5) is too small for the scene. */}
        <orthographicCamera attach="shadow-camera" args={[-15, 15, 15, -15, 0.5, 50]} />
      </directionalLight>
    </DebugPivot>
  );
}
