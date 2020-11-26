import React, { useState } from "react";
import styles from "./index.less";

const getShadow = (day, start, end, color) => {
  if (day === start && day === end) return { borderLeft: `2px solid ${color}` };
  if (day === start) return { borderLeft: `2px solid ${color}` };
  return {};
};

const getColor = (colors, status, activeStatus) => {
  const { activeColor, bgColor } = colors[status];
  if (activeStatus) return activeColor;
  return bgColor;
};

const Child = ({ child, hoverTask, status, onClick, onHover, endIndex, dayIndex, isCurrentMonth, taskId, colors = {} }) => {
  const [isHover, setIsHover] = useState(false);

  const { id, name, start, row: childRow } = child;
  const { borderColor } = colors[status];
  const shadow = getShadow(dayIndex, start, endIndex, borderColor);
  const { id: hoverId, row: hoverRow } = hoverTask;
  const activeStatus = isHover || taskId === id || (hoverRow === childRow && hoverId === id);
  const style = { ...shadow, backgroundColor: getColor(colors, status, activeStatus) };

  const handleEnter = () => {
    if (isCurrentMonth) {
      setIsHover(true);
      onHover(child)
    }
  };

  const handleLeave = () => {
    if (isCurrentMonth) {
      setIsHover(false);
      onHover({})
    }
  };

  const handleClick = (e) => {
    e.stopPropagation();
    onClick(e, { ...child, dayIndex })
  };

  return (
    <div
      style={style}
      className={styles.task}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={handleClick}
    >
      {dayIndex === start && <div className={styles.circle} style={{ backgroundColor: borderColor }} />}
      {(dayIndex === start || dayIndex % 7 === 0) && <div className={styles.name}>{name}</div>}
    </div>
  )
};

export default Child;
