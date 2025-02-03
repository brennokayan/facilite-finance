export type User = {
  id: string;
  nome: string;
  estaAdmin: boolean;
  estaAtivo: boolean;
  Gastos: [];
  Lucros: [];
};

export type UserContextType  = {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
  };


  