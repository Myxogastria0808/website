import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { HistoryCard, WorkCard, TextLink } from "../../../components";
import { WORKS } from "../../../data/works/works";
import { HISTORIES } from "../../../data/history/history";
import styles from "./index.module.css";

const topics = WORKS.filter((w) => w.isTopic);
const affiliations = HISTORIES.filter((h) => h.feature?.category === "Affiliations");

export default function Activity() {
  const topicRef = useRef<HTMLDivElement>(null);
  const affiliationsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    for (const ref of [topicRef, affiliationsRef]) {
      if (!ref.current) continue;
      const cards = ref.current.querySelectorAll(`.${styles.cardWrapper}`);
      gsap.fromTo(
        cards,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );
    }
  });

  return (
    <section id="activity">
      <h2 className="section-title">Activity</h2>
      {topics.length > 0 && (
        <>
          <p className={styles.subLabel}>Topic</p>
          <div ref={topicRef} className={styles.topicGrid}>
            {topics.map((work) => (
              <div key={work.name} className={styles.cardWrapper}>
                <WorkCard work={work} />
              </div>
            ))}
          </div>
        </>
      )}
      {affiliations.length > 0 && (
        <>
          <p className={styles.subLabel}>Affiliations</p>
          <div ref={affiliationsRef} className={styles.orgsGrid}>
            {affiliations.map((entry) => (
              <div key={entry.name} className={styles.cardWrapper}>
                <HistoryCard entry={entry} />
              </div>
            ))}
          </div>
        </>
      )}
      <div className={styles.footer}>
        <TextLink href="/history/" content="View History →" />
      </div>
    </section>
  );
}
