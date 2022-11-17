import React, { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";
import styles from "./Tab.module.scss";
import cn from "classnames";

interface ITabProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactNode;
  active?: boolean;
}

export const Tab: FC<ITabProps> = ({ children, active, ...props }) => {
  return (
    <button
      className={cn(styles.tab, {
        [styles.tabActive]: active,
      })}
      {...props}
    >
      <div className={styles.timeTo}>{children}</div>
    </button>
  );
};
