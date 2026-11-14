import { DoubleSide, MathUtils } from "three";
import { useControls } from "leva";
import DebugPivot from "@/components/DebugPivot/DebugPivot";

const WIDTH = 1; // one leaf
const HEIGHT = 1.5;

// Castle gate: two leaves. Each group sits on its hinge, so a rotation-y opens the leaf.
export default function Doors() {
  const { opening } = useControls("Doors", {
    opening: { value: 0, min: 0, max: 100, step: 1, label: "opening (°)" },
  });
  const angle = MathUtils.degToRad(opening);

  return (
    <DebugPivot id="doors">
      <group position-x={-WIDTH} rotation-y={angle}>
        <mesh position={[WIDTH / 2, HEIGHT / 2, 0]} castShadow>
          <planeGeometry args={[WIDTH, HEIGHT]} />
          <meshBasicMaterial color="#4a3626" side={DoubleSide} />
        </mesh>
      </group>
      <group position-x={WIDTH} rotation-y={-angle}>
        <mesh position={[-WIDTH / 2, HEIGHT / 2, 0]} castShadow>
          <planeGeometry args={[WIDTH, HEIGHT]} />
          <meshBasicMaterial color="#4a3626" side={DoubleSide} />
        </mesh>
      </group>
    </DebugPivot>
  );
}
