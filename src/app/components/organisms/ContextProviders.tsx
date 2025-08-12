import { IsFormErrContextProvider } from '@/app/components/context/IsFormErrContext'
import { SearchResultProvider } from '@/app/components/context/SearchResultContext'
import { ShowDataProvider } from '@/app/components/context/ShowDataContext'
import { TypeContextProvider } from '@/app/components/context/TypeContext'
import React from 'react'

const ContextProviders = ({children}: Readonly<{children: React.ReactNode;}>)  => {
  return (
    <>
        <IsFormErrContextProvider>
        <SearchResultProvider>
        <TypeContextProvider>
            <ShowDataProvider>
            {children}
            </ShowDataProvider>
        </TypeContextProvider>
        </SearchResultProvider>
        </IsFormErrContextProvider>
    </>
  )
}

export default ContextProviders