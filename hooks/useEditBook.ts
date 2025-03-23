import { useState } from 'react'

interface EditBookResponse {
  ok: boolean
  message?: string
  error?: string
}

export function useEditBook() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const editBook = async (bookId: string, feedback: number, readedDate: string): Promise<EditBookResponse> => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/books/edit-rating', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookId, feedback, readedDate }),
      })

      const data: EditBookResponse = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to update book rating and read date')
        return { ok: false, error: data.error }
      }

      return { ok: true, message: data.message }
    } catch (err) {
      setError('Failed to update book rating and read date')
      return { ok: false, error: 'Failed to update book rating and read date' }
    } finally {
      setLoading(false)
    }
  }

  return { editBook, loading, error }
}
