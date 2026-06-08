import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { WorkCard, TextLink } from "../../../components";
import type { Work } from "../../../data/works/works";
import styles from "./index.module.css";

export default function Works({
  works,
  showViewAll = true,
}: {
  works: Work[];
  showViewAll?: boolean;
}) {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(`.${styles.cardWrapper}`);
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
          trigger: gridRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      },
    );
  });

  return (
    <section>
      <h2 className="section-title">Works</h2>
      <div ref={gridRef} className={styles.grid}>
        {works.map((work) => (
          <div key={work.name} className={styles.cardWrapper}>
            <WorkCard work={work} />
          </div>
        ))}
      </div>
      {showViewAll && (
        <div className={styles.footer}>
          <TextLink href="/works/" content="View All Works →" />
        </div>
      )}
    </section>
  );
}
