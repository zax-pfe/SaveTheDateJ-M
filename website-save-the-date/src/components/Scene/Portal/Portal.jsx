import { useEffect, useMemo } from "react";
import { useTexture } from "@react-three/drei";
import { useControls } from "leva";
import { DoubleSide, MathUtils, PlaneGeometry } from "three";
import DebugPivot from "@/components/DebugPivot/DebugPivot";

const HEIGHT = 2;

// A plane showing only the [u0, u1] horizontal slice of its texture.
function createSlice(width, height, u0, u1) {
  const geometry = new PlaneGeometry(width, height);
  const uv = geometry.attributes.uv;
  for (let i = 0; i < uv.count; i++) uv.setX(i, MathUtils.lerp(u0, u1, uv.getX(i)));
  return geometry;
}

function Slice({ texture, width, u0, u1, ...props }) {
  const geometry = useMemo(() => createSlice(width, HEIGHT, u0, u1), [width, u0, u1]);
  useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <mesh geometry={geometry} position-y={HEIGHT / 2} castShadow {...props}>
      <meshBasicMaterial map={texture} transparent alphaTest={0.1} side={DoubleSide} />
    </mesh>
  );
}

// Garden gate: portal_left.png and portal_right.png each hold a fixed pillar and a leaf.
// `hinge` is where the pillar ends in the left image (mirrored for the right one).
// Each leaf group sits on its hinge, so a rotation-y opens the leaf.
export default function Portal() {
  const [left, right] = useTexture(["/assets/Img/portal_left.png", "/assets/Img/portal_right.png"]);
  const { opening, hinge } = useControls("Portal", {
    opening: { value: 69, min: 0, max: 100, step: 1, label: "opening (°)" },
    hinge: { value: 0.44, min: 0.3, max: 0.6, step: 0.005 },
  });

  const angle = MathUtils.degToRad(opening);
  const halfWidth = HEIGHT * (left.image.width / left.image.height);
  const pillarWidth = halfWidth * hinge;
  const leafWidth = halfWidth - pillarWidth;

  return (
    <DebugPivot id="portal">
      {/* Left half: pillar | leaf */}
      <Slice texture={left} width={pillarWidth} u0={0} u1={hinge} position-x={-halfWidth + pillarWidth / 2} />
      <group position-x={-leafWidth} rotation-y={angle}>
        <Slice texture={left} width={leafWidth} u0={hinge} u1={1} position-x={leafWidth / 2} />
      </group>

      {/* Right half: leaf | pillar */}
      <group position-x={leafWidth} rotation-y={-angle}>
        <Slice texture={right} width={leafWidth} u0={0} u1={1 - hinge} position-x={-leafWidth / 2} />
      </group>
      <Slice texture={right} width={pillarWidth} u0={1 - hinge} u1={1} position-x={halfWidth - pillarWidth / 2} />
    </DebugPivot>
  );
}
