import styles from "./style.module.scss";

export default function Modal({ children }) {
  if (!children) return null;

  return (
    <div className={styles.modal} role="dialog" aria-modal="true">
      <div className={styles.content}>{children}</div>
    </div>
  );
}
