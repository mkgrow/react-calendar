import moment from "moment";

const dotFormat = 'YYYY.MM.DD';

export const DateFormat = Object.freeze({
  date: 'YYYY-MM-DD',
  dotDate: 'YYYY.MM.DD',
  time: 'HH:mm:ss',
  dateTime: 'YYYY-MM-DD HH:mm:ss',
  dateTimeNotSeconds: 'YYYY-MM-DD HH:mm',
  dateRange: (start, end) => {
    return start && end ? `${moment(start).format(dotFormat)} - ${moment(end).format(dotFormat)}` : null
  },
  dayDiff: (start, end) => {
    return start && end ? `${moment(end).diff(moment(start), 'day') + 1}天` : null
  }
});
