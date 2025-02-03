import { createContext, useState } from "react";
import { User, UserContextType } from "../types/userContextType";

const UserContext = createContext<UserContextType | undefined>(undefined);

// Crie um provider para envolver a aplicação
const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };