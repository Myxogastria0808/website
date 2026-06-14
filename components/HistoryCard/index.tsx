import { LINK_ICONS, FallbackIcon } from "../../data/shared/linkIcons";
import type { LinkLabel } from "../../data/shared/linkIcons";
import { formatYearMonth } from "../../data/history/history";
import type { HistoryEntry } from "../../data/history/history";
import styles from "./index.module.css";

export default function HistoryCard({
  entry,
  showYear = false,
}: {
  entry: HistoryEntry;
  showYear?: boolean;
}) {
  const useFeature = !showYear && entry.feature !== undefined;
  const displayName = useFeature ? entry.feature!.title : entry.name;
  const displayDesc = useFeature ? entry.feature!.description : entry.description;
  const displayYear = showYear || !entry.feature;
  return (
    <div className={styles.card}>
      <p className={styles.cardName}>{displayName}</p>
      {displayYear && <span className={styles.cardYear}>{formatYearMonth(entry.year)}</span>}
      <p className={styles.cardDesc}>{displayDesc}</p>
      {entry.links && entry.links.length > 0 && (
        <div className={styles.links}>
          {entry.links.map(({ label, href }) => {
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
