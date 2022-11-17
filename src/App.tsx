import React from "react";
import "./App.scss";
import { Layout } from "antd";
import { AppRouter } from "./components";
import { TicketContextProvider } from "./context/TicketContext";

function App() {
  return (
    <TicketContextProvider>
      <Layout className={"app"}>
        <Layout.Content>
          <AppRouter />
        </Layout.Content>
      </Layout>
    </TicketContextProvider>
  );
}

export default App;
