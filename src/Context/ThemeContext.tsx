import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext<any>(null);

export const ThemeContextProvider = ({ children }: { children: any }) => {
  const [Theme, setTheme] = useState<string>(
    localStorage.getItem("theme") || "light"
  );

  function Change_Theme(): void {
    setTheme((current_theme) => (current_theme === "light" ? "dark" : "light"));
  }

  useEffect(() => {
    localStorage.setItem("theme", Theme);

    document.body.style.backgroundColor =
      Theme === "light" ? "#e9ecef" : "#212529";
  }, [Theme]);

  return (
    <ThemeContext.Provider value={{ Theme, setTheme, Change_Theme }}>
      {children}
    </ThemeContext.Provider>
  );
};
