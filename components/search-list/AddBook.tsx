"use client"
import { useBookSearch } from '@/hooks/useBookSearch'
import { useBookData } from '@/context/BookDataContext'
import BookItem from '../BookItem'

export default function AddBook() {
  const { readedList, setReadedList, readingList, setReadingList, loading, error } = useBookData()
  const {
    searchTerm,
    setSearchTerm,
    searchResults,
    isLoading,
    handleSearch
  } = useBookSearch()

  return (
    <div className="add-book-form">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar libros en Google Books..."
        />
        <button type="submit" className="button primary" disabled={isLoading}>
          {isLoading ? "Buscando..." : "Buscar"}
        </button>
      </form>
      <div className="search-results">
        {isLoading ? (
          <p>Buscando libros...</p>
        ) : searchResults.length > 0 ? (
          <ul>
            {searchResults.map((book) => (
              <li key={book.id}>
                <BookItem
                  book={book}
                  isSearch
                />
              </li>
            ))}
          </ul>
        ) : (
          <p>No se encontraron resultados. Intenta con otra búsqueda.</p>
        )}
      </div>
    </div>
  )
}
