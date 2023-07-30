import React from 'react';
import classes from './CustomAlert.module.css';

const CustomAlert = ({ title, message, onConfirm }) => {
  const handleConfirm = () => {
    onConfirm && onConfirm();
  };

  return (
    <div className={classes.custom_alert_container}>
      <div className={classes.custom_alert}>
        <h3>{title}</h3>
        <p>{message}</p>
        <button onClick={handleConfirm}>OK</button>
      </div>
    </div>
  );
};

export default CustomAlert;
