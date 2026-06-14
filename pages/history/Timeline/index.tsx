import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { HistoryCard, TextLink } from "../../../components";
import type { HistoryEntry } from "../../../data/history/history";
import styles from "./index.module.css";

type EntryItem = { kind: "entry"; entry: HistoryEntry; idx: number };
type YearItem = { kind: "year"; year: string };
type TimelineItem = EntryItem | YearItem;

const buildItems = (entries: HistoryEntry[]): TimelineItem[] => {
  const items: TimelineItem[] = [];
  let lastYear: string | null = null;
  let idx = 0;
  for (const entry of entries) {
    const year = entry.year.slice(0, 4);
    if (year !== lastYear) {
      items.push({ kind: "year", year });
      lastYear = year;
    }
    items.push({ kind: "entry", entry, idx: idx++ });
  }
  return items;
};

export default function Timeline({ entries }: { entries: HistoryEntry[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!containerRef.current) return;

    const isMobile = window.matchMedia("(max-width: 40rem)").matches;
    const items = containerRef.current.querySelectorAll<HTMLElement>(`.${styles.item}`);

    items.forEach((item) => {
      const isLeft = item.classList.contains(styles.itemLeft);
      gsap.set(item, isMobile ? { y: 40, opacity: 0 } : { x: isLeft ? -80 : 80, opacity: 0 });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const item = entry.target as HTMLElement;
          const isLeft = item.classList.contains(styles.itemLeft);
          const from = isMobile ? { y: 40, opacity: 0 } : { x: isLeft ? -80 : 80, opacity: 0 };
          const to = isMobile ? { y: 0, opacity: 1 } : { x: 0, opacity: 1 };
          gsap.fromTo(item, from, { ...to, duration: 0.8, ease: "power3.out" });
          observer.unobserve(item);
        });
      },
      { threshold: 0, rootMargin: "0px 0px -20% 0px" },
    );

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  });

  const items = buildItems(entries);

  return (
    <>
      <div ref={containerRef} className={styles.timeline}>
        {items.map((item) => {
          if (item.kind === "year") {
            return (
              <div key={`year-${item.year}`} className={styles.yearSeparator}>
                <span className={`${styles.yearLabel} font-megrim`}>{item.year}</span>
              </div>
            );
          }
          return (
            <div
              key={`${item.entry.year}-${item.entry.name}`}
              className={`${styles.item} ${item.idx % 2 === 0 ? styles.itemLeft : styles.itemRight}`}
            >
              <HistoryCard entry={item.entry} showYear />
            </div>
          );
        })}
      </div>
      <div className={styles.footer}>
        <TextLink href="/#activity" content="CURRENT →" />
      </div>
    </>
  );
}
