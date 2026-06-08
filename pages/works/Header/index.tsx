import { TextLink } from "../../../components";
import styles from "./index.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <TextLink href="/" content="← Home" />
      <h1 className="title">Works</h1>
    </header>
  );
}
