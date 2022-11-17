import React, { createContext, FC, useContext, useState } from "react";

export interface ITicket {
  cityFrom: string;
  cityTo: string;
  dateFrom: string;
  dateTo: string;
}
interface ITicketContext {
  ticket: ITicket;
  setTicket: (a: ITicket) => void;
}

export const TicketContext = createContext<ITicketContext>({
  ticket: { dateTo: "", dateFrom: "", cityFrom: "", cityTo: "" },
  setTicket: () => {},
});

export const useTicket = () => {
  return useContext(TicketContext);
};

interface IProps {
  children: React.ReactNode;
}

export const TicketContextProvider: FC<IProps> = ({ children }) => {
  const [ticket, setTicket] = useState<ITicket>({
    cityFrom: "",
    cityTo: "",
    dateFrom: "",
    dateTo: "",
  });
  return (
    <TicketContext.Provider
      value={{
        ticket,
        setTicket,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};
