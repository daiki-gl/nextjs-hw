import { IsFormErrContextProvider } from '@/app/context/IsFormErrContext'
import { SearchResultProvider } from '@/app/context/SearchResultContext'
import { ShowDataProvider } from '@/app/context/ShowDataContext'
import { TypeContextProvider } from '@/app/context/TypeContext'
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