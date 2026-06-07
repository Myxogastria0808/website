import { WORKS } from "../../data/works";
import About from "./About";
import Banner from "./Banner";
import LambdaRain from "./LambdaRain";
import Profile from "./Profile";
import Social from "./Social";
import Works from "./Works";
import styles from "./index.module.css";

const latestWorks = [...WORKS]
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 3);

export default function Page() {
  return (
    <>
      <LambdaRain />
      <div className={styles.container}>
        <Profile />
        <About />
        <Social />
        <Works works={latestWorks} />
        <Banner />
      </div>
    </>
  );
}
