import { DoubleSide } from "three";
import DebugPivot from "@/components/DebugPivot/DebugPivot";

export default function Cloud({ id }) {
  return (
    <DebugPivot id={id}>
      <mesh castShadow>
        <planeGeometry args={[3, 1.5]} />
        {/* DoubleSide: a single-sided plane casts no shadow when facing the light. */}
        <meshBasicMaterial color="#f4efe4" side={DoubleSide} />
      </mesh>
    </DebugPivot>
  );
}
