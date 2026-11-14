"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { Leva } from "leva";
import Modal from "@/components/Modal/Modal";
import { listenDebugMode, listenDeviceMode, useDebugStore } from "@/stores/store";
import styles from "./page.module.scss";

const Canvas = dynamic(() => import("@/components/Canvas/Canvas"), {
  ssr: false,
});

export default function Home() {
  const debug = useDebugStore((state) => state.debug);

  useEffect(() => listenDeviceMode(), []);
  useEffect(() => listenDebugMode(), []);

  return (
    <main className={styles.page}>
      <Canvas />
      <Modal />
      {/* Debug panel, only visible with #debug in the URL. */}
      <Leva hidden={!debug} />
    </main>
  );
}
