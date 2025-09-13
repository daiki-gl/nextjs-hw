'use client';
import { createContext, useContext, useState } from 'react';
import { ShowDataContextType, UserData } from '../../common/types';


const ShowDataContext = createContext<ShowDataContextType | null>(null);

export const ShowDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [showAddUserData, setShowAddUserData] = useState<UserData[]>([]);

  return (
    <ShowDataContext.Provider value={{ showAddUserData, setShowAddUserData }}>
      {children}
    </ShowDataContext.Provider>
  );
};

export const useShowDataContext = () => {
  const context = useContext(ShowDataContext);
  if (!context) throw new Error(' must be used within ShowDataProvider');
  return context;
};