import { LINK_ICONS, FallbackIcon } from "../../data/works/linkIcons";
import type { LinkLabel } from "../../data/works/linkIcons";
import type { Work } from "../../data/works/works";
import styles from "./index.module.css";

export default function WorkCard({ work }: { work: Work }) {
  return (
    <div className={styles.card}>
      <p className={styles.cardName}>{work.name}</p>
      <span className={styles.cardYear}>{work.year}</span>
      <p className={styles.cardDesc}>{work.description}</p>
      <div className={styles.tags}>
        {work.tags.map((tag) => (
          <span key={tag} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>
      {work.links && work.links.length > 0 && (
        <div className={styles.links}>
          {work.links.map(({ label, href }) => {
            const Icon = LINK_ICONS[label as LinkLabel] ?? FallbackIcon;
            return (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                <Icon className={styles.linkIcon} />
                {label}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
