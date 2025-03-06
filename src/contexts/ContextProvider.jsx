import { useState } from "react";
import { StateContext } from "./useStateContext"; // Import from the new file

export const ContextProvider = ({ children }) => {
  const [activeSideBarNav, setActiveSideBarNav] = useState(false);

  return (
    <StateContext.Provider
      value={{
        activeSideBarNav,
        setActiveSideBarNav,
      }}>
      {children}
    </StateContext.Provider>
  );
};
