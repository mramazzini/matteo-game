import Image from "next/image";
import styles from "./home-page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>
        <div className={styles.name_left}>Matteo</div>.
        <div className={styles.name_right}>game</div>
      </h1>
      <h2 className={styles.subtitle}> I make games. :)</h2>
      <div className={styles.grid}>
        <a href='/worm' className={styles.card}>
          <h3>Worm &rarr;</h3>
        </a>
        <a href='/snake' className={styles.card}>
          <h3>Snake &rarr;</h3>
        </a>
        <a href='/pong' className={styles.card}>
          <h3>Pong &rarr;</h3>
        </a>
      </div>
    </main>
  );
}
