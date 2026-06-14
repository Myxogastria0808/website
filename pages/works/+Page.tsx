import { PageHeader } from "../../components";
import Search from "./Search";

export default function Page() {
  return (
    <div className="container">
      <PageHeader title="Works" />
      <Search />
    </div>
  );
}
