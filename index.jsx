import React, { Fragment, useState } from 'react';
import moment from 'moment';
import Header from './src/components/Header';
import Day from './src/components/Day';
import { dateToDay, formatCalendarData, getCalendar, getMonth, getYear } from './src/utils/util';
import { calendar } from './src/utils/calendar';

import styles from './index.less';

const Index = ({ date, tasks = [], handleChangeState, handleDelete, handleEdit }) => {
  const [selectedTask, setSelectedTask] = useState({});
  const [hoverTask, setHoverTask] = useState({});
  const days = getCalendar(date);

  const onDelete = (task) => {
    const { id } = task ?? {};
    console.log('删除', id);
    handleDelete?.(task)
  };

  const onChangeActivityActive = (item) => {
    console.log('修改任务状态', item);
    handleChangeState?.(item)
  };

  const onClick = (task) => {
    setSelectedTask(task);
  };

  const onHover = (task) => {
    setHoverTask(task)
  };

  const currentMonth = getMonth(date);
  const months = { 当月: currentMonth, 上月: currentMonth - 1, 下月: currentMonth + 1 };
  const year = getYear(date);

  const taskList = formatCalendarData(date, tasks);
  const monthTasks = taskList.filter(({ start, end }) => start !== -1 || end !== -1);
  const currentDay = parseInt(dateToDay(moment()), 10);
  const currentDayIndex = days.findIndex(({ day, month }) => day === currentDay && getMonth() === months[month]);

  return (
    <Fragment>
      <Header />
      <div className={styles.days}>
        {
          days.map(({ day, month, row }, index) => {
            const { IDayCn } = calendar.solar2lunar(year, months[month], day);
            return (
              <Day
                key={`${month}-${day}`}
                index={index}
                selectedTask={selectedTask}
                hoverTask={hoverTask}
                date={date}
                number={3}
                tasks={monthTasks.map(task => ({ ...task, row }))}
                month={months[month]}
                day={day}
                lunar={IDayCn}
                daysNumber={days.length}
                currentDayIndex={currentDayIndex}
                onDelete={onDelete}
                onEdit={handleEdit}
                onClick={onClick}
                onHover={onHover}
                onCancel={onChangeActivityActive}
              />
            );
          })
        }
      </div>
    </Fragment>
  );
};

export default Index;
