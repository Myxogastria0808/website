import { PageHeader } from "../../components";
import { HISTORIES } from "../../data/history/history";
import Timeline from "./Timeline";

export default function Page() {
  return (
    <div className="container">
      <PageHeader title="History" />
      <Timeline entries={HISTORIES} />
    </div>
  );
}
