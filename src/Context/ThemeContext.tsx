import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext<any>(null);

export const ThemeContextProvider = ({ children }: { children: any }) => {
  const [Theme, setTheme] = useState<string | null>("light");

  useEffect(() => {
    if (Theme === "light") {
      document.body.style.backgroundColor = "#e9ecef";
    } else if (Theme === "dark") {
      document.body.style.backgroundColor = "#212529";
    }
  }, [Theme]);

  return (
    <ThemeContext.Provider value={{ Theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
