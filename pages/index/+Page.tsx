import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Page() {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.to(ref.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
    });
  }, []);

  return (
    <h1 ref={ref} style={{ opacity: 0, transform: "translateY(30px)" }}>
      Hello
    </h1>
  );
}

