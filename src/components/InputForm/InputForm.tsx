import React, { FC, useEffect, useRef, useState } from "react";
import { Form, Input, DatePicker, Select, Row, Button, InputRef } from "antd";
import { rules } from "../../utils/rules";
import { Moment } from "moment";
import { formatDate } from "../../utils/date";
import cn from "classnames";
import { useNavigate } from "react-router-dom";

import styles from "./InputForm.module.scss";
import { useTicket } from "../../context/TicketContext";
import { Loader } from "../Loader/Loader";

export const InputForm: FC = () => {
  const navigate = useNavigate();
  const inputRef = useRef<InputRef>(null);
  const { ticket, setTicket } = useTicket();

  useEffect(() => {
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
  }, []);

  const [date, setDate] = useState<Moment | undefined>();

  const [btnDisabled, setBtnDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const selectDateFrom = (date: Moment | null) => {
    if (date) {
      setTicket({ ...ticket, dateFrom: formatDate(date.toDate()) });
      setDate(date);
    }
  };

  const selectDateTo = (date: Moment | null) => {
    if (date) {
      setTicket({ ...ticket, dateTo: formatDate(date.toDate()) });
    }
  };

  const submitForm = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate("/avia/info");
      setIsLoading(false);
    }, 1500);
  };

  const onValuesChange = (changedValues: any, allValues: any) => {
    if (
      allValues.from != undefined &&
      allValues.to != undefined &&
      allValues.dateFrom != undefined &&
      allValues.from != "" &&
      allValues.to != "" &&
      allValues.dateFrom != ""
    ) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Form
      initialValues={{ remember: true }}
      onValuesChange={onValuesChange}
      onFinish={submitForm}
      className={styles.form}
    >
      <Row justify={"center"} className={styles.formTop}>
        <Row
          justify={"space-between"}
          align={"middle"}
          className={styles.label}
        >
          <Row className={styles.wrap}>
            <div className={styles.itemLabel}>Откуда</div>
            <Form.Item name="from">
              <Input
                ref={inputRef}
                className={styles.item}
                value={ticket.cityFrom}
                placeholder={"Город вылета"}
                onChange={(e) =>
                  setTicket({ ...ticket, cityFrom: e.target.value })
                }
              />
            </Form.Item>
          </Row>

          <Row className={styles.wrap}>
            <div className={styles.itemLabel}>Куда</div>
            <Form.Item name="to" rules={[rules.textValidate()]}>
              <Input
                className={styles.item}
                value={ticket.cityTo}
                placeholder={"Город прилета"}
                onChange={(e) =>
                  setTicket({ ...ticket, cityTo: e.target.value })
                }
              />
            </Form.Item>
          </Row>
          <Row className={styles.wrap}>
            <div className={styles.itemLabel}>Туда</div>
            <Form.Item
              name="dateFrom"
              rules={[rules.isDateAfter("Нельзя выбрать дату в прошлом")]}
            >
              <DatePicker
                className={styles.item}
                placeholder="дд.мм.гг"
                onChange={(date) => selectDateFrom(date)}
              />
            </Form.Item>
          </Row>
          <Row className={styles.wrap}>
            <div className={styles.itemLabel}>Обратно</div>
            <Form.Item
              name="dateTo"
              rules={[rules.isDateAfterValue("Неккоректная дата", date)]}
            >
              <DatePicker
                placeholder="дд.мм.гг"
                className={cn(styles.item, styles.last)}
                onChange={(date) => selectDateTo(date)}
              />
            </Form.Item>
          </Row>
        </Row>
      </Row>
      <Row className={styles.formBottom}>
        <Row className={styles.button} align={"middle"} justify={"center"}>
          <Form.Item>
            <Button
              className={styles.btn}
              disabled={btnDisabled}
              htmlType={"submit"}
              type={"primary"}
              size={"large"}
            >
              Найти билеты
            </Button>
          </Form.Item>
        </Row>
      </Row>
    </Form>
  );
};
