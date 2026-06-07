import { WORKS } from "../../data/works";
import Works from "../index/Works";
import styles from "./index.module.css";

const allWorks = [...WORKS].sort(
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

      {/* TODO: 全文検索 + タグ絞り込みをここに実装する。現状は全件を表示 */}
      <div className={styles.searchSection}>
        <Works works={allWorks} showViewAll={false} />
      </div>
    </div>
  );
}
