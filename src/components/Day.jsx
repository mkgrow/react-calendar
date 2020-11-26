import React from "react";
import { getYear } from "../utils/util";
import useDay from "./Hook/useDay";
import Holiday from "./Holiday";
import OperateModal from "./OperateModal";
import Task from "./Task";
import List from "./List";
import styles from "../Calendar.less";

const Day = ({ date, tasks, number, daysNumber = 0, month, day, lunar, index, selectedTask, hoverTask, onClick, onHover, currentDayIndex, onDelete, onEdit, onCancel }) => {
  const [props, methods] = useDay({ tasks, date, month, daysNumber, index });

  const { dayTask, allVisible, operateVisible, colors, curMonth, isCurrent, daysInMonth } = props;
  const { setAllVisible, setOperateVisible, getTaskStatus, getAllListPositionStyle, getPositionStyle } = methods;

  const { id: taskId, dayIndex, isActive, startAt, endAt } = selectedTask;

  const handleTaskClick = (curTask) => {
    if (isCurrent) {
      setOperateVisible(true);
      setAllVisible(false);
      onClick({ ...curTask, dayIndex: index })
    }
  };

  const handleListTaskClick = (curTask) => {
    if (isCurrent) {
      setOperateVisible(true);
      onClick({ ...curTask, dayIndex: index })
    }
  };

  const handleHover = (curTask) => {
    if (isCurrent) {
      onHover(curTask)
    }
  };

  const handleMoreClick = () => {
    const curTask = dayTask.find(it => it.id === taskId) ?? {};

    if (isCurrent) {
      setAllVisible(true);
      setOperateVisible(true);
      onClick({ ...curTask, dayIndex: index })
    }
  };

  const initState = (e) => {
    e.stopPropagation();
    if (isCurrent) {
      setAllVisible(false);
      setOperateVisible(false);
      onClick({})
    }
  };

  const handleDelete = (id) => {
    onDelete(id);
    setOperateVisible(false);
  };

  const handleCancel = (task) => {
    onCancel(task)
  };

  const activeIndex = dayTask.findIndex(i => i?.id === taskId);
  const className = `${styles.child} ${isCurrent ? '' : styles.childDisable}`;
  const status = startAt && endAt && getTaskStatus(isActive, startAt, endAt);
  const isLastRow = daysNumber === 35 && index >= 28 || daysNumber === 42 && index >= 35;

  return (
    <div
      key={`${month}-${day}`}
      className={className}
      onClick={initState}
    >
      <div className={styles.day}>
        <span>{day}</span>
        <span className={styles.lunar}>{lunar}</span>
        <Holiday year={getYear(date)} day={parseInt(day, 10)} month={month} index={index + 1} />
        {month === curMonth && index === currentDayIndex ? <div className={styles.today}>今</div> : ''}
      </div>
      {isCurrent ? <div className='border' /> : ''}
      <Task
        dayProps={{
          daysInMonth,
          colors,
          isCurrentMonth: isCurrent,
          dayIndex: index,
          showNum: number,
          data: dayTask,
          taskId: selectedTask?.id,
          hoverTask
        }}
        onClick={handleTaskClick}
        onHover={handleHover}
        onMoreClick={handleMoreClick}
      />
      {
        isCurrent && allVisible && dayIndex === index ? (
          <List
            style={getAllListPositionStyle(isLastRow, index)}
            onItemClick={handleListTaskClick}
            colors={colors}
            day={day}
            activeIndex={activeIndex}
            lunar={lunar}
            data={dayTask}
          />
        ) : null
      }
      {
        taskId && operateVisible && dayIndex === index ? (
          <OperateModal
            key={selectedTask?.id}
            task={{ ...selectedTask, status, colors }}
            visible={operateVisible}
            positionStyle={getPositionStyle(allVisible, isLastRow, index)}
            onEdit={() => onEdit(taskId)}
            onCancel={handleCancel}
            onDelete={handleDelete}
          />
        ) : null
      }
    </div>
  )
};

export default Day;
