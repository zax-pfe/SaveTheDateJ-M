import { extend } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { MeshBasicNodeMaterial } from "three/webgpu";
import { normalLocal } from "three/tsl";
import "./style.module.scss";

extend({ MeshBasicNodeMaterial });

const faceColor = normalLocal.mul(0.5).add(0.5);

export default function Experience() {
  return (
    <>
      <OrbitControls makeDefault />
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicNodeMaterial colorNode={faceColor} />
      </mesh>
    </>
  );
}
