import { BANNERS } from "../../../data/banners";
import styles from "./index.module.css";

export default function Banner() {
  return (
    <section>
      <h2 className="section-title">Banners</h2>
      <div className={styles.grid}>
        {BANNERS.map((banner) => (
          <a
            key={banner.href}
            href={banner.href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            <img
              src={banner.src}
              alt={banner.alt}
              width={200}
              height={40}
              className={styles.banner}
            />
          </a>
        ))}
      </div>
    </section>
  );
}

