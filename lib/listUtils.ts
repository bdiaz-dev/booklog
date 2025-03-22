// book type para todo

export function filterAndSortBooks (books, searchTerm, sortCriteria, sortAscendent) {
  const filteredBooks = books.filter(
    (book) =>
      book?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book?.author?.toLowerCase().includes(searchTerm.toLowerCase()),
  )
  
  const sortedBooks = filteredBooks.sort((a, b) => {
    if (sortCriteria === "title") {
      if (sortAscendent) return a.title.localeCompare(b.title)
      else return b.title.localeCompare(a.title)
    } else if (sortCriteria === "readedDate") {
      if (sortAscendent) return new Date(a.readedDate).getDate() - new Date(b.readedDate).getDate()
      else return new Date(b.readedDate).getDate() - new Date(a.readedDate).getDate()
    } else if (sortCriteria === "addedDate") {
      if (sortAscendent) return new Date(a.addedDate).getDate() - new Date(b.addedDate).getDate()
      else return new Date(b.addedDate).getDate() - new Date(a.addedDate).getDate()
    }
    return 0
  })

  return sortedBooks
}
