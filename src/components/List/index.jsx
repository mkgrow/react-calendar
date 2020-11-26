import React, { useState } from "react";
import styles from "./index.less";

const List = ({ style, colors, data, day, lunar, activeIndex, onItemClick }) => {
  const [selectedIndex, setSelectedIndex] = useState(activeIndex);

  const handleClick = (e, it, index) => {
    e.stopPropagation();
    setSelectedIndex(index);
    onItemClick(it);
  };

  return (
    <div style={style} className={styles.list}>
      <div className={styles.header}>
        <div className={styles.day}>{day}</div>
        <div className={styles.lunar}>{lunar}</div>
      </div>
      {
        data.map((it, index) => {
          const { id, name, status } = it;
          const { borderColor, activeColor } = colors[status] || {};
          return (
            <div
              key={id}
              className={styles.child}
              style={selectedIndex === index ? { backgroundColor: activeColor } : {}}
              onClick={e => handleClick(e, it, index)}
            >
              <div className={styles.circle} style={{ backgroundColor: borderColor }} />
              <div className={styles.name}>{name}</div>
            </div>
          )
        })
      }
    </div>
  )
};

export default List;
