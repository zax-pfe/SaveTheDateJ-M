import { OrbitControls } from "@react-three/drei";
import Background from "@/components/Scene/Background/Background";
import Cloud from "@/components/Scene/Cloud/Cloud";
import Doors from "@/components/Scene/Doors/Doors";
import Ground from "@/components/Scene/Ground/Ground";
import Light from "@/components/Scene/Light/Light";
import Castle from "@/components/Scene/Castle/Castle";
import MarieJean from "@/components/Scene/MarieJean/MarieJean";
import Mailbox from "@/components/Scene/Mailbox/Mailbox";
import Mirror from "@/components/Scene/Mirror/Mirror";
import Bush from "@/components/Scene/Bush/Bush";

// Positions live in src/data/scene.json (edited with the gizmos in #debug mode).
export default function Experience() {
  return (
    <>
      <OrbitControls makeDefault />
      <color attach="background" args={["#efe3c8"]} />

      <Light />

      <Background />
      <Ground />
      <Castle />
      <MarieJean />
      <Mailbox />
      <Mirror />
      <Bush />
      {/* <Bush />

      <Bush />

      <Bush />

      <Bush /> */}

      <Cloud id="cloud-back" />
      <Cloud id="cloud-mid" />
      <Cloud id="cloud-front" />
      <Doors />
    </>
  );
}
