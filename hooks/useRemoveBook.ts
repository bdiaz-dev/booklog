import { useRouter } from "next/navigation"

export function useRemoveBook() {
  const router = useRouter()

  const handleRemoveBook = async (bookId) => {
    await fetch("/api/books/remove", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookId }),
    })
    router.refresh()
  }

  return { handleRemoveBook }
}
