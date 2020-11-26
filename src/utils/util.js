import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

export const colors = [
  { color: '#AC3D5C', bgColor: '#FFB3C8' },
  { color: '#C58824', bgColor: '#FFEDD0' },
  { color: '#64A61C', bgColor: '#EAFED6' },
  { color: '#BB47B0', bgColor: '#FCD9F9' },
  { color: '#BB47B0', bgColor: '#FCD9F9' },
];

export function dateToDay(date) {
  return date ? moment(date).format('D') : '';
}

export function getMonth(date) {
  return date ? moment(date).get('month') + 1 : moment().get('month') + 1
}

export function getYear(date) {
  return date ? moment(date).get('year') : moment().get('year')
}

export function formatDate(date, format = 'YYYY-MM-DD') {
  return date ? moment(date).format(format) : '';
}

export const formatToDate = (date, type = 'YYYY-MM-DD') => {
  return date ? moment(date).format(type) : undefined;
};

export function formatDateTime(date) {
  return date ? moment(date).format('YYYY-MM-DD HH:mm:ss') : '';
}

export function formatToMonth(date) {
  return date ? moment(date).format('YYYY-MM') : '';
}

export function formatToTime(date) {
  return date ? moment(date).format('HH:mm') : '';
}

export function dayInWeek(date) {
  return date ? moment(date).format('E') : '';
}

export function dayInMonth(date) {
  return date ? moment(date).daysInMonth() : '';
}

export function getMothType(createdAt, date) {
  const monthNum = getMonth(createdAt);
  const currentMonthNum = getMonth(date);
  if (monthNum < currentMonthNum) return '上月';
  if (monthNum > currentMonthNum) return '下月';
  return '当月';
};

export function getProgressValue({ startAt, endAt }, decimalPlaces = 2) {
  const activityDays = moment(endAt).diff(moment(startAt), 'day', true) || 0;
  const currentDays = moment().diff(moment(startAt), 'day', true) || 0;
  return currentDays > 0 && activityDays > 0 ? ((currentDays / activityDays) * 100).toFixed(decimalPlaces) : 0;
}

export function formatCalendarData(date, source = []) {
  const days = getCalendar(date);

  const data = source.map(({ createdAt, startAt, endAt, ...rest }) => {
    const start = dateToDay(startAt);
    const end = dateToDay(endAt);
    const startIndex = days.findIndex(it => it.day === parseInt(start, 10) && it.month === getMothType(startAt, date));
    const endIndex = days.findIndex(it => it.day === parseInt(end, 10) && it.month === getMothType(endAt, date));
    return { ...rest, start: startIndex, end: endIndex, startAt, endAt }
  });
  return data || []
}

export function formatWeekCalendarData(date, source) {
  const days = getWeekCalendar(date);
  const data = source.map(({ createdAt, startAt, endAt, ...rest }) => {
    const start = dayInWeek(startAt);
    const end = dayInWeek(endAt);
    const startIndex = days.findIndex(it => it.day === parseInt(start, 10));
    const endIndex = days.findIndex(it => it.day === parseInt(end, 10));
    return { ...rest, start: startIndex, end: endIndex }
  });
  return data || []
}

export function formatData(source) {
  const data = Object.keys(source).map(key => {
    const itemData = source[key] || [];
    const children = itemData.map(({ startAt, endAt, ...rest }) => {
      return { ...rest, start: dayInWeek(startAt), end: dayInWeek(endAt) }
    });
    return { key, list: children }
  });
  return data || []
}

export function getCalendar(date) {
  const defaultDate = date ? moment(date) : moment();
  const currentWeekday = moment(defaultDate).date(1).weekday();
  const lastMonthDays = moment(defaultDate).subtract(1, 'month').daysInMonth();
  const currentMonthDays = moment(defaultDate).daysInMonth(); // 获取当月天数
  const isWeekend = (currentMonthDays === 31 && currentWeekday === 5 || currentWeekday === 6) || (currentMonthDays === 30 && currentWeekday === 6);
  const daysArr = isWeekend ? [[], [], [], [], [], []] : [[], [], [], [], []];
  const days = [];

  const getDay = (day) => {
    if (day <= lastMonthDays) return day;
    return day <= (lastMonthDays + currentMonthDays) ? day - lastMonthDays : day - (lastMonthDays + currentMonthDays)
  };

  const getMonthText = (mon) => {
    if (mon <= lastMonthDays) return '上月';
    return mon <= (lastMonthDays + currentMonthDays) ? '当月' : '下月';
  };

  for (let i = 0; i < 7; i += 1) {
    const virtualDay = (lastMonthDays - currentWeekday) + i + 1;
    daysArr.forEach((_, row) => {
      daysArr[row][i] = { day: getDay(virtualDay + (row * 7)), month: getMonthText(virtualDay + (row * 7)), row: row + 1 };
    })
  }

  daysArr.forEach(d => d.forEach(i => days.push(i)));

  return days;
}

export function getWeekCalendar(date) {
  const defaultDate = date ? moment(date) : moment();
  const weekOfDay = moment(defaultDate).format('E');
  const week = [];

  for (let i = 6; i >= 0; i -= 1) {
    const curDate = moment(date).add(7 - weekOfDay - i, 'days');
    week.push({ date: curDate, day: parseInt(curDate.format('E'), 10) })
  }

  return week;
}

