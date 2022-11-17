import React from "react";
import styles from "./CardLogo.module.scss";

export const CardLogo = () => {
  return (
    <div className={styles.logoWrap}>
      <div className={styles.statusCard}>Невозвратный</div>
      <div className={styles.logo}>
        <img src="logo.svg" width={39} height={39} alt="logo" />
        <p className={styles.logoDes}>S7 Airlines</p>
      </div>
    </div>
  );
};
