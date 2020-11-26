import React, { useState } from "react";
import moment from "moment";

import styles from './index.less';

const DATE_FORMAT = 'YYYY年MM月';

const formatDate = (date) => {
  return date ? moment(date, DATE_FORMAT).format(DATE_FORMAT) : '';
};

const MonthSwitch = ({ onChange, defaultDate, className }) => {
  const [date, setDate] = useState(moment(defaultDate).format(DATE_FORMAT));

  const handlePre = () => {
    const preDate = formatDate(moment(date, DATE_FORMAT).subtract(1, 'month'));
    setDate(preDate);
    if (onChange) {
      onChange(moment(preDate, DATE_FORMAT));
    }
  };

  const handleNext = () => {
    const nextDate = formatDate(moment(date, DATE_FORMAT).add(1, 'month'));
    setDate(nextDate);
    if (onChange) {
      onChange(moment(nextDate, DATE_FORMAT));
    }
  };

  return (
    <div className={`${styles.switch} ${className}`}>
      <div className={`${styles.arrow} ${styles.left}`} onClick={handlePre} />
      <div className={styles.date}>{date}</div>
      <div className={`${styles.arrow} ${styles.right}`} onClick={handleNext} />
    </div>
  );
};

export default MonthSwitch;
