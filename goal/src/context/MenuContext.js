import React, { createContext, useState } from 'react';

export const menu = {
  open: true,
};

export const MenuContext = createContext({});

const MenuProvider = ({ children }) => {
  const [menuState, setMenuState] = useState(menu);

  return (
    <MenuContext.Provider value={{ menu: menuState, setMenu: setMenuState }}>
      {children}
    </MenuContext.Provider>
  );
};

export default MenuProvider;
