import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FaGithub, FaArrowUpRightFromSquare } from "react-icons/fa6";
import type { Work } from "../../../data/works";
import styles from "./index.module.css";


export default function Works({ works, showViewAll = true }: { works: Work[]; showViewAll?: boolean }) {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(`.${styles.card}`);
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
          <div key={work.name} className={styles.card}>
            <p className={styles.cardName}>{work.name}</p>
            <p className={styles.cardDesc}>{work.description}</p>
            <div className={styles.tags}>
              {work.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
            <div className={styles.links}>
              {work.github && (
                <a
                  href={work.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  <FaGithub size="1rem" />
                  GitHub
                </a>
              )}
              {work.demo && (
                <a
                  href={work.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  <FaArrowUpRightFromSquare size="0.875rem" />
                  Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
      {showViewAll && (
        <div className={styles.footer}>
          <a href="/works/" className={styles.viewAll}>
            View All Works →
          </a>
        </div>
      )}
    </section>
  );
}

