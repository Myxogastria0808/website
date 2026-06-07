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
  return (
    <section>
      <h2 className="section-title">EMail / Social</h2>
      <div className={styles.wrapper}>
        <div className={styles.group}>
          <p className={styles.label}>Email</p>
          <p className={styles.email}>r.rstudio.c@gmail.com</p>
        </div>
        <div className={styles.group}>
          <p className={styles.label}>Social</p>
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
                <Icon size="2rem" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

