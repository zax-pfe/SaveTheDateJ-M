"use no memo"; // Must re-read scene.json on every render (hot reload after a save), so no compiler caching.

import { useRef } from "react";
import { Euler, Matrix4, Quaternion, Vector3 } from "three";
import { PivotControls } from "@react-three/drei";
import { useDebugStore } from "@/stores/store";
import scene from "@/data/scene.json";

const DEFAULT_TRANSFORM = { position: [0, 0, 0], rotation: [0, 0, 0], scale: [1, 1, 1] };

function toMatrix({ position, rotation, scale }) {
  return new Matrix4().compose(
    new Vector3(...position),
    new Quaternion().setFromEuler(new Euler(...rotation)),
    new Vector3(...scale),
  );
}

function fromMatrix(matrix) {
  const position = new Vector3();
  const quaternion = new Quaternion();
  const scale = new Vector3();
  matrix.decompose(position, quaternion, scale);
  const rotation = new Euler().setFromQuaternion(quaternion);
  const round = (value) => Math.round(value * 1000) / 1000;

  return {
    position: position.toArray().map(round),
    rotation: [rotation.x, rotation.y, rotation.z].map(round),
    scale: scale.toArray().map(round),
  };
}

// Places its children with the transform saved under `id` in src/data/scene.json.
// In #debug mode, a gizmo moves them and saves the new transform on release.
export default function DebugPivot({ id, children }) {
  const debug = useDebugStore((state) => state.debug);
  const pivot = useRef(null);
  const transform = { ...DEFAULT_TRANSFORM, ...scene[id] };

  function save() {
    fetch("/api/debug/scene", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, transform: fromMatrix(pivot.current.matrix) }),
    });
  }

  return (
    <PivotControls
      ref={pivot}
      matrix={toMatrix(transform)}
      enabled={debug}
      depthTest={false}
      onDragEnd={save}
    >
      {children}
    </PivotControls>
  );
}
