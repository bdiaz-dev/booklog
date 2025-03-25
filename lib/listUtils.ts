// book type para todo

export function filterAndSortBooks (books, searchTerm, sortCriteria, sortAscendent) {
  const filteredBooks = books.filter(
    (book) =>
      book?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book?.author?.toLowerCase().includes(searchTerm.toLowerCase()),
  )
  
  // book tupe
  const sortedBooks = filteredBooks.sort((a, b) => {
    const aReadedDate = Number(new Date(a.readedDate))
    const bReadedDate = Number(new Date(b.readedDate))
    const aAddedDate = Number(new Date(a.addedDate))
    const bAddedDate = Number(new Date(b.addedDate))
    if (sortCriteria === "title") {
      if (sortAscendent) return a.title.localeCompare(b.title)
      else return b.title.localeCompare(a.title)
    } else if (sortCriteria === "readedDate") {
      console.log(Number(new Date(a.readedDate)))
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
