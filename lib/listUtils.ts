// book type para todo

import { UserBook } from './types/types'

export function filterAndSortBooks (
  books : Array<UserBook>, searchTerm : string, sortCriteria : string, sortAscendent : boolean, filters: Record<string, boolean>
) {
  const normalize = (str: string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
  const filteredBooks = books.filter((book) => {
    const matchesSearchTerm =
      normalize(book?.title ?? "").includes(normalize(searchTerm)) ||
      normalize(book?.author ?? "").includes(normalize(searchTerm));

    const matchesStartedFilter =
      (filters.showStarted && book.isStarted) || (filters.showNoStarted && !book.isStarted);

    return matchesSearchTerm && matchesStartedFilter;
  });
  
  // book tupe
  const sortedBooks = filteredBooks.sort((a : UserBook, b : UserBook) => {
    const aReadedDate = Number(new Date(a.readedDate ?? 0))
    const bReadedDate = Number(new Date(b.readedDate ?? 0))
    const aAddedDate = Number(new Date(a.addedDate ?? 0))
    const bAddedDate = Number(new Date(b.addedDate ?? 0))
    const aStartedDate = Number(new Date(a.startedDate ?? 0))
    const bStartedDate = Number(new Date(b.startedDate ?? 0))
    if (sortCriteria === "title") {
      if (sortAscendent) return a.title.localeCompare(b.title)
      else return b.title.localeCompare(a.title)
    } else if (sortCriteria === "readedDate") {
      if (sortAscendent) return aReadedDate - bReadedDate
      else return bReadedDate - aReadedDate
    } else if (sortCriteria === "addedDate") {
      if (sortAscendent) return aAddedDate - bAddedDate
      else return bAddedDate - aAddedDate
    } else if (sortCriteria === "startedDate") {
      if (aStartedDate === 0 && bStartedDate === 0) return 0
      if (aStartedDate === 0) return 1
      if (bStartedDate === 0) return -1
      if (sortAscendent) return aStartedDate - bStartedDate
      else return bStartedDate - aStartedDate
    }
    return 0
  })

  return sortedBooks
}
