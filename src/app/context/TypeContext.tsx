'use client';
import React, { createContext, useContext, useState } from 'react';
import { TypeContextType } from '../common/types';

const TypeContext = createContext<TypeContextType | null>(null);

export const TypeContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [type, setType] = useState<string | null>(null);

  return (
    <TypeContext.Provider value={{ type, setType }}>
      {children}
    </TypeContext.Provider>
  );
};

export const useTypeContext = () => {
  const context = useContext(TypeContext);
  if (!context) throw new Error('useTypeContext must be used within TypeProvider');
  return context;
};