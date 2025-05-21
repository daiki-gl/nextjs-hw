'use client';
import { createContext, useContext, useState } from 'react';
import { IsFormErrContextType } from '../common/types';


const IsFormErrContext = createContext<IsFormErrContextType | null>(null);

export const IsFormErrContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isFormErr, setIsFormErr] = useState<boolean>(true);

  return (
    <IsFormErrContext.Provider value={{ isFormErr, setIsFormErr }}>
      {children}
    </IsFormErrContext.Provider>
  );
};

export const useIsFormErrContext = () => {
  const context = useContext(IsFormErrContext);
  if (!context) throw new Error('useShowDataContext must be used within ShowDataProvider');
  return context;
};