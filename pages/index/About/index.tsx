import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Katex from "../../../components/Katex";
import "katex/dist/katex.min.css";
import styles from "./index.module.css";

function Symbol({ tex, mobileTex }: { tex: string; mobileTex: string }) {
  return (
    <div className={styles.symbol}>
      <span className={styles.symbolDesktop}>
        <Katex tex={tex} />
      </span>
      <span className={styles.symbolMobile}>
        <Katex tex={mobileTex} />
      </span>
    </div>
  );
}

export default function About() {
  const blockRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  useGSAP(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const targets = [
      { element: blockRefs[0].current, x: -80 },
      { element: blockRefs[1].current, x: 80 },
      { element: blockRefs[2].current, x: -80 },
    ];

    for (const { element, x } of targets) {
      if (!element) continue;
      gsap.fromTo(
        element,
        { x, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );
    }
  });

  return (
    <section>
      <h2 className="section-title">About</h2>
      <div className={styles.wrapper}>
        <div className={styles.entry}>
          <div ref={blockRefs[0]} className={styles.block}>
            <p className={styles.label}>Handle name</p>
            <p className={styles.text}>Myxogastria0808</p>
          </div>
          <Symbol tex={"A \\xrightarrow{\\sim} B"} mobileTex={"\\cong"} />
        </div>
        <div className={`${styles.entry} ${styles.entryReverse}`}>
          <div ref={blockRefs[1]} className={styles.block}>
            <p className={styles.label}>Affiliation</p>
            <p className={styles.text}>
              University of Tsukuba
              <br />
              College of Information Science
            </p>
          </div>
          <Symbol tex={"a \\in U"} mobileTex={"\\in"} />
        </div>
        <div className={styles.entry}>
          <div ref={blockRefs[2]} className={styles.block}>
            <p className={styles.label}>Interest</p>
            <p className={styles.text}>Category Theory, HoTT, Type Theory, Nix</p>
          </div>
          <Symbol tex={"\\lambda x {:} A.\\, x"} mobileTex={"\\lambda"} />
        </div>
      </div>
    </section>
  );
}

