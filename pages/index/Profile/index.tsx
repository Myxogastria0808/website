import styles from "./index.module.css";

// Golden ratio spiral: viewBox 1618×1000 (φ:1)
// Each entry is the "outer" filled triangle of each successive golden-ratio square.
// Squares peel in order: right → bottom → left → top → right → …
// Diagonal endpoints (the spiral arc approximation) for each square:
//   A: (1618,0)→(618,1000)   B: (618,1000)→(0,382)   C: (0,382)→(382,0)
//   D: (382,0)→(618,236)     E: (618,236)→(472,382)   F: (472,382)→(382,292)
//   G: (382,292)→(438,236)   H: (438,236)→(472,270)   I: (472,270)→(450,292)
const OUTER_POINTS = [
  "1618,0 1618,1000 618,1000", // A right  [618,1618]×[0,1000]
  "0,382 618,1000 0,1000", // B bottom [0,618]×[382,1000]
  "0,0 382,0 0,382", // C left   [0,382]×[0,382]
  "382,0 618,0 618,236", // D top    [382,618]×[0,236]
  "618,236 618,382 472,382", // E right  [472,618]×[236,382]
  "382,292 472,382 382,382", // F bottom [382,472]×[292,382]
  "382,236 438,236 382,292", // G left   [382,438]×[236,292]
  "438,236 472,236 472,270", // H top    [438,472]×[236,270]
  "472,270 472,292 450,292", // I right  [450,472]×[270,292]
] as const;

const OUTER_FILLS = [
  "var(--color-secondary)",
  "var(--color-tertiary)",
  "var(--color-secondary)",
  "var(--color-tertiary)",
  "var(--color-secondary)",
  "var(--color-tertiary)",
  "var(--color-secondary)",
  "var(--color-tertiary)",
  "var(--color-secondary)",
] as const;

export default function Profile() {
  return (
    <section>
      <h2 className="section-title">Profile</h2>
      <div className={styles.frame}>
        <svg
          className={styles.spiral}
          viewBox="0 0 1618 1000"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <rect width="1618" height="1000" fill="var(--color-background)" />
          {OUTER_POINTS.map((pts, i) => (
            <polygon key={i} points={pts} fill={OUTER_FILLS[i]} />
          ))}
        </svg>
        <p className={`${styles.name} font-megrim`}>
          Yuki
          <br />
          Osada
        </p>
      </div>
    </section>
  );
}
