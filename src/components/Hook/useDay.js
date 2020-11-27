import {useEffect, useState} from "react";
import moment from "moment";
import { formatDate, getMonth } from "../../utils/util";
import { DateFormat } from "../../DateFormat";

const curMonth = getMonth();
const currentDay = moment().format(DateFormat.date);

const colors = {
  notStart: { bgColor: '#DEFAF4', activeColor: '#5CF1E0', borderColor: '#5CF1E0' },
  expired: { bgColor: '#E1E1E1', activeColor: '#A8A7A7', borderColor: '#C4C4C4' },
  processing: { bgColor: '#DEEAFA', activeColor: '#95BDEF', borderColor: '#5C9EF0' },
  stopped: { bgColor: '#F4737580', activeColor: '#F47375', borderColor: '#F47375' },
};

const getPositionStyle = (allVisible, isLastRow, index) => {
  if (isLastRow) {
    if (index % 7 < 4) {
      return allVisible ? { left: '220px', top: '-30%' } : { left: '100%', top: '-30%' }
    }
    return allVisible && (index + 1) % 7 === 0 ? { right: '220px', top: '-30%' } : { right: '100%', top: '-30%' }
  }

  if (index % 7 < 4) {
    return allVisible ? { left: '220px' } : { left: '100%' };
  }

  return allVisible && (index + 1) % 7 === 0 ? { right: '240px' } : { right: '100%' }
};


const getAllListPositionStyle = (isLastRow, index) => {
  if (isLastRow) {
    return (index + 1) % 7 === 0 ? { top: 'auto', right: 'calc(100% / 7 - 20px)', bottom: 0 } : { top: 'auto', bottom: 0 }
  }

  return (index + 1) % 7 === 0 ? { right: 'calc(100% / 7 - 20px)' } : {};
};

const getTaskStatus = (isActive, start, end) => {
  if (moment(formatDate(end)).isBefore(currentDay)) {
    return 'expired'
  }

  if (moment(formatDate(start)).isAfter(currentDay)) {
    return 'notStart'
  }

  return isActive ? 'processing' : 'stopped'
};

const sortTasks = (tasks) => {
  return tasks.sort((cur, next) => {
    const curDiff = moment(cur?.endAt).valueOf() - moment(cur?.startAt).valueOf();
    const nextDiff = moment(next?.endAt).valueOf() - moment(next?.startAt).valueOf();

    return nextDiff - curDiff
  })
};

const useDay = ({ tasks, date, month, daysNumber, index }) => {
  const [operateVisible, setOperateVisible] = useState(false);
  const [allVisible, setAllVisible] = useState(false);

  useEffect(() => {
    setOperateVisible(false);
  }, [date]);

  const selectedMonth = getMonth(date);
  const isCurrent = month === selectedMonth;
  const daysInMonth = moment(date).daysInMonth();
  const dayTask = tasks.filter(it => index >= it.start && (it.end === -1 ? daysNumber : index <= it.end)).map(it => ({ ...it, status: getTaskStatus(it?.isActive, it?.startAt, it?.endAt) }));

  const props = { dayTask: sortTasks(dayTask), allVisible, operateVisible, colors, curMonth, isCurrent, daysInMonth };
  const methods = { setAllVisible, setOperateVisible, getTaskStatus, getAllListPositionStyle, getPositionStyle };

  return [props, methods]
};

export default useDay;
