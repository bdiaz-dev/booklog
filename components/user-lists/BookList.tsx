"use client"

import { useState, useEffect, use } from "react"
import { useBookData } from '@/context/BookDataContext'
import BookItem from '../BookItem'
import { AnimatePresence, motion } from 'framer-motion'
import Loading from '../Loading'
import { Mosaic } from 'react-loading-indicators'

export default function BookList({ isReadingList, setIsLoading }) {
  const { readedList, readingList, loading, error } = useBookData()
  const [searchTerm, setSearchTerm] = useState("")
  const [sortCriteria, setSortCriteria] = useState("title")
  const [sortAscendent, setSortAscendent] = useState(true)
  const books = isReadingList ? readingList : readedList

  useEffect(() => {
    setIsLoading(loading)
  }, [loading])

  if (loading) return (<Loading isInitial />)
  // setIsLoading(false)
  if (error) return <div>Error: {error}</div>

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
      if (sortAscendent) return new Date(a.readedDate) - new Date(b.readedDate)
      else return new Date(b.readedDate) - new Date(a.readedDate)
    } else if (sortCriteria === "addedDate") {
      if (sortAscendent) return new Date(a.addedDate) - new Date(b.addedDate)
      else return new Date(b.addedDate) - new Date(a.addedDate)
    }
    return 0
  })


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
        <button className={`button ${sortCriteria === "title" ? "active" : "info"}`} onClick={() => setSortCriteria("title")}>A-Z</button>
        {isReadingList
          ? (<button className={`button ${sortCriteria === "addedDate" ? "active" : "info"}`} onClick={() => setSortCriteria("addedDate")}>Fecha Añadido</button>)
          : (<button className={`button ${sortCriteria === "readedDate" ? "active" : "info"}`} onClick={() => setSortCriteria("readedDate")}>Fecha Lectura</button>)
        }
        <button className='button info' onClick={() => setSortAscendent(!sortAscendent)}>
          {sortAscendent ? 'Orden Ascendente' : 'Orden Descendente'}
        </button>
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
