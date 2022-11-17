import React, { FC, useState } from "react";
import styles from "./MainContent.module.scss";
import { Tab } from "../../Tab/Tab";
import { useTicket } from "../../../context/TicketContext";
import { ITimeItem } from "../../FlyCard/FlyCard";

interface MainContentProps {
  currentTime: { from: string; to: string };
  tabs: ITimeItem[];
  handleClick: (id: number) => void;
  isReverse?: boolean;
}

export const MainContent: FC<MainContentProps> = ({
  handleClick,
  tabs,
  currentTime,
  isReverse = false,
}) => {
  const { ticket } = useTicket();
  const { cityTo, cityFrom, dateFrom, dateTo } = ticket;
  return (
    <div className={styles.mainContent}>
      <div>
        <div className={styles.timeTop}>
          <div>
            <div className={styles.time}>{currentTime.from}</div>
            <div className={styles.date}>
              {!isReverse ? (
                <>
                  <span>{cityFrom}</span>
                  {dateFrom}
                </>
              ) : (
                <>
                  <span>{cityTo}</span> {dateTo}
                </>
              )}
            </div>
          </div>
          <img
            src="/time.svg"
            alt="fly"
            width={350}
            height={60}
            className={styles.fly}
          />
          <div>
            <div className={styles.time}>{currentTime.to}</div>
            <div className={styles.date}>
              {!isReverse ? (
                <>
                  <span>{cityTo}</span> {dateFrom}
                </>
              ) : (
                <>
                  <span>{cityFrom}</span> {dateTo}
                </>
              )}
            </div>
          </div>
        </div>
        <div className={styles.timeBottom}>
          {tabs.map((el) => (
            <Tab
              active={el.active}
              key={el.id}
              onClick={() => handleClick(el.id)}
            >
              {<span className={styles.timeFrom}>{el.from}</span>} - {el.to}
            </Tab>
          ))}
        </div>
      </div>
      <div className={styles.bags}>
        <img src="/bags.svg" alt="bags" />
      </div>
    </div>
  );
};
