import { useState } from "react";
import { StateContext } from "./useStateContext"; // Import from the new file

export const ContextProvider = ({ children }) => {
  const [activeSideBarNav, setActiveSideBarNav] = useState(false);
  const [activeCartSideBar, setActiveCartSideBar] = useState(false);
  const [activeFilterSideBar, setActiveFilterSideBar] = useState(false);

  return (
    <StateContext.Provider
      value={{
        activeSideBarNav,
        setActiveSideBarNav,
        activeCartSideBar,
        setActiveCartSideBar,
        activeFilterSideBar,
        setActiveFilterSideBar,
      }}>
      {children}
    </StateContext.Provider>
  );
};


