import { filterAndSortBooks } from '@/lib/listUtils';
import { UserBook } from '@/lib/types/types';
import React, { createContext, useContext, useEffect, useState } from "react";
import { useBookData } from './BookDataContext';
import { useListContext } from './ListsContext';

interface SortAndFilterContextProps {
  searchTerm: string
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
  sortAscendent: boolean
  setSortAscendent: React.Dispatch<React.SetStateAction<boolean>>
  sortCriteria: string
  setSortCriteria: React.Dispatch<React.SetStateAction<string>>
  filters: { showStarted: boolean, showNoStarted: boolean }
  setFilters: React.Dispatch<React.SetStateAction<{ showStarted: boolean, showNoStarted: boolean }>>
  sortedBooks: Array<UserBook>
  mode: string
  setMode: React.Dispatch<React.SetStateAction<string>>
  changeMode: () => void
}

const SortAndFilterContext = createContext<SortAndFilterContextProps | undefined>(undefined);

export const SortAndFilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const { isReadingList } = useListContext()
  const { readedList, readingList } = useBookData()
  const books = isReadingList ? readingList : readedList
  const [searchTerm, setSearchTerm] = useState("")
  const [sortAscendent, setSortAscendent] = useState(true)
  const [sortCriteria, setSortCriteria] = useState("title")
  const [filters, setFilters] = useState({
    showStarted: true,
    showNoStarted: true
  })
  const sortedBooks = filterAndSortBooks(books, searchTerm, sortCriteria, sortAscendent, filters)
  const [mode, setMode] = useState("full")

  useEffect(() => {
    setSearchTerm("")
    if (sortCriteria === "startedDate") return
    setSortCriteria("title")
  }, [isReadingList])

  const changeMode = () => {
    if (mode === "full") {
      setMode("list")
    } else {
      setMode("full")
    }
  }

  return (
    <SortAndFilterContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        sortAscendent,
        setSortAscendent,
        sortCriteria,
        setSortCriteria,
        filters,
        setFilters,
        sortedBooks,
        mode,
        setMode,
        changeMode
      }}
    >
      {children}
    </SortAndFilterContext.Provider>
  );
};

export const useSortAndFilterContext = () => {
  const context = useContext(SortAndFilterContext);
  if (!context) {
    throw new Error("useSortAndFilterContext must be used within a SortAndFilterProvider");
  }
  return context;
};
