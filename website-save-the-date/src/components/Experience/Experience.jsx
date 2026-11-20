import { OrbitControls } from "@react-three/drei";
import Background from "@/components/Scene/Background/Background";
import Cloud from "@/components/Scene/Cloud/Cloud";
import Portal from "@/components/Scene/Portal/Portal";
import Ground from "@/components/Scene/Ground/Ground";
import Grass from "@/components/Scene/Grass/Grass";
import Light from "@/components/Scene/Light/Light";
import Castle from "@/components/Scene/Castle/Castle";
import Mailbox from "@/components/Scene/Mailbox/Mailbox";
import Bush from "@/components/Scene/Bush/Bush";
import Tree from "@/components/Scene/Tree/Tree";

// Positions live in src/data/scene.json (edited with the gizmos in #debug mode).
export default function Experience() {
  return (
    <>
      <OrbitControls makeDefault />
      <color attach="background" args={["#efe3c8"]} />

      <Light />

      <Background />
      <Ground />
      <Grass />
      <Castle />
      <Mailbox />
      <Bush />
      <Tree id="tree-1" variant={1} />
      <Tree id="tree-2" variant={2} />

      <Cloud id="cloud-back" />
      <Cloud id="cloud-mid" />
      <Cloud id="cloud-front" />
      <Portal />
    </>
  );
}
