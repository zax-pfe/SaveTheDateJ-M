import { useTexture } from "@react-three/drei";
import { DoubleSide } from "three";
import DebugPivot from "@/components/DebugPivot/DebugPivot";

// An image on a plane, `height` tall with the image's ratio, standing on its origin.
// Placed with the transform saved under `id` in src/data/scene.json.
export default function Sprite({ id, url, height, castShadow = false }) {
  const texture = useTexture(url);
  const width = height * (texture.image.width / texture.image.height);

  return (
    <DebugPivot id={id}>
      <mesh position-y={height / 2} castShadow={castShadow}>
        <planeGeometry args={[width, height]} />
        {/* alphaTest: transparent pixels write no depth and cast no shadow. */}
        <meshBasicMaterial map={texture} transparent alphaTest={0.1} side={DoubleSide} />
      </mesh>
    </DebugPivot>
  );
}
