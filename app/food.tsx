import styles from "./home-page.module.css";
import { useEffect, useState, useRef } from "react";
import { transform } from "typescript";
import { foodProps } from "@/types";
import Atom from "./atom";
export default function Food({ type }: foodProps) {
  return <div className={styles.food}>{type === "atom" ? <Atom /> : ""}</div>;
}
