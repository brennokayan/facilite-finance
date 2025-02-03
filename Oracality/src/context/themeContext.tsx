import React, { createContext, useContext, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { LightTheme } from "../theme/temaClaro";
import { DarkTheme } from "../theme/temaEscuro";

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProviderWrapper");
  }
  return context;
};

export const ThemeProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // Verifica no localStorage se existe um tema salvo
    const savedTheme = localStorage.getItem("isDarkMode");
    return savedTheme === "true"; // Retorna true se estiver salvo como "true"
  });

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newTheme = !prev;
      localStorage.setItem("isDarkMode", String(newTheme)); // Salva no localStorage
      return newTheme;
    });
  };

  const theme = isDarkMode ? DarkTheme : LightTheme;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
