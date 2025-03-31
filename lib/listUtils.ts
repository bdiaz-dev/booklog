// book type para todo

import { UserBook } from './types/types'

export function filterAndSortBooks (
  books : Array<UserBook>, searchTerm : string, sortCriteria : string, sortAscendent : boolean
) {
  const filteredBooks = books.filter(
    (book) =>
      book?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book?.author?.toLowerCase().includes(searchTerm.toLowerCase()),
  )
  
  // book tupe
  const sortedBooks = filteredBooks.sort((a : UserBook, b : UserBook) => {
    const aReadedDate = Number(new Date(a.readedDate ?? 0))
    const bReadedDate = Number(new Date(b.readedDate ?? 0))
    const aAddedDate = Number(new Date(a.addedDate ?? 0))
    const bAddedDate = Number(new Date(b.addedDate ?? 0))
    if (sortCriteria === "title") {
      if (sortAscendent) return a.title.localeCompare(b.title)
      else return b.title.localeCompare(a.title)
    } else if (sortCriteria === "readedDate") {
      if (sortAscendent) return aReadedDate - bReadedDate
      else return bReadedDate - aReadedDate
    } else if (sortCriteria === "addedDate") {
      if (sortAscendent) return aAddedDate - bAddedDate
      else return bAddedDate - aAddedDate
    }
    return 0
  })

  return sortedBooks
}
