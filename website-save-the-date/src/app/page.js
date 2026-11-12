"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import Modal from "@/components/Modal/Modal";
import { listenDeviceMode } from "@/stores/store";
import styles from "./page.module.scss";

const Canvas = dynamic(() => import("@/components/Canvas/Canvas"), {
  ssr: false,
});

export default function Home() {
  useEffect(() => listenDeviceMode(), []);

  return (
    <main className={styles.page}>
      <Canvas />
      <Modal />
    </main>
  );
}
