import { BANNERS } from "../../../data/banners";
import styles from "./index.module.css";

export default function Banners() {
  return (
    <section>
      <h2 className="section-title">Banners</h2>
      <div className={styles.ownBannerSection}>
        <div className={styles.ownBannerGroup}>
          <p className="label">my banner</p>
          <img
            src={"/my_banner/myxogastria0808_banner.svg"}
            alt={"Portfolio of myxogastria0808"}
            width={200}
            height={40}
            className={styles.banner}
          />
        </div>
        <p className={styles.recruitText}>Accepting reciprocal links!</p>
      </div>
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
