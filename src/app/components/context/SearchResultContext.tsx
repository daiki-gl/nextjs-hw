'use client';
import { SearchResultContextType, UserData } from '@/app/common/types';
import { createContext, useContext, useState } from 'react';



const SearchResultContext = createContext<SearchResultContextType | null>(null);

export const SearchResultProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchResult, setSearchResult] = useState<UserData[]>([]);

  return (
    <SearchResultContext.Provider value={{ searchResult, setSearchResult }}>
      {children}
    </SearchResultContext.Provider>
  );
};

export const useSearchResultContext = () => {
  const context = useContext(SearchResultContext);
  if (!context) throw new Error('useShowDataContext must be used within ShowDataProvider');
  return context;
};