"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useMarkAsRead } from "@/hooks/useMarkAsRead"
import { useRemoveBook } from "@/hooks/useRemoveBook"

export default function BookList({ books, isReadingList }) {
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()
  const { handleMarkAsRead } = useMarkAsRead()
  const { handleRemoveBook } = useRemoveBook()

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()),
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
        {filteredBooks.map((book) => (
          <li key={book.id}>
            <div>
              <img src={book.thumbnail} alt={book.title} />
            </div>
            <div className="book-info">
              <span className="book-title">{book.title}</span>
              <span className="book-author">{book.author}</span>
              <br />
              <span>
                // no funciona el leido
                {isReadingList
                  ? ` Añadido el: ${new Date(book.addedDate).toLocaleDateString()}`
                  : ` Leído el: ${new Date(book.readedDate).toLocaleDateString()}`}
              </span>
            </div>
            <div>
            </div>
            <div className="book-actions">
              {isReadingList && (
                <button onClick={() => handleMarkAsRead(book.id)} className="button secondary">
                  Marcar como leído
                </button>
              )}
              <button onClick={() => handleRemoveBook(book.googleId)} className="button danger">
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
