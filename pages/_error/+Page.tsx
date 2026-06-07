import { usePageContext } from "vike-react/usePageContext";
import { HTTP_STATUS } from "../../data/httpStatus";
import styles from "./index.module.css";

function getStatusCode(pageContext: {
  abortStatusCode?: number;
  is404?: boolean | null;
  errorWhileRendering?: unknown;
}): number | undefined {
  if (pageContext.abortStatusCode) return pageContext.abortStatusCode;
  if (pageContext.is404) return 404;
  if (pageContext.errorWhileRendering) return 500;
}

export default function Page() {
  const pageContext = usePageContext();
  const statusCode = getStatusCode(pageContext);
  const statusMessage = statusCode ? HTTP_STATUS[statusCode] : undefined;

  return (
    <div className={styles.container}>
      <p className={styles.code}>{statusCode ?? "???"}</p>
      <h1 className={styles.message}>{statusMessage ?? "Unknown Error"}</h1>
      <a href="/" className={styles.back}>
        ← Home
      </a>
    </div>
  );
}
