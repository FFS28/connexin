import React, { createContext, useState, ReactNode, Dispatch } from "react";
import { MainContext } from "../customTypes/context";

const initialize: MainContext = {
  user: {
    type: "guest",
    name: "",
    email: "",
    ref: "",
    service: "",
    role: "",
    level: 0,
  },
  alert: {
    open: true,
    type: "success",
    messages: "Welcome to Connexin!"
  },
  page: {
    curLayout: "welcomeLayout",
    curPage: "splash",
    curQuestionniare: 0,
    curQuestion: 0,
    curSubQuestion: 0,
    loadingData: true
  }
};

export const AppContext = createContext<{
  appState: MainContext;
  setAppState: Dispatch<any>;
}>({ appState: initialize, setAppState: () => null });

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [appState, setAppState] = useState<MainContext>(initialize);

  return (
    <AppContext.Provider value={{ appState, setAppState }}>
      {children}
    </AppContext.Provider>
  );
};
