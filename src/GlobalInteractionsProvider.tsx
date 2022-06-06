import React, { useContext } from "react";
import { IContentLikeStatus } from "./App";

const GlobalStateContext = React.createContext({
  state: {} as IContentLikeStatus,
  setState: {} as React.Dispatch<React.SetStateAction<IContentLikeStatus>>,
});

const GlobalInteractionsProvider = ({
  children,
  value = {} as IContentLikeStatus,
}: {
  children: React.ReactNode;
  value: IContentLikeStatus;
}) => {
  const [state, setState] = React.useState<IContentLikeStatus>(value);
  return (
    <GlobalStateContext.Provider value={{ state, setState }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateContext");
  }
  return context;
};

export { GlobalInteractionsProvider, useGlobalState };
