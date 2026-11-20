import Sprite from "@/components/Sprite/Sprite";

// Clouds cast their shape as a shadow on the ground.
export default function Cloud({ id }) {
  return <Sprite id={id} url="/assets/Img/cloud.png" height={3} castShadow />;
}
