import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext<any>(null);

export const ThemeContextProvider = ({ children }: { children: any }) => {
  // Retrieve theme from localStorage or default to "light"
  const [Theme, setTheme] = useState<string>(
    localStorage.getItem("theme") || "light"
  );

  function Change_Theme(): void {
    setTheme((current_theme) => (current_theme === "light" ? "dark" : "light"));
  }

  useEffect(() => {
    // Save theme to localStorage
    localStorage.setItem("theme", Theme);

    // Apply theme to body background
    document.body.style.backgroundColor = Theme === "light" ? "#e9ecef" : "#212529";
  }, [Theme]);

  return (
    <ThemeContext.Provider value={{ Theme, setTheme, Change_Theme }}>
      {children}
    </ThemeContext.Provider>
  );
};
