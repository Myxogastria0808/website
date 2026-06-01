import { usePageContext } from "vike-react/usePageContext";

export default function Page() {
  const { abortStatusCode } = usePageContext();
  return <h1>{abortStatusCode}</h1>;
}
