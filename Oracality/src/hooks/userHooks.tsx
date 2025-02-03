import { useContext } from "react";
import { UserContextType } from "../types/userContextType";
import { UserContext } from "../context/userContext";

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
      throw new Error("useUser deve ser usado dentro de um UserProvider");
    }
    return context;
  };