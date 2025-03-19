import { useRouter } from "next/navigation"

export function useRemoveBook() {
  const router = useRouter()

  const handleRemoveBook = async (bookId) => {
    // try catch + return response
    try {
    const response = await fetch("/api/books/remove", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookId }),
    })
    if (!response.ok) {
      const error = new Error("Error removing book")
      throw error
    }
    router.refresh()
    return response
  } catch (error) {
    console.error("Error removing book:", error)
    throw error
  }
  }

  return { handleRemoveBook }
}
