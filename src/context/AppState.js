import AppContext from "./AppContext";
import { useState } from "react";

const AppState = (props) => {
  const [cart, setCart] = useState([]); // This state will be used to trigger a refresh
  const [mainstatus, setMainStatus] = useState(false);

  const value = {
    cart,
    setCart,
    mainstatus,
    setMainStatus,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppState;
