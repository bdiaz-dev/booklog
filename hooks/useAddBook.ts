import { useRouter } from "next/navigation"
export function useAddBook() {
  const router
   = useRouter()

  const handleAddBook = async (book) => {
    try {
      const response = await fetch("/api/books/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: book.volumeInfo.title,
          author: book.volumeInfo.authors ? book.volumeInfo.authors[0] : "Unknown",
          googleId: book.id,
          thumbnail: book.volumeInfo.imageLinks?.thumbnail || null,
        }),
      })
      if (!response.ok) {
        const error = new Error("Error adding book")
        throw error
      }
      router.refresh()
      console.log(`book ${book.volumeInfo.title} added`)
      return response
    } catch (error) {
      console.error("Error adding book:", error)
      throw error
    }
  }

  return { handleAddBook }

}
