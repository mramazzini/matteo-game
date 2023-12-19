import styles from "./home-page.module.css";

import { useEffect, useState, useRef, use } from "react";

export default function Atom() {
  const [rotationAngle, setRotationAngle] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setRotationAngle((prev) => prev + 1);
    }, 16);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={styles.atom}
      style={{ transform: `rotate(${rotationAngle}deg)` }}
    >
      {/* <div className={styles.nucleus}></div>
      <div className={styles.orbit} />
      <div className={styles.electron}></div> */}
    </div>
  );
}
