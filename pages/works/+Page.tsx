import { WORKS } from "../../data/works";
import styles from "./index.module.css";

export const allWorks = [...WORKS].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);

export default function Page() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <a href="/" className={styles.back}>
          ← Home
        </a>
        <h1 className="title">Works</h1>
      </header>

      {/* TODO: 全文検索 + タグ絞り込み。検索前はallWorksを全件表示する */}
      <section className={styles.searchSection}>
        <h2 className="section-title">Search</h2>
        <div className={styles.wip}>
          <p className={styles.wipLabel}>Under Construction</p>
          <p className={styles.wipDesc}>全文検索・タグ絞り込みは準備中です。</p>
        </div>
      </section>
    </div>
  );
}
