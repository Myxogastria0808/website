import { WORKS } from "../../data/works/works";
import About from "./About";
import Banners from "./Banners";
import Activity from "./Activity";
import LambdaRain from "./LambdaRain";
import Profile from "./Profile";
import Social from "./Social";
import Works from "./Works";
const latestWorks = [...WORKS].sort((a, b) => parseInt(b.year) - parseInt(a.year)).slice(0, 3);

export default function Page() {
  return (
    <>
      <LambdaRain />
      <div className="container">
        <Profile />
        <About />
        <Social />
        <Works works={latestWorks} />
        <Activity />
        <Banners />
      </div>
    </>
  );
}
