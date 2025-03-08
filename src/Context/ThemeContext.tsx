import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext<any>(null);

export const ThemeContextProvider = ({ children }: { children: any }) => {
  const [Theme, setTheme] = useState<string | null>("light");

  return (
    <ThemeContext.Provider value={{ Theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
