import { PageHeader } from "../../components";
import styles from "./index.module.css";

export default function Page() {
  return (
    <div className="container">
      <PageHeader title="Business Card" />
      <div className={styles.cards}>
        <div className={styles.card}>
          <p className="label">Front</p>
          <img src="/business_card/front.svg" alt="Business card front" className={styles.image} />
        </div>
        <div className={styles.card}>
          <p className="label">Back</p>
          <img src="/business_card/back.svg" alt="Business card back" className={styles.image} />
        </div>
      </div>
    </div>
  );
}
