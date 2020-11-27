import React, { useState } from "react";
import { Button, Progress } from "antd";
import deleteIcon from "../../assets/images/icon_delete.svg";
import deleteActiveIcon from "../../assets/images/icon_delete_active.svg";
import styles from "./index.less";
import {DateFormat} from "../../DateFormat";
import {formatToDate, getProgressValue} from "../../utils/util";

const Header = ({ onDelete, color, isActive, isProcess, showDeleteBtn }) => {
  const icon = isActive && isProcess ? deleteIcon : deleteActiveIcon;

  const handleClick = () => {
    if (!(isActive && isProcess)) {
      onDelete()
    }
  };

  return (
    <div className={styles.modalTitle}>
      <div className={styles.circle} style={{ backgroundColor: color }} />
      <div className={styles.title} style={{ color }}>当前任务</div>
      {showDeleteBtn && <img className={`${styles.icon} ${isActive && isProcess ? styles.disabled : ''}`} src={icon} onClick={handleClick} alt="" />}
    </div>
  )
};

const OperateModal = ({ visible, positionStyle, onEdit, onCancel, onDelete, task: selectedTask, showDeleteBtn, showEditBtn, showCancelBtn }) => {
  const [task, setTask] = useState(selectedTask);
  const { title, isActive, startAt, endAt, colors, status, type } = task || {};
  const { borderColor } = colors[status] || {};
  const progress = getProgressValue(task);

  const handleCancel = () => {
    setTask({ ...task, isActive: !isActive });
    onCancel({ ...task, isActive: !isActive });
  };

  if (visible) {
    return (
      <div className={styles.maskContent} style={positionStyle} onClick={e => e.stopPropagation()}>
        <div className={styles.operateContent}>
          <Header isProcess={status && status === 'processing'} showDeleteBtn={showDeleteBtn} isActive={isActive} color={borderColor} onDelete={() => onDelete(task)} />
          <div>{title}</div>
          <div className={styles.item}>活动时间: {`${formatToDate(startAt, DateFormat.dotDate)} - ${formatToDate(endAt, DateFormat.dotDate)}`}</div>
          <div className={styles.progress}>活动进度: <Progress strokeColor='#1890FF' strokeLinecap='square' percent={progress} size="small" /></div>
          <div className={styles.footer}>
            {showCancelBtn && <Button type={isActive ? 'danger' : 'primary'} size='small' onClick={handleCancel}>{isActive ? '活动停用' : '活动启用'}</Button>}
            {showEditBtn && <Button type="primary" size='small' className={styles.edit} onClick={onEdit}>编辑</Button>}
          </div>
        </div>
      </div>
    )
  }

  return null;
};

export default OperateModal;
