import { TextLink } from "../index";
import styles from "./index.module.css";

type Props = { title: string };

export default function PageHeader({ title }: Props) {
  return (
    <header className={styles.header}>
      <TextLink href="/" content="← Home" />
      <h1 className="title">{title}</h1>
    </header>
  );
}
