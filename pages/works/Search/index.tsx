import { useState, useMemo, useEffect, useRef } from "react";
import Fuse from "fuse.js";
import { ALL_WORKS } from "../../../data/works/works";
import { TAGS } from "../../../data/works/tags";
import type { Tag } from "../../../data/works/tags";
import { WorkCard } from "../../../components";
import styles from "./index.module.css";

const fuse = new Fuse(ALL_WORKS, {
  keys: ["name", "description"],
  threshold: 0.4,
  includeScore: true,
});

export default function Search() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  // React fires effects in declaration order. On the first render, the sync effect
  // runs before the init effect's setState takes hold, so query/selectedTags are still
  // empty and would clear the URL. This ref skips the sync effect on that first fire.
  const syncFired = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("keywords") ?? "";
    const tags = params.getAll("tag").filter((t): t is Tag => TAGS.includes(t as Tag));
    setQuery(q);
    setDebouncedQuery(q);
    setSelectedTags(tags);
  }, []);

  // Debounce the search query at 150ms so Fuse.js only runs after the user pauses
  // typing. Below 100ms the search fires too often during fast input; above 200ms
  // users perceive the lag. React's cleanup cancels the previous timer on each render.
  // ref: https://zenn.dev/zesptra/articles/964c6976f85ae5
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 150);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (!syncFired.current) {
      syncFired.current = true;
      return;
    }
    const params = new URLSearchParams();
    if (query) params.set("keywords", query);
    selectedTags.forEach((tag) => params.append("tag", tag));
    const search = params.toString();
    // replaceState rewrites the address bar without navigation. pushState would
    // stack a history entry on every keystroke and break the browser back button.
    // Debounced at 300ms: Safari caps replaceState at 100 calls/30s; Chrome/Firefox
    // throttle below 50ms. React's cleanup cancels the previous timer on each render,
    // so the URL only updates after the user pauses.
    // ref: https://azukiazusa.dev/blog/history-replacestate-rate-limit/
    const timer = setTimeout(() => {
      window.history.replaceState(null, "", search ? `?${search}` : window.location.pathname);
    }, 300);
    return () => clearTimeout(timer);
  }, [query, selectedTags]);

  const displayedWorks = useMemo(() => {
    const searched = debouncedQuery.trim()
      ? fuse
          .search(debouncedQuery)
          .sort((a, b) => (a.score ?? 1) - (b.score ?? 1))
          .map((r) => r.item)
      : ALL_WORKS;

    return selectedTags.length > 0
      ? searched.filter((w) => selectedTags.some((t) => w.tags.includes(t)))
      : searched;
  }, [debouncedQuery, selectedTags]);

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

