import { useControls } from "leva";
import DebugPivot from "@/components/DebugPivot/DebugPivot";

export default function Ground() {
  const { shadowOpacity } = useControls("Ground", {
    shadowOpacity: { value: 0.3, min: 0, max: 1, step: 0.01 },
  });

  return (
    <DebugPivot id="ground">
      <group rotation-x={-Math.PI / 2}>
        <mesh>
          <planeGeometry args={[40, 40]} />
          <meshBasicMaterial color="#8aa870" />
        </mesh>
        {/* Shadow catcher: only shows the shadows, so the ground keeps its flat color. */}
        <mesh position-z={0.01} receiveShadow>
          <planeGeometry args={[40, 40]} />
          <shadowMaterial opacity={shadowOpacity} />
        </mesh>
      </group>
    </DebugPivot>
  );
}
