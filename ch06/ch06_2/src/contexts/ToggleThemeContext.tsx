import React, {createContext, useContext} from 'react';
import type {FC} from 'react';

export type ToggleThemeContextType = {
  toggleTheme: () => void;
};

const defualtToggleThemeContext = {
  toggleTheme: () => {},
};
const ToggleThemeContext = createContext<ToggleThemeContextType>(
  defualtToggleThemeContext,
);
type ToggleThemeContextProps = {
  toggleTheme: () => void;
};
export const ToggleThemeProvider: FC<ToggleThemeContextProps> = ({
  children,
  toggleTheme,
}) => {
  const value = {
    toggleTheme,
  };
  return (
    <ToggleThemeContext.Provider value={value}>
      {children}
    </ToggleThemeContext.Provider>
  );
};
export const useToggleTheme = () => {
  const {toggleTheme} = useContext(ToggleThemeContext);
  return toggleTheme;
};
