import DebugPivot from "@/components/DebugPivot/DebugPivot";

const WIDTH = 80;
const HEIGHT = 40;

// Far backdrop. Its origin is at the bottom edge, so it stands on the ground.
export default function Background() {
  return (
    <DebugPivot id="background">
      <mesh position-y={HEIGHT / 2}>
        <planeGeometry args={[WIDTH, HEIGHT]} />
        <meshBasicMaterial color="#e8c98f" />
      </mesh>
    </DebugPivot>
  );
}
