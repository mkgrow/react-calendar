import React, { Fragment, useState } from 'react';
import moment from 'moment';
import Day from './components/Day';
import Header from './components/Header';
import { dateToDay, formatCalendarData, getCalendar, getMonth, getYear } from './utils/util';
import { calendar } from './utils/calendar';

import styles from './Calendar.less';

const Calendar = ({ date, tasks = [], handleChangeState, handleDelete, handleEdit }) => {
  const [selectedTask, setSelectedTask] = useState({});
  const [hoverTask, setHoverTask] = useState({});
  const days = getCalendar(date);

  const onClick = (task) => {
    setSelectedTask(task);
  };

  const onHover = (task) => {
    setHoverTask(task)
  };

  const currentMonth = getMonth(date);
  const months = { 当月: currentMonth, 上月: currentMonth - 1, 下月: currentMonth + 1 };
  const year = getYear(date);

  const monthTasks = formatCalendarData(date, months, tasks);
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
                onDelete={handleDelete}
                onEdit={handleEdit}
                onClick={onClick}
                onHover={onHover}
                onChangeState={handleChangeState}
              />
            );
          })
        }
      </div>
    </Fragment>
  );
};

export default Calendar;
