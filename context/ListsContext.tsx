import React, { createContext, useContext, useState } from "react"

interface ListsContextProps {
  isReadingList: boolean
  setIsReadingList: React.Dispatch<React.SetStateAction<boolean>>
}

const ListsContext = createContext<ListsContextProps | undefined>(undefined)

export const ListsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isReadingList, setIsReadingList] = useState(true)

  return (
    <ListsContext.Provider value={{ isReadingList, setIsReadingList }}>
      {children}
    </ListsContext.Provider>
  )
}

export const useListContext = () => {
  const context = useContext(ListsContext)
  if (!context) {
    throw new Error("useListsContext must be used within a ReadingListProvider")
  }
  return context
}
