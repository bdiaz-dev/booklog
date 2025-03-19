"use client"

import { useState, useEffect } from "react"
import { useBookData } from '@/context/BookDataContext'
import BookItem from '../BookItem'
import { AnimatePresence, motion } from 'framer-motion'

export default function BookList({ isReadingList }) {
  const { readedList, readingList, loading, error } = useBookData()
  const [searchTerm, setSearchTerm] = useState("")
  const [sortCriteria, setSortCriteria] = useState("title")
  const [sortAscendent, setSortAscendent] = useState(true)
  const books = isReadingList ? readingList : readedList

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

  if (loading) return <div>Cargando...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="book-list">
      <input
        type="text"
        placeholder="Buscar en esta lista..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <button className='button info' onClick={() => setSortCriteria("title")}>A-Z</button>
      {isReadingList
        ? (
        <button className='button info' onClick={() => setSortCriteria("addedDate")}>Fecha Añadido</button>
        )
        : (
      <button className='button info' onClick={() => setSortCriteria("readedDate")}>Fecha Lectura</button>
        )}
        <button className='button info' onClick={() => setSortAscendent(!sortAscendent)}>
          {sortAscendent ? 'Orden Ascendente' : 'Orden Descendente'}
        </button>
      <ul>
        <AnimatePresence>
          {!sortedBooks.length && <li>Aqui no hay nada ... 😕</li>}
          {sortedBooks.map((book) => (
            <motion.li
              key={book.googleId}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0 }}
            >
              <BookItem book={book} />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  )
}
