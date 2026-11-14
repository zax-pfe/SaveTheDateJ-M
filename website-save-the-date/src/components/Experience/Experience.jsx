import { OrbitControls } from "@react-three/drei";
import Background from "@/components/Scene/Background/Background";
import Cloud from "@/components/Scene/Cloud/Cloud";
import Doors from "@/components/Scene/Doors/Doors";
import Ground from "@/components/Scene/Ground/Ground";
import Light from "@/components/Scene/Light/Light";

// Positions live in src/data/scene.json (edited with the gizmos in #debug mode).
export default function Experience() {
  return (
    <>
      <OrbitControls makeDefault />
      <color attach="background" args={["#efe3c8"]} />

      <Light />

      <Background />
      <Ground />
      <Cloud id="cloud-back" />
      <Cloud id="cloud-mid" />
      <Cloud id="cloud-front" />
      <Doors />
    </>
  );
}
