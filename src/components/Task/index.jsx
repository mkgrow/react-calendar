import React from "react";
import Child from "./Child";
import styles from "./index.less";

const getEnd = (dayIndex, start, end, daysInMonth) => {
  if (dayIndex >= start && dayIndex <= end) {
    return end;
  }

  if (end < start && dayIndex >= start && dayIndex <= daysInMonth + end) {
    return daysInMonth + end;
  }

  if (end < start && end === -1 && dayIndex >= start) {
    return daysInMonth
  }

  return null;
};

const Task = ({ onClick, onHover, onMoreClick, dayProps }) => {
  const { colors, isCurrentMonth, dayIndex, daysInMonth, showNum, data, taskId, hoverTask } = dayProps || {};

  const handleTaskClick = (e, task) => {
    e.stopPropagation();
    if (isCurrentMonth) {
      onClick(task);
    }
  };

  const handleTaskHover = (task) => {
    if (isCurrentMonth) {
      onHover(task);
    }
  };

  const handleMoreClick = (e) => {
    e.stopPropagation();
    if (isCurrentMonth) {
      onMoreClick(true);
    }
  };

  const renderNumItem = () => {
    const surplusNum = data.length - showNum;

    if (surplusNum && data.length >= 5) {
      return <div key={dayIndex} className={styles.surPlusNum} onClick={handleMoreClick} >{`还有${surplusNum}项...`}</div>
    }

    return null;
  };

  const visibleNumber = data.length >= 5 ? showNum : showNum + 1;

  return (
    <div className={`tasks ${styles.taskBox}`}>
      {
        data.map((child, index) => {
          const { id, start, end, status } = child;
          const endIndex = getEnd(dayIndex, start, end, daysInMonth);

          if (endIndex && index + 1 <= visibleNumber) {
            return (
              <Child
                key={id}
                start={start}
                isCurrentMonth={isCurrentMonth}
                dayIndex={dayIndex}
                endIndex={endIndex}
                child={child}
                hoverTask={hoverTask}
                taskId={taskId}
                status={status}
                colors={colors}
                onClick={handleTaskClick}
                onHover={handleTaskHover}
              />
            );
          }

          return null;
        })
      }
      {renderNumItem()}
    </div>
  );
};

export default Task;
