"use client"

import { useState, useEffect, use } from "react"
import { useBookData } from '@/context/BookDataContext'
import BookItem from '@/components/book-lists/BookItem'
import Loading from '@/components/interface/Loading'
import { filterAndSortBooks } from '@/lib/listUtils'
import SortButton from '@/components/interface/buttons/SortButton'
import { UserBook } from '@/lib/types/types'

interface BookListProps {
  setIsLoading: (loading: boolean) => void
  isReadingList?: boolean
}

export default function BookList({ isReadingList, setIsLoading }: BookListProps) {
  const { readedList, readingList, loading, error } = useBookData()
  const [searchTerm, setSearchTerm] = useState("")
  const [sortAscendent, setSortAscendent] = useState(true)
  const books = isReadingList ? readingList : readedList
  const [sortCriteria, setSortCriteria] = useState("title")

  useEffect(() => {
    setIsLoading(loading)
  }, [loading])

  useEffect(() => {
    setSortCriteria("title")
    setSearchTerm("")
  }, [isReadingList])

  if (loading) return (<Loading isInitial />)
  // setIsLoading(false)
  if (error) return <div>Error: {error}</div>

  const sortedBooks = filterAndSortBooks(books, searchTerm, sortCriteria, sortAscendent)

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
          className="button danger"
        >
          ✖
        </button>
      </div>
      <div className='sort-buttons'>
        <SortButton isAscending={sortAscendent} onClick={() => setSortAscendent(!sortAscendent)} />
        <button className={`button ${sortCriteria === "title" ? "active" : "info"}`} onClick={() => setSortCriteria("title")}>A-Z</button>
        {isReadingList
          ? (<button className={`button ${sortCriteria === "addedDate" ? "active" : "info"}`} onClick={() => setSortCriteria("addedDate")}>Fecha Añadido</button>)
          : (<button className={`button ${sortCriteria === "readedDate" ? "active" : "info"}`} onClick={() => setSortCriteria("readedDate")}>Fecha Lectura</button>)
        }
      </div>
      <ul>
        {!sortedBooks.length &&
          <li>
            <p>Aqui no hay nada ... 😕</p>
            { isReadingList
              ? <p>Encuentra algo que leer en la sección de búsqueda 🔍</p>
              : <p>Marca tus libros leidos en la lista de lectura 📚</p>
              }
          </li>}
        {sortedBooks.map((book: UserBook) => (
          <li
            key={book.googleId}
          >
            <BookItem book={book} />
          </li>
        ))}
        {/* </AnimatePresence> */}
      </ul>
    </div>
  )
}
