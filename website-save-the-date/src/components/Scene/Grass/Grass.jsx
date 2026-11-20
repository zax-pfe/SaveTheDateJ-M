import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { folder, useControls } from "leva";
import { BufferGeometry, Color, DoubleSide, Float32BufferAttribute, Vector2 } from "three";
import DebugPivot from "@/components/DebugPivot/DebugPivot";
import { fragmentShader, vertexShader } from "./shaders";

// Seeded random: the grass layout stays the same on every reload.
function createRandom(seed) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// One triangle per blade, on a jittered grid of `subdivisions`² cells covering a `size`² square.
function createGeometry(subdivisions, size) {
  const random = createRandom(1);
  const count = subdivisions * subdivisions;
  const cellSize = size / subdivisions;

  const position = new Float32Array(count * 3 * 3);
  const corner = new Float32Array(count * 3);
  const randomness = new Float32Array(count * 3);

  for (let iX = 0; iX < subdivisions; iX++) {
    for (let iZ = 0; iZ < subdivisions; iZ++) {
      const i = iX * subdivisions + iZ;
      const x = (iX / subdivisions - 0.5) * size + cellSize * (0.5 + random() - 0.5);
      const z = (iZ / subdivisions - 0.5) * size + cellSize * (0.5 + random() - 0.5);
      const bladeRandom = random();

      for (let v = 0; v < 3; v++) {
        const index = i * 3 + v;
        position[index * 3] = x;
        position[index * 3 + 1] = 0;
        position[index * 3 + 2] = z;
        corner[index] = v;
        randomness[index] = bladeRandom;
      }
    }
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(position, 3));
  geometry.setAttribute("aCorner", new Float32BufferAttribute(corner, 1));
  geometry.setAttribute("aRandom", new Float32BufferAttribute(randomness, 1));

  return geometry;
}

export default function Grass() {
  const controls = useControls("Grass", {
    Blade: folder({
      bladeWidth: { value: 0.03, min: 0, max: 0.5, step: 0.001, label: "width" },
      widthRandomness: { value: 0.3, min: 0, max: 1, step: 0.01, label: "width random" },
      bladeHeight: { value: 0.25, min: 0, max: 3, step: 0.001, label: "height" },
      heightRandomness: { value: 0.6, min: 0, max: 1, step: 0.01, label: "height random" },
      heightVariation: { value: 0.5, min: 0, max: 1, step: 0.01, label: "patches" },
      patchSize: { value: 3, min: 0.2, max: 20, step: 0.1, label: "patch size" },
    }),
    Area: folder({
      subdivisions: { value: 200, min: 10, max: 500, step: 1, label: "density" },
      size: { value: 20, min: 1, max: 40, step: 0.5 },
    }),
    Color: folder({
      baseColor: { value: "#5f7f4a", label: "base" },
      tipColor: { value: "#b9cc8c", label: "tip" },
      colorVariation: { value: 0.2, min: 0, max: 1, step: 0.01, label: "variation" },
    }),
    Wind: folder({
      windStrength: { value: 0.6, min: 0, max: 3, step: 0.01, label: "strength" },
      windSpeed: { value: 0.8, min: 0, max: 5, step: 0.01, label: "speed" },
      windDirection: { value: 30, min: 0, max: 360, step: 1, label: "direction (°)" },
      windFrequency: { value: 0.4, min: 0.01, max: 3, step: 0.01, label: "gust size" },
      windFlutter: { value: 0.15, min: 0, max: 1, step: 0.01, label: "flutter" },
    }),
  });

  const geometry = useMemo(
    () => createGeometry(controls.subdivisions, controls.size),
    [controls.subdivisions, controls.size],
  );
  useEffect(() => () => geometry.dispose(), [geometry]);

  // Uniforms are only mutated through the material ref (React Compiler forbids mutating memoized values).
  const material = useRef(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uBladeWidth: { value: 0 },
      uWidthRandomness: { value: 0 },
      uBladeHeight: { value: 0 },
      uHeightRandomness: { value: 0 },
      uHeightVariation: { value: 0 },
      uPatchSize: { value: 1 },
      uBaseColor: { value: new Color() },
      uTipColor: { value: new Color() },
      uColorVariation: { value: 0 },
      uWindStrength: { value: 0 },
      uWindSpeed: { value: 0 },
      uWindFrequency: { value: 0 },
      uWindFlutter: { value: 0 },
      uWindDirection: { value: new Vector2() },
    }),
    [],
  );

  // Leva -> uniforms (no geometry rebuild needed for these).
  useEffect(() => {
    const u = material.current.uniforms;
    const angle = (controls.windDirection * Math.PI) / 180;

    u.uBladeWidth.value = controls.bladeWidth;
    u.uWidthRandomness.value = controls.widthRandomness;
    u.uBladeHeight.value = controls.bladeHeight;
    u.uHeightRandomness.value = controls.heightRandomness;
    u.uHeightVariation.value = controls.heightVariation;
    u.uPatchSize.value = controls.patchSize;
    u.uBaseColor.value.set(controls.baseColor);
    u.uTipColor.value.set(controls.tipColor);
    u.uColorVariation.value = controls.colorVariation;
    u.uWindStrength.value = controls.windStrength;
    u.uWindSpeed.value = controls.windSpeed;
    u.uWindFrequency.value = controls.windFrequency;
    u.uWindFlutter.value = controls.windFlutter;
    u.uWindDirection.value.set(Math.cos(angle), Math.sin(angle));
  }, [controls]);

  useFrame((state) => {
    material.current.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <DebugPivot id="grass">
      {/* No frustum culling: blades are moved in the shader, the bounding box would be wrong. */}
      <mesh geometry={geometry} frustumCulled={false}>
        <shaderMaterial
          ref={material}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          side={DoubleSide}
        />
      </mesh>
    </DebugPivot>
  );
}
