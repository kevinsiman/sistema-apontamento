"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../libs/react-query";
import { ReactNode } from "react";

interface ProviderProps {
  children: ReactNode;
}

export const ProviderQuery = ({ children }: ProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
