import React, { FC, useEffect, useState } from "react";
import { useTicket } from "../../context/TicketContext";
import styles from "./FlyCard.module.scss";
import { priceRu } from "../../utils/helpers";
import cn from "classnames";
import { CardLogo, MainContent } from "../Card";

interface FlyCardProps {}

export interface ITimeItem {
  id: number;
  from: string;
  to: string;
  active: boolean;
}

export const FlyCard: FC<FlyCardProps> = () => {
  const { ticket } = useTicket();
  const { dateTo } = ticket;

  const timeFrom = [
    { id: 1, from: "09:20", to: "11:05", active: false },
    { id: 2, from: "10:20", to: "12:05", active: false },
    { id: 3, from: "01:20", to: "13:05", active: false },
  ];

  const timeTo = [
    { id: 1, from: "11:05", to: "13:00", active: false },
    { id: 2, from: "12:05", to: "14:00", active: false },
  ];

  const [tabsFrom, setTabsFrom] = useState<ITimeItem[]>(timeFrom);
  const [tabsTo, setTabsTo] = useState<ITimeItem[]>(timeTo);
  const [currentTimeFrom, setCurrentTimeFrom] = useState({ from: "", to: "" });
  const [currentTimeTo, setCurrentTimeTo] = useState({ from: "", to: "" });

  const [isBoth, setIsBoth] = useState(false);

  useEffect(() => {
    if (dateTo) {
      setIsBoth(true);
    } else {
      setIsBoth(false);
    }

    const newTabsFrom = tabsFrom.map((el) => {
      if (el.id === 1) {
        setCurrentTimeFrom({ from: el.from, to: el.to });
        return {
          ...el,
          active: true,
        };
      }
      return el;
    });
    const newTabsTo = tabsTo.map((el) => {
      if (el.id === 1) {
        setCurrentTimeTo({ from: el.from, to: el.to });
        return {
          ...el,
          active: true,
        };
      }
      return el;
    });
    setTabsFrom(newTabsFrom);
    setTabsTo(newTabsTo);
  }, []);

  const handleClickFrom = (id: number) => {
    const newTabsFrom = tabsFrom.map((el) => {
      if (id === el.id) {
        setCurrentTimeFrom({ from: el.from, to: el.to });
        return {
          ...el,
          active: true,
        };
      } else {
        return {
          ...el,
          active: false,
        };
      }
      return el;
    });
    setTabsFrom(newTabsFrom);
  };

  const handleClickTo = (id: number) => {
    const newTabsTo = tabsTo.map((el) => {
      if (id === el.id) {
        setCurrentTimeTo({ from: el.from, to: el.to });
        return {
          ...el,
          active: true,
        };
      } else {
        return {
          ...el,
          active: false,
        };
      }
      return el;
    });
    setTabsTo(newTabsTo);
  };

  return (
    <div className={styles.cardWrap}>
      <div className={styles.card}>
        <CardLogo />
        <MainContent
          currentTime={currentTimeFrom}
          tabs={tabsFrom}
          handleClick={handleClickFrom}
        />
        <div className={styles.line}></div>
        {!isBoth && (
          <div className={cn(styles.price, styles.textCenter)}>
            {priceRu(4150)}
          </div>
        )}
      </div>
      {isBoth && (
        <div
          className={cn(styles.card, {
            [styles.lineTop]: isBoth,
          })}
        >
          <CardLogo />
          <MainContent
            currentTime={currentTimeTo}
            tabs={tabsTo}
            handleClick={handleClickTo}
            isReverse
          />
          <div className={styles.line}></div>
          <div className={cn(styles.price, styles.textCenter, styles.vertical)}>
            {priceRu(8000)}
          </div>
        </div>
      )}
    </div>
  );
};
