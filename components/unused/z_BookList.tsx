"use client"

import { useState } from "react"
import BookItem from './BookItem'

export default function BookList({ books, isReadingList, isSearchResult }) {
  const [searchTerm, setSearchTerm] = useState("")
  const filteredBooks = books.filter(
    (book) =>
      (book.title || book.volumeInfo?.title).toLowerCase().includes(searchTerm.toLowerCase()) ||
      (book.author || book.volumeInfo?.authors?.join(", ")).toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="book-list">
      <input
        type="text"
        placeholder="Buscar en esta lista..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <ul>
        {!filteredBooks.length && <li>Aqui no hay nada ... 😕</li>}
        {filteredBooks.map((book) => (
          <li key={book.id}>
            <BookItem book={book} isReadingList={isReadingList} isSearchResult={isSearchResult} />
          </li>
        ))}
      </ul>
    </div>
  )
}
