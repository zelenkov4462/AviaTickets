import React from "react";
import { Button, InputForm } from "../../components";
import { Layout, Row } from "antd";
import styles from "./Avia.module.scss";

export const Avia = () => {
  return (
    <Row className={styles.wrapper}>
      <InputForm />
    </Row>
  );
};
