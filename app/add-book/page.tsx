"use client"

import { useState } from 'react'
import { useBookLists } from '@/hooks/useBookLists'
import { useBookSearch } from '@/hooks/useBookSearch'
import { placeholderImg } from '@/lib/constants'
import { useAddBook } from '@/hooks/useAddBook'
import ReturnHome from '@/components/buttons/returnHome'
import { useRemoveBook } from '@/hooks/useRemoveBook'
import BookElement from '@/components/BookElement'

export default function AddBook() {
  const { booksReading, booksReaded, setBooksReaded, setBooksReading} = useBookLists()
  const { handleAddBook } = useAddBook()
  const { handleRemoveBook } = useRemoveBook()
  const {
    searchTerm,
    setSearchTerm,
    searchResults,
    isLoading,
    handleSearch
  } = useBookSearch()
  const [ onListButtonText, setOnListButtonText ] = useState("En la lista de Lectura")

  return (
    <div className="add-book-form">
      <ReturnHome />
      <h2>Añadir Libro</h2>
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
                <BookElement 
                  book={book} 
                  booksReading={booksReading}
                  booksReaded={booksReaded}
                  setBooksReaded={setBooksReaded}
                  setBooksReading={setBooksReading}
                />
              </li>
                
              // <li key={book.id}>
              //   <div className="book-info">
              //     <span><img src={book.volumeInfo.imageLinks?.thumbnail || placeholderImg} alt="" /></span>
              //     <br />
              //     <span className="book-title">{book.volumeInfo.title}</span>
              //     <br />
              //     <span className="book-author">
              //       {book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "Autor desconocido"}
              //     </span>
              //   </div>
              //   {booksReading.has(book.id) ? (
              //     <button
              //     // aqui entra el id de google, y no el id de la base de datos como necesita el custom hook
              //     // ver como lo solucionamos
              //       onClick={() => handleRemoveBook(book.id)}
              //       onMouseEnter={() => setOnListButtonText("Quitar de la lista de Lectura")}
              //       onMouseLeave={() => setOnListButtonText("En la lista de Lectura")}
              //       className="button primary"
              //     >
              //       {onListButtonText}
              //     </button>
              //   ) : (
              //     <button onClick={() => handleAddBook(book)} className="button secondary">
              //       Añadir a la lista
              //     </button>
              //   )}
              //   {booksReaded.has(book.id) && <span className="book-readed">Leído</span>}
              // </li>
            ))}
          </ul>
        ) : (
          <p>No se encontraron resultados. Intenta con otra búsqueda.</p>
        )}
      </div>
    </div>
  )
}
