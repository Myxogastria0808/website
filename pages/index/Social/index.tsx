import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import styles from "./index.module.css";

const SOCIAL_LINKS = [
  { href: "https://twitter.com/yuki_osada0808", label: "X", Icon: FaXTwitter },
  { href: "https://github.com/Myxogastria0808", label: "GitHub", Icon: FaGithub },
  {
    href: "https://www.linkedin.com/in/yuuki-osada",
    label: "LinkedIn",
    Icon: FaLinkedinIn,
  },
];

export default function Social() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    if (!wrapperRef.current) return;
    const groups = wrapperRef.current.querySelectorAll(`.${styles.group}`);
    gsap.fromTo(
      groups,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      },
    );
  });

  return (
    <section>
      <h2 className="section-title">EMail / Social</h2>
      <div ref={wrapperRef} className={styles.wrapper}>
        <div className={styles.group}>
          <p className="label">Email</p>
          <p className={styles.email}>r.rstudio.c@gmail.com</p>
        </div>
        <div className={styles.group}>
          <p className="label">Social</p>
          <div className={styles.icons}>
            {SOCIAL_LINKS.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={styles.iconLink}
              >
                <Icon className={styles.socialIcon} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
