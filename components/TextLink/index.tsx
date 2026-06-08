import styles from "./index.module.css";

type Props = {
  href: string;
  content: string;
};

export default function TextLink({ href, content }: Props) {
  const isExternal = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      className={`${styles.link} ${styles.primary} font-megrim`}
      {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
    >
      {content}
    </a>
  );
}
