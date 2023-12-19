"use client";

import styles from "./home-page.module.css";
import Worm from "./worm";
import Food from "./food";
import { useEffect, useState } from "react";

const INITIAL_SNAKE_LENGTH = 90;
export default function Home() {
  const [length, setLength] = useState(INITIAL_SNAKE_LENGTH); //this represents the score of the worm
  const [size, setSize] = useState(-1.0); //this represents the size of the worm in 10^-10 meters
  const [mouseCoordinates, setMouseCoordinates] = useState({ x: 0, y: 0 });
  const MOUSE_OFFSET = 45;
  const handleMouseMove = (e: any) => {
    const { pageX, pageY } = e;
    setMouseCoordinates({ x: pageX - MOUSE_OFFSET, y: pageY - MOUSE_OFFSET });
  };

  return (
    <main className={styles.main} onMouseMove={(e) => handleMouseMove(e)}>
      <a
        className="container"
        href=" https://github.com/mramazzini/matteo-game"
        target="_blank"
      >
        <h2> Check out the source code here!</h2>
        <img className={"github"} />
      </a>
      <div
        className={`${styles.current_size} ${size < 0 ? styles.hidden : ""}`}
      >
        {/* {parseFloat((size * 10 ** -10).toFixed(11)).toExponential()} meters */}
      </div>
      {size >= 0 ? (
        <Worm mouseCoordinates={mouseCoordinates} length={length} />
      ) : (
        <section className={styles.menu}>
          <h1>You are a worm.</h1>

          <h1>Move your mouse to move the worm.</h1>
          <button onClick={() => setSize(0.1)} className={styles.title}>
            Click to begin
          </button>
        </section>
      )}
      <Food type="atom" />
    </main>
  );
}
