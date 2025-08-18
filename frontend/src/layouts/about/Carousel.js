import React, { useState, useRef } from "react";
import styles from "./aboutUs.module.scss";

export default function Carousel({ children }) {
  const [index, setIndex] = useState(0);
  const startX = useRef(null);
  const isDragging = useRef(false);

  const count = React.Children.count(children);

  const prev = () => {
    setIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const next = () => {
    setIndex((prevIndex) => Math.min(prevIndex + 1, count - 1));
  };

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
    isDragging.current = true;
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    const deltaX = e.touches[0].clientX - startX.current;
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) prev();
      else next();
      isDragging.current = false;
    }
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    startX.current = null;
  };

  return (
    <div className={styles.carousel}>
      {index > 0 && (
        <button className={`${styles.arrow} ${styles.left}`} onClick={prev}>
          ◀
        </button>
      )}

      <div
        className={styles.carouselWrapper}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={styles.carouselInner}
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {React.Children.map(children, (child, i) => (
            <div className={styles.carouselSlide}>{child}</div>
          ))}
        </div>
      </div>

      {index < count - 1 && (
        <button className={`${styles.arrow} ${styles.right}`} onClick={next}>
          ▶
        </button>
      )}
    </div>
  );
}
