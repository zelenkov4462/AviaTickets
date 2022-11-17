import React, { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";
import cn from "classnames";
import styles from "./Button.module.scss";

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactNode;
  appearance: "primary" | "ghost";
}

export const Button: FC<ButtonProps> = ({
  children,
  appearance,
  className,
  ...props
}): JSX.Element => {
  return (
    <button
      className={cn(styles.button, className, {
        [styles.primary]: appearance === "primary",
        [styles.ghost]: appearance === "ghost",
      })}
    >
      {children}
    </button>
  );
};
