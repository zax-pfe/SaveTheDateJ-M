import Sprite from "@/components/Sprite/Sprite";

// variant: 1 or 2 (tree_1.png / tree_2.png).
export default function Tree({ id, variant = 1 }) {
  return <Sprite id={id} url={`/assets/Img/tree_${variant}.png`} height={3.5} castShadow />;
}
