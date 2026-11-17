import { useTexture } from "@react-three/drei";
import { DoubleSide } from "three";
import DebugPivot from "@/components/DebugPivot/DebugPivot";

const HEIGHT = 1.5;

export default function Mirror() {
  const texture = useTexture("/assets/Img/Cloud/Miroir.png");
  const width = HEIGHT * (texture.image.width / texture.image.height);

  return (
    <DebugPivot id="mirror">
      <mesh position-y={HEIGHT / 2}>
        <planeGeometry args={[width, HEIGHT]} />
        <meshBasicMaterial map={texture} transparent side={DoubleSide} />
      </mesh>
    </DebugPivot>
  );
}
