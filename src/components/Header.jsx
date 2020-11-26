import React from "react";
import styles from "../Calendar.less";

const Header = () => {
  const weekday = ['一', '二', '三', '四', '五', '六', '日'];
  return (
    <div className={styles.header}>
      {weekday.map(week => <div key={week} className={styles.item}>{week}</div>)}
    </div>
  )
};

export default Header;
