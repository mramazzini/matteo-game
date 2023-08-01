import styles from "./worm-game.module.css";
import { WormProps } from "@/types";
import { useEffect, useState, useRef } from "react";
import { transform } from "typescript";

export default function Worm({ mouseCoordinates, length }: WormProps) {
  const [wormBodyCoordinates, setWormBodyCoordinates] = useState(
    Array.from(Array(length).keys()).map((i) => ({ x: 0, y: 0 }))
  ); //this represents the s
  const [wormCoordinates, setWormCoordinates] = useState({
    x: 0,
    y: 0,
  });

  const [rotationAngle, setRotationAngle] = useState(0);

  const prevMousePosition = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef(0);
  const calculateNewCoordinates = () => {
    const { x: currentX, y: currentY } = wormCoordinates;
    const { x: mouseX, y: mouseY } = mouseCoordinates; // Use last known mouse coordinates

    // Calculate the distance between the worm and mouse coordinates
    const deltaX = mouseX - currentX;
    const deltaY = mouseY - currentY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Calculate the angle between the worm and mouse coordinates
    const angleRad = Math.atan2(deltaY, deltaX);
    const angleDeg = angleRad * (180 / Math.PI);

    // Update the rotation angle state
    setRotationAngle(angleDeg);

    // Define maximum speed and minimum speed
    const maxSpeed = 500; // pixels per second
    const minSpeed = 0; // pixels per second

    // Calculate the speed based on the distance
    const speed = Math.min(
      maxSpeed,
      minSpeed + (distance / 100) * (maxSpeed - minSpeed)
    );

    const step = (speed * 16) / 1000; // Convert speed to step size (time is in ms)

    // If the worm is already close enough to the mouse, stop moving
    if (distance <= step) {
      prevMousePosition.current = { x: mouseX, y: mouseY };
      return;
    }

    // Calculate the new worm coordinates
    const newX = currentX + (deltaX / distance) * step;
    const newY = currentY + (deltaY / distance) * step;

    // Update the worm coordinates and the previous mouse position
    setWormCoordinates({ x: newX, y: newY });
    prevMousePosition.current = { x: mouseX, y: mouseY };

    // Calculate the new worm body coordinates
    const prevCoordinates = wormBodyCoordinates;
    const newBodyCoordinates = wormBodyCoordinates.map((coord, i) => {
      if (i === 0) {
        return { x: newX, y: newY };
      } else {
        return prevCoordinates[i - 1];
      }
    });

    setWormBodyCoordinates(newBodyCoordinates);
    return { x: newX, y: newY };
  };

  const animateWorm = () => {
    const newCoordinates = calculateNewCoordinates(); // Calculate the new coordinates
    if (newCoordinates) {
      setWormCoordinates(newCoordinates); // Update the worm coordinates
    }
  };

  useEffect(() => {
    // Start the animation when the component mounts
    animationFrameRef.current = requestAnimationFrame(animateWorm);

    // Clean up function to stop the animation when the component unmounts
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [wormCoordinates]);

  const wormLeft = wormCoordinates.x + "px";
  const wormTop = wormCoordinates.y - window.innerHeight / 2 + "px";

  return (
    <div className={styles.worm}>
      <div
        className={styles.head}
        style={{
          left: wormLeft,
          top: wormTop,
          transform: `rotate(${rotationAngle + 90}deg)`,
        }}
      >
        <div
          className={`${styles.eye}`}
          style={{ transform: `rotate(${rotationAngle + 90}deg)` }}
        >
          <div className={styles.pupil}></div>
        </div>
        <div
          className={`${styles.eye}`}
          style={{ transform: `rotate(${rotationAngle + 90}deg)` }}
        >
          <div className={styles.pupil}></div>
        </div>
      </div>
      {wormBodyCoordinates.map((_, i) => (
        <div
          key={i}
          className={styles.body}
          style={{
            top: wormBodyCoordinates[i].y - window.innerHeight / 2 + "px",
            left: wormBodyCoordinates[i].x + "px",
          }}
        ></div>
      ))}
    </div>
  );
}
