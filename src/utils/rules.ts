import { message } from "antd";
import moment, { Moment } from "moment";

export const rules = {
  required: (message: string = "Обязательное поле") => ({
    required: true,
    message,
  }),

  textValidate: () => () => ({
    validator(_: any, value: string) {
      if (!value) {
        return Promise.reject("Обязательное поле");
      } else {
        if (!value.replace(/[A-Za-z]/, "")) {
          return Promise.reject("Ошибка валидации");
        } else {
          return Promise.resolve();
        }
      }
    },
  }),

  isDateAfter: (message: string) => () => ({
    validator(_: any, value: Moment) {
      if (!value) {
        return Promise.reject("Обязательное поле");
      }
      if (value) {
        if (value.isSameOrAfter(moment())) {
          return Promise.resolve();
        }
        return Promise.reject(new Error(message));
      }
    },
  }),

  isDateAfterValue: (message: string, date: Moment | undefined) => () => ({
    validator(_: any, value: Moment) {
      if (date && value) {
        if (value.isSameOrAfter(date)) {
          return Promise.resolve();
        }
        return Promise.reject(new Error(message));
      } else {
        return Promise.resolve();
      }
    },
  }),
};
