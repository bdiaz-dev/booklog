"use client"

import { useState, useEffect, use } from "react"
import { useBookData } from '@/context/BookDataContext'
import BookItem from '../BookItem'
import { AnimatePresence, motion } from 'framer-motion'
import Loading from '../Loading'
import { Mosaic } from 'react-loading-indicators'
import { filterAndSortBooks } from '@/lib/listUtils'
import SortButton from '../SortButton'

interface BookListProps {
  setIsLoading: (loading: boolean) => void
  isReadingList?: boolean
}

export default function BookList({ isReadingList, setIsLoading } : BookListProps) {
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
  }, [isReadingList])

  if (loading) return (<Loading isInitial />)
  // setIsLoading(false)
  if (error) return <div>Error: {error}</div>

  const sortedBooks = filterAndSortBooks(books, searchTerm, sortCriteria, sortAscendent)

  return (
    <div className="book-list">
      <input
        type="text"
        placeholder="Buscar en esta lista..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div className='sort-buttons'>
        <SortButton isAscending={sortAscendent} onClick={() => setSortAscendent(!sortAscendent)} />
        <button className={`button ${sortCriteria === "title" ? "active" : "info"}`} onClick={() => setSortCriteria("title")}>A-Z</button>
        {isReadingList
          ? (<button className={`button ${sortCriteria === "addedDate" ? "active" : "info"}`} onClick={() => setSortCriteria("addedDate")}>Fecha Añadido</button>)
          : (<button className={`button ${sortCriteria === "readedDate" ? "active" : "info"}`} onClick={() => setSortCriteria("readedDate")}>Fecha Lectura</button>)
        }
        {/* <button className='button info' onClick={() => setSortAscendent(!sortAscendent)}>
          {sortAscendent ? 'Orden Ascendente' : 'Orden Descendente'}
        </button> */}
      </div>
      <ul>
        {/* <AnimatePresence> */}
          {!sortedBooks.length && <li>Aqui no hay nada ... 😕</li>}
          {sortedBooks.map((book) => (
            <li
              key={book.googleId}
              // initial={{ scaleY: 0 }}
              // animate={{ scaleY: 1 }}
              // exit={{ scaleY: 0 }}
            >
              <BookItem book={book} />
            </li>
          ))}
        {/* </AnimatePresence> */}
      </ul>
    </div>
  )
}
