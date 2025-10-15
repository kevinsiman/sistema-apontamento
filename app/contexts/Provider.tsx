"use client";
import { createContext, ReactNode, useState } from "react";

interface ProviderProps {
  children: ReactNode;
  initialData: string;
}

type ContextProviderProps = {
  operadores: string;
};

export const ContextProvider = createContext({} as ContextProviderProps);

export const Provider = ({ children, initialData }: ProviderProps) => {
  const [operadores, setOperadores] = useState<string>(initialData);
  return (
    <ContextProvider.Provider value={{ operadores }}>
      {children}
    </ContextProvider.Provider>
  );
};
