import { useTexture } from "@react-three/drei";
import { DoubleSide } from "three";
import DebugPivot from "@/components/DebugPivot/DebugPivot";

const HEIGHT = 6;

export default function Castle() {
  const texture = useTexture("/assets/Img/Cloud/castle_3.png");
  const width = HEIGHT * (texture.image.width / texture.image.height);

  return (
    <DebugPivot id="castle">
      <mesh position-y={HEIGHT / 2}>
        <planeGeometry args={[width, HEIGHT]} />
        <meshBasicMaterial map={texture} transparent side={DoubleSide} />
      </mesh>
    </DebugPivot>
  );
}
