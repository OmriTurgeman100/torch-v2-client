import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext<any>(null);

export const ThemeContextProvider = ({ children }: { children: any }) => {
  const [Theme, setTheme] = useState<string | null>("dark");

  useEffect(() => {
    if (Theme === "light") {
      document.body.style.backgroundColor = "#e9ecef"; // light theme color
    } else if (Theme === "dark") {
      document.body.style.backgroundColor = "#212529"; // dark theme color
    }
  }, [Theme]);

  return (
    <ThemeContext.Provider value={{ Theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
