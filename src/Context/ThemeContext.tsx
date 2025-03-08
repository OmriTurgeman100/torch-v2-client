import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext<any>(null);

export const ThemeContextProvider = ({ children }: { children: any }) => {
  const [Theme, setTheme] = useState<string | null>("light");

  useEffect(() => {
    if (Theme === "light") {
      document.body.style.backgroundColor = "#e9ecef"; // light theme color
    } else if (Theme === "dark") {
      document.body.style.backgroundColor = "#121212"; // dark theme color
    }
  }, [Theme]);

  return (
    <ThemeContext.Provider value={{ Theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
