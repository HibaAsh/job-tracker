import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark" || savedTheme === "light") {
      return savedTheme;
    }

    return "dark";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const colors = {
    light: {
      background: "#f5f5f5",
      surface: "#ffffff",
      text: "#333333",
      textSecondary: "#666666",
      border: "#dddddd",
      cardShadow: "rgba(0,0,0,0.1)",
      primary: "#2196f3",
      primaryRgb: '33, 150, 243',
      primaryLight: "#e3f2fd",
    },
    dark: {
      background: "#121212",
      surface: "#1e1e1e",
      text: "#ffffff",
      textSecondary: "#aaaaaa",
      border: "#333333",
      cardShadow: "rgba(0,0,0,0.3)",
      primary: "#64b5f6",
      primaryRgb: '100, 181, 246',
      primaryLight: "#1e3a5f",
    },
  };

  const value = {
    theme,
    toggleTheme,
    isDark: theme === "dark",
    colors: colors[theme],
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}
