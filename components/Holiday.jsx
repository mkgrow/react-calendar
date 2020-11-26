import React from "react";
import config from "../utils/holidayConfig";
import styles from "../Calendar.less";

const Holiday = ({ year, day, month, index }) => {
  const holiday = config[year] || [];
  const { connect, type, date: holidayDate } = holiday.find(({ month: m, date }) => m === month && date === day) || {};
  const isCurrent = month === '当月';
  const className = `${styles.holiday} ${isCurrent ? '' : styles.disable}`;

  if (holidayDate) {
    if (type === 'holiday') {
      return <div className={className}>{`休  ${connect}`}</div>
    }

    return <div className={className}>{connect}</div>
  }

  return ((index + 1) % 7 === 0 || index % 7 === 0) && <div className={className}>休</div>
};

export default Holiday;
