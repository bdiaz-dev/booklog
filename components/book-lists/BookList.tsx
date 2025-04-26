"use client"

import { useState, useEffect, use } from "react"
import { useBookData } from '@/context/BookDataContext'
import BookItem from '@/components/book-lists/BookItem'
import Loading from '@/components/interface/Loading'
import { UserBook } from '@/lib/types/types'
import { BookItemProvider } from '@/context/BookItemContext'
import { useSortAndFilterContext } from '@/context/SortAndFilterContext'
import SortAndFilterButtons from '../interface/buttons/SortAndFilterButtons/SortAndFilterButtons'

interface BookListProps {
  setIsLoading: (loading: boolean) => void
  isReadingList?: boolean
}

export default function BookList({ isReadingList, setIsLoading }: BookListProps) {

  const {
    searchTerm,
    setSearchTerm,
    sortedBooks
  } = useSortAndFilterContext()

  const {
    loading, error
  } = useBookData()

  useEffect(() => {
    setIsLoading(loading)
  }, [loading])

  if (loading) return (<Loading isInitial />)
  if (error) return <div>Error: {error}</div>

  return (
    <div className="book-list">
      <div className='book-list-search-input'>
        <input
          type="text"
          placeholder="Buscar en esta lista..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button
          onClick={() => setSearchTerm("")}
          type="button"
          className="delete-text-button"
          disabled={!searchTerm}
        >
          ✖
        </button>
      </div>

      <SortAndFilterButtons isReadingList={!!isReadingList} />

      <ul>
        {!sortedBooks.length &&
          <li>
            <p>Aqui no hay nada ... 😕</p>
            {isReadingList
              ? <p>Encuentra algo que leer en la sección de búsqueda 🔍</p>
              : <p>Marca tus libros leidos en la lista de lectura 📚</p>
            }
          </li>}
        {sortedBooks.map((book: UserBook) => (
          <li
            key={book.googleId}
          >
            <BookItemProvider book={book}>
              <BookItem book={book} />
            </BookItemProvider>
          </li>
        ))}
      </ul>
    </div>
  )
}
