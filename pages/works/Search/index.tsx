import { useState, useMemo } from "react";
import Fuse from "fuse.js";
import { ALL_WORKS } from "../../../data/works/works";
import { TAGS } from "../../../data/works/tags";
import type { Tag } from "../../../data/works/tags";
import { WorkCard } from "../../../components";
import styles from "./index.module.css";

const fuse = new Fuse(ALL_WORKS, {
  keys: ["name", "description"],
  threshold: 0.4,
});

export default function Search() {
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const displayedWorks = useMemo(() => {
    const searched = query.trim() ? fuse.search(query).map((r) => r.item) : ALL_WORKS;

    return selectedTags.length > 0
      ? searched.filter((w) => selectedTags.some((t) => w.tags.includes(t)))
      : searched;
  }, [query, selectedTags]);

  const toggleTag = (tag: Tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  return (
    <>
      <section className={styles.searchSection}>
        <input
          type="search"
          className={styles.searchInput}
          placeholder="Search works..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className={styles.tagList}>
          <button
            type="button"
            className={`${styles.tagBtn}${selectedTags.length === 0 ? ` ${styles.tagBtnActive}` : ""}`}
            onClick={() => setSelectedTags([])}
          >
            All
          </button>
          {TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              className={`${styles.tagBtn}${selectedTags.includes(tag) ? ` ${styles.tagBtnActive}` : ""}`}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      <section className={styles.resultsSection}>
        <p className={styles.resultsCount}>{displayedWorks.length} works</p>
        {displayedWorks.length > 0 ? (
          <div className={styles.resultsGrid}>
            {displayedWorks.map((work) => (
              <WorkCard key={work.name} work={work} />
            ))}
          </div>
        ) : (
          <p className={styles.noResults}>No works found.</p>
        )}
      </section>
    </>
  );
}
