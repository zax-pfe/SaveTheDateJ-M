import { useTexture } from "@react-three/drei";
import { DoubleSide } from "three";
import DebugPivot from "@/components/DebugPivot/DebugPivot";

const HEIGHT = 4;

export default function MarieJean() {
  const texture = useTexture("/assets/Img/Cloud/wed_2.png");
  const width = HEIGHT * (texture.image.width / texture.image.height);

  return (
    <DebugPivot id="marieJean">
      <mesh position-y={HEIGHT / 2}>
        <planeGeometry args={[width, HEIGHT]} />
        <meshBasicMaterial map={texture} transparent side={DoubleSide} />
      </mesh>
    </DebugPivot>
  );
}
